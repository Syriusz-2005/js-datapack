import { ToMcCommandCompilable } from "../types/compilable";
import { Command } from "./command";
import { getRandomInt } from "../local/random";
import { CommandContext } from "../types/commandContext";
import { Loggable } from "../types/loggable";
import { ScoreboardReadable } from "../types/scoreboardReadable";

class Score implements ToMcCommandCompilable, Loggable, ScoreboardReadable {
  public readonly generatedBy = 'Score generator';

  constructor(
    private readonly definedScore: number | Score,
    protected readonly name = `%%${getRandomInt(0, 999999999999)}`
  ) {}

  public get scoreName() {
    return this.name;
  }

  public get scoreboardName() {
    return 'jsScores';
  }

  public log( prefix?: string ): Command {
    return new Command(`tellraw @a [{"text": "${prefix ?? ""}"}, {"score": { "name": "${this.name}", "objective": "jsScores" }}]`);
  }

  public increment( count: number | Score ): Command {
    if (count instanceof Score) 
      return new Command(`scoreboard players operation ${this.name} jsScores += ${count.name} jsScores`);
    
    return new Command(`scoreboard players add ${this.name} jsScores ${count}`);
  }

  public set( count: number | Score ) {
    if (count instanceof Score) 
      return new Command(`scoreboard players operation ${this.name} jsScores = ${count.name} jsScores`);

    return new Command(`scoreboard players set ${this.name} jsScores ${count}`);
  }

  public compile(context: CommandContext) {
    return new Command(`scoreboard players set ${this.name} jsScores ${this.definedScore}`).compile(context)
  }
}


export function defineScore( score: number | Score, mcName?: string ) {
  return new Score(score, mcName);
}

export { Score }