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
const context = new Proxy({}, {
  get(target, property) {
    if (property === "createLinearGradient" || property === "createRadialGradient") return () => gradient;
    if (property === "measureText") return () => ({ width: 0 });
    if (!(property in target)) target[property] = noop;
    return target[property];
  },
  set(target, property, value) { target[property] = value; return true; },
});

const elements = new Map();
function makeElement(id = "") {
  const attributes = new Map();
  const classes = new Set();
  const node = {
    id,
    style: {},
    classList: {
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name),
      toggle: (name, force) => {
        const next = force === undefined ? !classes.has(name) : !!force;
        if (next) classes.add(name); else classes.delete(name);
        return next;
      },
    },
    setAttribute: (name, value) => attributes.set(name, String(value)),
    getAttribute: (name) => attributes.get(name),
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
  createElement: (tag) => makeElement(tag),
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
  engine.S.reward = 1023;
  engine.S.rewardGranted = false;
  const beforeOre = engine.H.ore, beforeRuns = engine.H.runs;
  const firstDeposit = engine.depositRunReward();
  const secondDeposit = engine.depositRunReward();
  const depositedOnce = firstDeposit === 10 && secondDeposit === 0 &&
    engine.H.ore === beforeOre + 10 && engine.H.runs === beforeRuns + 1;
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
  engine.S.reward = 1023;
  engine.S.rewardGranted = false;
  const boostedOre = engine.depositRunReward();
  const rewardApplied = boostedOre === 14; // Basis 10 × 1,35, gerundet

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
  const migrated = engine.H.version === 4 && engine.H.essence === 0 &&
    engine.H.marks === 0 && engine.H.preparedRerolls === 0 &&
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
  const migrated = engine.H.version === 4 && engine.H.dust === 0 &&
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

  engine.begin(180,"ring"); engine.S.reward=500; engine.S.rewardGranted=false;
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
    html.includes("Math.ceil((want-nearby)*0.16)") &&
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

const output = {
  pass: report.pass && evolutionReachable && reproducible && stationaryPressure && artAssets && visualState && uprightCharacters && singlePassRendering && combatReadability && slotLayout && uniqueChainTargets && bossTargeting && bossDurability && singleProjectileHit && uniqueSpatialQuery && singleExplosion && uxFlow && holdFlow && contractFlow && holdExpansion && equipmentFlow && evolutionCatalog && eliteChoices && aspectIndependent && minCombatHeight && bossInsideCombat && telemetrySeparated && visibleCountsCulling && fpsMetrics && reportHardened,
  checks: { ...report.checks, evolutionReachable, reproducible, stationaryPressure, artAssets, visualState, uprightCharacters, singlePassRendering, combatReadability, slotLayout, uniqueChainTargets, bossTargeting, bossDurability, singleProjectileHit, uniqueSpatialQuery, singleExplosion, uxFlow, holdFlow, contractFlow, holdExpansion, equipmentFlow, evolutionCatalog, eliteChoices, aspectIndependent, minCombatHeight, bossInsideCombat, telemetrySeparated, visibleCountsCulling, fpsMetrics, reportHardened },
  targets: report.targets,
  seeds: report.seeds,
  summary: { ...report.summary, evolutionRuns, evolutionSeeds: report.seeds.length,
    stationaryDeath: stationaryRun.died,
    feedbackSeed: feedbackRun ? { kills: feedbackRun.kills, picks: feedbackRun.total,
      simSpitze: feedbackRun.peak, simRadius: feedbackRun.nearby, evo: feedbackRun.evo } : null,
    eliteChoiceDiagnostics,
    viewports: viewportRows },
};
if (aspectError) output.aspectError = aspectError;
if (telemetryError) output.telemetryError = telemetryError;
if (visibleError) output.visibleError = visibleError;
if (fpsError) output.fpsError = fpsError;
if (uxError) output.uxError = uxError;
if (holdError) output.holdError = holdError;
if (contractError) output.contractError = contractError;
if (holdExpansionError) output.holdExpansionError = holdExpansionError;
if (equipmentError) output.equipmentError = equipmentError;
if (evolutionError) output.evolutionError = evolutionError;
if (eliteChoiceError) output.eliteChoiceError = eliteChoiceError;

console.log(JSON.stringify(output, null, 2));
if (!output.pass) process.exitCode = 1;
