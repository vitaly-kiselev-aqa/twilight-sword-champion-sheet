import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SCRIPTS_DIR = resolve(import.meta.dirname, '../../assets/js');

/**
 * @typedef {Object} SheetScripts
 * @property {typeof model} model
 * @property {typeof storage} storage
 * @property {typeof fields} fields
 * @property {typeof sheet} sheet
 */

/**
 * @template {keyof SheetScripts} ScriptName
 * @param {ScriptName} scriptName
 * @param {Partial<SheetScripts>} [args]
 * @returns {SheetScripts[ScriptName]}
 */
export function loadScript(scriptName, args = {}) {
  const scriptPath = resolve(SCRIPTS_DIR, `${scriptName}.js`);
  const scriptSource = readFileSync(scriptPath, 'utf8');

  const argsNames = Object.keys(args);
  const argValues = Object.values(args);

  const loadScriptBody = `${scriptSource}\nreturn ${scriptName};`;

  const loadScriptFunction = new Function(...argsNames, loadScriptBody);
  const script = loadScriptFunction(...argValues);

  return script;
}
