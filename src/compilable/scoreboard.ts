import { EntitySelector } from "../local/entitySelector";
import { CommandContext } from "../types/commandContext";
import { ToMcCommandCompilable } from "../types/compilable";
import { Command } from "./command";
import { EntityScore } from "./entityScore";
import { Score } from "./globalScore";

export interface ScoreboardOptions {

}

export class Scoreboard implements ToMcCommandCompilable {
  public readonly generatedBy: string = "Scoreboard class";

  constructor(
    private readonly _name: string,
    private readonly displayName?: string,
  ) {}

  public get name() {
    return this._name;
  }

  public setScore( entities: EntitySelector, score: number | Score ): ToMcCommandCompilable {
    if ( score instanceof Score )
      return new Command(`${entities.getExecuteAs()} run scoreboard players operation @s ${this._name} = ${score.scoreName} jsScores`)

    return new Command(`${entities.getExecuteAs()} run scoreboard players set @s ${this._name} ${score}`);
  }

  public log( entities: EntitySelector ) {
    return new Command(`${entities.getExecuteAs()} run tellraw @a [{ "selector": "@s" },{ "text": ": " },{"score": { "name": "@s", "objective": "${this._name}" }}]`)
  }

  public get( entity: EntitySelector ) {
    return new EntityScore(entity, this);
  }

  public compile(context: CommandContext) {
    return new Command(`scoreboard objectives add ${this._name} dummy ${this.displayName ?? ""}`).compile(context);
  }
}