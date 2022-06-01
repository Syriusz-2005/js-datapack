import { CommandContext } from "./commandContext";


export interface ToMcCommandCompilable {
  readonly generatedBy: string;
  compile: ( context: CommandContext ) => string;
}