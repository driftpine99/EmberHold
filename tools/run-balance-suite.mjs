import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

// Der Phase-0-Prototyp bleibt eine einzelne, direkt startbare HTML-Datei.
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
  return {
    id,
    style: {},
    classList: { add: noop, remove: noop, toggle: noop },
    addEventListener: noop,
    appendChild: noop,
    getContext: () => context,
    clientWidth: 1000,
    clientHeight: 700,
    width: 1000,
    height: 700,
    innerHTML: "",
    textContent: "",
    value: "0",
    onclick: null,
  };
}

globalThis.window = globalThis;
globalThis.devicePixelRatio = 1;
globalThis.innerWidth = 1000;
globalThis.addEventListener = noop;
globalThis.requestAnimationFrame = () => 0;
globalThis.document = {
  createElement: (tag) => makeElement(tag),
  getElementById: (id) => {
    if (!elements.has(id)) elements.set(id, makeElement(id));
    return elements.get(id);
  },
  querySelectorAll: () => [],
};

const here = path.dirname(fileURLToPath(import.meta.url));
const prototypePath = path.resolve(here, "../prototype/web/index.html");
const html = fs.readFileSync(prototypePath, "utf8");
const match = html.match(/<script>([\s\S]*)<\/script>/);
if (!match) throw new Error("Inline script not found in prototype/web/index.html");

new Function(match[1])();
const engine = globalThis.__EH;
if (!engine?.runBalanceSuite) throw new Error("Balance suite is not exposed as window.__EH.runBalanceSuite");

const report = engine.runBalanceSuite();
const repeat = engine.headlessRun(report.runLen, {
  seed: report.seeds[0],
  xpC: engine.CFG.XP_C,
  xpK: engine.CFG.XP_K,
  smart: true,
  immortal: true,
});
const reproducible = JSON.stringify(repeat) === JSON.stringify(report.runs.baseline[0]);
const output = {
  pass: report.pass && reproducible,
  checks: { ...report.checks, reproducible },
  targets: report.targets,
  seeds: report.seeds,
  summary: report.summary,
};

console.log(JSON.stringify(output, null, 2));
if (!output.pass) process.exitCode = 1;
