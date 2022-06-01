import { CommandContext } from "../types/commandContext";
import { ToMcCommandCompilable } from "../types/compilable";
import { Loggable } from "../types/loggable";
import { Command } from "./command";
import { Score } from "./globalScore";


export class PersistentScore extends Score implements ToMcCommandCompilable, Loggable {
  constructor(
    name: string,
  ) {
    super(0, name);
  }

  public override compile( context: CommandContext ) {
    return new Command(``).compile(context);
  }
}