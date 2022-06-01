import { CommandContext } from "../types/commandContext";
import { ToMcCommandCompilable } from "../types/compilable";

export class Command implements ToMcCommandCompilable {
  constructor( 
    protected readonly value: string 
  ) {}

  public readonly generatedBy: string = 'Command generator';

  public compile( _?: CommandContext ) {
    return this.value + '\n';
  }
}