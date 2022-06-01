import { CurrentEntitySelector } from "../local/currentEntitySelector";
import { FunctionCompiler } from "../local/functionCompiler";
import { CommandManager } from "../types/commandManager";
import { Command } from "./command";

export type TriggerCommandOptions = {
  enabledFor: CurrentEntitySelector;
  atExecute: Command;
  autoRemove: boolean;
  rejectMessage: `"${string}"`;
}

export class TriggerCommandManager implements CommandManager {
  constructor(
    private commandName: string,
    private options: TriggerCommandOptions,
  ) {}

  public getLoadCommand() {
    return new FunctionCompiler(`js_at_load_trigger_${this.commandName}`,[new Command(`scoreboard objectives add ${this.commandName} trigger`)] );
  }

  public getTickCommand() {
    const f = new FunctionCompiler(`js_at_tick_trigger_${this.commandName}`, []);

    
    f.use.prepareAndRunCommand(`execute as @a if score @s ${this.commandName} matches 1.. ${this.options.enabledFor.getUnless()} run tellraw @s ${this.options.rejectMessage}`);
    f.use.prepareAndRunCommand(`execute as @a if score @s ${this.commandName} matches 1.. ${this.options.enabledFor.getUnless()} run scoreboard players reset @s ${this.commandName}`);
    
    f.use.prepareAndRunCommand(`${this.options.enabledFor.runAsSelected()} run scoreboard players enable @s ${this.commandName}`);

    f.use.prepareAndRunCommand(`${this.options.enabledFor.runAsSelected()} if score @s ${this.commandName} matches 1.. run ${this.options.atExecute.compile()}`);

    if (this.options.autoRemove) {
      f.use.prepareAndRunCommand(`${this.options.enabledFor.runAsSelected()} if score @s ${this.commandName} matches 1.. run scoreboard players reset @s ${this.commandName}`);
    }

    return f;
  }
}