import { CommandContext } from "../types/commandContext";
import { ToMcCommandCompilable } from "../types/compilable";
import { Command } from "./command";

export class LocalFunctionCall extends Command implements ToMcCommandCompilable {
  constructor( functionName: string ) {
    super( functionName );
  }

  public override compile( context: CommandContext ) {
    return new Command(`function ${context.namespace.name}:${context.module.name}/${this.value}`).compile( context );
  }
}