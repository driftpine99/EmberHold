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
  html.includes("HERO_ANIM.WALK") && html.includes("HERO_ANIM.SHOT");
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
const output = {
  pass: report.pass && evolutionReachable && reproducible && stationaryPressure && artAssets && visualState && uprightCharacters && singlePassRendering && combatReadability && uniqueChainTargets && bossTargeting && bossDurability && singleProjectileHit && uniqueSpatialQuery && singleExplosion && uxFlow && holdFlow,
  checks: { ...report.checks, evolutionReachable, reproducible, stationaryPressure, artAssets, visualState, uprightCharacters, singlePassRendering, combatReadability, uniqueChainTargets, bossTargeting, bossDurability, singleProjectileHit, uniqueSpatialQuery, singleExplosion, uxFlow, holdFlow },
  targets: report.targets,
  seeds: report.seeds,
  summary: { ...report.summary, evolutionRuns, evolutionSeeds: report.seeds.length,
    stationaryDeath: stationaryRun.died,
    feedbackSeed: feedbackRun ? { kills: feedbackRun.kills, picks: feedbackRun.total,
      peak: feedbackRun.peak, onScreen: feedbackRun.onScreen, evo: feedbackRun.evo } : null },
};
if (uxError) output.uxError = uxError;
if (holdError) output.holdError = holdError;

console.log(JSON.stringify(output, null, 2));
if (!output.pass) process.exitCode = 1;
