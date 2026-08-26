import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

// Der Phase-0-Prototyp bleibt direkt startbar und lädt nur lokale Bild-Assets.
// Dieser kleine DOM-Shim lädt exakt denselben Spielcode in Node, ohne eine
// Browser- oder Test-Abhängigkeit ins Projekt zu ziehen. Er simuliert nicht das
// Rendering; geprüft wird ausschließlich der integrierte Headless-Spielpfad.
const noop = () => {};
const gradient = { addColorStop: noop };
// Zaehler fuer teure Zeichenoperationen. Der Shim verschluckt die Befehle,
// aber er kann sie mitzaehlen -- damit laesst sich die Renderlast messen
// statt sie aus dem Quelltext zu erraten (EH-2026-08-24-02).
const zaehler = {
  gradients: 0, shadowBlur: 0, drawImage: 0, createElement: 0,
  reset(){ this.gradients = 0; this.shadowBlur = 0; this.drawImage = 0; this.createElement = 0; },
  werte(){ return { gradients: this.gradients, shadowBlur: this.shadowBlur,
                    drawImage: this.drawImage, createElement: this.createElement }; },
};
const context = new Proxy({}, {
  get(target, property) {
    if (property === "createLinearGradient" || property === "createRadialGradient")
      return () => { zaehler.gradients++; return gradient; };
    if (property === "measureText") return () => ({ width: 0 });
    if (property === "drawImage") return () => { zaehler.drawImage++; };
    if (!(property in target)) target[property] = noop;
    return target[property];
  },
  set(target, property, value) {
    if (property === "shadowBlur" && value) zaehler.shadowBlur++;
    target[property] = value; return true;
  },
});

const elements = new Map();
function makeElement(id = "") {
  const attributes = new Map();
  const classes = new Set();
  const node = {
    id,
    // Die HUD-Vertraege (EH-2026-08-25-03) lesen updateHUD ueber den echten
    // Pfad; dafuer genuegen eine leere Kindliste und ein Style-Stummel.
    style: { setProperty: noop, removeProperty: noop },
    children: [],
    classList: {
      add: (...names) => names.forEach(n => classes.add(n)),
      remove: (...names) => names.forEach(n => classes.delete(n)),
      toggle: (name, force) => {
        const next = force === undefined ? !classes.has(name) : !!force;
        if (next) classes.add(name); else classes.delete(name);
        return next;
      },
    },
    setAttribute: (name, value) => attributes.set(name, String(value)),
    getAttribute: (name) => attributes.get(name),
    removeAttribute: (name) => { attributes.delete(name); },
    get className() { return [...classes].join(" "); },
    addEventListener: noop,
    appendChild: (child) => { node.firstElementChild ||= child; },
    getContext: () => context,
    focus: noop,
    select: noop,
    remove: noop,
    clientWidth: 1000,
    clientHeight: 700,
    width: 1000,
    height: 700,
    innerHTML: "",
    textContent: "",
    value: "0",
    onclick: null,
  };
  return node;
}

globalThis.window = globalThis;
globalThis.devicePixelRatio = 1;
globalThis.innerWidth = 1000;
globalThis.addEventListener = noop;
globalThis.requestAnimationFrame = () => 0;
globalThis.matchMedia = () => ({ matches: false });
const storage = new Map();
globalThis.localStorage = {
  getItem: (key) => storage.has(key) ? storage.get(key) : null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
};
globalThis.document = {
  body: makeElement("body"),
  createElement: (tag) => { zaehler.createElement++; return makeElement(tag); },
  getElementById: (id) => {
    if (!elements.has(id)) elements.set(id, makeElement(id));
    return elements.get(id);
  },
  querySelectorAll: (selector) => selector === ".sheet"
    ? ["start", "pause", "extract", "over"].map((id) => globalThis.document.getElementById(id))
    : [],
};

const here = path.dirname(fileURLToPath(import.meta.url));
const prototypePath = path.resolve(here, "../prototype/web/index.html");
const html = fs.readFileSync(prototypePath, "utf8");
const artPaths = [
  path.resolve(here, "../prototype/web/assets/aelric-atlas-v2.png"),
  path.resolve(here, "../prototype/web/assets/enemy-atlas-v1.png"),
  path.resolve(here, "../prototype/web/assets/enemy-swarmer-atlas-v2.png"),
];
const artAssets = artPaths.every((assetPath) => {
  if (!fs.existsSync(assetPath)) return false;
  const png = fs.readFileSync(assetPath);
  return png.length > 100_000 && png.subarray(1, 4).toString("ascii") === "PNG" && png[25] === 6;
});
const match = html.match(/<script>([\s\S]*)<\/script>/);
if (!match) throw new Error("Inline script not found in prototype/web/index.html");

new Function(match[1])();
const engine = globalThis.__EH;
if (!engine?.runBalanceSuite) throw new Error("Balance suite is not exposed as window.__EH.runBalanceSuite");

const report = engine.runBalanceSuite();
const evolutionRuns = report.runs.baseline.filter((run) => run.evo.length > 0).length;
// Nach D-031 wieder auf 2 angehoben. Die Absenkung auf 1 war ausschliesslich
// eine Folge der Dichtesenkung aus D-030 und ist mit dem frueheren
// Fokus-Schutz behoben: 3 von 9 Botlaeufen erreichen wieder eine Evolution, wie
// vor D-030. Der Mensch liegt darueber, in beiden sauberen 8-Minuten-Laeufen
// waren es eine bzw. zwei. Faellt der Wert erneut, ist der Buildpfad kaputt.
const evolutionReachable = evolutionRuns >= 2;
const feedbackRun = report.runs.baseline.find((run) => run.seed === 2474367456);
const repeat = engine.headlessRun(report.runLen, {
  seed: report.seeds[0],
  xpC: engine.CFG.XP_C,
  xpK: engine.CFG.XP_K,
  smart: true,
  immortal: true,
});
const reproducible = JSON.stringify(repeat) === JSON.stringify(report.runs.baseline[0]);
const stationaryRun = engine.headlessRun(120, {
  seed: report.seeds[0], smart: true, immortal: false, stationary: true, noPicks: true,
});
const stationaryPressure = stationaryRun.died >= 12 && stationaryRun.died <= 90;
engine.begin(180);
engine.tick(engine.CFG.TICK);
const visualState = engine.S.bowKick > 0 &&
  Number.isFinite(engine.S.shotAimx) && Number.isFinite(engine.S.shotAimy) &&
  html.includes("loadRasterArt()") && html.includes("updateVisualState(dt)") &&
  html.includes("const ENEMY_DIRECTIONS = 16") &&
  html.includes("HERO_ANIM.WALK") && html.includes("HERO_ANIM.SHOT") &&
  html.includes("ART.swarmer[frame][dir]");
const directionBlock = html.match(/function directionalSprites\(base\)\{([\s\S]*?)\n\}/)?.[1] || "";
const uprightCharacters = html.includes("ctx.scale(S.heroFacing,1)") &&
  html.includes("const faceRight=Math.cos") && !directionBlock.includes(".rotate(");
const renderEnemyBlock = html.slice(html.indexOf("// --- Gegner: ein Durchlauf"), html.indexOf("// --- Gegnerprojektile"));
const singlePassRendering = renderEnemyBlock.includes("spr=artSet?artSet[dir]:SPR.enemy[f][tier]") &&
  renderEnemyBlock.includes("ENEMY_NORMAL_TIER") &&
  !renderEnemyBlock.includes("tier===0") &&
  !renderEnemyBlock.includes("for (let f=0; f<5; f++)") &&
  !html.includes("Vignette: außerhalb des Lichts");
const combatReadability =
  html.includes("function drawEnemyTelegraphs(vx0,vx1,vy0,vy1)") &&
  html.includes("E.ang[i]=Math.atan2(dy,dx)") &&
  html.includes("E.vx[i]=Math.cos(E.ang[i])*sp*7.5") &&
  html.includes("Goldene Lücke suchen · roten Korridor meiden") &&
  html.includes('id="bossbar"') && html.includes('id="bossfill"');

// --- D-027 Punkt G: Die Slotanzeige links darf bei niedriger Fensterhoehe
// (Feldlaufgroesse 1422x613) nicht unten aus dem Bild laufen. Eine echte
// Layoutmessung (tatsaechliche Pixelhoehen, Umbruch) ist im Node-DOM-Shim
// nicht moeglich, da hier nicht gerendert wird. Geprueft wird deshalb
// strukturell: Die Liste ist per "bottom" hoehenbegrenzt statt unbegrenzt zu
// wachsen, bricht bei Ueberlauf per flex-wrap in eine weitere Spalte um,
// bleibt dabei per max-width unter der halben Bildschirmbreite und wird bei
// niedrigen Fenstern zusaetzlich kompakter (kleinere Slots, schmalere
// Evolutionspfad-Bloecke). Die manuelle Sichtpruefung bei 1422x613 bleibt
// trotzdem noetig.
const slotsRule = html.match(/#slots\{[^}]*\}/)?.[0] || "";
const slotLayout =
  slotsRule.includes("bottom:14px") &&
  slotsRule.includes("flex-wrap:wrap") &&
  slotsRule.includes("max-width:min(50vw,460px)") &&
  html.includes(".slot .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}") &&
  html.includes("@media (max-height:700px)") &&
  html.includes(".slot{padding:2px 6px 2px 4px;font-size:10px;width:150px}") &&
  html.includes(".evopath{width:168px;padding:5px 7px 6px;margin-top:0}");

const uniqueChainTargets = html.includes("const CHAIN_HITS = new Int16Array(8)") &&
  html.includes("CHAIN_HITS[seenN++]=best");
let bossTargeting = false;
let bossDurability = false;
try {
  engine.begin(180);
  engine.spawnEnemy(100, 0, 0, 90, 0);
  const boss = engine.spawnEnemy(250, 4, 2, 280, 0);
  engine.rebuildGrid();
  bossTargeting = engine.priorityEnemy(520) === boss &&
    html.includes("const pierce = (evo||bossShot) ? 999") &&
    !html.includes("const tgt = farthestEnemy(range*1.25)");
  bossDurability = engine.enemyMax(boss) >= 9000 && !html.includes("bossShot?1.45:1");
} catch (_) {}
let singleProjectileHit = false;
let uniqueSpatialQuery = false;
let singleExplosion = false;
try {
  engine.begin(180);
  const boss = engine.spawnEnemy(100, 4, 2, 0, 0);
  engine.rebuildGrid();
  let visits = 0;
  engine.nearEnemies(0, 0, 3000, () => { visits++; });
  uniqueSpatialQuery = visits === 1;
  const before = engine.enemyHp(boss);
  engine.shoot(0, 0, 1, 0, 0, 10, 999, 0, 9);
  for (let i=0; i<5; i++) engine.updateProjectiles(engine.CFG.TICK);
  singleProjectileHit = Math.abs((before-engine.enemyHp(boss))-10) < 0.001;

  engine.begin(180);
  const a = engine.spawnEnemy(0, 4, 0, 0, 0);
  const b = engine.spawnEnemy(0, 4, 0, 3, 0);
  engine.rebuildGrid();
  const beforeA=engine.enemyHp(a), beforeB=engine.enemyHp(b);
  engine.shoot(0, 0, 1, 0, 0, 10, 1, 2, 12);
  engine.updateProjectiles(engine.CFG.TICK);
  const expected=10*(1+2*.085);
  singleExplosion=Math.abs((beforeA-engine.enemyHp(a))-expected)<.001 &&
    Math.abs((beforeB-engine.enemyHp(b))-expected)<.001;
} catch (_) {}
let uxFlow = false;
let uxError = "";
try {
  engine.begin(180);
  elements.get("pausebtn")?.onclick?.();
  const enteredPause = engine.S.phase === "pause";
  elements.get("btnResume")?.onclick?.();
  const resumedCleanly = engine.S.phase === "run" && engine.S.runLen === 180;
  engine.S.result = "Extrahiert";
  engine.S.t = 180;
  engine.S.kills = 321;
  engine.S.level = 7;
  engine.S.pickTimes = [30, 70, 120];
  engine.S.baseReward = 123;
  engine.S.reward = 123;
  engine.S.worstFps = 58;
  const runText = engine.runReportText();
  const reportFields = ["Seed:", "Modus: 3 Minuten", "Ergebnis: Extrahiert", "Kills: 321", "Kartenzüge: 3", "Build:"];
  const reportComplete = reportFields.every((field) => runText.includes(field));
  elements.get("btnAgain")?.onclick?.();
  const sameModeRestart = engine.S.runLen === 180 && engine.S.phase === "run";
  const shortcutSafe = html.includes("e.code==='F3'") && !html.includes("e.code==='KeyD') toggleDev");
  uxFlow = enteredPause && resumedCleanly && reportComplete && sameModeRestart && shortcutSafe;
} catch (error) {
  uxError = error instanceof Error ? error.message : String(error);
}
let holdFlow = false;
let holdError = "";
try {
  Object.assign(engine.H, {
    ore: 0, bars: 0, runs: 0, mineLevel: 1, mineStored: 0,
    forgeLevel: 0, forgeStored: 0, forgeWorking: false, forgeProgress: 0,
    bowUpgrade: 0, lastAt: 1000,
  });
  engine.advanceHold(16000);
  const producedOnce = Math.abs(engine.H.mineStored - 1) < 1e-9;
  engine.advanceHold(16000);
  const timestampIdempotent = Math.abs(engine.H.mineStored - 1) < 1e-9;

  Object.assign(engine.H, {
    ore: 15, mineLevel: 0, mineStored: 0, forgeLevel: 1, forgeStored: 0,
    forgeWorking: false, forgeProgress: 0, lastAt: 1000,
  });
  engine.advanceHold(31000);
  const forgedOne = engine.H.forgeStored === 1 && engine.H.forgeWorking && engine.H.ore === 5;

  engine.H.mineLevel = 0;
  engine.H.forgeLevel = 0;
  engine.H.forgeWorking = false;
  engine.H.forgeProgress = 0;
  engine.H.ore = 7;
  engine.H.bars = 2;
  engine.H.bowUpgrade = 0;
  engine.H.lastAt = 16000;
  engine.saveHold();
  engine.H.ore = 0;
  engine.loadHold(16000);
  const persisted = engine.H.ore === 7 && engine.H.bars === 2;

  elements.get("btnBowUpgrade")?.onclick?.();
  const upgraded = engine.H.bowUpgrade === 1 && engine.H.bars === 0;

  engine.begin(180);
  const upgradeApplied = Math.abs(engine.S.holdDmg - 1.1) < 1e-9;
  // Der Auszahlungspfad kennt seit EH-2026-08-23-01 die gespielte Dauer. Dieser
  // Check gehoert der einmaligen Auszahlung, nicht der Abbruchgrenze -- also
  // muss die Sortie hier auch wirklich zu Ende gespielt worden sein.
  engine.S.t = engine.S.runLen;
  engine.S.reward = 1023;
  engine.S.rewardGranted = false;
  const beforeOre = engine.H.ore, beforeRuns = engine.H.runs;
  const firstDeposit = engine.depositRunReward();
  const secondDeposit = engine.depositRunReward();
  // Erwartung aus der Kurve ableiten statt hart verdrahten: Der Check soll die
  // einmalige Auszahlung pruefen, nicht den Zahlenwert der Kurve (D-034).
  const erwartetesErz = engine.rewardOre(1023);
  const depositedOnce = firstDeposit === erwartetesErz && secondDeposit === 0 &&
    engine.H.ore === beforeOre + erwartetesErz && engine.H.runs === beforeRuns + 1;
  engine.showHold();
  const returnedToHold = engine.S.running === false && elements.get("start").getAttribute("aria-hidden") === "false";
  holdFlow = producedOnce && timestampIdempotent && forgedOne && persisted && upgraded &&
    upgradeApplied && depositedOnce && returnedToHold;
} catch (error) {
  holdError = error instanceof Error ? error.message : String(error);
}

// --- D-019 / P0.5.1: Sortietafel, Migration und Baseline-Isolation -------
let contractFlow = false;
let contractError = "";
try {
  localStorage.setItem("emberhold:hold:v1", JSON.stringify({
    version: 1, ore: 9, bars: 2, runs: 3, bowUpgrade: 1, lastAt: 1000,
  }));
  engine.loadHold(1000);
  const legacyMigrated = engine.H.ore === 9 && engine.H.bars === 2 &&
    engine.H.selectedContract === "ring";

  engine.selectContract("breach");
  engine.saveHold();
  engine.loadHold(1000);
  const selectionPersisted = engine.H.selectedContract === "breach";

  engine.begin(180);
  const selectedApplied = engine.S.contractId === "breach";
  // Vollstaendig gespielte Sortie: Der Vertragsmultiplikator soll hier geprueft
  // werden, nicht die Abbruchgrenze aus EH-2026-08-23-01.
  engine.S.t = engine.S.runLen;
  engine.S.reward = 1023;
  engine.S.rewardGranted = false;
  const boostedOre = engine.depositRunReward();
  // Erwartung aus Kurve und Vertragsmultiplikator ableiten statt hart
  // verdrahten. Der Check gehoert dem Vertragsmultiplikator, nicht dem
  // Zahlenwert der Erzkurve -- sonst bricht er bei jeder Kurvenaenderung,
  // ohne dass am Vertrag etwas falsch waere (D-034).
  const basisErz = engine.rewardOre(1023);
  const breachMul = engine.CONTRACTS.find((c) => c.id === "breach").reward;
  const rewardApplied = boostedOre === Math.max(basisErz, Math.round(basisErz*breachMul)) &&
    boostedOre > basisErz;   // der Vertrag muss ueberhaupt etwas bewirken

  const ring = engine.headlessRun(180, {
    seed: 1701, xpC: engine.CFG.XP_C, xpK: engine.CFG.XP_K,
    smart: true, immortal: true, contractId: "ring",
  });
  const breachA = engine.headlessRun(180, {
    seed: 1701, xpC: engine.CFG.XP_C, xpK: engine.CFG.XP_K,
    smart: true, immortal: true, contractId: "breach",
  });
  const breachB = engine.headlessRun(180, {
    seed: 1701, xpC: engine.CFG.XP_C, xpK: engine.CFG.XP_K,
    smart: true, immortal: true, contractId: "breach",
  });
  const baseline = engine.headlessRun(180, {
    seed: 1701, xpC: engine.CFG.XP_C, xpK: engine.CFG.XP_K,
    smart: true, immortal: true,
  });
  const variantsDistinct = JSON.stringify(ring.famSpawns) !== JSON.stringify(breachA.famSpawns);
  const deterministic = JSON.stringify(breachA) === JSON.stringify(breachB);
  const baselineIsolated = baseline.contract === "ring" &&
    JSON.stringify(baseline) === JSON.stringify(ring);
  contractFlow = engine.CONTRACTS.length === 3 && legacyMigrated &&
    selectionPersisted && selectedApplied && rewardApplied && variantsDistinct &&
    deterministic && baselineIsolated;
} catch (error) {
  contractError = error instanceof Error ? error.message : String(error);
}

// --- P0.5.3: Arkanum, Uebungshof, Vorbereitung und Save-Migration --------
let holdExpansion = false;
let holdExpansionError = "";
try {
  localStorage.setItem("emberhold:hold:v1", JSON.stringify({
    version: 2, ore: 21, bars: 5, runs: 4, mineLevel: 1, forgeLevel: 1,
    bowUpgrade: 1, selectedContract: "hollow", lastAt: 1000,
  }));
  engine.loadHold(1000);
  // D-042: Die Migrationskette laeuft jetzt bis Save v5 durch; die neuen
  // Felder starten bereinigt bei 0/0/'none'.
  const migrated = engine.H.version === 5 && engine.H.essence === 0 &&
    engine.H.marks === 0 && engine.H.preparedRerolls === 0 &&
    engine.H.stationData === 0 && engine.H.coreStage === 0 &&
    engine.H.sortieProtocol === "none" &&
    engine.H.masteries.path === 0 && engine.H.selectedContract === "hollow";

  engine.H.arcanumLevel = 1; engine.H.arcanumStored = 0;
  engine.H.yardLevel = 1; engine.H.yardStored = 0; engine.H.lastAt = 1000;
  const production = engine.advanceHold(181000);
  const produced = Math.abs(engine.H.arcanumStored - 4) < 1e-9 &&
    Math.abs(engine.H.yardStored - 3) < 1e-9 &&
    Math.abs(production.essence - 4) < 1e-9 && Math.abs(production.marks - 3) < 1e-9;
  const beforeRepeat = JSON.stringify(engine.H);
  engine.advanceHold(181000);
  const timestampIdempotentV3 = JSON.stringify(engine.H) === beforeRepeat;

  engine.H.essence = 4; engine.H.preparedRerolls = 0;
  engine.prepareReroll(); engine.prepareReroll(); engine.prepareReroll();
  const preparedAtCap = engine.H.essence === 0 && engine.H.preparedRerolls === 2;

  engine.H.marks = 3; engine.H.masteries.path = 0;
  engine.trainMastery("path"); engine.trainMastery("path"); engine.trainMastery("path");
  engine.H.masteries.reach = 1; engine.H.masteries.dash = 2;
  const masteryCosts = engine.H.masteries.path === 2 && engine.H.marks === 0;

  engine.begin(180, "ring");
  const preparedConsumed = engine.S.rerolls === 3 && engine.S.preparedRerollsUsed === 2 &&
    engine.H.preparedRerolls === 0;
  const st = engine.stats();
  const utilitiesApplied = Math.abs(st.speed - 1.10) < 1e-9 &&
    Math.abs(st.magnet - 1.10) < 1e-9 &&
    Math.abs(engine.dashCooldown() - engine.CFG.DASH_CD * 0.84) < 1e-9;

  engine.H.bowUpgrade = 1; engine.H.masteries = { path: 2, reach: 2, dash: 2 };
  engine.H.preparedRerolls = 2;
  engine.headlessRun(60, { seed: 1701, smart: true, immortal: true, contractId: "ring" });
  const baselineIsolated = engine.S.holdDmg === 1 && engine.S.rerolls === 1 &&
    Object.values(engine.S.holdUtility).every(value => value === 0);

  holdExpansion = migrated && produced && timestampIdempotentV3 && preparedAtCap &&
    masteryCosts && preparedConsumed && utilitiesApplied && baselineIsolated;
} catch (error) {
  holdExpansionError = error instanceof Error ? error.message : String(error);
}

// --- P0.5.4: Fund, Duplikatverwertung, Aufwertung und seltene Kartensaat --
let equipmentFlow = false;
let equipmentError = "";
try {
  localStorage.setItem("emberhold:hold:v1", JSON.stringify({
    version: 3, ore: 0, bars: 0, essence: 0, marks: 0, runs: 0,
    masteries: { path: 0, reach: 0, dash: 0 }, selectedContract: "ring", lastAt: 1000,
  }));
  engine.loadHold(1000);
  // D-042: v3→v5-Kette, neue Felder sauber initialisiert.
  const migrated = engine.H.version === 5 && engine.H.dust === 0 &&
    engine.H.stationData === 0 && engine.H.coreStage === 0 &&
    engine.H.sortieProtocol === "none" &&
    Object.keys(engine.H.gearOwned).length === 0 && engine.H.gearEquipped.charm === null;

  const first = engine.grantGear("runenfibel");
  const duplicate = engine.grantGear("runenfibel");
  const duplicateSalvaged = !first.duplicate && duplicate.duplicate && duplicate.dust === 10 &&
    engine.H.dust === 10 && engine.H.gearOwned.runenfibel === 1;

  engine.equipGear("runenfibel"); engine.H.dust = 30;
  const upgradeCost = engine.gearUpgradeCost(engine.GEAR.find(item=>item.id==="runenfibel"), 1);
  const upgraded = engine.upgradeGear("runenfibel") &&
    engine.H.gearOwned.runenfibel === 2 && engine.H.dust === 30-upgradeCost;

  engine.H.preparedRerolls = 0;
  engine.begin(180, "ring");
  const seededOffer = engine.buildOffer();
  const seededCard = seededOffer.find(o=>o.type==="gearcard");
  const beforeCard = engine.stats();
  engine.applyOffer(seededCard);
  const afterCard = engine.stats();
  const cardConnected = seededCard?.card?.id === "runenfunke" && engine.S.gearCardActive &&
    afterCard.proj === beforeCard.proj+1 && Math.abs(afterCard.aspd/beforeCard.aspd-1.2)<1e-9;

  const salvaged = engine.salvageGear("runenfibel") === 10 &&
    !engine.H.gearOwned.runenfibel && engine.H.gearEquipped.charm === null;
  engine.grantGear("glutsehne"); engine.H.gearOwned.glutsehne = 2;
  engine.equipGear("glutsehne"); engine.begin(180, "ring");
  const equippedEffect = Math.abs(engine.stats().aspd-1.08)<1e-9;

  engine.H.gearOwned.runenfibel=3; engine.H.gearEquipped.charm="runenfibel";
  engine.headlessRun(60,{seed:1701,smart:true,immortal:true,contractId:"ring"});
  const baselineIsolated = engine.S.gearSeed === null &&
    Object.entries(engine.S.gearBonus).every(([key,value])=>key==="seed"?value===null:value===0);

  // Der garantierte Fund haengt seit EH-2026-08-23-01 an einer vollstaendig
  // gespielten Sortie; der Abbruchfall wird in earlyLossGuard geprueft.
  engine.begin(180,"ring"); engine.S.t=engine.S.runLen;
  engine.S.reward=500; engine.S.rewardGranted=false;
  const beforeOwned=Object.keys(engine.H.gearOwned).length, beforeDust=engine.H.dust;
  engine.depositRunReward();
  const afterFirstDeposit=JSON.stringify({owned:engine.H.gearOwned,dust:engine.H.dust,runs:engine.H.runs});
  engine.depositRunReward();
  const rewardedOnce=!!engine.S.lootGear &&
    (Object.keys(engine.H.gearOwned).length>beforeOwned||engine.H.dust>beforeDust) &&
    JSON.stringify({owned:engine.H.gearOwned,dust:engine.H.dust,runs:engine.H.runs})===afterFirstDeposit;

  equipmentFlow = migrated && duplicateSalvaged && upgraded && cardConnected && salvaged &&
    equippedEffect && baselineIsolated && rewardedOnce;
} catch (error) {
  equipmentError = error instanceof Error ? error.message : String(error);
}

// --- P0.5.2: alle vorhandenen Waffen besitzen ein verifiziertes Endziel ---
let evolutionCatalog = false;
let evolutionError = "";
try {
  const expected = ["bogen", "splitter", "kugel", "blitz", "klinge", "frost"];
  const offerable = expected.every((id) => {
    engine.begin(180, "ring");
    const weapon=engine.WEAPONS.find(w=>w.id===id);
    if(!weapon?.evo) return false;
    engine.S.W = { [id]: 5 };
    const need=weapon.evo.need;
    engine.S.Pa = { [need]: 3 };
    engine.S.evo = {};
    const offer = engine.buildOffer();
    if (offer.length !== 1 || offer[0].type !== "evo" || offer[0].w.id !== id) return false;
    engine.applyOffer(offer[0]);
    return engine.S.evo[id] === 1;
  });

  engine.begin(180, "ring");
  engine.S.W={splitter:5}; engine.S.Pa={koecher:3}; engine.S.evo={splitter:1};
  engine.S.cool={splitter:0};
  engine.spawnEnemy(0,0,1,120,0); engine.rebuildGrid(); engine.fireWeapons(.1);
  const arrowRain = engine.counts().p >= 11;

  engine.begin(180, "ring");
  engine.S.W={blitz:5}; engine.S.Pa={amulett:3}; engine.S.evo={blitz:1};
  engine.S.cool={blitz:0};
  for(let i=0;i<8;i++) engine.spawnEnemy(0,0,1,70+i*22,(i%2)*25);
  engine.rebuildGrid(); engine.fireWeapons(.1);
  const stormHeart = engine.boltCount() >= 8;

  engine.begin(180, "ring");
  engine.S.W={klinge:5}; engine.S.Pa={federung:3}; engine.S.evo={klinge:1};
  engine.S.cool={}; engine.input.x=0; engine.input.y=0; engine.S.bladeAng=0;
  engine.fireWeapons(.1); const stillAngle=engine.S.bladeAng;
  engine.S.bladeAng=0; engine.input.x=1; engine.fireWeapons(.1);
  const bladeCyclone=engine.S.bladeAng>stillAngle*1.8;
  engine.input.x=0;

  engine.begin(180, "ring");
  engine.S.W={frost:5}; engine.S.Pa={umhang:3}; engine.S.evo={frost:1};
  engine.S.cool={frost:0};
  const elite=engine.spawnEnemy(0,4,1,25,0);
  engine.spawnEnemy(0,0,0,45,0);
  engine.rebuildGrid(); const before=engine.enemyHp(elite); engine.fireWeapons(.1);
  const eternalWinter=before-engine.enemyHp(elite)>115;

  evolutionCatalog = offerable && arrowRain && stormHeart && bladeCyclone && eternalWinter;
} catch (error) {
  evolutionError = error instanceof Error ? error.message : String(error);
}

// --- P0.5.2: Elite-Kills erzwingen zwei echte Run-Entscheidungen ----------
let eliteChoices = false;
let eliteChoiceError = "";
let eliteChoiceDiagnostics = {};
try {
  engine.begin(180, "ring");
  const elite = engine.spawnEnemy(0, 4, 1, 16, 0);
  engine.rebuildGrid();
  engine.shoot(0, 0, 1, 0, 1000, 1e9, 1, 0, 15);
  engine.updateProjectiles(0.02);
  const rewardQueued = engine.enemyHp(elite) <= 0 && engine.S.pendingEliteRewards === 1;
  const offer = engine.buildEliteOffer();
  const uniqueOffer = offer.length === 3 &&
    new Set(offer.map(o => o.boon?.id)).size === 3 &&
    offer.every(o => o.type === "boon");

  const oldHp = engine.S.maxhp, oldStats=engine.stats(), oldDash=engine.dashCooldown();
  for (const boon of engine.BOONS) engine.applyBoon(boon);
  const st = engine.stats();
  const effectsWork = engine.S.maxhp === oldHp + 25 &&
    Math.abs(st.dmg / oldStats.dmg - 1.18) < 1e-9 &&
    Math.abs(st.speed / oldStats.speed - 1.12) < 1e-9 &&
    Math.abs(st.magnet / oldStats.magnet - 1.25) < 1e-9 &&
    Math.abs(st.armor - oldStats.armor - 0.08) < 1e-9 &&
    Math.abs(engine.dashCooldown() / oldDash - 0.9) < 1e-9;
  const bothTimelineChoices = report.runs.baseline.every(run => run.eliteChoices === 2);
  eliteChoiceDiagnostics = { rewardQueued, uniqueOffer, effectsWork, bothTimelineChoices,
    baselineChoices: report.runs.baseline.map(run => run.eliteChoices) };
  eliteChoices = rewardQueued && uniqueOffer && effectsWork && bothTimelineChoices;
} catch (error) {
  eliteChoiceError = error instanceof Error ? error.message : String(error);
}
// --- D-017: Simulation muss unabhaengig vom Seitenverhaeltnis sein ---------
// Der Shim fuehrt resize() jetzt wirklich aus, statt es wie frueher ueber
// addEventListener = noop zu verschlucken. Alle vier Formate sind Querformat.
// Hochformat ist laut D-017 kein unterstuetzter Kampfmodus und wird deshalb
// bewusst nicht geprueft.
const LANDSCAPE_VIEWPORTS = [
  { label: "1000x700 (Referenz)", w: 1000, h: 700 },
  { label: "1280x720", w: 1280, h: 720 },
  { label: "1536x864", w: 1536, h: 864 },
  { label: "844x390", w: 844, h: 390 },
  { label: "2560x1080 (21:9)", w: 2560, h: 1080 },
];
// Unter diese sichtbare Welthoehe darf kein unterstuetztes Querformat fallen.
const MIN_COMBAT_H = 562;
const canvasElement = globalThis.document.getElementById("c");
let aspectIndependent = false;
let minCombatHeight = false;
let bossInsideCombat = false;
let aspectError = "";
let viewportRows = [];
try {
  const measured = LANDSCAPE_VIEWPORTS.map(({ label, w, h }) => {
    canvasElement.clientWidth = w;
    canvasElement.clientHeight = h;
    engine.resize();
    const view = engine.viewport();
    const run = engine.headlessRun(report.runLen, {
      seed: report.seeds[0], xpC: engine.CFG.XP_C, xpK: engine.CFG.XP_K,
      smart: true, immortal: true,
    });
    return {
      label,
      scale: Number(view.SCALE.toFixed(4)),
      kampfausschnitt: [Math.round(view.VIEW_W), Math.round(view.VIEW_H)],
      safeAreaPx: Math.round(view.CLIP_X),
      dichte: { t30: Math.round(engine.targetEnemies(30)), t480: Math.round(engine.targetEnemies(480)) },
      picks: run.total, kills: run.kills, simSpitze: run.peak, simRadius: run.nearby,
      bossAbstand: Math.round(view.BOSS_ENTRY),
      bossReserve: Number((Math.min(view.VIEW_W, view.VIEW_H) / 2 - view.BOSS_ENTRY).toFixed(2)),
      fingerprint: JSON.stringify(run),
    };
  });
  const referenceFingerprint = measured[0].fingerprint;
  aspectIndependent = measured.every((row) => row.fingerprint === referenceFingerprint);
  minCombatHeight = measured.every((row) => row.kampfausschnitt[1] >= MIN_COMBAT_H);
  bossInsideCombat = measured.every((row) => row.bossReserve >= 0);
  viewportRows = measured.map(({ fingerprint, ...rest }) => rest);
  canvasElement.clientWidth = 1000;
  canvasElement.clientHeight = 700;
  engine.resize();
} catch (error) {
  aspectError = error instanceof Error ? error.message : String(error);
}

// --- Simulations- und Rendertelemetrie muessen getrennt bleiben -----------
// Node rendert nicht. Genau deshalb ist das ein scharfer Test: nach einem
// vollstaendigen Headless-Run muss der Simulationsradius gefuellt und die
// Rendertelemetrie leer sein. Waere beides dieselbe Groesse, faellt das hier auf.
let telemetrySeparated = false;
let telemetryError = "";
try {
  const probe = engine.headlessRun(120, {
    seed: report.seeds[0], xpC: engine.CFG.XP_C, xpK: engine.CFG.XP_K,
    smart: true, immortal: true,
  });
  const laufzeitGetrennt =
    engine.S.nearbyEnemies > 0 &&
    engine.S.peakNearbyEnemies > 0 &&
    engine.S.visibleEnemies === 0 &&
    engine.S.peakVisibleEnemies === 0;
  const berichtOhneRenderwerte =
    typeof probe.nearby === "number" && probe.onScreen === undefined;
  const quelltextGetrennt =
    html.includes("S.nearbyEnemies = nearby") &&
    html.includes("S.visibleEnemies = drawnEnemies") &&
    html.includes("if (drawnEnemies > S.peakVisibleEnemies)") &&
    // Die Spawnentscheidung darf ausschliesslich aus dem Simulationskreis
    // stammen. Seit EH-2026-08-23-02 heisst die Vergleichsgroesse `have`, weil
    // waehrend eines lebenden Wardens nur normale Gegner zaehlen -- beide
    // Quellen bleiben aber Simulationstelemetrie, nie Renderwerte.
    html.includes("Math.ceil((want-have)*0.16)") &&
    html.includes("const have = bossAlive ? nearbyActiveAdds : nearby;") &&
    !/const (want|have)[^\n]*visible/i.test(html) &&
    !html.includes("S.onScreen") &&
    !html.includes("S.peakEnemies");
  telemetrySeparated = laufzeitGetrennt && berichtOhneRenderwerte && quelltextGetrennt;
} catch (error) {
  telemetryError = error instanceof Error ? error.message : String(error);
}

// --- visibleEnemies muss wirklich das Render-Culling zaehlen --------------
// Der Kontextstub des Shims verschluckt alle Zeichenbefehle, die Zaehlschleife
// laeuft aber echt. Damit laesst sich pruefen, dass visibleEnemies tatsaechlich
// aus dem Culling stammt und nicht aus dem Simulationskreis: Ein Gegner weit
// ausserhalb des Kampfausschnitts, aber innerhalb des Simulationsradius, darf
// nur in nearbyEnemies auftauchen.
let visibleCountsCulling = false;
let visibleError = "";
try {
  canvasElement.clientWidth = 1280;
  canvasElement.clientHeight = 720;
  engine.resize();
  const view = engine.viewport();
  engine.begin(180);
  engine.S.x = 0; engine.S.y = 0;
  const innen = engine.spawnEnemy(0, 0, 0, 40, 0);
  // Knapp unterhalb des Kampfausschnitts (halbe Hoehe 281,25 plus 60 Rand),
  // aber gut innerhalb des Simulationskreises (SIM_DIAG*1.15 = 702).
  const aussen = engine.spawnEnemy(0, 0, 0, 0, view.VIEW_H / 2 + 120);
  engine.rebuildGrid();
  engine.render();
  const sichtbarNachRender = engine.S.visibleEnemies;

  // Zweiter Durchlauf auf 21:9, noch VOR dem Tick: dort greift zusaetzlich der
  // Safe-Area-Zweig samt Clipping. Er darf weder werfen noch die Zaehlung
  // veraendern. Nach einem Tick waere der Vergleich wertlos, weil step() bis
  // zur Zieldichte nachspawnt.
  canvasElement.clientWidth = 2560;
  canvasElement.clientHeight = 1080;
  engine.resize();
  const breit = engine.viewport();
  engine.render();
  const safeAreaGezeichnet = breit.CLIP_X > 0.5 && engine.S.visibleEnemies === 1;

  engine.tick(engine.CFG.TICK);
  const nahNachTick = engine.S.nearbyEnemies;

  visibleCountsCulling =
    innen >= 0 && aussen >= 0 &&
    sichtbarNachRender === 1 &&      // nur der Gegner im Kampfausschnitt
    nahNachTick >= 2 &&              // beide liegen im Simulationskreis
    engine.S.peakVisibleEnemies >= 1 &&
    safeAreaGezeichnet;
} catch (error) {
  visibleError = error instanceof Error ? error.message : String(error);
}
canvasElement.clientWidth = 1000;
canvasElement.clientHeight = 700;
engine.resize();

// --- D-024: FPS-Metrik und Haertung des Run-Berichts ----------------------
// worstFps ist das Minimum aus rund 960 Halbsekundenproben. Ein einziger
// Ausreisser durch Garbage Collection setzt ihn dauerhaft. Der Test schreibt
// genau diese Absicht fest: 99 saubere Proben plus ein Ausreisser duerfen das
// 1-%-Low NICHT kippen, waehrend der Minimalwert sehr wohl faellt.
let fpsMetrics = false;
let reportHardened = false;
let fpsError = "";
try {
  engine.begin(180);
  engine.S.result = "Extrahiert";
  engine.S.t = 180;
  engine.S.worstFps = 20;
  engine.S.fpsLog = new Array(99).fill(60).concat([20]);
  const text = engine.runReportText();
  fpsMetrics =
    text.includes("Schlechteste FPS: 20") &&
    text.includes("FPS 1-%-Low: 60") &&
    text.includes("Anteil unter 55 FPS: 1.0 % von 100 Proben");

  // Ohne Proben darf der Bericht nicht brechen, sondern muss Striche zeigen.
  engine.S.fpsLog = [];
  const leer = engine.runReportText();
  const leerOk = leer.includes("FPS 1-%-Low: –") && leer.includes("Anteil unter 55 FPS: –");

  // Haertung: saubere Laeufe melden "unveraendert", getunte nennen den Wert.
  const sauber = engine.runReportText();
  const sauberOk = sauber.includes("Tuning: unverändert") &&
    sauber.includes("Anzeige: ") && sauber.includes("DPR ");
  const vorher = engine.CFG.DMG_GLOBAL;
  let getuntOk = false;
  try {
    engine.CFG.DMG_GLOBAL = vorher + 1;
    const getunt = engine.runReportText();
    getuntOk = getunt.includes("Tuning: DMG_GLOBAL") && !getunt.includes("Tuning: unverändert");
  } finally {
    // Ohne finally bliebe ein Balancewert dauerhaft verstellt, sobald der
    // Bericht wirft. Das ist exakt die Fehlerklasse, die D-018 ausgeloest hat.
    engine.CFG.DMG_GLOBAL = vorher;
  }
  const wiederSauber = engine.runReportText().includes("Tuning: unverändert");

  reportHardened = leerOk && sauberOk && getuntOk && wiederSauber;
} catch (error) {
  fpsError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-01: letzter Run-Bericht bleibt lokal erhalten -----------
let lastRunReportFlow = false;
let lastRunReportError = "";
let lastRunReportDiagnostics = null;
try {
  const key = "emberhold:run-report:v1";
  const btn = elements.get("btnCopyLast");
  localStorage.removeItem(key);
  const leer = engine.loadLastRunReport();
  const anfangLeer = leer === null && btn.hidden === true &&
    btn.getAttribute("aria-hidden") === "true";

  engine.begin(180);
  engine.S.t = 180;
  engine.S.kills = 321;
  engine.S.level = 7;
  engine.S.pickTimes = [30, 70, 120];
  engine.S.worstFps = 58;
  engine.S.fpsLog = [58, 60, 60];
  elements.get("btnLeave")?.onclick?.();
  // Der echte Todespfad kann im selben Step noch eine Kennzahl verändern.
  // Die Mikrotask muss den gespeicherten Text danach auf den Kopierstand heben.
  engine.S.kills++;
  await Promise.resolve();

  const raw = JSON.parse(localStorage.getItem(key) || "null");
  const abschlussframeAktualisiert = raw?.report === engine.runReportText();
  const automatischGespeichert = engine.S.phase === "over" &&
    raw?.version === 1 && Number.isFinite(raw.savedAt) &&
    raw.report === engine.runReportText();
  const stationZeigtAktion = btn.hidden === false &&
    btn.getAttribute("aria-hidden") === "false" &&
    typeof btn.onclick === "function";

  const gemerkterText = raw.report;
  engine.begin(180);
  engine.S.kills = 999;
  const aktuellerRunAnders = engine.runReportText() !== gemerkterText;
  const nachNeuaufbau = engine.loadLastRunReport();
  const ueberlebtNeuenRun = nachNeuaufbau?.report === gemerkterText;

  localStorage.setItem(key, JSON.stringify({version:1,savedAt:1,report:"kein Bericht"}));
  const ungueltig = engine.loadLastRunReport();
  const ungueltigVerworfen = ungueltig === null &&
    localStorage.getItem(key) === null && btn.hidden === true;

  localStorage.setItem(key, JSON.stringify(raw));
  const wiederGeladen = engine.loadLastRunReport();
  const reloadRundlauf = wiederGeladen?.report === gemerkterText && btn.hidden === false;

  lastRunReportFlow = anfangLeer && automatischGespeichert && abschlussframeAktualisiert &&
    stationZeigtAktion && aktuellerRunAnders && ueberlebtNeuenRun &&
    ungueltigVerworfen && reloadRundlauf;
  lastRunReportDiagnostics = { anfangLeer, automatischGespeichert,
    abschlussframeAktualisiert, stationZeigtAktion,
    aktuellerRunAnders, ueberlebtNeuenRun, ungueltigVerworfen, reloadRundlauf,
    zeichen: gemerkterText.length };
} catch (error) {
  lastRunReportError = error instanceof Error ? error.message : String(error);
}

// --- D-032: Gluttropfen -----------------------------------------------------
// Geprueft wird das Verhalten, nicht der Quelltext: heilt statt XP zu geben,
// hat einen kleineren Sog als ein Splitter und kommt nicht von selbst, und die
// Abklingzeit verhindert eine Flut bei hohem Killtempo.
let healOrbFlow = false;
let healOrbError = "";
let healOrbDiagnostics = null;
try {
  const CFG = engine.CFG;

  // 1. Heilt und gibt KEINE Erfahrung.
  engine.begin(480);
  engine.S.x = 0; engine.S.y = 0;
  engine.S.hp = engine.S.maxhp * 0.5;
  const hpVorher = engine.S.hp, xpVorher = engine.S.xpTotal;
  engine.spawnGem(8, 0, 0, 1);
  engine.updateGems(CFG.TICK);
  const geheilt = engine.S.hp - hpVorher;
  const heiltRichtig = Math.abs(geheilt - engine.S.maxhp*CFG.HEAL_ORB_PCT) < 0.5 &&
    engine.S.xpTotal === xpVorher && engine.S.healOrbs === 1;

  // 2. Ein Splitter an derselben Stelle gibt Erfahrung und heilt nicht.
  const hpVorSplitter = engine.S.hp;
  engine.spawnGem(8, 0, 3, 0);
  engine.updateGems(CFG.TICK);
  const splitterRichtig = engine.S.xpTotal > xpVorher && engine.S.hp === hpVorSplitter;

  // 3. Kleinerer Sog: Auf halber Splitterreichweite zieht der Tropfen nicht,
  //    der Splitter schon. Ohne das koennte man Heilung nebenbei einsammeln.
  const mr = CFG.MAGNET_R;
  const abstand = mr * 0.7;                       // ausserhalb mr*0.45, innerhalb mr
  engine.begin(480); engine.S.x = 0; engine.S.y = 0;
  engine.spawnGem(abstand, 0, 0, 1);
  const vorher = engine.gemCount();
  let tropfenWeg = 0;
  for (let k=0;k<40;k++) engine.updateGems(CFG.TICK);
  tropfenWeg = engine.gemCount().tropfen;
  engine.begin(480); engine.S.x = 0; engine.S.y = 0;
  engine.spawnGem(abstand, 0, 3, 0);
  for (let k=0;k<40;k++) engine.updateGems(CFG.TICK);
  const splitterWeg = engine.gemCount().splitter;
  const sogRichtig = vorher.tropfen === 1 && tropfenWeg === 1 && splitterWeg === 0;

  // 4. Abklingzeit: Leiter mit drei Teilpruefungen.
  engine.begin(480);
  engine.S.x = 0; engine.S.y = 0;
  engine.S.t = 100;
  engine.S.lastHealOrb = 100 - CFG.HEAL_ORB_CD;

  // Schritt 1: Erster Kill nach abgelaufener Abklingzeit erzeugt genau einen Tropfen.
  const vorErster = engine.gemCount().tropfen;
  const e1 = engine.spawnEnemy(100, 0, 0, 4000, 0);
  if (e1 >= 0) engine.killEnemy(e1);
  const nachErster = engine.gemCount().tropfen;
  const ersterKillTropft = nachErster === vorErster + 1 &&
    engine.S.lastHealOrb === 100;

  // Schritt 2: 50 weitere Kills innerhalb des Fensters erzeugen keinen neuen Tropfen.
  // Die Kills werden mitgezaehlt: Ohne diese Zahl waere der Check auch dann
  // gruen, wenn gar kein Gegner entstanden waere -- er wuerde still nichts pruefen.
  const vorFenster = engine.gemCount().tropfen;
  let killsImFenster = 0;
  for (let k = 0; k < 50; k++) {
    engine.S.t = 100 + (k / 50) * (CFG.HEAL_ORB_CD * 0.9);
    const e = engine.spawnEnemy(100, 0, 0, 4001 + k, 0);
    if (e >= 0) { engine.killEnemy(e); killsImFenster++; }
  }
  const nachFenster = engine.gemCount().tropfen;
  const fensterHaeltDicht = killsImFenster === 50 && nachFenster === vorFenster;

  // Schritt 3: Nach weiterer Abklingzeit erzeugt der naechste Kill wieder einen Tropfen.
  engine.S.t = 100 + CFG.HEAL_ORB_CD;
  const vorZweiter = engine.gemCount().tropfen;
  const e2 = engine.spawnEnemy(100, 0, 0, 5000, 0);
  if (e2 >= 0) engine.killEnemy(e2);
  const nachZweiter = engine.gemCount().tropfen;
  const zweiterZyklus = nachZweiter === vorZweiter + 1;

  const abklingRichtig = ersterKillTropft && fensterHaeltDicht && zweiterZyklus;

  healOrbFlow = heiltRichtig && splitterRichtig && sogRichtig && abklingRichtig;
  healOrbDiagnostics = { heiltRichtig, splitterRichtig, sogRichtig, abklingRichtig,
    ersterKillTropft, fensterHaeltDicht, zweiterZyklus, killsImFenster,
    geheilt:Number(geheilt.toFixed(1)), erwartet:Number((engine.S.maxhp*CFG.HEAL_ORB_PCT).toFixed(1)) };
} catch (error) {
  healOrbError = error instanceof Error ? error.message : String(error);
}

// --- D-033: sichtbares naechstes Ziel ---------------------------------------
// Der Hold zeigt alles gleichzeitig und gleichgewichtig; der Besitzer wusste
// deshalb nicht, was er tun soll. holdGoal() liefert genau ein Ziel mit
// Fortschritt. Geprueft wird die ganze Leiter, damit kein Zustand ohne Ziel
// dasteht -- ein leeres Banner waere schlimmer als gar keins.
let holdGoalLadder = false;
let holdGoalError = "";
let holdGoalDiagnostics = null;
try {
  const H = engine.H, C = engine.HOLD_CFG;
  const leer = {mineLevel:0,forgeLevel:0,bowUpgrade:0,arcanumLevel:0,yardLevel:0,
                ore:0,bars:0,essence:0,marks:0,preparedRerolls:0,
                masteries:{path:0,reach:0,dash:0}};
  const stufen = [
    // Erwartungen kommen aus der Praesentationsschicht, nicht aus fest
    // eingetippten Namen: Eine spaetere Umbenennung darf diesen Check nicht
    // brechen, solange die Leiter selbst stimmt.
    ["frisch",        {},                                                  engine.LEX.modul.mine],
    ["nach Mine",     {mineLevel:1, ore:6},                                engine.LEX.modul.forge],
    ["nach Schmiede", {mineLevel:1, forgeLevel:1, bars:1},                 engine.LEX.w.bogen],
    ["nach Bogen",    {mineLevel:1, forgeLevel:1, bowUpgrade:1, ore:9},    engine.LEX.modul.arcanum],
    ["nach Arkanum",  {mineLevel:1, forgeLevel:1, bowUpgrade:1, arcanumLevel:1, bars:2}, engine.LEX.modul.yard],
    ["alles gebaut",  {mineLevel:1, forgeLevel:1, bowUpgrade:1, arcanumLevel:1, yardLevel:1,
                       preparedRerolls:C.REROLL_CAP, masteries:{path:2,reach:2,dash:2}}, "Sortie"],
  ];
  const rows = [];
  let alleOk = true;
  for (const [label, patch, erwartet] of stufen){
    Object.assign(H, leer, patch);
    const z = engine.holdGoal();
    const html = engine.goalHTML(z);
    const trifft = z.titel.includes(erwartet);
    // Jedes Ziel braucht einen Titel, eine Begruendung und gueltige Zahlen.
    const vollstaendig = !!z.titel && !!z.warum && z.haben >= 0 && z.brauchen >= 0 &&
      typeof html === "string" && html.includes(z.titel) && html.includes(z.warum);
    // Nur bei echten Kosten darf ein Fortschrittsbalken erscheinen.
    const balkenStimmt = (z.brauchen > 0) === html.includes("goalbar");
    if (!trifft || !vollstaendig || !balkenStimmt) alleOk = false;
    rows.push({stufe:label, ziel:z.titel,
      fortschritt: z.brauchen ? z.haben + "/" + z.brauchen + " " + z.einheit : "ohne Kosten",
      ok: trifft && vollstaendig && balkenStimmt});
  }
  // Fortschritt muss die echten Ressourcen spiegeln, nicht geraten sein.
  Object.assign(H, leer, {mineLevel:1, ore:7});
  const sieben = engine.holdGoal();
  const zahlenStimmen = sieben.haben === 7 && sieben.brauchen === C.FORGE_COST;

  holdGoalLadder = alleOk && zahlenStimmen;
  holdGoalDiagnostics = { stufen: rows, zahlenStimmen };
  Object.assign(H, leer);
} catch (error) {
  holdGoalError = error instanceof Error ? error.message : String(error);
}

// --- D-034: Erzkurve --------------------------------------------------------
// Geprueft wird die Eigenschaft, die der Spieler spuert: Laenger und besser
// spielen muss sich pro Minute lohnen. Die alte log2-Kurve verletzte das --
// das 3-Minuten-Scharmuetzel war 1,9-mal effizienter als der 8-Minuten-Run.
let oreCurve = false;
let oreCurveError = "";
let oreCurveDiagnostics = null;
try {
  const ore = engine.rewardOre;
  // Beobachtete Beutewerte aus echten Feldlaeufen, mit ihrer Laufdauer.
  const laeufe = [
    { label: "3-Min-Scharmuetzel", minuten: 3, beute: 1412 },
    { label: "8 Min typisch",      minuten: 8, beute: 17290 },
    { label: "8 Min gut",          minuten: 8, beute: 28425 },
    { label: "8 Min Ausnahme",     minuten: 8, beute: 137872 },
    // Die Anker werden bewusst MIT ihrer echten Laufdauer abgefragt. Die
    // Abbruchgrenze aus EH-2026-08-23-01 darf keinen von ihnen verschieben --
    // sonst haette die Exploitkorrektur die Wirtschaft angefasst.
  ].map(l => ({ ...l, erz: ore(l.beute, l.minuten*60),
                proMinute: Number((ore(l.beute, l.minuten*60)/l.minuten).toFixed(2)) }));
  const ankerOhneDauer = laeufe.every(l => ore(l.beute) === l.erz);

  // 1. Erz je Minute steigt monoton mit der Laufguete. Das ist der Kern.
  let monotonProMinute = true;
  for (let i = 1; i < laeufe.length; i++)
    if (laeufe[i].proMinute < laeufe[i-1].proMinute) monotonProMinute = false;

  // 2. Der typische Lauf bleibt verankert -- das Wirtschaftstempo darf sich
  //    durch eine Kurvenaenderung nicht verschieben.
  const ankerHaelt = ore(17290) === 14;

  // 3. Mehr Beute darf nie weniger Erz geben.
  let monotonInBeute = true;
  for (let r = 500; r < 200000; r = Math.round(r*1.7))
    if (ore(Math.round(r*1.7)) < ore(r)) monotonInBeute = false;

  // 4. Koennen muss sich lohnen: Der Ausnahmelauf bringt deutlich mehr als der
  //    typische. Unter log2 waren es 1,21x, das war der eigentliche Defekt.
  const spreizung = ore(137872)/ore(17290);
  const koennenZaehlt = spreizung >= 1.8;

  // 5. Regel 1: keine Sitzung geht leer aus.
  const bodenHaelt = ore(0) >= 1 && ore(1) >= 1;

  oreCurve = monotonProMinute && ankerHaelt && monotonInBeute && koennenZaehlt &&
    bodenHaelt && ankerOhneDauer;
  oreCurveDiagnostics = { laeufe, spreizung: Number(spreizung.toFixed(2)),
    monotonProMinute, ankerHaelt, monotonInBeute, koennenZaehlt, bodenHaelt,
    ankerOhneDauer };
} catch (error) {
  oreCurveError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-23-01: Frueh verlorene Runs sind kein Farmweg ---------------
// Der Erzboden galt unabhaengig von der Laufdauer. Ein absichtlich untaetiger
// Spieler starb nach rund 38 bis 46 Sekunden und kassierte die vollen 4 Erz --
// gemessen 5,3 bis 6,3 Erz je Minute gegen 1,75 im typischen 8-Minuten-Lauf.
// Der schlechteste Lauf war der ertragreichste, und der garantierte
// Ausruestungsfund kam obendrauf.
//
// Geprueft wird deshalb der ECHTE Weg: Der Lauf stirbt im Simulator, laeuft
// dabei durch damagePlayer() -> endRun(false) und wird anschliessend ueber
// depositRunReward() ausgezahlt. Eine isolierte Kurvenabfrage wuerde genau das
// verfehlen, was hier schiefging.
let earlyLossGuard = false;
let earlyLossError = "";
let earlyLossDiagnostics = null;
try {
  // Alle Erwartungen aus der Laufzeit ableiten, nicht hart verdrahten.
  const ankerRate = engine.ORE.ORE_RATE_REF;        // 1,75 Erz je Minute
  const grenze = engine.ORE.RUN_MIN_S;              // kuerzeste angebotene Sortie
  const ringMul = engine.contractById("ring").reward;
  const holdVorher = JSON.parse(JSON.stringify(engine.H));

  // 1. Der absichtlich untaetige Lauf, ueber alle neun Seeds.
  const abbrueche = report.seeds.map((seed) => {
    engine.headlessRun(120, {
      seed, smart: true, immortal: false, stationary: true, noPicks: true,
    });
    const S = engine.S;
    const teileVorher = Object.keys(engine.H.gearOwned).length;
    const staubVorher = engine.H.dust;
    const erz = engine.depositRunReward();
    const nochmal = engine.depositRunReward();
    return {
      seed, sekunden: Number(S.t.toFixed(2)), ergebnis: S.result, phase: S.phase,
      basisBeute: S.baseReward, erz, zweiteZahlung: nochmal,
      proMinute: Number((erz / (S.t / 60)).toFixed(2)),
      fund: S.lootGear, neueTeile: Object.keys(engine.H.gearOwned).length - teileVorher,
      neuerStaub: engine.H.dust - staubVorher,
      kills: S.kills, gemsTaken: S.gemsTaken,
      // Regel 1 wortwoertlich: Der Tod zieht von der Basis-Beute nichts ab, es
      // wurde ueberhaupt etwas verbucht, und mehr als die tatsaechlich
      // erspielte Beute kann nie gebucht sein. Bewusst KEINE Gleichheit mit der
      // Endsumme: Ein Spieler sammelt im Todesframe teils noch Splitter ein,
      // die endRun() nicht mehr sieht. Das ist ein alter, hier nicht
      // beauftragter Nebeneffekt und gehoert nicht in diesen Check.
      basisStimmt: S.baseReward > 0 && S.reward === S.baseReward &&
        S.baseReward <= Math.round(S.kills * 1.0 + S.gemsTaken * 0.6) &&
        erz === engine.rewardOre(S.reward, engine.runSeconds()),
    };
  });
  // Der Lauf muss wirklich ueber das Run-Ende gegangen sein, sonst prueft der
  // Check eine Attrappe.
  const echterRunPfad = abbrueche.every((a) => a.phase === "over" &&
    a.ergebnis === "Gefallen" && a.sekunden > 0 && a.sekunden < 120);
  // Kern des Auftrags: nie ertragreicher je Minute als der typische Lauf.
  const rateHaelt = abbrueche.every((a) => a.proMinute <= ankerRate);
  // Regel 1 bleibt: Ein echter Versuch geht nie leer aus.
  const regelEinsHaelt = abbrueche.every((a) => a.erz >= 1);
  // Regel 1 zweite Haelfte: Die erspielte Basis-Beute wird nicht geloescht.
  const basisBleibt = abbrueche.every((a) => a.basisBeute > 0 && a.basisStimmt);
  // Kein garantierter Ausruestungsfund beim Fruehverlust.
  const keinFruehfund = abbrueche.every((a) => a.fund === null &&
    a.neueTeile === 0 && a.neuerStaub === 0);
  // Genau einmal ausgezahlt.
  const einmalGezahlt = abbrueche.every((a) => a.zweiteZahlung === 0);

  // 2. Die normalen Auszahlungen duerfen sich NICHT veraendert haben.
  Object.assign(engine.H, JSON.parse(JSON.stringify(holdVorher)));
  const normal = (laenge, sekunden, beute) => {
    engine.begin(laenge, "ring");
    engine.S.t = sekunden; engine.S.reward = beute; engine.S.baseReward = beute;
    engine.S.rewardGranted = false;
    const erz = engine.depositRunReward();
    return { laenge, sekunden, beute, erz, kurve: engine.rewardOre(beute),
             fund: engine.S.lootGear ? "Teil" : "kein" };
  };
  const normale = [
    normal(grenze, grenze, 1412),   // Scharmuetzel, sauber zu Ende
    normal(480, 480, 17290),        // typische Sortie
    normal(480, 480, 28425),        // gute Sortie
    normal(480, 480, 137872),       // Ausnahmelauf
    normal(480, 480, 1412),         // spaeter Tod mit magerer Beute: volle Kurve
    normal(480, grenze, 1412),      // Tod exakt auf der Grenze: noch voller Wert
  ];
  const normalUnveraendert = normale.every((n) =>
    n.erz === Math.max(n.kurve, Math.round(n.kurve * ringMul)) && n.fund === "Teil");
  Object.assign(engine.H, JSON.parse(JSON.stringify(holdVorher)));
  engine.saveHold();

  earlyLossGuard = echterRunPfad && rateHaelt && regelEinsHaelt && basisBleibt &&
    keinFruehfund && einmalGezahlt && normalUnveraendert;
  earlyLossDiagnostics = { ankerRate, echterRunPfad, rateHaelt, regelEinsHaelt,
    basisBleibt, keinFruehfund, einmalGezahlt, normalUnveraendert,
    schlechtesteRate: Math.max(...abbrueche.map((a) => a.proMinute)),
    abbrueche: abbrueche.map(({ seed, sekunden, basisBeute, erz, proMinute, fund, basisStimmt, kills, gemsTaken }) =>
      ({ seed, sekunden, basisBeute, erz, proMinute, fund: fund ? "Teil" : "kein", basisStimmt, kills, gemsTaken })),
    normale };
} catch (error) {
  earlyLossError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-03 / D-041: Bossarenen mit Ziel 50/30 und Rueckzug -------
// AEGIS ist eine lesbare Arena (Ziel 50 statt 90), NEXUS das Finale (Ziel 30).
// Ueberschuss zieht sich innerhalb von acht Sekunden sichtbar und ohne jede
// Belohnung zurueck. Geprueft wird der echte Spawnpfad in step() plus der
// echte Bewegungs-/Freigabepfad in updateEnemies(), nicht die Konstante.
let bossCombatPocket = false;
let bossPocketError = "";
let bossPocketDiagnostics = null;
try {
  const ZIEL_AEGIS = engine.BOSS.BOSS_ADD_TARGET;
  const ZIEL_NEXUS = engine.BOSS.NEXUS_ADD_TARGET;
  const RETREAT_S = engine.BOSS.ENEMY_RETREAT_S;
  const TICK = engine.CFG.TICK;
  // Waffen aus: kein Schaden, keine Kills, keine Splitter. Was uebrig bleibt,
  // ist reine Spawn- und Rueckzugsmechanik. Die Drehbuch-Ereignisse werden
  // stillgelegt, sonst setzt der planmaessige Mittelboss bei 4:10 einen
  // ZWEITEN Boss und ueberschreibt bossIndex -- der Test wuerde dann etwas
  // anderes messen als er behauptet.
  const stillLegen = () => {
    engine.S.W = {}; engine.S.hp = engine.S.maxhp = 1e9;
    engine.S.events.boss = true;
    engine.S.events.elite = engine.CFG.ELITE_AT.length;
  };
  const laufen = (n) => { for (let i=0;i<n;i++) engine.tick(TICK); };

  // A) Ohne Boss waechst die Menge zur normalen Zieldichte.
  engine.begin(480); engine.S.x = 0; engine.S.y = 0; engine.S.t = 240; stillLegen();
  laufen(900);
  const ohneBoss = engine.enemyCounts();
  const zielOhneBoss = Math.round(engine.targetEnemies(engine.S.t));

  // B) Mit lebendem AEGIS bleibt das Nachspawnziel bei hoechstens 50.
  //    Eliten stehen bewusst mit im Feld: Sie duerfen das Budget fuer normale
  //    Gegner nicht aufbrauchen und nicht entfernt werden.
  engine.begin(480); engine.S.x = 0; engine.S.y = 0; engine.S.t = 240; stillLegen();
  const bossB = engine.spawnEnemy(240, 4, 2, 260, 0);
  engine.S.bossIndex = bossB; engine.S.bossId = "aegis";
  for (let k=0;k<5;k++) engine.spawnEnemy(240, 1, 1, 300+k*20, 40);
  laufen(900);
  const mitAegis = engine.enemyCounts();

  // C) Der belohnungsfreie Rueckzug: Vor dem Boss wird der Pulk kuenstlich
  //    ueberfuellt, dann tritt die Arena in Kraft. Innerhalb des Rueckzugs-
  //    budgets verschwindet der Ueberschuss -- ohne Kill, ohne Beute. Eliten
  //    bleiben unberuehrt.
  engine.begin(480); engine.S.x = 0; engine.S.y = 0; engine.S.t = 240; stillLegen();
  for (let k=0;k<220;k++){
    const a=(k/220)*Math.PI*2, r=120+(k%7)*70;
    engine.spawnEnemy(240, k%5, 0, Math.cos(a)*r, Math.sin(a)*r);
  }
  for (let k=0;k<5;k++) engine.spawnEnemy(240, 1, 1, 300+k*20, 40);
  engine.rebuildGrid();
  const vorArena = engine.enemyCounts();
  const killsVor = engine.S.kills, gemsVor = engine.gemCount();
  const xpVor = engine.S.xpTotal;
  const bossC = engine.spawnEnemy(240, 4, 2, 400, 0);
  engine.S.bossIndex = bossC; engine.S.bossId = "aegis";
  laufen(2);
  const rueckzugFrueh = engine.enemyCounts();
  const erwarteterUeberschuss = vorArena.normal - ZIEL_AEGIS;
  const rueckzugNurUeberschuss = rueckzugFrueh.retreating === erwarteterUeberschuss &&
    rueckzugFrueh.normal - rueckzugFrueh.retreating === ZIEL_AEGIS;
  laufen(58);                                                  // zusammen 1 Sekunde
  const rueckzugSichtbar = engine.enemyCounts().retreating > 0;
  const budgetTicks = Math.ceil((RETREAT_S + 1.5) / TICK);
  laufen(budgetTicks - 60);
  const nachRueckzug = engine.enemyCounts();
  const rueckzugAbgeschlossen = nachRueckzug.retreating === 0 &&
    nachRueckzug.normal <= vorArena.normal - (vorArena.normal - ZIEL_AEGIS) * 0.8;
  // Sofort einfrieren: Die folgenden Szenarien veraendern Kills/Beute legal.
  const cKills = engine.S.kills;
  const cGems = engine.gemCount();
  const cXp = engine.S.xpTotal;
  const keineKunstKills = cKills === killsVor;
  const keineBeute = cGems.splitter === gemsVor.splitter &&
    cGems.tropfen === gemsVor.tropfen && cXp === xpVor;
  const elitenBleiben = nachRueckzug.elite === vorArena.elite && vorArena.elite === 5;

  // C2) Ein Projektil darf an einem Rueckzuegler weder verbraucht werden noch
  // Schaden buchen. 51 Normale erzeugen exakt einen Rueckzugsslot.
  engine.begin(480); engine.S.x = 0; engine.S.y = 0; engine.S.t = 240; stillLegen();
  const retreatTarget = engine.spawnEnemy(240, 0, 0, 200, 0);
  for(let k=0;k<50;k++){
    const a=k/50*Math.PI*2;
    engine.spawnEnemy(240, k%5, 0, Math.cos(a)*400, Math.sin(a)*400);
  }
  const retreatBoss = engine.spawnEnemy(240, 4, 2, -300, 0);
  engine.S.bossIndex=retreatBoss; engine.S.bossId="aegis";
  laufen(1);
  const retreatHp=engine.enemyHp(retreatTarget);
  engine.shoot(200,0,0,0,0,10,1,0,5,engine.W_IDX.bogen);
  engine.updateProjectiles(0.01);
  const rueckzugVerbrauchtKeinProjektil = engine.enemyCounts().retreating === 1 &&
    engine.counts().p === 1 && engine.enemyHp(retreatTarget) === retreatHp;

  // D) Mit lebendem NEXUS gilt das engere Finale-Ziel von 30.
  engine.begin(480); engine.S.x = 0; engine.S.y = 0; engine.S.t = 300; stillLegen();
  const bossD = engine.spawnEnemy(300, 4, 2, 260, 0, "nexus");
  engine.S.bossIndex = bossD; engine.S.bossId = "nexus";
  laufen(900);
  const mitNexus = engine.enemyCounts();

  // E) Nach dem Boss-Tod baut sich die Dichte wieder sanft auf.
  engine.begin(480); engine.S.x = 0; engine.S.y = 0; engine.S.t = 240; stillLegen();
  const bossE = engine.spawnEnemy(240, 4, 2, 260, 0);
  engine.S.bossIndex = bossE; engine.S.bossId = "aegis";
  laufen(600);
  const waehrend = engine.enemyCounts().normal;
  engine.killEnemy(bossE);
  const bossWeg = !engine.bossIsAlive();
  laufen(900);
  const danach = engine.enemyCounts().normal;

  const aegisGedeckelt = mitAegis.normal <= ZIEL_AEGIS;
  const nexusGedeckelt = mitNexus.normal <= ZIEL_NEXUS;
  // Boss und Eliten leben weiter UND haben das Budget nicht verbraucht: Die
  // normalen Gegner erreichen trotzdem das volle Arena-Ziel von 50.
  const bossZaehltNichtMit = mitAegis.boss === 1 && mitAegis.elite === 5 &&
    mitAegis.normal >= ZIEL_AEGIS - 2;
  const normalHoeherOhneBoss = ohneBoss.normal > ZIEL_AEGIS;
  const baustWiederAuf = danach > waehrend;

  bossCombatPocket = aegisGedeckelt && nexusGedeckelt && bossZaehltNichtMit &&
    normalHoeherOhneBoss && rueckzugSichtbar && rueckzugNurUeberschuss &&
    rueckzugAbgeschlossen && rueckzugVerbrauchtKeinProjektil && keineKunstKills &&
    keineBeute && elitenBleiben && bossWeg && baustWiederAuf;
  bossPocketDiagnostics = { zielAegis: ZIEL_AEGIS, zielNexus: ZIEL_NEXUS,
    zielOhneBoss,
    ohneBossNormal: ohneBoss.normal, mitAegisNormal: mitAegis.normal,
    mitNexusNormal: mitNexus.normal,
    vorArenaNormal: vorArena.normal, rueckzugSichtbar,
    retreatingFrueh: rueckzugFrueh.retreating, erwarteterUeberschuss,
    rueckzugNurUeberschuss, rueckzugVerbrauchtKeinProjektil,
    nachRueckzugNormal: nachRueckzug.normal, retreatingNach: nachRueckzug.retreating,
    rueckzugBudgetSekunden: RETREAT_S,
    killsVor, killsNach: cKills,
    splitterVor: gemsVor.splitter, splitterNach: cGems.splitter,
    tropfenVor: gemsVor.tropfen, tropfenNach: cGems.tropfen,
    xpVor, xpNach: cXp,
    eliteVor: vorArena.elite, eliteNach: nachRueckzug.elite,
    waehrend, danach,
    aegisGedeckelt, nexusGedeckelt, bossZaehltNichtMit, normalHoeherOhneBoss,
    rueckzugAbgeschlossen, keineKunstKills, keineBeute, elitenBleiben,
    bossWeg, baustWiederAuf };
} catch (error) {
  bossPocketError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-03 / D-041: Das verpflichtende NEXUS-Finale --------------
// Der Acht-Minuten-Modus ist erst mit dem echten Tod von NEXUS gemeistert:
// Warnung ab 7:45, Spawn bei 8:00 im sichtbaren Ausschnitt, Extraktionssperre
// solange er lebt, Overtime-Multiplikator aus, Tod bleibt "Gefallen". Der
// Drei-Minuten-Modus behaelt sein bisheriges Ende. Alle Szenarien laufen
// seed-fest ueber newRun(), damit der Vertrag reproduzierbar ist.
let finalBossFlow = false;
let finalBossError = "";
let finalBossDiagnostics = null;
try {
  const TICK = engine.CFG.TICK;
  const stillLegen = () => {
    engine.S.W = {}; engine.S.hp = engine.S.maxhp = 1e9;
    engine.S.events.boss = true;
    engine.S.events.elite = engine.CFG.ELITE_AT.length;
  };
  const laufen = (sek) => { for (let i=0,n=Math.round(sek/TICK);i<n;i++) engine.tick(TICK); };
  const startRun = (len) => {
    engine.newRun(len, 20260825, "ring");
    engine.S.running = true; engine.S.phase = "run";
  };

  // 1) Drei-Minuten-Modus: kein Finale, Ende unveraendert bei 3:00.
  startRun(180); stillLegen();
  laufen(179);
  const kurzKeinNexusVorEnde = engine.S.nexusState === 0 && !engine.S.nexusWarned;
  laufen(2);
  const kurzEndeExtraktion = engine.S.phase === "extract" && engine.S.nexusState === 0;

  // 2) Acht Minuten: Warnung ab 7:45, Spawn bei 8:00, Sperre solange er lebt.
  startRun(480); stillLegen();
  laufen(engine.BOSS.FINAL_WARN_AT - 1);
  const warnNochNicht = !engine.S.nexusWarned && engine.S.nexusState === 0;
  laufen(1.5);
  const warnErteilt = engine.S.nexusWarned === true && engine.S.nexusState === 0;
  laufen(480 - engine.BOSS.FINAL_WARN_AT);
  const spawnBeiAcht = engine.S.nexusState === 1 && engine.bossIsAlive() &&
    engine.S.phase === "run" && engine.S.pendingExtract === false;
  const nexusIdx = engine.S.bossIndex;
  const nexusHp = engine.enemyMax(nexusIdx);
  laufen(1.2); // beide NEXUS-Muster haben jetzt eine aktive Vorwarnung/Salve
  const finaleGefahrVorKill = engine.hazards() + engine.enemyProjectileCount() > 0;
  const sperreHaelt = engine.S.phase === "run" && engine.S.nexusState === 1;
  const keineOvertimeImFinale = engine.S.otActive === false && engine.S.ot === 0;
  const spawnZeit = engine.S.nexusSpawnT;

  // 3) Dynamische Bossbezeichnung und Finaldauer-Uhr.
  engine.updateHUD();
  const titelNexus = globalThis.document.getElementById("bosstitle").textContent === "BOSS: NEXUS";
  const uhrFinal = globalThis.document.getElementById("clock").textContent.startsWith("FINALE +");

  // 4) Erst der echte Tod oeffnet die Extraktion; danach ist sie da.
  engine.killEnemy(nexusIdx);
  laufen(0.05);
  const extraktionNachKill = engine.S.phase === "extract" && engine.S.nexusState === 2 &&
    engine.S.nexusSpawnT >= 0 && engine.S.nexusKillT >= 0;
  const killZeit = engine.S.nexusKillT;
  const finalDauerPositiv = killZeit > spawnZeit;
  const gefahrenNachKill = engine.hazards() + engine.enemyProjectileCount();
  const gesamtzeitMitFinale = Math.abs(engine.runSeconds() - engine.S.t) < TICK &&
    engine.runSeconds() > engine.S.runLen;
  const berichtNachFinale = engine.runReportText();
  const berichtZeigtFinale = berichtNachFinale.includes("NEXUS besiegt") &&
    berichtNachFinale.includes("Finaldauer");
  const berichtZeigtGesamtdauer = /Zeit: 8:0[1-9]/.test(berichtNachFinale);
  engine.startOvertime();
  laufen(2);
  const overtimeBewahrtFinale = Math.abs(engine.runSeconds() - engine.S.t) < TICK &&
    engine.runSeconds() > engine.S.runLen + engine.S.ot + 1;
  engine.endRun(true);
  const ergebnisExtrahiert = engine.S.result === "Extrahiert";

  // 5) Spielertod IM Finale bleibt eine Niederlage -- auch mit lebendem NEXUS.
  //    Der Treffer geht denselben Weg wie im Spiel: Kontakt einer Elite ueber
  //    den regulären Gegnerpfad -> damagePlayer() -> endRun(false). Eine
  //    Elite bewusst deshalb, weil normale Gegner in der Arena laufend in
  //    den belohnungsfreien Rueckzug gezwungen werden und dort keinen
  //    Kontaktschaden mehr tragen -- genau das soll der Auftrag so.
  startRun(480); stillLegen();
  laufen(481);
  const finaleLebt = engine.S.nexusState === 1;
  engine.spawnEnemy(481, 1, 1, 1, 0);
  engine.rebuildGrid();
  engine.S.hp = 1; engine.S.iframe = 0; engine.S.dashIf = 0;
  laufen(0.02);
  const todImFinale = engine.S.result === "Gefallen" && engine.S.phase === "over";

  finalBossFlow = kurzKeinNexusVorEnde && kurzEndeExtraktion && warnNochNicht &&
    warnErteilt && spawnBeiAcht && sperreHaelt && keineOvertimeImFinale &&
    titelNexus && uhrFinal && finaleGefahrVorKill && extraktionNachKill &&
    finalDauerPositiv && gefahrenNachKill === 0 && gesamtzeitMitFinale &&
    berichtZeigtFinale && berichtZeigtGesamtdauer && overtimeBewahrtFinale &&
    ergebnisExtrahiert && finaleLebt && todImFinale && nexusHp >= 9000;
  finalBossDiagnostics = { kurzKeinNexusVorEnde, kurzEndeExtraktion, warnNochNicht,
    warnErteilt, spawnBeiAcht, sperreHaelt, keineOvertimeImFinale,
    titelNexus, uhrFinal, nexusHp, finaleGefahrVorKill, extraktionNachKill,
    finalDauerPositiv, gefahrenNachKill, gesamtzeitMitFinale,
    berichtZeigtFinale, berichtZeigtGesamtdauer, overtimeBewahrtFinale,
    ergebnisExtrahiert, finaleLebt, todImFinale,
    spawnT: spawnZeit, killT: killZeit };
} catch (error) {
  finalBossError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-03 / D-041: NEXUS-Haltbarkeit, deterministisch gemessen --
// Der Zielkorridor fuer einen Build mit ein bis zwei Evolutionen liegt bei
// ungefaehr 30–75 Sekunden. Gemessen wird am echten Kampf: fester Seed,
// eingefrorenes Build (keine Stufen, keine Karten), unsterblicher Spieler,
// echte Waffen-, Boss-KI- und Todespfade. Ein schwacher Build belegt, dass
// NEXUS kein Strohmann ist.
let nexusBenchmark = false;
let nexusBenchError = "";
let nexusBenchDiagnostics = null;
try {
  const TICK = engine.CFG.TICK;
  const kamp = (build) => {
    engine.newRun(480, 20260825, "ring");
    const S = engine.S;
    S.running = true; S.phase = "run";
    S.W = Object.assign({}, build.W);
    S.Pa = Object.assign({}, build.Pa);
    S.evo = {}; for (const id of (build.evo||[])) S.evo[id] = 1;
    S.cool = { bogen:0, splitter:0, kugel:0, blitz:0, klinge:0, frost:0 };
    S.hp = S.maxhp = 1e9;
    let spawnT = -1;
    for (let i=0, n=Math.ceil((480+300)/TICK); i<n; i++){
      if (spawnT < 0 && S.nexusState === 1) spawnT = S.t;
      if (S.nexusState === 2) break;
      S.need = Infinity;          // Build einfrieren: keine Stufen, keine Karten
      S.hp = 1e9;                 // unsterblich: nur Bosshaltbarkeit messen
      engine.tick(TICK);
    }
    return { dauer: S.nexusKillT > 0 ? S.nexusKillT - spawnT : -1,
             besiegt: S.nexusState === 2 };
  };
  const schwach = { W:{ bogen:2 }, Pa:{} };
  const reprae = { W:{ bogen:5, splitter:4, kugel:2 },
                   Pa:{ sehne:3, koecher:3, federung:1 }, evo:["bogen"] };

  const rSchwach = kamp(schwach);
  const rReprae = kamp(reprae);
  const rReprae2 = kamp(reprae);
  const deterministisch = rReprae.dauer === rReprae2.dauer;
  const korridor = rReprae.besiegt && rReprae.dauer >= 30 && rReprae.dauer <= 75;
  // Ordnung: der repraesentative Build besiegt NEXUS im Fenster, der schwache
  // Build schafft es innerhalb von 300 Sekunden nicht.
  const ordnung = rReprae.besiegt && !rSchwach.besiegt;

  nexusBenchmark = deterministisch && korridor && ordnung;
  nexusBenchDiagnostics = { schwachDauer: +rSchwach.dauer.toFixed(1),
    schwachBesiegt: rSchwach.besiegt,
    repraesentativDauer: +rReprae.dauer.toFixed(1),
    wiederholungDauer: +rReprae2.dauer.toFixed(1),
    deterministisch, korridor, ordnung };
} catch (error) {
  nexusBenchError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-23-02: Warden-Ortung ---------------------------------------
// Der Besitzer verlor den Warden im Pulk. Geprueft wird der Zustand, nicht das
// Zeichnen: Der Shim rendert nicht, aber bossLocator() ist reine Geometrie.
let bossLocatorState = false;
let bossLocatorError = "";
let bossLocatorDiagnostics = null;
try {
  engine.begin(480);
  engine.S.x = 0; engine.S.y = 0;
  const ohneBoss = engine.bossLocator();
  const boss = engine.spawnEnemy(240, 4, 2, 0, 0);   // Warden fest im Ursprung
  engine.S.bossIndex = boss;
  const view = engine.viewport();
  const fern = 4000;
  // Nicht der Boss wandert, sondern der Spieler -- so bleibt der Warden ein
  // echter, lebender Gegner und es wird nichts direkt in die Arrays geschrieben.
  const ausRichtung = (px,py) => { engine.S.x = px; engine.S.y = py; return engine.bossLocator(); };
  const rechts = ausRichtung(-fern, 0);
  const links  = ausRichtung( fern, 0);
  const unten  = ausRichtung(0, -fern);
  const oben   = ausRichtung(0,  fern);
  const drin   = ausRichtung(0, 0);
  const randfaelle = [rechts, links, unten, oben];
  const richtungenStimmen = rechts.richtung === "rechts" && links.richtung === "links" &&
    unten.richtung === "unten" && oben.richtung === "oben";
  const alleRandpfeile = randfaelle.every(l => l.modus === "pfeil");
  const chevronInnen = drin.modus === "chevron" && drin.x === 0 && drin.y === 0;
  // Der Warden tritt auf 16:9 mit nur 1,25 Welteinheiten Reserve ein. Sobald
  // sein Zentrum als sichtbar gilt, darf der Chevron am oberen Rand nicht
  // abgeschnitten sein oder unterhalb des Bosses landen.
  engine.S.x = 0; engine.S.y = view.VIEW_H/2 - engine.BOSS.BOSS_MARK_PAD;
  const obenDrin = engine.bossLocator();
  const obereKante = engine.S.y - view.VIEW_H/2;
  const chevronObenSichtbar = obenDrin.modus === "chevron" &&
    obenDrin.markY < 0 &&
    obenDrin.markY - engine.BOSS.BOSS_CHEV_HALF >= obereKante - 1e-6;
  // Der Randpfeil muss im Kampfausschnitt bleiben, sonst laege er auf breiten
  // Formaten in der Safe-Area.
  const imAusschnitt = randfaelle.every(l => {
    engine.S.x = l === rechts ? -fern : l === links ? fern : 0;
    engine.S.y = l === unten ? -fern : l === oben ? fern : 0;
    return Math.abs(l.x - engine.S.x) <= view.VIEW_W/2 + 1e-6 &&
           Math.abs(l.y - engine.S.y) <= view.VIEW_H/2 + 1e-6;
  });
  engine.S.x = 0; engine.S.y = 0;
  engine.killEnemy(boss);
  const nachTod = engine.bossLocator();

  bossLocatorState = ohneBoss === null && richtungenStimmen && alleRandpfeile &&
    chevronInnen && chevronObenSichtbar && imAusschnitt && nachTod === null;
  bossLocatorDiagnostics = { ohneBoss, nachTod,
    richtungen: randfaelle.map(l => l.richtung + ":" + l.modus),
    chevron: drin.modus, richtungenStimmen, alleRandpfeile, chevronInnen,
    chevronObenSichtbar, imAusschnitt };
} catch (error) {
  bossLocatorError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-23-02: Das Kampfbild traegt nur noch Entscheidungen ---------
// Der Feldbuild erzeugte bis zu 19 linke Flaechen. Geprueft wird mit genau
// diesem Build: fuenf Waffen, zwei Passive, ein Fokuspfad -- und dass die
// ausgeblendeten Meta-Boni in der Pause vollstaendig ankommen.
let compactCombatHud = false;
let compactHudError = "";
let compactHudDiagnostics = null;
try {
  engine.begin(480, "ring");
  const S = engine.S;
  // D-035-Feldbuild, wortgetreu aus dem Run-Bericht vom 23.08.2026.
  S.W = { bogen:5, splitter:1, kugel:1, blitz:2, klinge:2 };
  S.Pa = { sehne:3, koecher:2 };
  S.evo = {};
  // Meta-Boni, die frueher dauerhaft links standen.
  S.holdDmg = 1.1;
  S.holdUtility = { path:2, reach:2, dash:2 };
  S.gearEquipped = { weapon:"kraehenbogen", charm:"sammlersiegel", mantle:null };
  S.gearRanks = { kraehenbogen:2, sammlersiegel:2 };
  S.boons = { fury:1, stride:0, harvest:0, guard:1 };

  const kampf = engine.combatSlots();
  const meta = engine.metaBoni();
  const lead = engine.leadingEvoPath();
  const pfade = engine.evoPaths();

  engine.renderSlots();
  const slotsHTML = elements.get("slots").innerHTML;
  const zaehle = (s, muster) => (s.match(muster) || []).length;
  const slotFlaechen = zaehle(slotsHTML, /class="slot/g);
  const pfadFlaechen = zaehle(slotsHTML, /class="evopath/g);
  const kampfEintraege = slotFlaechen + pfadFlaechen;

  engine.renderPauseDetail();
  const pauseHTML = elements.get("pausedetail").innerHTML;

  const hoechstensAcht = kampfEintraege <= 8;
  const genauEinPfad = pfadFlaechen === 1 && !!lead;
  // Der Fokus ist der am weitesten fortgeschrittene Pfad: Langbogen 5 + Sehne 3.
  const fuehrenderPfad = lead.w.id === "bogen" && lead.wl === 5 && lead.pl === 3 && lead.ready;
  const mehrPfadeVorhanden = pfade.length > 1;   // sonst pruefte die Auswahl nichts
  // Kein Meta-Bonus steht mehr im Kampfbild ...
  const metaRaus = meta.length > 0 && meta.every(p => !slotsHTML.includes(">"+p.n+"<"));
  // ... aber jeder einzelne ist in der Pause vorhanden.
  const metaInPause = meta.every(p => pauseHTML.includes(">"+p.n+"<"));
  const pauseAbschnitte = pauseHTML.includes("Run-Boni") && pauseHTML.includes("Build") &&
    pauseHTML.includes("Evolutionspfade");
  // Die Pause zeigt ausserdem den vollstaendigen Build und ALLE Pfade.
  const buildInPause = kampf.every(p => pauseHTML.includes(">"+p.n+"<"));
  const allePfadeInPause = zaehle(pauseHTML, /class="evopath/g) === pfade.length;

  compactCombatHud = hoechstensAcht && genauEinPfad && fuehrenderPfad && mehrPfadeVorhanden &&
    metaRaus && metaInPause && pauseAbschnitte && buildInPause && allePfadeInPause;
  compactHudDiagnostics = { kampfEintraege, slotFlaechen, pfadFlaechen,
    metaAnzahl: meta.length, pfadeGesamt: pfade.length,
    fokus: lead ? lead.w.evo.name : null,
    hoechstensAcht, genauEinPfad, fuehrenderPfad, mehrPfadeVorhanden,
    metaRaus, metaInPause, pauseAbschnitte, buildInPause, allePfadeInPause };
} catch (error) {
  compactHudError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-23-02: Ein erfuellter Pfad ist abgeschlossen ---------------
// Langbogen 5 plus Sehne 3 lagen im Feldlauf vor, Windriss kam trotzdem nie:
// buildOffer() verlangte danach noch einen zusaetzlichen Zufallszug (D-035).
let evolutionCompletion = false;
let evolutionCompletionError = "";
let evolutionCompletionDiagnostics = null;
try {
  const bogen = engine.WEAPONS.find(w => w.id === "bogen");
  const klinge = engine.WEAPONS.find(w => w.id === "klinge");
  const sehne = engine.PASSIVES.find(p => p.id === "sehne");
  const federung = engine.PASSIVES.find(p => p.id === "federung");
  const fokusAb = engine.BOSS.EVO_FOCUS_AT;

  // 1. Der Fokus greift ab 4:00 und verfolgt den fuehrenden Pfad, nicht die
  //    erste Waffe im Katalog. Langbogen steht im Katalog vorn, liegt hier
  //    aber deutlich zurueck.
  engine.begin(480, "ring");
  engine.S.W = { bogen:1, klinge:4 };
  engine.S.Pa = { federung:2 };
  engine.S.evo = {};
  const fuehrend = engine.leadingEvoPath();
  const fokusTrifftFuehrenden = fuehrend.w.id === "klinge";
  engine.S.t = fokusAb;
  let fokusKarteGesehen = false;
  for (let k=0;k<40;k++){
    const angebot = engine.buildOffer();
    if (angebot.some(o => (o.type === "w" && o.w.id === "klinge") ||
                          (o.type === "p" && o.p.id === "federung"))) fokusKarteGesehen = true;
  }
  engine.S.t = fokusAb - 1;
  let vorFokusImmerDrin = true;
  for (let k=0;k<40;k++){
    const angebot = engine.buildOffer();
    if (!angebot.some(o => (o.type === "w" && o.w.id === "klinge") ||
                           (o.type === "p" && o.p.id === "federung"))) vorFokusImmerDrin = false;
  }
  const fokusIstNichtErzwungenVorher = !vorFokusImmerDrin;

  // 2. Letzte WAFFENstufe schliesst den Pfad sofort ab.
  engine.begin(480, "ring");
  engine.S.W = { bogen:4 }; engine.S.Pa = { sehne:3 }; engine.S.evo = {};
  engine.S.evoTimes.length = 0; engine.S.t = 300;
  engine.applyOffer({ type:"w", w:bogen });
  const sofortDurchWaffe = engine.S.evo.bogen === 1 && engine.S.evoTimes.length === 1;

  // 3. Letzte PASSIVstufe schliesst den Pfad ebenso sofort ab.
  engine.begin(480, "ring");
  engine.S.W = { bogen:5 }; engine.S.Pa = { sehne:2 }; engine.S.evo = {};
  engine.S.evoTimes.length = 0; engine.S.t = 300;
  engine.applyOffer({ type:"p", p:sehne });
  const sofortDurchPassiv = engine.S.evo.bogen === 1 && engine.S.evoTimes.length === 1;

  // 4. Keine doppelte Evolution, und das naechste Angebot ist wieder normal.
  engine.applyOffer({ type:"p", p:sehne });
  const keineDoppelte = engine.S.evoTimes.length === 1;
  const naechstes = engine.buildOffer();
  const naechstesNormal = !naechstes.some(o => o.type === "evo") && naechstes.length === 3;
  // 5. Ein bereits ausgeloester Pfad taucht nicht mehr als Pfad auf.
  const pfadWeg = !engine.evoPaths().some(p => p.w.id === "bogen");

  evolutionCompletion = fokusAb === 240 && fokusTrifftFuehrenden && fokusKarteGesehen &&
    fokusIstNichtErzwungenVorher && sofortDurchWaffe && sofortDurchPassiv &&
    keineDoppelte && naechstesNormal && pfadWeg;
  evolutionCompletionDiagnostics = { fokusAb, fuehrend: fuehrend.w.id,
    fokusTrifftFuehrenden, fokusKarteGesehen, fokusIstNichtErzwungenVorher,
    sofortDurchWaffe, sofortDurchPassiv, keineDoppelte, naechstesNormal, pfadWeg };
} catch (error) {
  evolutionCompletionError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-23-02: Waffen erst messen, dann balancieren ----------------
// Vor jedem Zahlen-Nerf steht die Messung. Geprueft wird, dass sie stimmt:
// echter statt ueberzaehlter Schaden und die richtige Ursprungswaffe.
let weaponDamageReport = false;
let weaponDamageError = "";
let weaponDamageDiagnostics = null;
try {
  const IDX = engine.W_IDX, TICK = engine.CFG.TICK;
  const ruhig = () => { engine.S.W = {}; engine.S.evo = {}; };

  // 1. Overkill zaehlt nur bis zur verbleibenden HP.
  engine.begin(480, "ring"); engine.S.x = 0; engine.S.y = 0; ruhig();
  const ziel = engine.spawnEnemy(0, 0, 0, 60, 0);
  engine.rebuildGrid();
  const hpVorher = engine.enemyHp(ziel);
  engine.shoot(0, 0, 1, 0, 600, hpVorher*50, 5, 0, 9, IDX.bogen);
  for (let i=0;i<6;i++) engine.updateProjectiles(TICK);
  const gebucht = engine.S.dmgW[IDX.bogen];
  const overkillGedeckelt = Math.abs(gebucht - hpVorher) < 0.01 && gebucht > 0;

  // 2. Bossschaden wird getrennt gefuehrt, Normalschaden nicht mitgezaehlt.
  engine.begin(480, "ring"); engine.S.x = 0; engine.S.y = 0; ruhig();
  const normalo = engine.spawnEnemy(0, 0, 0, 60, 0);
  engine.rebuildGrid();
  engine.shoot(0, 0, 1, 0, 600, 5, 9, 0, 9, IDX.splitter);
  for (let i=0;i<6;i++) engine.updateProjectiles(TICK);
  const nurNormal = engine.S.dmgW[IDX.splitter] > 0 && engine.S.dmgWBoss[IDX.splitter] === 0;
  const bossZiel = engine.spawnEnemy(0, 4, 2, 60, 0);
  engine.rebuildGrid();
  engine.shoot(0, 0, 1, 0, 600, 7, 9, 0, 9, IDX.splitter);
  for (let i=0;i<6;i++) engine.updateProjectiles(TICK);
  const bossGetrennt = engine.S.dmgWBoss[IDX.splitter] > 0 &&
    engine.S.dmgWBoss[IDX.splitter] <= engine.S.dmgW[IDX.splitter];

  // 3. Quellzuordnung: Kettenblitz und Rundenklinge treffen ohne Projektil.
  // Ohne gesetzte Abklingzeit steht C.<waffe> auf undefined; `C.x -= dt` waere
  // dann NaN und die Waffe feuerte nie -- der Check waere still gruen.
  const trefferDurch = (aufbau) => {
    engine.begin(480, "ring"); engine.S.x = 0; engine.S.y = 0; ruhig();
    aufbau();
    for (let k=0;k<12;k++) engine.spawnEnemy(0, 0, 0, 30+k*12, 0);
    engine.rebuildGrid();
    engine.fireWeapons(TICK);
    return Array.from(engine.S.dmgW);
  };
  const blitzWerte = trefferDurch(() => { engine.S.W = { blitz:2 }; engine.S.cool = { blitz:0 }; });
  const blitzZugeordnet = blitzWerte[IDX.blitz] > 0 &&
    blitzWerte.every((v,i) => i === IDX.blitz || v === 0);
  const klingeWerte = trefferDurch(() => { engine.S.W = { klinge:2 }; engine.S.cool = { klinge:0 }; });
  const klingeZugeordnet = klingeWerte[IDX.klinge] > 0 &&
    klingeWerte.every((v,i) => i === IDX.klinge || v === 0);

  // 4. Feuerboden gehoert der Feuerkugel, auch als Folgeschaden.
  engine.begin(480, "ring"); engine.S.x = 0; engine.S.y = 0; ruhig();
  engine.S.evo = { kugel:1 };
  for (let k=0;k<10;k++) engine.spawnEnemy(0, 4, 2, 200+k*4, 0);   // zaeh, stirbt nicht
  engine.rebuildGrid();
  engine.shoot(0, 0, 1, 0, 900, 6, 1, 2, 12, IDX.kugel);
  for (let i=0;i<12;i++) engine.updateProjectiles(TICK);
  const bodenEntstanden = engine.GROUND.x.length > 0;
  const nachExplosion = engine.S.dmgW[IDX.kugel];
  for (let i=0;i<20;i++) engine.updateProjectiles(TICK);
  const nachBoden = Array.from(engine.S.dmgW);
  const bodenZugeordnet = bodenEntstanden && nachBoden[IDX.kugel] > nachExplosion &&
    nachBoden.every((v,i) => i === IDX.kugel || v === 0);

  // 5. Der Frostsplitter gehoert der Frostnova -- NICHT der Waffe, die den
  //    Ausloeser getoetet hat. Deshalb toetet hier bewusst ein Bogenprojektil.
  engine.begin(480, "ring"); engine.S.x = 0; engine.S.y = 0; ruhig();
  engine.S.W = { frost:1 }; engine.S.cool = { frost:0 }; engine.S.evo = { frost:1 };
  // Familie 4 ist zaeh genug, um die Nova zu ueberleben. Mit schwachen Gegnern
  // toetet die Nova selbst -- dann pruefte der Check nicht mehr, WER den
  // Splitter ausgeloest hat, sondern nur, dass Frost Schaden macht.
  for (let k=0;k<14;k++) engine.spawnEnemy(0, 4, 0, 40+k*9, 0);
  engine.rebuildGrid();
  engine.fireWeapons(TICK);                       // verlangsamt und schwaecht an
  const frostVorSchuss = engine.S.dmgW[IDX.frost];
  const bogenVorSchuss = engine.S.dmgW[IDX.bogen];
  engine.S.W = {};                                 // keine weitere Nova
  engine.shoot(0, 0, 1, 0, 700, 9999, 99, 0, 9, IDX.bogen);
  for (let i=0;i<8;i++) engine.updateProjectiles(TICK);
  const frostNachSchuss = engine.S.dmgW[IDX.frost];
  const bogenNachSchuss = engine.S.dmgW[IDX.bogen];
  const splitterZugeordnet = frostNachSchuss > frostVorSchuss &&
    bogenNachSchuss > bogenVorSchuss;

  // 6. Der Bericht nennt beide Schadenszeilen, nur aktive Waffen und den
  //    neuen Verlauf mit Aufnahmezeit, aktiver Zeit, Rate und Evolution.
  engine.begin(480, "ring");
  engine.S.W = { bogen:3, blitz:1 }; engine.S.Pa = {}; engine.S.evo = {};
  engine.S.t = 240;
  engine.S.wFirst[IDX.bogen] = 0;
  engine.S.wFirst[IDX.blitz] = 60;
  engine.S.evo.blitz = 1;
  engine.S.evoAt[IDX.blitz] = 180;
  engine.S.dmgW[IDX.bogen] = 480;
  engine.S.dmgW[IDX.blitz] = 540;
  const zeile = engine.weaponDamageText("dmgW");
  const L = engine.LEX;
  const berichtNurAktive = zeile.includes(L.w.bogen) && zeile.includes(L.evo.blitz) &&
    !zeile.includes(L.w.frost) && !zeile.includes(L.w.klinge);
  const verlauf = engine.weaponTimelineText();
  const verlaufStimmt = verlauf.includes(L.w.bogen+" ab 0:00") &&
    verlauf.includes("4:00 aktiv") && verlauf.includes("2/s") &&
    verlauf.includes(L.evo.blitz+" ab 1:00") && verlauf.includes("3:00 aktiv") &&
    verlauf.includes("3/s") && verlauf.includes("EVO 3:00") &&
    !verlauf.includes(L.w.frost) && !verlauf.includes(L.w.klinge);
  const bericht = engine.runReportText();
  const berichtZeilen = bericht.includes("Schaden je Waffe:") &&
    bericht.includes("Boss-Schaden je Waffe:") &&
    bericht.includes("Waffenverlauf:") && bericht.includes(verlauf);

  weaponDamageReport = overkillGedeckelt && nurNormal && bossGetrennt &&
    blitzZugeordnet && klingeZugeordnet && bodenZugeordnet && splitterZugeordnet &&
    berichtNurAktive && verlaufStimmt && berichtZeilen;
  weaponDamageDiagnostics = { hpVorher:+hpVorher.toFixed(2), gebucht:+gebucht.toFixed(2),
    overkillGedeckelt, nurNormal, bossGetrennt, blitzZugeordnet, klingeZugeordnet,
    bodenZugeordnet, splitterZugeordnet, berichtNurAktive, verlaufStimmt, berichtZeilen };
} catch (error) {
  weaponDamageError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-24: Spaete Progressionsbremse --------------------------------
// Der Feldlauf vom 24.08.2026 erreichte Stufe 47 bei 46 Kartenzuegen.
// Die fruehe Progression bis einschliesslich Stufe 20 bleibt unverändert, nur
// die spaete wird gebremst, damit der Lauf nicht ins Unendliche verlaengert wird.
let lateProgression = false;
let lateProgressionError = "";
let lateProgressionDiagnostics = null;
try {
  const AT = engine.CFG.XP_LATE_AT;           // 20
  const C = engine.CFG.XP_C;                  // 82
  const K = engine.CFG.XP_K;                  // 0.70
  const LK = engine.CFG.XP_LATE_K;            // 3.0
  // Hilfsfunktion: Welche Stufe erreicht man mit einem gegebenen XP-Budget?
  // "Erreicht" heisst: so viele Stufenkosten wurden vollstaendig bezahlt, plus
  // die Startstufe 1. Genau so zaehlt auch gainXP() im Spiel.
  const stufeFuer = (budget, kosten) => {
    let summe = 0, stufe = 1;
    while (stufe < 400 && summe + kosten(stufe) <= budget) { summe += kosten(stufe); stufe++; }
    return stufe;
  };
  const basisKosten = (L) => C * Math.pow(L, K);

  // 1. Fruehe Kurve bleibt identisch bis einschliesslich XP_LATE_AT.
  let frueheKurveIdentisch = true;
  for (let L = 1; L <= AT; L++) {
    const actual = engine.xpNeed(L);
    const expected = C * Math.pow(L, K);
    if (Math.abs(actual - expected) >= 1e-9) {
      frueheKurveIdentisch = false;
      break;
    }
  }

  // 2. Spaete Kurve steigt ueber der Basiskurve, der Quotient waechst monoton,
  //    und er entspricht exakt der dokumentierten Formel (L/AT)^XP_LATE_K.
  //    Ohne diese dritte Bedingung waere jede beliebige steigende Kurve gruen.
  let spaeteKurveSteigt = true;
  let vorherQuotient = 0;
  for (let L = AT + 1; L <= 60; L++) {
    const actual = engine.xpNeed(L);
    const base = basisKosten(L);
    const quotient = actual / base;
    const erwartet = Math.pow(L / AT, LK);
    if (actual <= base || quotient <= vorherQuotient ||
        Math.abs(quotient - erwartet) > 1e-9) {
      spaeteKurveSteigt = false;
      break;
    }
    vorherQuotient = quotient;
  }

  // 3. Stetigkeit an der Grenze: Faktor ist exakt 1 bei AT, Sprung < 25%.
  const xpAtAT = engine.xpNeed(AT);
  const xpAtAT1 = engine.xpNeed(AT + 1);
  const faktorAtAT = xpAtAT / (C * Math.pow(AT, K));
  const stetigAnDerGrenze = Math.abs(faktorAtAT - 1) < 1e-9 &&
    (xpAtAT1 / xpAtAT) < 1.25;

  // 4. Das XP-Budget, mit dem die ALTE Kurve Stufe 47 erreichte, muss mit der
  //    neuen Kurve bei Stufe 30 bis 34 landen.
  let budget = 0;
  for (let i = 1; i <= 46; i++) budget += basisKosten(i);
  // Selbstkontrolle: Dasselbe Budget muss auf der alten Kurve wirklich 47
  // ergeben. Sonst misst der Check ein falsch gebildetes Budget.
  const stufeAltKurve = stufeFuer(budget, basisKosten);
  const budgetStimmt = stufeAltKurve === 47;
  const erreichteStufe = stufeFuer(budget, engine.xpNeed);
  const budgetLandetImKorridor = budgetStimmt &&
    erreichteStufe >= 30 && erreichteStufe <= 34;

  // 5. Mit zehnfachem Budget muss eine echt hoehere Stufe erreichbar sein.
  const stufeBeiZehnfachem = stufeFuer(budget * 10, engine.xpNeed);
  const keinDeckel = stufeBeiZehnfachem > erreichteStufe;

  lateProgression = frueheKurveIdentisch && spaeteKurveSteigt && stetigAnDerGrenze &&
    budgetLandetImKorridor && keinDeckel;

  lateProgressionDiagnostics = {
    frueheKurveIdentisch, spaeteKurveSteigt, stetigAnDerGrenze,
    budgetLandetImKorridor, keinDeckel,
    budgetStimmt, budget: Math.round(budget),
    stufeAltKurve, erreichteStufe, stufeBeiZehnfachem,
    xpNeed: {
      1: Number(engine.xpNeed(1).toFixed(1)),
      20: Number(engine.xpNeed(20).toFixed(1)),
      21: Number(engine.xpNeed(21).toFixed(1)),
      30: Number(engine.xpNeed(30).toFixed(1)),
      40: Number(engine.xpNeed(40).toFixed(1))
    }
  };
} catch (error) {
  lateProgressionError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-24-01 / D-036: Waffenrollen -------------------------------
// Zwei getrennte Befunde aus dem Feldlauf vom 24.08.2026:
//   Pfeilregen lieferte 55 % des Gesamtschadens und war damit die automatisch
//   beste Wahl; die Rundenklinge kam auf 291 Schaden im ganzen Lauf.
// Bei der Klinge lag ein echter Funktionsfehler vor: Sie war die einzige Waffe,
// die den Koerperradius des Gegners ignorierte. Genau das wird hier geprueft --
// als Verhalten, nicht als Quelltext.
let weaponRoles = false;
let weaponRolesError = "";
let weaponRolesDiagnostics = null;
try {
  const IDX = engine.W_IDX, TICK = engine.CFG.TICK;

  // --- Teil 1: Die Klinge rechnet den Gegnerkoerper mit --------------------
  // Die Klingen kreisen bei Stufe 2 auf exakt 74 Welteinheiten. Ein Gegner in
  // radialem Abstand d hat also |d-74| Abstand zur Klingenbahn. Damit lassen
  // sich die drei Faelle exakt stellen, ohne in die Arrays zu schreiben.
  const BAHN = 74, EIGEN = 17;
  const klingeTrifft = (abstandZurBahn, kind) => {
    engine.begin(480, "ring");
    const S = engine.S;
    S.x = 0; S.y = 0;
    S.W = { klinge: 2 }; S.Pa = {}; S.evo = {}; S.cool = { klinge: 0 };
    S.level = 4000;                       // Gegner ueberleben die Messung
    const ziel = engine.spawnEnemy(480, 4, kind, BAHN + abstandZurBahn, 0);
    engine.rebuildGrid();
    for (let t = 0; t < 600; t++) { engine.fireWeapons(TICK); }
    return { ziel, dmg: kind === 2 ? S.dmgWBoss[IDX.klinge] : S.dmgW[IDX.klinge] };
  };
  // Normalgegner, Koerper 9: 20 liegt ausserhalb des Eigenradius 17, aber
  // innerhalb von 17+9 = 26. Vor der Korrektur war das ein Fehlschlag.
  const normalKnapp = klingeTrifft(20, 0).dmg;
  // Klar ausserhalb von 17+9: Es darf NICHTS ankommen, sonst greift die
  // Klinge weiter als erlaubt.
  const normalZuWeit = klingeTrifft(40, 0).dmg;
  // Warden, Koerper 30: 40 liegt innerhalb von 17+30 = 47.
  const bossKnapp = klingeTrifft(40, 2).dmg;
  const koerperRadiusZaehlt = normalKnapp > 0 && normalZuWeit === 0 && bossKnapp > 0;

  // --- Teil 2: Pfeilregen ist nicht mehr automatisch die beste Wahl -------
  // Gleiches Fernfeld, einmal normaler Splitterkoecher, einmal die Evolution.
  const fernfeld = [];
  for (let gx = -430; gx <= 430; gx += 34)
    for (let gy = -430; gy <= 430; gy += 34) {
      const r = Math.hypot(gx, gy);
      if (r >= 150 && r <= 430) fernfeld.push([gx, gy]);
    }
  const splitterLauf = (evo) => {
    engine.begin(480, "ring");
    const S = engine.S;
    S.x = 0; S.y = 0;
    S.W = { splitter: 5 }; S.Pa = evo ? { koecher: 3 } : {};
    S.evo = evo ? { splitter: 1 } : {}; S.cool = { splitter: 0 };
    S.level = 4000;
    for (const [x, y] of fernfeld) engine.spawnEnemy(480, 4, 0, x, y);
    engine.rebuildGrid();
    for (let t = 0; t < 600; t++) {
      engine.rebuildGrid(); engine.fireWeapons(TICK); engine.updateProjectiles(TICK);
    }
    return S.dmgW[IDX.splitter];
  };
  const normalSchaden = splitterLauf(false);
  const evoSchaden = splitterLauf(true);
  const verhaeltnis = normalSchaden > 0 ? evoSchaden / normalSchaden : Infinity;
  // Vor D-036 lag das Verhaeltnis bei 3,30, jetzt bei 2,74. Die Decke von 3,0
  // liegt bewusst dazwischen: Pfeilregen bleibt deutlich staerker als der
  // Grundkoecher, ist aber keine automatische Wahl mehr. Wer den Nerf
  // zuruecknimmt, reisst diesen Check.
  const pfeilregenGedeckelt = verhaeltnis < 3.0;
  // Stark bleiben muss die Evolution trotzdem, sonst waere sie entwertet.
  const pfeilregenBleibtStark = verhaeltnis > 2.0;

  weaponRoles = koerperRadiusZaehlt && pfeilregenGedeckelt && pfeilregenBleibtStark;
  weaponRolesDiagnostics = { koerperRadiusZaehlt, pfeilregenGedeckelt, pfeilregenBleibtStark,
    klingeEigenradius: EIGEN, klingenbahn: BAHN,
    normalKnapp: Math.round(normalKnapp), normalZuWeit: Math.round(normalZuWeit),
    bossKnapp: Math.round(bossKnapp),
    splitterNormal: Math.round(normalSchaden), pfeilregen: Math.round(evoSchaden),
    verhaeltnis: Number(verhaeltnis.toFixed(2)) };
} catch (error) {
  weaponRolesError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-24-02 / D-038: Praesentationsschicht ------------------------
// Sichtbare Namen sind Sci-Fantasy, interne IDs und der Save-Key bleiben
// Emberhold. Geprueft wird beides gleichzeitig: Ein naiver Test, der das
// Verschwinden alter Begriffe aus dem Quelltext verlangt, waere falsch --
// genau diese Begriffe muessen in IDs und Migrationen erhalten bleiben.
let presentationLayer = false;
let presentationError = "";
let presentationDiagnostics = null;
try {
  const L = engine.LEX;

  // 1. Die Abbildung ist vollstaendig -- abgeleitet aus den Laufzeitarrays,
  //    nicht aus einer zweiten handgepflegten Liste.
  const alleWaffen = engine.WEAPONS.every(w => !!L.w[w.id] && !!L.evo[w.id]);
  const allePassive = engine.PASSIVES.every(p => !!L.p[p.id]);
  const alleSektoren = engine.CONTRACTS.every(c => !!L.sektor[c.id]);
  const alleBoni = engine.BOONS.every(b => !!L.boon[b.id]);
  const alleAusrüstung = engine.GEAR.every(g => !!L.gear[g.id] && !!L.slot[g.slot]);
  const abbildungVollstaendig = alleWaffen && allePassive && alleSektoren &&
    alleBoni && alleAusrüstung && !!L.gear[engine.GEAR_CARD.id];

  // 2. Die Abbildung wird auch wirklich benutzt.
  const namenGesetzt = engine.WEAPONS.every(w => w.name === L.w[w.id] && w.evo.name === L.evo[w.id]) &&
    engine.PASSIVES.every(p => p.name === L.p[p.id]) &&
    engine.CONTRACTS.every(c => c.name === L.sektor[c.id]) &&
    engine.BOONS.every(b => b.name === L.boon[b.id]) &&
    engine.GEAR.every(g => g.name === L.gear[g.id] && g.slotName === L.slot[g.slot]) &&
    engine.GEAR_CARD.name === L.gear[engine.GEAR_CARD.id];
  const familienUmbenannt = engine.FAMNAME.length === 5 &&
    engine.FAMNAME.every(n => typeof n === "string" && n.length > 3) &&
    !engine.FAMNAME.includes("Schwärmer") && !engine.FAMNAME.includes("Wahrer");

  // 3. Interne IDs sind unveraendert. Das ist die Save-Kompatibilitaet.
  const idsUnveraendert =
    engine.WEAPONS.map(w => w.id).join(",") === "bogen,splitter,kugel,blitz,klinge,frost" &&
    engine.PASSIVES.map(p => p.id).join(",") === "sehne,koecher,federung,wetz,linse,magnet,amulett,umhang" &&
    engine.CONTRACTS.map(c => c.id).join(",") === "ring,breach,hollow" &&
    engine.WEAPONS.every(w => !!engine.W_IDX[w.id] || w.id === "bogen");

  // 4. Der Save-Key bleibt emberhold:hold:v1 und ein v4-Stand wird nach
  //    D-042 auf v5 migriert und ueberlebt Speichern/Neuladen verlustfrei --
  //    inklusive der drei neuen Felder. Echter Rundlauf durch localStorage.
  localStorage.setItem("emberhold:hold:v1", JSON.stringify({
    version: 4, ore: 33, bars: 7, essence: 2, marks: 1, dust: 14, runs: 9,
    mineLevel: 1, forgeLevel: 1, bowUpgrade: 1, arcanumLevel: 1, yardLevel: 1,
    selectedContract: "hollow", preparedRerolls: 1,
    masteries: { path: 1, reach: 2, dash: 0 },
    gearOwned: { glutsehne: 2 }, gearEquipped: { weapon: "glutsehne", charm: null, mantle: null },
    lastAt: 1000,
  }));
  engine.loadHold(1000);
  const geladen = JSON.stringify(engine.H);
  engine.saveHold();
  engine.loadHold(1000);
  // Bewusst NICHT gegen den Rohwert 33 pruefen: Der Materiefabrikator
  // verbraucht beim Laden planmaessig 5 Asterit fuer die naechste Charge.
  // Entscheidend ist, dass der Rundlauf nichts verliert oder veraendert --
  // jetzt inklusive stationData/coreStage/sortieProtocol (D-042).
  const roundtripVerlustfrei = JSON.stringify(engine.H) === geladen &&
    engine.H.version === 5 && engine.H.dust === 14 &&
    engine.H.stationData === 0 && engine.H.coreStage === 0 &&
    engine.H.sortieProtocol === "none" &&
    engine.H.selectedContract === "hollow" && engine.H.gearOwned.glutsehne === 2 &&
    engine.H.masteries.reach === 2 && engine.H.bowUpgrade === 1 &&
    engine.H.preparedRerolls === 1 && engine.H.runs === 9;
  const keyUnveraendert = !!localStorage.getItem("emberhold:hold:v1");

  // 5. Der Run-Bericht zeigt sichtbare Namen, keine internen IDs.
  engine.begin(480, "ring");
  engine.S.W = { bogen: 3, frost: 1 }; engine.S.Pa = { sehne: 2 }; engine.S.evo = {};
  engine.S.boons = { fury: 1 }; engine.S.gearEquipped = { weapon: "glutsehne", charm: null, mantle: null };
  engine.S.gearRanks = { glutsehne: 2 }; engine.S.holdUtility = { path: 1, reach: 0, dash: 0 };
  engine.S.t = 480; engine.S.result = "Extrahiert";
  const bericht = engine.runReportText();
  const berichtZeigtNeueNamen = bericht.includes(L.produkt.toUpperCase()) &&
    bericht.includes(L.w.bogen) && bericht.includes(L.w.frost) &&
    bericht.includes(L.res.ore) && bericht.includes(L.res.loot) && bericht.includes(L.heal) &&
    bericht.includes(L.boon.fury) && bericht.includes(L.gear.glutsehne) &&
    bericht.includes("Stations-Vorbereitung");
  const berichtOhneAlteNamen = ["Langbogen", "Frostnova", "Eisenerz", "Basis-Beute",
    "Gluttropfen", "Glutkern", "Glutsehne", "Hold-Vorbereitung", "EMBERHOLD"].every(alt => !bericht.includes(alt));
  // Interne IDs duerfen nie im sichtbaren Bericht stehen.
  const berichtOhneIds = !/\b(bogen|splitter|kugel|blitz|klinge|frost|koecher|wetz)\b/.test(bericht);

  // 6. LEX ist eingefroren: Es kann im Renderpfad nicht versehentlich
  //    beschrieben werden und erzeugt beim Lesen keine Allokation.
  const eingefroren = Object.isFrozen(L) && Object.isFrozen(L.w) &&
    Object.isFrozen(L.evo) && Object.isFrozen(L.p) && Object.isFrozen(L.sektor) &&
    Object.isFrozen(L.res) && Object.isFrozen(L.modul) && Object.isFrozen(L.boon) &&
    Object.isFrozen(L.gear) && Object.isFrozen(L.slot) && Object.isFrozen(L.mastery);

  presentationLayer = abbildungVollstaendig && namenGesetzt && familienUmbenannt &&
    idsUnveraendert && roundtripVerlustfrei && keyUnveraendert &&
    berichtZeigtNeueNamen && berichtOhneAlteNamen && berichtOhneIds && eingefroren;
  presentationDiagnostics = { abbildungVollstaendig, namenGesetzt, familienUmbenannt,
    idsUnveraendert, roundtripVerlustfrei, keyUnveraendert, berichtZeigtNeueNamen,
    berichtOhneAlteNamen, berichtOhneIds, eingefroren,
    produkt: L.produkt, boss: L.bossRolle + ": " + L.boss,
    familien: engine.FAMNAME.slice() };
} catch (error) {
  presentationError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-24-02 / D-038: Kosten im Massenrenderpfad ------------------
// Die neuen Figuren sind vorgerendert. Dieser Check misst das, statt es zu
// behaupten: Der Kontextstub zaehlt teure Aufrufe waehrend eines echten
// render()-Durchlaufs mit vielen Gegnern. Eine reine Quelltextsuche waere
// hier wertlos -- sie saehe nicht, wie oft etwas wirklich passiert.
let renderCostContract = false;
let renderCostError = "";
let renderCostDiagnostics = null;
try {
  canvasElement.clientWidth = 1280;
  canvasElement.clientHeight = 720;
  engine.resize();
  engine.begin(480, "ring");
  const S = engine.S;
  S.x = 0; S.y = 0; S.level = 900;
  S.W = { bogen:4, splitter:3, klinge:3 }; S.cool = { bogen:0, splitter:0, klinge:0 };
  // Dichter Pulk plus AEGIS, also der teuerste realistische Fall.
  let gegner = 0;
  for (let k=0;k<300;k++){
    const a=(k/300)*Math.PI*2, r=40+(k%9)*46;
    if (engine.spawnEnemy(480, k%5, 0, Math.cos(a)*r, Math.sin(a)*r) >= 0) gegner++;
  }
  engine.spawnEnemy(480, 4, 2, 150, 40);
  engine.rebuildGrid();
  engine.fireWeapons(engine.CFG.TICK);   // Projektile ins Feld bringen

  zaehler.reset();
  engine.render();
  const einFrame = zaehler.werte();
  zaehler.reset();
  for (let f=0; f<10; f++) engine.render();
  const zehnFrames = zaehler.werte();

  const sichtbar = S.visibleEnemies;
  // Pro Einheit darf nichts Teures entstehen. Grosszuegige, aber harte Decke:
  // hoechstens ein Gradient und ein shadowBlur-Setzen je Frame und keinesfalls
  // eine Zahl, die mit der Gegnerzahl waechst.
  const gradientenProFrame = zehnFrames.gradients / 10;
  const schattenProFrame = zehnFrames.shadowBlur / 10;
  const canvasProFrame = zehnFrames.createElement / 10;
  const skaliertNichtMitGegnern = sichtbar > 60 &&
    gradientenProFrame <= 3 && schattenProFrame <= 4;
  const keineNeuenSprites = canvasProFrame === 0;
  // Zeichnen selbst muss stattfinden, sonst misst der Check nichts.
  const wirklichGezeichnet = einFrame.drawImage > sichtbar;

  renderCostContract = skaliertNichtMitGegnern && keineNeuenSprites && wirklichGezeichnet;
  renderCostDiagnostics = { gegner, sichtbar,
    drawImageErsterFrame: einFrame.drawImage,
    gradientenProFrame, schattenProFrame, canvasProFrame,
    skaliertNichtMitGegnern, keineNeuenSprites, wirklichGezeichnet };
} catch (error) {
  renderCostError = error instanceof Error ? error.message : String(error);
}

// --- D-040: Kampf-UI V2, durchgehendes Deck und Animationsphasen ---------
// Minimale Rand-UI, Boden vor Clipping, Animationen mit mehr Phasen.
let combatUiV2 = false;
let combatUiV2Error = "";
let combatUiV2Diagnostics = null;
try {
  // 1. Linke Buildliste nicht sichtbar im Kampf
  const keineLinkeListe = html.includes("#slots{display:none}");

  // 2. Waffenleiste vorhanden mit Obergrenze von sechs Symbolen
  const waffenleisteVorhanden = html.includes('id="weaponbar"') &&
    html.includes("function renderWeaponBar()") &&
    html.includes("aktiv.slice(0,6)");
  const weaponBarBlock=html.slice(html.indexOf("function renderWeaponBar()"),
    html.indexOf("\nlet slotSig"));
  const evoPos=weaponBarBlock.indexOf("const evo=!!S.evo[w.id]");
  const colPos=weaponBarBlock.indexOf("const col=evo?w.evo.col:w.col");
  const glyphPos=weaponBarBlock.indexOf("weaponGlyph(w.id)");
  const piktogrammVerdrahtet=evoPos>=0&&colPos>evoPos&&glyphPos>colPos;
  const waffenPiktogramme = piktogrammVerdrahtet &&
    html.includes("const WEAPON_GLYPHS=Object.freeze") &&
    html.includes("function weaponGlyph(id)") &&
    ["bogen","splitter","kugel","blitz","klinge","frost"].every(id=>
      html.includes(id+":'<svg"));

  // 3. Boss-Titel korrekt
  const bossTitelKorrekt = html.includes("BOSS: AEGIS") &&
    !html.includes("<span>SEKTORBOSS</span>");

  // 4. Keine Safe-Area-Balken mit starField
  const keineSafeAreaBalken = !/CLIP_X\+CLIP_W[^\n]*starField/.test(html) &&
    html.includes("function drawDeckEdges()");

  // 5. Boden vor dem Clipping
  const indexDrawFloor = html.indexOf("drawArenaFloor(dx0,dx1,dy0,dy1)");
  const indexTint = html.indexOf("if(S.contract?.tint)");
  const indexClipRect = html.indexOf("ctx.rect(CLIP_X,CLIP_Y,CLIP_W,CLIP_H)");
  const sektortintNahtlos = indexTint > indexDrawFloor && indexTint < indexClipRect;
  const deckVorDemClip = indexDrawFloor >= 0 && indexClipRect >= 0 &&
    indexDrawFloor < indexClipRect && sektortintNahtlos;

  // 6. Animationsphasen nach D-040
  const orbiterMatch = html.match(/ORBITER_ANIM = Object\.freeze\(\{IDLE:(\d+), WALK:(\d+), THROW:(\d+)/);
  const foeMatch = html.match(/FOE_ANIM = Object\.freeze\(\{FRAMES:(\d+)/);
  const phasenzahlen = orbiterMatch && foeMatch &&
    parseInt(orbiterMatch[1]) >= 6 &&
    parseInt(orbiterMatch[2]) >= 8 &&
    parseInt(orbiterMatch[3]) >= 8 &&
    parseInt(foeMatch[1]) >= 6;

  const idle = orbiterMatch ? parseInt(orbiterMatch[1]) : 0;
  const walk = orbiterMatch ? parseInt(orbiterMatch[2]) : 0;
  const throwPhase = orbiterMatch ? parseInt(orbiterMatch[3]) : 0;
  const foe = foeMatch ? parseInt(foeMatch[1]) : 0;

  // 7. Verhaltensbeleg statt Quelltextsuche: Auf einem 21:9-Fenster entsteht
  //    eine Safe-Area. Wenn der Boden wirklich bis an den Bildrand laeuft,
  //    muss dieselbe Szene dort mehr BODENKACHELN zeichnen als auf 16:9.
  //    D-043 misst dazu gezielt nur den Kachel-Pass: Die Deko-Ebenen (Sterne,
  //    Landmarks, Planet) werden temporär abgehängt und danach restauriert,
  //    damit seltene Strukturen das Ergebnis nicht zufällig nivellieren.
  const deckKacheln = (breite, hoehe) => {
    canvasElement.clientWidth = breite; canvasElement.clientHeight = hoehe;
    engine.resize();
    engine.begin(480, "ring");
    // Kamera bewusst versetzt: Bei x=0 liegen beide Fenster symmetrisch zu
    // 512er-Kachelgrenzen; der Versatz macht den breiten Mehrraum messbar.
    engine.S.x = 137; engine.S.y = 0; engine.S.W = {}; engine.S.level = 40;
    const spr = engine.SPR;
    const gesichert = { st: spr.starTile, lm: spr.landmarks, pl: spr.planet };
    spr.starTile = null; spr.landmarks = null; spr.planet = null;
    zaehler.reset();
    engine.render();
    spr.starTile = gesichert.st; spr.landmarks = gesichert.lm; spr.planet = gesichert.pl;
    return { gezeichnet: zaehler.werte().drawImage, safeArea: Math.round(engine.viewport().CLIP_X) };
  };
  const schmal = deckKacheln(1280, 720);
  const breit  = deckKacheln(2560, 1080);
  const deckBisZumRand = breit.safeArea > 100 && breit.gezeichnet > schmal.gezeichnet;
  canvasElement.clientWidth = 1000; canvasElement.clientHeight = 700;
  engine.resize();

  combatUiV2 = keineLinkeListe && waffenleisteVorhanden && waffenPiktogramme && bossTitelKorrekt &&
    keineSafeAreaBalken && deckVorDemClip && phasenzahlen && deckBisZumRand;
  combatUiV2Diagnostics = {
    keineLinkeListe, waffenleisteVorhanden, waffenPiktogramme, bossTitelKorrekt,
    keineSafeAreaBalken, deckVorDemClip, sektortintNahtlos, phasenzahlen, deckBisZumRand,
    kacheln16zu9: schmal.gezeichnet, kacheln21zu9: breit.gezeichnet,
    safeArea21zu9: breit.safeArea,
    phasen: { idle, walk, throw: throwPhase, foe }
  };
} catch (error) {
  combatUiV2Error = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-03 / D-041 Gate C: genau ein Evolutionshinweis -----------
// Der Hinweis „Nächste EVO“ ist der einzige Fortschrittshinweis im Kampfbild.
// Fachliche Quelle ist ausschliesslich leadingEvoPath(); er zeigt genau den
// aktuell fuehrenden Pfad, wechselt sofort nach Abschluss und verschwindet
// ohne Pfad. Geprueft wird Verhalten am echten DOM-Shim, plus die Lage
// oberhalb der Waffenleiste und unterhalb der Dialogebene.
let evolutionFocusHud = false;
let evoFocusError = "";
let evoFocusDiagnostics = null;
try {
  const hintEl = globalThis.document.getElementById("evohint");
  const nameEl = globalThis.document.getElementById("ehname");
  const progEl = globalThis.document.getElementById("ehprog");

  // 1) Statisch: genau ein Element, Quelle fuehrender Pfad, Lage LINKS im
  //    Kampfrand unter Gesundheit/Erfahrung (D-042 Gate B), unterhalb der
  //    Karten-/Dialogebene.
  const genauEinElement = (html.match(/id="evohint"/g) || []).length === 1 &&
    html.includes("function updateEvoHint()") &&
    html.includes("const lead=leadingEvoPath();");
  const leftHint = parseInt((html.match(/#evohint\{[^}]*left:(\d+)px/) || [])[1], 10);
  const topHint = parseInt((html.match(/#evohint\{[^}]*top:(\d+)px/) || [])[1], 10);
  const evohintRegel = html.match(/#evohint\{[^}]*\}/) ? html.match(/#evohint\{[^}]*\}/)[0] : "";
  const zHint = parseInt((html.match(/#evohint\{[^}]*z-index:(\d+)/) || [])[1], 10);
  const zCards = parseInt((html.match(/#cards\{[^}]*z-index:(\d+)/) || [])[1], 10);
  const lageKorrekt = leftHint <= 40 && topHint >= 40 &&
    !evohintRegel.includes("translateX(-50%)") && !evohintRegel.includes("bottom:") &&
    zHint < zCards;

  // 2) Verhalten: genau der fuehrende Pfad wird angezeigt, nicht der andere.
  engine.begin(480, "ring");
  engine.S.W = { bogen: 1, klinge: 2 };
  engine.S.Pa = { sehne: 1, federung: 1 };
  engine.S.evo = {};
  const leadA = engine.leadingEvoPath();
  engine.updateEvoHint();
  const anNachLead = hintEl.getAttribute("aria-hidden") === "false";
  const nameIstFuehrender = nameEl.textContent === leadA.w.evo.name &&
    !nameEl.textContent.includes(engine.LEX.evo.bogen);
  const fortschrittDrin = progEl.textContent.includes(leadA.w.name) &&
    progEl.textContent.includes(leadA.passive.name);

  // 3) Nach Abschluss wechselt der Hinweis sofort zum naechsten Pfad ...
  engine.S.W.bogen = 5; engine.S.Pa.sehne = 3;   // Bogen-Pfad bereit -> fuehrend
  const leadB = engine.leadingEvoPath();
  engine.updateEvoHint();
  const wechseltSofort = nameEl.textContent === leadB.w.evo.name &&
    progEl.textContent.includes("bereit");

  // 4) ... und verschwindet, wenn kein Pfad mehr offen ist.
  engine.S.W = {}; engine.S.Pa = {};
  engine.updateEvoHint();
  const verstecktOhnePfad = hintEl.getAttribute("aria-hidden") === "true";

  evolutionFocusHud = genauEinElement && lageKorrekt && anNachLead &&
    nameIstFuehrender && fortschrittDrin && wechseltSofort && verstecktOhnePfad;
  evoFocusDiagnostics = { genauEinElement, lageKorrekt,
    leftHint, topHint, zHint, zCards,
    fuehrend: leadA.w.id, name: nameEl.textContent,
    anNachLead, nameIstFuehrender, fortschrittDrin, wechseltSofort, verstecktOhnePfad };
} catch (error) {
  evoFocusError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-03 / D-041 Gate B: fuenf Familien, eine Silhouettensprache
// Farbe allein reicht nicht. Geprueft werden die verbindlichen Profile aus
// FOE_PROFILE -- dieselbe Tabelle, die drawFoeBody() tatsaechlich zeichnet --
// plus die daraus gebauten Sprite-Groessen. Alle fuenf Konturen muessen in
// Proportion und Groesse paarweise unterscheidbar sein.
let foeSilhouettes = false;
let foeSilhouetteError = "";
let foeSilhouetteDiagnostics = null;
try {
  const P = engine.FOE_PROFILE;
  const profilVollstaendig = Array.isArray(P) && P.length === 5 &&
    Object.isFrozen(P) && P.every(p => Object.isFrozen(p));

  // Paarweise unterschiedliche Konturen (k, breite, hoehe, teile).
  let paarweiseVerschieden = true;
  for (let a=0;a<5;a++) for (let b=a+1;b<5;b++){
    const x=P[a], y=P[b];
    if (x.k===y.k && x.breite===y.breite && x.hoehe===y.hoehe && x.teile===y.teile)
      paarweiseVerschieden = false;
  }

  // Lesbare Qualitaeten je Rolle:
  const sammlerKlein        = P[0].k === Math.min(...P.map(p=>p.k));
  const rammjaegerLang      = P[1].hoehe / P[1].breite >= 1.8;
  const emitterBreitest     = P[2].breite / P[2].hoehe === Math.max(...P.map(p=>p.breite/p.hoehe));
  const replikatorGeteilt   = P[3].teile === 2;
  // Flaeche inklusive Grundgroesse: das Bollwerk ist die groesste normale
  // Einheit, auch gegen den breiten Emitter und den Zwilling.
  const flaeche = p => p.breite * p.hoehe * p.k * p.k;
  const bollwerkGross       = P[4].k === Math.max(...P.map(p=>p.k)) &&
    flaeche(P[4]) === Math.max(...P.map(flaeche));

  // Die Zeichnung konsumiert die Tabelle wirklich (nicht nur der Test).
  const bodyQuelle = html.slice(html.indexOf("function drawFoeBody"),
                                html.indexOf("function buildFoeSprites"));
  const tabelleGenutzt = bodyQuelle.includes("FOE_PROFILE[fam]") &&
    html.includes("const GROESSE=[40,56,66,60,86]");

  // Die gebauten Sprites tragen die Unterscheidung auch in der Groesse.
  const groessen = [0,1,2,3,4].map(f => engine.SPR.foe[f][0] ? engine.SPR.foe[f][0].width : 0);
  const alleVorhanden = groessen.every(g => g > 0);
  const groessenPaarweise = new Set(groessen).size === 5;
  const bollwerkAmGroessten = groessen[4] === Math.max(...groessen);
  const sammlerAmKleinsten = groessen[0] === Math.min(...groessen);

  foeSilhouettes = profilVollstaendig && paarweiseVerschieden && sammlerKlein &&
    rammjaegerLang && emitterBreitest && replikatorGeteilt && bollwerkGross &&
    tabelleGenutzt && alleVorhanden && groessenPaarweise &&
    bollwerkAmGroessten && sammlerAmKleinsten;
  foeSilhouetteDiagnostics = { profilVollstaendig, paarweiseVerschieden,
    sammlerKlein, rammjaegerLang, emitterBreitest, replikatorGeteilt,
    bollwerkGross, tabelleGenutzt, groessen, alleVorhanden, groessenPaarweise,
    bollwerkAmGroessten, sammlerAmKleinsten };
} catch (error) {
  foeSilhouetteError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-04 / D-042 Gate A+B: Kampfgrafik V3 ----------------------
// Lichthueter-Merkmale im vorgerenderten Pfad, Phasenzahlen 6/8/8 bei ~12 FPS,
// Rammjaeger-Aufladphase in derselben aktuellen Silhouette (keine alte Tier-
// Darstellung mehr), EVO-Hinweis links, Hot-Loop ohne Zeitquelle/Zufall und
// der neue Orbitalhintergrund als einmal gebackene Ebenen.
let combatArtV3 = false;
let artV3Error = "";
let artV3Diagnostics = null;
try {
  const pose = html.slice(html.indexOf("function drawOrbiterPose"),
                          html.indexOf("function buildOrbiterSprites"));
  const spriteBau = html.slice(html.indexOf("function buildArenaSprites"),
                               html.indexOf("const ENEMY_DIRECTIONS"));
  const orbiterMatch = html.match(/ORBITER_ANIM = Object\.freeze\(\{IDLE:(\d+), WALK:(\d+), THROW:(\d+), FPS:(\d+)/);
  const phasenOk = orbiterMatch && +orbiterMatch[1] >= 6 && +orbiterMatch[2] >= 8 &&
    +orbiterMatch[3] >= 8 && +orbiterMatch[4] >= 10 && +orbiterMatch[4] <= 12;
  // Lichthueter-Grammatik (adaptiert aus zeichneLichthueterNeu): Goldhalo mit
  // Ticks, Goldraute, V-Visier, breite Schultern, geteilter Mantel,
  // Helm in Weiss-Gold.
  const haloRing = pose.includes("g.arc(0,-14,11.8") &&
    pose.includes("0.7854+") && pose.includes("1.5708");
  const krone = pose.includes("g.moveTo(0,-26)") && pose.includes("g.lineTo(-2,-21)");
  const visier = pose.includes("#7fd4e8") && pose.includes("(0,-14.5)");
  const schultern = pose.includes("s*15,-5");
  const mantel = pose.includes("rgba(92,190,255,.24)");
  const helmGold = pose.includes("#d9b45a") && pose.includes("(-6,-11)");
  // Hot-Loop-Disziplin: keine Zeitquelle, kein Zufall.
  const heissSauber = !pose.includes("Date.now()") && !pose.includes("Math.random()") &&
    !spriteBau.includes("Date.now()") && !spriteBau.includes("Math.random()");
  // Rammjaeger-Aufladphase bleibt aktuell; Tier-/Fallback nur ohne Atlas.
  const rammjaegerNeu = html.includes("SPR.foe&&E.kind[i]===0") &&
    !html.includes("SPR.foe&&tier===ENEMY_NORMAL_TIER") &&
    html.includes("ENEMY_TELEGRAPH_TIER=3");
  // EVO-Hinweis links unter Gesundheit/Erfahrung.
  const evoLinks = /#evohint\{[^}]*left:14px/.test(html) &&
    /#evohint\{[^}]*top:64px/.test(html) &&
    !/#evohint\{[^}]*translateX\(-50%\)/.test(html);
  // Orbitalhintergrund: einmalige Ebenen statt Kastenwand.
  const orbitSzene = html.includes("SPR.starTile=skyT") &&
    html.includes("SPR.landmarks=") && html.includes("SPR.planet=pl") &&
    html.includes("function drawDeckEdges()");
  combatArtV3 = phasenOk && haloRing && krone && visier && schultern && mantel &&
    helmGold && heissSauber && rammjaegerNeu && evoLinks && orbitSzene;
  artV3Diagnostics = { phasenOk,
    phasen: orbiterMatch ? {idle:+orbiterMatch[1],walk:+orbiterMatch[2],
                            wurf:+orbiterMatch[3],fps:+orbiterMatch[4]} : null,
    haloRing, krone, visier, schultern, mantel, helmGold,
    heissSauber, rammjaegerNeu, evoLinks, orbitSzene };
} catch (error) {
  artV3Error = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-04 / D-042 Gate D: Sektorziel SIGNAL SICHERN -------------
let sectorObjectiveFlow = false;
let sectorError = "";
let sectorDiagnostics = null;
try {
  const TICK = engine.CFG.TICK;
  const stillLegen = () => {
    engine.S.W = {}; engine.S.hp = engine.S.maxhp = 1e9;
    engine.S.events.boss = true;
    engine.S.events.elite = engine.CFG.ELITE_AT.length;
  };
  const startRun = () => {
    engine.newRun(480, 20260826, "ring");
    engine.S.running = true; engine.S.phase = "run";
  };
  const laufenSek = (sek) => { for (let i=0,n=Math.round(sek/TICK);i<n;i++) engine.tick(TICK); };

  // 1) Nur der Acht-Minuten-Modus erhaelt das Ziel.
  engine.newRun(180, 20260826, "ring"); engine.S.running=true; engine.S.phase="run";
  stillLegen(); laufenSek(160);
  const kurzOhneSignal = engine.signalStatus().status === "keiner" && !engine.S.signal;

  // 2) Spawn bei 2:30, deterministisch, Abstand 220–300.
  startRun(); stillLegen();
  laufenSek(149.5);
  const vorherNichtDa = engine.signalStatus().status === "wartet";
  laufenSek(1);
  const sigOffen = engine.signalStatus().status === "offen";
  const s1x = engine.S.signal.x, s1y = engine.S.signal.y;
  const dist = Math.hypot(s1x - engine.S.x, s1y - engine.S.y);
  const distanzOk = dist >= 220 - 1e-6 && dist <= 300 + 1e-6;
  startRun(); stillLegen(); laufenSek(150.5);
  const positionDeterministisch = engine.S.signal &&
    Math.abs(engine.S.signal.x - s1x) < 1e-9 &&
    Math.abs(engine.S.signal.y - s1y) < 1e-9;

  // 3) Kumulativ 8 Sekunden; Verlassen pausiert ohne Reset.
  startRun(); stillLegen(); laufenSek(150.5);
  const s2x = engine.S.signal.x, s2y = engine.S.signal.y;
  const hin = () => { engine.S.x = s2x; engine.S.y = s2y; engine.rebuildGrid(); };
  const weg = () => { engine.S.x = s2x + 400; engine.S.y = s2y; engine.rebuildGrid(); };
  hin(); laufenSek(3);
  const geladenNach3 = engine.signalStatus().geladen;
  weg(); laufenSek(2);
  const pauseOhneReset = Math.abs(engine.signalStatus().geladen - geladenNach3) < 1e-9;
  hin();
  const t0 = engine.S.t;
  while (engine.signalStatus().status === "offen" && engine.S.t - t0 < 20)
    engine.tick(TICK);
  const ladezeit = engine.S.t - t0;
  const kumuliertOk = engine.signalStatus().status === "gesichert" &&
    Math.abs(ladezeit - (8 - geladenNach3)) < 0.06;
  const ersteDatei = engine.S.securedData === 1;

  // 4) NEXUS-Kill sichert die zweite Datei; Gutschrift genau einmal.
  const bossIdx = engine.spawnEnemy(engine.S.t, 4, 2, 260, 0, "nexus");
  engine.S.bossIndex = bossIdx; engine.S.bossId = "nexus";
  engine.killEnemy(bossIdx);
  const zweiteDatei = engine.S.securedData === 2;
  engine.showExtract();
  const basisFormel = Math.abs(engine.S.baseReward -
    Math.round(engine.S.kills*1.0 + engine.S.gemsTaken*0.6)) < 1e-6;
  engine.depositRunReward();
  const gutschriftEinmal = engine.H.stationData === 2;
  engine.depositRunReward();
  const keineDoppelteGutschrift = engine.H.stationData === 2;

  // 5) Tod im Finale behaelt gesicherte Dateien.
  startRun(); stillLegen(); laufenSek(151);
  const sigTod = engine.S.signal;
  engine.S.x = sigTod.x; engine.S.y = sigTod.y; engine.rebuildGrid();
  laufenSek(8.05);
  const gesichertVorTod = engine.S.securedData === 1;
  engine.S.hp = 1; engine.S.iframe = 0; engine.S.dashIf = 0;
  engine.damagePlayer(50);
  const todBehaelt = engine.S.result === "Gefallen" && engine.S.rewardGranted &&
    engine.H.stationData === 3;
  engine.depositRunReward();
  const todKeinZweitesMal = engine.H.stationData === 3;

  // 6) Verpassen ist terminal.
  let verpasstTerminal = false;
  startRun(); stillLegen(); laufenSek(241);
  const verpasst = engine.signalStatus().status === "verpasst" &&
    engine.S.securedData === 0;
  if (engine.S.signal){
    engine.S.x = engine.S.signal.x; engine.S.y = engine.S.signal.y;
    engine.rebuildGrid();
  }
  laufenSek(10);
  verpasstTerminal = engine.signalStatus().status === "verpasst" &&
    engine.S.securedData === 0;

  sectorObjectiveFlow = kurzOhneSignal && vorherNichtDa && sigOffen && distanzOk &&
    positionDeterministisch && kumuliertOk && ersteDatei && pauseOhneReset &&
    zweiteDatei && basisFormel && gutschriftEinmal && keineDoppelteGutschrift &&
    gesichertVorTod && todBehaelt && todKeinZweitesMal && verpasst && verpasstTerminal;
  sectorDiagnostics = { kurzOhneSignal, vorherNichtDa, sigOffen,
    distanz: +dist.toFixed(2), distanzOk, positionDeterministisch,
    geladenNach3: +geladenNach3.toFixed(3), pauseOhneReset,
    ladezeitRest: +ladezeit.toFixed(2), kumuliertOk, ersteDatei, zweiteDatei,
    basisFormel, gutschriftEinmal, keineDoppelteGutschrift,
    gesichertVorTod, todBehaelt, todKeinZweitesMal, verpasst, verpasstTerminal };
} catch (error) {
  sectorError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-04 / D-042 Gate E: Stationskern, Protokolle, Save v5 -----
let stationCoreFlow = false;
let stationError = "";
let stationCoreDiagnostics = null;
try {
  const TICK = engine.CFG.TICK;
  // Voll-Snapshot von META: Gate D hinterlaesst absichtlich Spuren (Runs,
  // Erz, Saves); der Restore unten darf NICHTS davon in Folgeberichte tragen.
  const metaSnapshot = JSON.stringify(engine.H);

  // Sanitizing: Unsinn wird sicher bereinigt.
  localStorage.setItem("emberhold:hold:v1", JSON.stringify({
    version: 5, ore: 10, bars: 1, essence: 0, marks: 0, dust: 0, runs: 0,
    mineLevel: 0, forgeLevel: 0, bowUpgrade: 0, arcanumLevel: 0, yardLevel: 0,
    selectedContract: "ring", preparedRerolls: 0,
    masteries: { path: 0, reach: 0, dash: 0 },
    gearOwned: {}, gearEquipped: { weapon: null, charm: null, mantle: null },
    stationData: "12.7", coreStage: 9, sortieProtocol: "bergungsscanner",
    lastAt: 1000 }));
  engine.loadHold(1000);
  const sanitiert = engine.H.stationData === 12 && engine.H.coreStage === 3 &&
    engine.H.sortieProtocol === "bergungsscanner";
  localStorage.setItem("emberhold:hold:v1", JSON.stringify({
    version: 5, ore: 10, bars: 1, essence: 0, marks: 0, dust: 0, runs: 0,
    mineLevel: 0, forgeLevel: 0, bowUpgrade: 0, arcanumLevel: 0, yardLevel: 0,
    selectedContract: "ring", preparedRerolls: 0,
    masteries: { path: 0, reach: 0, dash: 0 },
    gearOwned: {}, gearEquipped: { weapon: null, charm: null, mantle: null },
    stationData: 5, coreStage: 1, sortieProtocol: "fluxreserve",
    lastAt: 1000 }));
  engine.loadHold(1000);
  const gesperrtBereinigt = engine.H.sortieProtocol === "none" &&
    engine.H.coreStage === 1 && engine.H.stationData === 5;

  // Kosten und Sequenz der drei Stufen.
  Object.assign(engine.H, { stationData: 99, ore: 500, bars: 500, coreStage: 0 });
  const kostenVorher = { o: engine.H.ore, b: engine.H.bars, sd: engine.H.stationData };
  const kauf1 = engine.upgradeCore(), kauf2 = engine.upgradeCore(),
        kauf3 = engine.upgradeCore(), kauf4 = engine.upgradeCore();
  const c = engine.STATION.CORE_COSTS;
  const kostenStimmen = engine.H.coreStage === 3 && kauf1 && kauf2 && kauf3 && !kauf4 &&
    engine.H.ore === kostenVorher.o - (c[0].ore||0) &&
    engine.H.bars === kostenVorher.b - (c[1].bars||0) - (c[2].bars||0) &&
    engine.H.stationData === kostenVorher.sd - (c[0].daten + c[1].daten + c[2].daten);
  const alleFreigeschaltet = engine.STATION.PROTOCOLS.every(
    p => p.stufe <= engine.H.coreStage);

  // Wahl nur aus Freigeschaltetem; nie waehrend eines Laufs.
  const sperreLaufend = (() => {
    engine.newRun(180, 1, "ring"); engine.S.running = true;
    const ok = engine.setProtocol("klingenfokus") === false;
    engine.S.running = false; return ok; })();
  const wahlNone = engine.setProtocol("none") === true;
  const unbekanntAbgelehnt = engine.setProtocol("nexusmodus") === false;

  // Klingenfokus: erster Zug enthaelt LEGALE Orbitklingen-Aufwertung.
  engine.newRun(480, 20260827, "ring", { protocol: "klingenfokus" });
  engine.S.running = true; engine.S.W = { bogen: 1 }; engine.S.Pa = {};
  engine.rebuildGrid();
  const angebot1 = engine.buildOffer();
  const injektionLegal = !!angebot1[0] && angebot1[0].type === "w" &&
    angebot1[0].w.id === "bogen" && angebot1[0].lv === 1 && angebot1.length <= 3;
  const rerollErste = engine.buildOffer()[0];
  const rerollBewahrtFokus = rerollErste.type === "w" && rerollErste.w.id === "bogen";
  engine.applyOffer(rerollErste);
  const zweitesErste = engine.buildOffer()[0];
  const nurErsterZug = !(zweitesErste.type === "w" && zweitesErste.w.id === "bogen");
  engine.newRun(480, 20260827, "ring", { protocol: "klingenfokus" });
  engine.S.running = true; engine.S.W = { bogen: 5 }; engine.S.Pa = { sehne: 3 };
  const evoAngebot = engine.buildOffer();
  const keinEvoBypass = evoAngebot[0].type === "evo" && evoAngebot[0].w.id === "bogen";

  // Fluxreserve: exakt +1 Start-Reroll; stapelt mit zwei vorbereiteten.
  engine.newRun(180, 20260827, "ring", { protocol: "fluxreserve" });
  const fluxreservePlusEins = engine.S.rerolls === 2;
  Object.assign(engine.H, { sortieProtocol: "fluxreserve", preparedRerolls: 2 });
  engine.begin(180);
  const stapelGesamt = engine.S.rerolls === 4;
  engine.H.sortieProtocol = "none"; engine.H.preparedRerolls = 0; engine.saveHold();

  // Bergungsscanner: Laden in 5 s; Fund bevorzugt Unbesessenes; Vollbesitz ->
  // Duplikatpfad.
  engine.newRun(480, 20260828, "ring", { protocol: "bergungsscanner" });
  engine.S.running = true; engine.S.hp = engine.S.maxhp = 1e9;
  engine.S.events.boss = true;
  engine.S.events.elite = engine.CFG.ELITE_AT.length;
  engine.S.W = {};
  for (let i=0,n=Math.round(150.5/TICK);i<n;i++) engine.tick(TICK);
  engine.S.x = engine.S.signal.x; engine.S.y = engine.S.signal.y;
  engine.rebuildGrid();
  for (let i=0,n=Math.round(5.05/TICK);i<n && engine.S.signal.status==="offen";i++)
    engine.tick(TICK);
  const scannerLaedtFuenf = Math.abs(engine.signalStatus().geladen - 5) < 0.06 ||
    engine.signalStatus().status === "gesichert";
  const besitzVorher = JSON.stringify(engine.H.gearOwned);
  const fundNeu = engine.grantGear(null, true);
  const bevorzugtUnbesessen = fundNeu && !fundNeu.duplicate;
  for(const g of engine.GEAR) engine.H.gearOwned[g.id] = 1;
  const fundDuplikat = engine.grantGear(null, true);
  const vollbesitzDuplikatPfad = fundDuplikat && fundDuplikat.duplicate === true;
  engine.H.gearOwned = JSON.parse(besitzVorher);

  stationCoreFlow = sanitiert && gesperrtBereinigt && kauf1 && kauf2 && kauf3 &&
    kostenStimmen && alleFreigeschaltet && sperreLaufend && wahlNone &&
    unbekanntAbgelehnt && injektionLegal && rerollBewahrtFokus && nurErsterZug && keinEvoBypass &&
    fluxreservePlusEins && stapelGesamt && scannerLaedtFuenf &&
    bevorzugtUnbesessen && vollbesitzDuplikatPfad;
  stationCoreDiagnostics = { sanitiert, gesperrtBereinigt, kostenStimmen,
    alleFreigeschaltet, sperreLaufend, wahlNone, unbekanntAbgelehnt,
    injektionLegal, rerollBewahrtFokus, nurErsterZug, keinEvoBypass, fluxreservePlusEins,
    stapelGesamt, scannerLaedtFuenf, bevorzugtUnbesessen, vollbesitzDuplikatPfad,
    fund: fundNeu ? fundNeu.name : null };
  const snap = JSON.parse(metaSnapshot);
  for (const k of Object.keys(snap)) engine.H[k] = snap[k];
  engine.saveHold();
} catch (error) {
  stationError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-04 / D-042 Gate C: Stations-DOM/UX-Vertrag ---------------
let stationDomContract = false;
let stationDomError = "";
let stationDomDiagnostics = null;
try {
  const hotspots = ["hsMine","hsForge","hsArcanum","hsYard","hsArmory","hsMap"];
  const sechsHotspots = hotspots.every(id =>
    (html.match(new RegExp('id="'+id+'"',"g"))||[]).length === 1) &&
    (html.match(/id="hsCore"/g)||[]).length === 1;
  const panels = ["core","mine","forge","arcanum","yard","armory","map"];
  const panelVorhanden = panels.every(p => html.includes('data-panel="'+p+'"'));
  const aktionen = ["btnMine","btnForge","btnArcanum","btnYard","btnBowUpgrade",
    "btnPrepareReroll","btnMasteryPath","btnMasteryReach","btnMasteryDash",
    "btnStart","btnStart3","btnCopyLast","btnCoreUpgrade","contractgrid"]
    .every(id => html.includes('id="'+id+'"'));
  const keineDoppelteKartenwand = !html.includes('id="contractgrid2"') &&
    !html.includes('id="btnStart2"') && !html.includes('id="btnStart32"') &&
    !html.includes('class="holdsortie"');
  engine.showStartMenu();
  const startEl = globalThis.document.getElementById("start");
  const panelAttr = () => startEl.getAttribute("data-panel") ?? null;
  const zuBegin = panelAttr() === null;
  engine.openPanel("mine");
  const offenMine = panelAttr() === "mine";
  engine.openPanel("yard");
  const wechselt = panelAttr() === "yard";
  engine.openPanel("yard");
  const bleibtOffen = panelAttr() === "yard";
  const lampenKlassen = hotspots.every(id => {
    const n = globalThis.document.getElementById(id);
    return /st-(off|run|ready)/.test(n.className || "");
  });
  // D-043: Der Kern ist ein Overlay auf dem SVG-Baukörper; die Stufenklasse
  // sitzt am Button (class="hs core st-N") und spiegelt META.coreStage.
  const kernStufen = /class="hs core st-\d"/.test(html);
  const protokollZeile = html.includes('id="protocolchips"') &&
    html.includes('id="protocolnote"');
  stationDomContract = sechsHotspots && panelVorhanden && aktionen && keineDoppelteKartenwand &&
    zuBegin && offenMine && wechselt && bleibtOffen && lampenKlassen &&
    kernStufen && protokollZeile;
  stationDomDiagnostics = { sechsHotspots, panelVorhanden, aktionen, keineDoppelteKartenwand,
    zuBegin, offenMine, wechselt, bleibtOffen, lampenKlassen, kernStufen,
    protokollZeile };
} catch (error) {
  stationDomError = error instanceof Error ? error.message : String(error);
}



// --- EH-2026-08-25-04: Baseline-Isolation -----------------------------------
// Ohne gewaehltes Protokoll muessen die serialisierten neun Seed-Laeufe UND
// der fruehe Lauf bis 4:10 bitidentisch zum Ausgangscommit d78fdbe bleiben.
// Die Fingerprints wurden dort erfasst (Kartenzuege, Kills,
// Familienmischung, Build, Elite-Wahlen, Schadensverteilung) und belegen,
// dass Signal-Spawn (Hash statt RNG), Hintergrund und Stationsfelder
// keinerlei Simulationsrueckwirkung haben.
const BASELINE_FP = Object.freeze([
  Object.freeze({seed:1701, fp:"{\"p\":[32.316666666666116,77.38333333333023,113.88333333332815,143.2000000000061,185.68333333337324,226.38333333340563,299.7666666667227,355.9333333333383,374.599999999988,390.7499999999733,428.43333333327234,465.41666666657204],\"k\":3189,\"f\":[2979,1037,542,554,283],\"W\":{\"bogen\":3,\"kugel\":3,\"frost\":4},\"Pa\":{\"umhang\":2},\"e\":[],\"b\":{\"fury\":2,\"stride\":0,\"harvest\":0,\"guard\":0},\"d\":[42653.0691,0,35331.2924,0,0,14228.1909]}"}),
  Object.freeze({seed:1709, fp:"{\"p\":[27.76666666666637,75.499999999997,112.19999999999492,138.3833333333356,164.5500000000231,187.33333333337455,213.75000000006224,239.26666666674922,276.3333333334107,312.7833333333775,337.7833333333548,358.28333333333615,364.5499999999971,369.9166666666589,380.76666666664903,387.49999999997624,397.46666666663384,406.5166666666256,415.88333333328376,419.9999999999467,426.68333333327394,432.4999999999353,440.6166666665946,450.01666666658605,460.18333333324347,471.04999999990025],\"k\":8839,\"f\":[5849,1846,1012,1074,574],\"W\":{\"bogen\":5,\"blitz\":5,\"frost\":5},\"Pa\":{\"magnet\":1,\"sehne\":4,\"amulett\":3,\"umhang\":2},\"e\":[\"bogen\",\"blitz\"],\"b\":{\"fury\":0,\"stride\":0,\"harvest\":2,\"guard\":0},\"d\":[209333.1319,0,0,126861.5482,0,11960.8681]}"}),
  Object.freeze({seed:1721, fp:"{\"p\":[30.68333333333287,57.36666666666469,101.54999999999552,133.58333333333178,174.5833333333644,223.80000000007024,291.4166666667303,352.0000000000085,363.3833333333315,384.1833333333126,410.99999999995487,441.14999999992745,451.5833333332513,461.399999999909,473.7833333332311],\"k\":4438,\"f\":[3689,1222,674,716,373],\"W\":{\"bogen\":5,\"kugel\":5,\"frost\":2},\"Pa\":{\"sehne\":3,\"linse\":1},\"e\":[\"bogen\"],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":1,\"guard\":0},\"d\":[88717.3336,0,36078.7956,0,0,13145.9482]}"}),
  Object.freeze({seed:1733, fp:"{\"p\":[35.81666666666592,86.24999999999639,125.58333333332749,152.18333333334658,210.86666666672662,279.0666666667415,363.8666666666644,408.28333333329067,418.2333333332816,468.766666666569],\"k\":2024,\"f\":[2121,649,362,414,185],\"W\":{\"bogen\":5,\"frost\":1,\"klinge\":2},\"Pa\":{\"wetz\":1,\"sehne\":2},\"e\":[],\"b\":{\"fury\":2,\"stride\":0,\"harvest\":0,\"guard\":0},\"d\":[48031.315,0,0,0,4180.0387,6891.0176]}"}),
  Object.freeze({seed:1741, fp:"{\"p\":[29.83333333333292,55.81666666666478,81.01666666666335,106.93333333332855,140.0500000000036,161.85000000002094,202.60000000005337,237.66666666674794,252.5666666667598,293.7166666667282,313.3500000000437,340.68333333335215,366.66666666666185,381.13333333331536,388.6499999999752,395.23333333330254,400.4333333332978,408.1999999999574,414.2833333332852,420.2999999999464,426.7999999999405,433.949999999934,442.69999999992604,451.6833333332512,462.7166666665745,473.4666666665647],\"k\":10462,\"f\":[6951,2191,1253,1288,691],\"W\":{\"bogen\":5,\"kugel\":5,\"blitz\":5},\"Pa\":{\"federung\":1,\"umhang\":1,\"wetz\":1,\"linse\":3,\"amulett\":3,\"sehne\":2},\"e\":[\"kugel\",\"blitz\"],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":0,\"guard\":1},\"d\":[48914.5538,0,269782.2018,92506.1053,0,0]}"}),
  Object.freeze({seed:1753, fp:"{\"p\":[32.76666666666609,51.549999999998356,77.14999999999691,106.38333333332858,135.16666666666637,159.7166666666859,188.00000000004175,216.56666666673115,236.6166666667471,266.0166666667534,297.75000000005787,320.71666666670365,349.16666666667777,359.8833333333347,374.6999999999879,391.96666666663884,397.2833333333007,400.8833333332974,406.5166666666256,412.333333333287,419.4499999999472,426.33333333327425,434.5333333332668,444.16666666659137,451.0333333332518,458.7333333332448,467.68333333323665,477.6333333332276],\"k\":13110,\"f\":[8452,2832,1534,1601,877],\"W\":{\"bogen\":5,\"blitz\":5,\"kugel\":5},\"Pa\":{\"sehne\":3,\"amulett\":3,\"linse\":4,\"wetz\":2,\"federung\":2},\"e\":[\"bogen\",\"blitz\",\"kugel\"],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":0,\"guard\":1},\"d\":[192398.4039,0,197579.5063,147177.1432,0,0]}"}),
  Object.freeze({seed:1777, fp:"{\"p\":[27.64999999999971,64.53333333333096,98.04999999999572,130.06666666666231,178.88333333336783,227.3166666667397,273.3000000000801,333.183333333359,350.3000000000101,366.9666666666616,372.4999999999899,381.8333333333147,387.66666666664275,393.0833333333045,397.7166666666336,404.71666666662725,409.3999999999563,415.16666666661774,420.4499999999463,426.36666666660756,433.68333333326757,440.28333333326157,448.0833333332545,455.8666666665807,465.54999999990525,477.3999999998945],\"k\":10133,\"f\":[6709,2258,1202,1305,669],\"W\":{\"bogen\":3,\"frost\":5,\"kugel\":5},\"Pa\":{\"wetz\":5,\"linse\":3,\"umhang\":3},\"e\":[\"kugel\",\"frost\"],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":0,\"guard\":1},\"d\":[38733.2131,0,223029.1818,0,0,138873.6456]}"}),
  Object.freeze({seed:1789, fp:"{\"p\":[35.18333333333262,52.799999999998285,80.24999999999673,115.33333333332807,145.3666666666745,180.9000000000361,210.36666666672622,244.11666666675308,287.41666666673393,318.4333333333724,342.1500000000175,370.31666666665853,386.39999999997724,401.2333333332971,415.61666666661733,429.76666666660446,443.1166666665923,454.2333333332489,459.4499999999108,465.7333333332384,472.76666666656536],\"k\":6834,\"f\":[5045,1644,882,960,481],\"W\":{\"bogen\":5,\"blitz\":5,\"klinge\":3},\"Pa\":{\"wetz\":1,\"magnet\":1,\"sehne\":3,\"amulett\":3},\"e\":[\"bogen\",\"blitz\"],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":1,\"guard\":0},\"d\":[155102.4869,0,0,75590.9465,3111.5178,0]}"}),
  Object.freeze({seed:2474367456, fp:"{\"p\":[32.749999999999424,75.79999999999698,129.96666666666223,159.70000000001923,180.80000000003602,222.5000000000692,239.7833333334163,280.33333333340704,330.16666666669505,351.65000000000884,384.8999999999786,429.39999999993813,456.66666666658,476.8166666665617],\"k\":4515,\"f\":[3607,1114,636,662,331],\"W\":{\"bogen\":5,\"blitz\":1,\"klinge\":4},\"Pa\":{\"linse\":2,\"sehne\":3},\"e\":[\"bogen\"],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":0,\"guard\":1},\"d\":[96390.2286,0,0,28179.7452,16294.1061,0]}"}),
]);
const EARLY_FP = Object.freeze([
  Object.freeze({seed:1701, fp:"{\"p\":[32.316666666666116,77.38333333333023,113.88333333332815,143.2000000000061,185.68333333337324,226.38333333340563],\"k\":1057,\"f\":[1104,209,102,104,43],\"W\":{\"bogen\":2,\"kugel\":2,\"frost\":1},\"Pa\":{\"umhang\":2},\"e\":[],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":0,\"guard\":0},\"d\":[11297.3214,0,5145.1471,0,0,1057.5411]}"}),
  Object.freeze({seed:1709, fp:"{\"p\":[27.76666666666637,75.499999999997,112.19999999999492,138.3833333333356,164.5500000000231,187.33333333337455,213.75000000006224,239.26666666674922],\"k\":1412,\"f\":[1368,245,108,145,56],\"W\":{\"bogen\":4,\"blitz\":3,\"frost\":1},\"Pa\":{\"magnet\":1},\"e\":[],\"b\":{\"fury\":0,\"stride\":0,\"harvest\":1,\"guard\":0},\"d\":[16258.3495,0,0,7848.3268,0,943.2429]}"}),
  Object.freeze({seed:1721, fp:"{\"p\":[30.68333333333287,57.36666666666469,101.54999999999552,133.58333333333178,174.5833333333644,223.80000000007024],\"k\":1220,\"f\":[1203,247,116,127,50],\"W\":{\"bogen\":3,\"kugel\":2,\"frost\":2},\"Pa\":{},\"e\":[],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":0,\"guard\":0},\"d\":[13195.7733,0,5440.0879,0,0,1352.3635]}"}),
  Object.freeze({seed:1733, fp:"{\"p\":[35.81666666666592,86.24999999999639,125.58333333332749,152.18333333334658,210.86666666672662],\"k\":868,\"f\":[936,150,70,104,26],\"W\":{\"bogen\":2,\"frost\":1,\"klinge\":2},\"Pa\":{\"wetz\":1},\"e\":[],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":0,\"guard\":0},\"d\":[11460.8261,0,0,0,618.4401,1613.595]}"}),
  Object.freeze({seed:1741, fp:"{\"p\":[29.83333333333292,55.81666666666478,81.01666666666335,106.93333333332855,140.0500000000036,161.85000000002094,202.60000000005337,237.66666666674794],\"k\":1666,\"f\":[1555,302,137,134,55],\"W\":{\"bogen\":1,\"kugel\":3,\"blitz\":2},\"Pa\":{\"federung\":1,\"umhang\":1,\"wetz\":1},\"e\":[],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":0,\"guard\":0},\"d\":[11934.7947,0,6648.0366,10718.9987,0,0]}"}),
  Object.freeze({seed:1753, fp:"{\"p\":[32.76666666666609,51.549999999998356,77.14999999999691,106.38333333332858,135.16666666666637,159.7166666666859,188.00000000004175,216.56666666673115,236.6166666667471],\"k\":1805,\"f\":[1579,297,142,151,56],\"W\":{\"bogen\":2,\"blitz\":3,\"kugel\":2},\"Pa\":{\"sehne\":2,\"amulett\":1},\"e\":[],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":0,\"guard\":0},\"d\":[13326.8603,0,5806.5894,13863.3519,0,0]}"}),
  Object.freeze({seed:1777, fp:"{\"p\":[27.64999999999971,64.53333333333096,98.04999999999572,130.06666666666231,178.88333333336783,227.3166666667397],\"k\":1244,\"f\":[1319,261,112,131,54],\"W\":{\"bogen\":1,\"frost\":1,\"kugel\":3},\"Pa\":{\"wetz\":2},\"e\":[],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":0,\"guard\":0},\"d\":[11723.5616,0,6526.3177,0,0,2678.5164]}"}),
  Object.freeze({seed:1789, fp:"{\"p\":[35.18333333333262,52.799999999998285,80.24999999999673,115.33333333332807,145.3666666666745,180.9000000000361,210.36666666672622,244.11666666675308],\"k\":1466,\"f\":[1382,284,105,137,53],\"W\":{\"bogen\":4,\"blitz\":2,\"klinge\":1},\"Pa\":{\"wetz\":1,\"magnet\":1},\"e\":[],\"b\":{\"fury\":0,\"stride\":0,\"harvest\":1,\"guard\":0},\"d\":[14143.5197,0,0,10557.0125,264.7701,0]}"}),
  Object.freeze({seed:2474367456, fp:"{\"p\":[32.749999999999424,75.79999999999698,129.96666666666223,159.70000000001923,180.80000000003602,222.5000000000692,239.7833333334163],\"k\":1299,\"f\":[1261,238,117,113,50],\"W\":{\"bogen\":3,\"blitz\":1,\"klinge\":2},\"Pa\":{\"linse\":2},\"e\":[],\"b\":{\"fury\":1,\"stride\":0,\"harvest\":0,\"guard\":0},\"d\":[14247.1149,0,0,6463.9749,1746.4894,0]}"}),
]);
let baselineIsolated = false;
let baselineIsoError = "";
let baselineIsoDiagnostics = null;
try {
  const fpOf = (r) => JSON.stringify({ p:r.picks, k:r.kills, f:r.famSpawns,
    W:r.W, Pa:r.Pa, e:r.evo, b:r.boons, d:r.dmgW.map(x=>+x.toFixed(4)) });
  const abweichend = [];
  for (const ref of BASELINE_FP){
    const r = engine.headlessRun(480, { seed:ref.seed, xpC:engine.CFG.XP_C,
      xpK:engine.CFG.XP_K, smart:true, immortal:true });
    if (fpOf(r) !== ref.fp) abweichend.push("480/" + ref.seed);
  }
  for (const ref of EARLY_FP){
    const r = engine.headlessRun(250, { seed:ref.seed, xpC:engine.CFG.XP_C,
      xpK:engine.CFG.XP_K, smart:true, immortal:true });
    if (fpOf(r) !== ref.fp) abweichend.push("250/" + ref.seed);
  }
  baselineIsolated = abweichend.length === 0 &&
    BASELINE_FP.length === 9 && EARLY_FP.length === 9;
  baselineIsoDiagnostics = { laeufe: BASELINE_FP.length + EARLY_FP.length,
    ok: abweichend.length === 0, abweichend };
} catch (error) {
  baselineIsoError = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-05 / D-043: combatArtV4 ----------------------------------
// Neue Wurfklinge in Projektil, Karte und HUD; 4 Glanzphasen x 24 Richtungen
// mit deterministischem Phasenversatz; genau ein komponiertes drawImage je
// Klingenprojektil; keine permanente lightRadius-Kontur; Kulisse beruhigt
// (keine Mikrosterne/Leitungen in der Kachel, seltene Landmarks); Hot-Loop
// ohne Zeitquelle/Zufall im Klingenpfad.
let combatArtV4 = false;
let artV4Error = "";
let artV4Diagnostics = null;
try {
  // 1) Klinge: neuer Sprite-Bau, EVO-Variante, alte Sichel restlos entfernt.
  const bladeBau = html.slice(html.indexOf("const BLADE_V2_SIZE"),
                              html.indexOf("const ENEMY_DIRECTIONS"));
  const neueForm = html.includes("function drawBladeV2") &&
    bladeBau.includes("SPR.orbBlade.push([])") &&
    bladeBau.includes("for (let p=0;p<4;p++)") &&
    bladeBau.includes("SPR.orbBladeEvo[i].push(cv)") &&
    !html.includes("g.arc(0,0,13,-0.95,0.95)");
  // 2) Flug: genau ein drawImage, EVO-Reihe, deterministischer Phasenversatz.
  const flugStart = html.indexOf("if (P.src[i]===W_IDX.bogen && SPR.orbBlade.length)");
  const flugEnde = html.indexOf("else ctx.drawImage(SPR.arrow[idx]", flugStart);
  const flug = flugStart >= 0 ? html.slice(flugStart, flugEnde) : "";
  const flugSauber = flug.includes("const ph = ((S.visualT*3 + i*0.41)*4 | 0) % 4") &&
    flug.includes("SPR.orbBladeEvo : SPR.orbBlade") &&
    (flug.match(/ctx\.drawImage/g) || []).length === 1 &&
    !flug.includes("Math.random") && !flug.includes("Date.now");
  // 3) Karte + HUD teilen die Silhouette.
  const glyphGeteilt = html.includes("const BLADE_GLYPH") &&
    html.includes("bogen:'<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\">'+BLADE_GLYPH") &&
    html.includes('class="cardglyph"') && html.includes("weaponGlyph(o.w.id)");
  // 4) Kein permanenter Avatar-Radiusring mehr; lokale kantenlose Aura bleibt.
  const ringWeg = !html.includes("lr*0.985") &&
    !html.includes("'rgba(127,212,232,0.05)'") &&
    html.includes("lr*0.55");
  // 5) Kulisse beruhigt: keine Mikrosterne/Leitungen in der Kachel,
  //    Landmarks selten, Sternebene klein und schwach.
  const kulisseRuhig = !html.includes("for(let i=0;i<26;i++)") &&
    !html.includes("const len=60+visualHash") &&
    html.includes("h>0.88") && html.includes("h>0.965") &&
    /for\(let i=0;i<12;i\+\+\)/.test(html) &&
    !html.includes("rgba(214,228,255,");
  combatArtV4 = neueForm && flugSauber && glyphGeteilt && ringWeg && kulisseRuhig;
  artV4Diagnostics = { neueForm, flugSauber, glyphGeteilt, ringWeg, kulisseRuhig };
} catch (error) {
  artV4Error = error instanceof Error ? error.message : String(error);
}

// --- EH-2026-08-25-05 / D-043: stationSceneV2 -------------------------------
// Genau ein Stations-Szenengraph (Inline-SVG) mit sechs physischen Modulen,
// Kern mit sichtbaren Ausbaustufen, Datenfuellstand und Protokollprojektion.
// Keine generischen Kreisbuttons mehr als Hauptdarstellung; genau ein Drawer;
// alle bisherigen Aktions-IDs genau einmal. Interaktionstests pruefen Fach-
// wirkung UND den unmittelbar aktualisierten Szenenzustand.
let stationSceneV2 = false;
let stationSceneError = "";
let stationSceneDiagnostics = null;
try {
  const svgKlassen = (enthaelt) => {
    const svg = globalThis.document.getElementById("stationSvg");
    return svg.className.split(" ").includes(enthaelt);
  };
  const modKlasse = (id) => {
    const n = globalThis.document.getElementById(id);
    return n ? n.className : "";
  };

  // 1) Struktur: ein Szenengraph, sechs Baukoerper, Kern, Stufen, Daten,
  //    Protokoll; alte D-042-Deko und Kreisbutton-Optik restlos entfernt.
  const szenenGraph = (html.match(/id="stationSvg"/g) || []).length === 1 &&
    ["modMine","modForge","modArcanum","modYard","modArmory","modMap",
     "coreBody","stage1","stage2","stage3","datenLeiste","protoProjektion",
     "leitung-mine","leitung-forge","leitung-arcanum","leitung-yard",
     "leitung-armory","leitung-map"].every(id => html.includes('id="'+id+'"'));
  const alteDekoWeg = !html.includes("scene-stars") && !html.includes("scene-ring") &&
    !html.includes("conduit-l") && !html.includes('class="hotspot') &&
    !html.includes("core-orb");
  // 2) Genau ein Drawer; Bottom-Sheet auf kleinen Breiten.
  const drawerEin = (html.match(/class="dpanel"/g) || []).length === 7 &&
    html.includes(".detailpanels{position:absolute;right:10px") &&
    html.includes("@media (max-width:700px)") &&
    html.includes("bottom:8px");
  // 3) Aktions-IDs genau einmal vorhanden.
  const aktionenEinmal = ["btnMine","btnForge","btnArcanum","btnYard","btnBowUpgrade",
    "btnPrepareReroll","btnMasteryPath","btnMasteryReach","btnMasteryDash",
    "btnStart","btnStart3","btnCopyLast","btnCoreUpgrade","contractgrid",
    "protocolchips","protocolnote","btnLaunch","btnArrivalOk"].every(id =>
    (html.match(new RegExp('id="'+id+'"',"g")) || []).length === 1);

  // 4) Interaktion: Reparatur schaltet Baukoerper + Leitung sofort um.
  engine.begin(180, "ring");                 // neutraler Zustand, kein Run
  engine.H.mineLevel = 0; engine.H.forgeLevel = 1;
  engine.H.forgeWorking = true; engine.H.forgeProgress = 8; engine.H.forgeStored = 0;
  engine.H.ore = 0; engine.renderHold();
  const mineOffline = modKlasse("modMine").includes("mod-offline") &&
    modKlasse("leitung-mine").includes("off");
  engine.mineAction();                        // kostenlose Reparatur
  const mineOnline = !modKlasse("modMine").includes("mod-offline") &&
    !modKlasse("leitung-mine").includes("off");
  // 5) Produzierend -> abholbereit -> eingesammelt, jeweils am Baukoerper.
  const forgeLaeuft = modKlasse("modForge").includes("mod-run");
  engine.H.forgeStored = 2; engine.renderHold();
  const forgeBereit = modKlasse("modForge").includes("mod-ready");
  engine.forgeAction();                       // einsammeln (ore 0 -> wartet danach)
  const forgeWartet = modKlasse("modForge").includes("mod-run") &&
    !modKlasse("modForge").includes("mod-ready");
  // 6) Kernupgrade baut sichtbare Stufen aus.
  Object.assign(engine.H, { stationData: 9, ore: 99, bars: 99, coreStage: 0 });
  const k1 = engine.upgradeCore(), k2 = engine.upgradeCore(), k3 = engine.upgradeCore();
  const kernSichtbar = k1 && k2 && k3 && svgKlassen("core-3") &&
    !engine.upgradeCore();
  // 7) Protokollwahl projiziert am Kern (nur zwischen Sortien moeglich).
  engine.S.running = false;
  engine.setProtocol("klingenfokus");
  const protoSichtbar = svgKlassen("proto-klingenfokus");
  engine.setProtocol("none");
  // 8) Ankunftsrueckmeldung: erscheint einmal, markiert gesehen, fuehrt zum Kern.
  localStorage.setItem("emberhold:arrival:v1", JSON.stringify({
    savedAt: 777, dateien: 1, signal: "gesichert", nexus: true, ore: 12, seen: false }));
  engine.showStartMenu();
  const ankunftGezeigt = (globalThis.document.getElementById("arrival").className||"").includes("on");
  const ankunftGesehen = JSON.parse(localStorage.getItem("emberhold:arrival:v1")).seen === true;
  globalThis.document.getElementById("btnArrivalOk").onclick();
  const fuehrtZumKern = (globalThis.document.getElementById("start")
    .getAttribute("data-panel")) === "core";
  const ankunftEinmal = JSON.parse(localStorage.getItem("emberhold:arrival:v1")).seen === true;

  stationSceneV2 = szenenGraph && alteDekoWeg && drawerEin && aktionenEinmal &&
    mineOffline && mineOnline && forgeLaeuft && forgeBereit && forgeWartet &&
    kernSichtbar && protoSichtbar && ankunftGezeigt && ankunftGesehen &&
    fuehrtZumKern && ankunftEinmal;
  stationSceneDiagnostics = { szenenGraph, alteDekoWeg, drawerEin, aktionenEinmal,
    mineOffline, mineOnline, forgeLaeuft, forgeBereit, forgeWartet,
    kernSichtbar, protoSichtbar, ankunftGezeigt, ankunftGesehen,
    fuehrtZumKern, ankunftEinmal };
} catch (error) {
  stationSceneError = error instanceof Error ? error.message : String(error);
}

const output = {
  pass: report.pass && evolutionReachable && reproducible && stationaryPressure && artAssets && visualState && uprightCharacters && singlePassRendering && combatReadability && slotLayout && uniqueChainTargets && bossTargeting && bossDurability && singleProjectileHit && uniqueSpatialQuery && singleExplosion && uxFlow && holdFlow && contractFlow && holdExpansion && equipmentFlow && evolutionCatalog && eliteChoices && aspectIndependent && minCombatHeight && bossInsideCombat && telemetrySeparated && visibleCountsCulling && fpsMetrics && reportHardened && lastRunReportFlow && healOrbFlow && holdGoalLadder && oreCurve && earlyLossGuard && bossCombatPocket && bossLocatorState && compactCombatHud && evolutionCompletion && weaponDamageReport && lateProgression && weaponRoles && presentationLayer && renderCostContract && combatUiV2 && finalBossFlow && evolutionFocusHud && foeSilhouettes && nexusBenchmark && combatArtV3 && sectorObjectiveFlow && stationCoreFlow && stationDomContract && baselineIsolated && combatArtV4 && stationSceneV2,
  checks: { ...report.checks, evolutionReachable, reproducible, stationaryPressure, artAssets, visualState, uprightCharacters, singlePassRendering, combatReadability, slotLayout, uniqueChainTargets, bossTargeting, bossDurability, singleProjectileHit, uniqueSpatialQuery, singleExplosion, uxFlow, holdFlow, contractFlow, holdExpansion, equipmentFlow, evolutionCatalog, eliteChoices, aspectIndependent, minCombatHeight, bossInsideCombat, telemetrySeparated, visibleCountsCulling, fpsMetrics, reportHardened, lastRunReportFlow, healOrbFlow, holdGoalLadder, oreCurve, earlyLossGuard, bossCombatPocket, bossLocatorState, compactCombatHud, evolutionCompletion, weaponDamageReport, lateProgression, weaponRoles, presentationLayer, renderCostContract, combatUiV2, finalBossFlow, evolutionFocusHud, foeSilhouettes, nexusBenchmark, combatArtV3, sectorObjectiveFlow, stationCoreFlow, stationDomContract, baselineIsolated, combatArtV4, stationSceneV2 },
  targets: report.targets,
  ueberschuss: report.ueberschuss,
  seeds: report.seeds,
  summary: { ...report.summary, evolutionRuns, evolutionSeeds: report.seeds.length,
    stationaryDeath: stationaryRun.died,
    feedbackSeed: feedbackRun ? { kills: feedbackRun.kills, picks: feedbackRun.total,
      simSpitze: feedbackRun.peak, simRadius: feedbackRun.nearby, evo: feedbackRun.evo } : null,
    seedRuns: report.runs.baseline.map(r=>({seed:r.seed,picks:r.total,kills:r.kills,
      level:r.level,evolutionen:r.evo.length})),
    eliteChoiceDiagnostics,
    viewports: viewportRows },
};
if (aspectError) output.aspectError = aspectError;
if (telemetryError) output.telemetryError = telemetryError;
if (visibleError) output.visibleError = visibleError;
if (fpsError) output.fpsError = fpsError;
if (lastRunReportError) output.lastRunReportError = lastRunReportError;
if (healOrbError) output.healOrbError = healOrbError;
if (holdGoalError) output.holdGoalError = holdGoalError;
if (oreCurveError) output.oreCurveError = oreCurveError;
if (earlyLossError) output.earlyLossError = earlyLossError;
if (bossPocketError) output.bossPocketError = bossPocketError;
if (bossLocatorError) output.bossLocatorError = bossLocatorError;
if (finalBossError) output.finalBossError = finalBossError;
if (nexusBenchError) output.nexusBenchError = nexusBenchError;
if (evoFocusError) output.evoFocusError = evoFocusError;
if (foeSilhouetteError) output.foeSilhouetteError = foeSilhouetteError;
if (artV3Error) output.artV3Error = artV3Error;
if (sectorError) output.sectorError = sectorError;
if (stationError) output.stationCoreError = stationError;
if (stationDomError) output.stationDomError = stationDomError;
if (baselineIsoError) output.baselineIsoError = baselineIsoError;
if (artV4Error) output.artV4Error = artV4Error;
if (stationSceneError) output.stationSceneError = stationSceneError;
if (compactHudError) output.compactHudError = compactHudError;
if (evolutionCompletionError) output.evolutionCompletionError = evolutionCompletionError;
if (weaponDamageError) output.weaponDamageError = weaponDamageError;
if (lateProgressionError) output.lateProgressionError = lateProgressionError;
if (weaponRolesError) output.weaponRolesError = weaponRolesError;
if (presentationError) output.presentationError = presentationError;
if (renderCostError) output.renderCostError = renderCostError;
if (combatUiV2Error) output.combatUiV2Error = combatUiV2Error;
if (renderCostDiagnostics) output.summary.renderCost = renderCostDiagnostics;
if (combatUiV2Diagnostics) output.summary.combatUiV2 = combatUiV2Diagnostics;
if (lastRunReportDiagnostics) output.summary.lastRunReport = lastRunReportDiagnostics;
if (presentationDiagnostics) output.summary.presentation = presentationDiagnostics;
if (weaponRolesDiagnostics) output.summary.weaponRoles = weaponRolesDiagnostics;
if (lateProgressionDiagnostics) output.summary.lateProgression = lateProgressionDiagnostics;
if (bossPocketDiagnostics) output.summary.bossPocket = bossPocketDiagnostics;
if (finalBossDiagnostics) output.summary.finalBoss = finalBossDiagnostics;
if (nexusBenchDiagnostics) output.summary.nexusBenchmark = nexusBenchDiagnostics;
if (evoFocusDiagnostics) output.summary.evoFocus = evoFocusDiagnostics;
if (foeSilhouetteDiagnostics) output.summary.foeSilhouettes = foeSilhouetteDiagnostics;
if (artV3Diagnostics) output.summary.combatArtV3 = artV3Diagnostics;
if (sectorDiagnostics) output.summary.sectorObjective = sectorDiagnostics;
if (stationCoreDiagnostics) output.summary.stationCore = stationCoreDiagnostics;
if (stationDomDiagnostics) output.summary.stationDom = stationDomDiagnostics;
if (baselineIsoDiagnostics) output.summary.baselineIsolated = baselineIsoDiagnostics;
if (artV4Diagnostics) output.summary.combatArtV4 = artV4Diagnostics;
if (stationSceneDiagnostics) output.summary.stationSceneV2 = stationSceneDiagnostics;
if (bossLocatorDiagnostics) output.summary.bossLocator = bossLocatorDiagnostics;
if (compactHudDiagnostics) output.summary.compactHud = compactHudDiagnostics;
if (evolutionCompletionDiagnostics) output.summary.evolutionCompletion = evolutionCompletionDiagnostics;
if (weaponDamageDiagnostics) output.summary.weaponDamage = weaponDamageDiagnostics;
if (earlyLossDiagnostics) output.summary.earlyLoss = earlyLossDiagnostics;
if (oreCurveDiagnostics) output.summary.oreCurve = oreCurveDiagnostics;
if (holdGoalDiagnostics) output.summary.holdGoal = holdGoalDiagnostics;
if (healOrbDiagnostics) output.summary.healOrb = healOrbDiagnostics;
if (uxError) output.uxError = uxError;
if (holdError) output.holdError = holdError;
if (contractError) output.contractError = contractError;
if (holdExpansionError) output.holdExpansionError = holdExpansionError;
if (equipmentError) output.equipmentError = equipmentError;
if (evolutionError) output.evolutionError = evolutionError;
if (eliteChoiceError) output.eliteChoiceError = eliteChoiceError;

console.log(JSON.stringify(output, null, 2));
if (!output.pass) process.exitCode = 1;
