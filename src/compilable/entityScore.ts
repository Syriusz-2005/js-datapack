import { EntitySelector } from "../local/entitySelector";
import { CommandContext } from "../types/commandContext";
import { ToMcCommandCompilable } from "../types/compilable";
import { ScoreboardReadable } from "../types/scoreboardReadable";
import { Command } from "./command";
import { Scoreboard } from "./scoreboard";

export class EntityScore implements ToMcCommandCompilable, ScoreboardReadable {
  public readonly generatedBy: string = "Local score generator";

  constructor(
    private readonly entity: EntitySelector,
    private readonly scoreboard: Scoreboard,
  ) {}

  public get scoreName() {
    return this.entity.selector;
  }

  public get scoreboardName() {
    return this.scoreboard.name;
  }

  public increment( count: number | ScoreboardReadable ) {
    if ( typeof count != 'number' ) {
      if ( count.scoreName.match(/(@a|@e)/) && !count.scoreName.includes('limit') ) throw new Error('The selector must select only one entity!')
      return new Command(`scoreboard players operation ${this.entity.selector} ${this.scoreboardName} = ${count.scoreName} ${count.scoreboardName}`);
    }

    return new Command(`${this.entity.getExecuteAs()} run scoreboard players add @s ${this.scoreboard.name} ${count}`);
  }

  public remove() {
    return new Command(`${this.entity.getExecuteAs()} run scoreboard players reset @s ${this.scoreboardName}`);
  }

  public compile(_: CommandContext) {
    return new Command(``).compile(_);
  } 
}