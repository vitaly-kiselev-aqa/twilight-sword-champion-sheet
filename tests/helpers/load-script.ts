import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SCRIPTS_DIR = resolve(import.meta.dirname, '../../assets/js');

type SheetScripts = {
  model: typeof model;
  storage: typeof storage;
  fields: typeof fields;
  sheet: typeof sheet;
};

type ScriptName = keyof SheetScripts;

export function loadScript<T extends ScriptName>(
  scriptName: T,
  args: Partial<SheetScripts> = {},
): SheetScripts[T] {
  const scriptPath = resolve(SCRIPTS_DIR, `${scriptName}.js`);
  const scriptSource = readFileSync(scriptPath, 'utf8');

  const argsNames = Object.keys(args);
  const argValues = Object.values(args);

  const loadScriptBody = `${scriptSource}\nreturn ${scriptName};`;

  const loadScriptFunction = new Function(...argsNames, loadScriptBody);
  const script = loadScriptFunction(...argValues);

  return script;
}
