import { Coords } from "../local/coords";
import { EntitySelector } from "../local/entitySelector";
import { FunctionCompiler } from "../local/functionCompiler";
import { CommandBuilderChainable } from "../types/commandBuilderChainable";
import { Command } from "./command";
import { Scoreboard } from "./scoreboard";

export type WhenTypes = 'if' | 'unless';


/**
 * nice
 * @implements {Chainable} s
 */
export class ExecuteCommand implements CommandBuilderChainable<"run"> {
  public generatedBy: string = "ExecuteCommand Chainable class";
  private command: string;

  constructor(
    private functionCompiler: FunctionCompiler,
    before: string,
    extra?: string,
  ) {
    this.command = before + extra;
  }

  private get current() {
    return this.command;
  }

  private getNew(extra: string) {
    return new ExecuteCommand( this.functionCompiler, this.current, extra);
  }

  public positionedAt( x: number, y: number, z: number ) {
    return this.getNew(` positioned at ${x} ${y} ${z}` );
  }

  public at( entitySelector: EntitySelector ) {
    return this.getNew(` at ${entitySelector.selector}`);
  }

  public as( entitySelector: EntitySelector ) {
    return this.getNew(` as ${entitySelector.selector}`);
  }

  public whenEntity( when: WhenTypes, entitySelector: EntitySelector ) {
    return this.getNew(` ${when} entity ${entitySelector.selector}`);
  }

  public whenBlock( when: WhenTypes, coords: Coords, block: string) {
    return this.getNew(` ${when} block ${coords.get()} ${block}`);
  }

  public whenScore( when: WhenTypes, extra: {
    firstEntity: EntitySelector,
    firstScoreboard: string | Scoreboard,
    operator: '=' | '<' | '>' | '<=' | '>=',
    secondEntity: EntitySelector,
    secondScoreboard: string | Scoreboard,
  }) {
    return this.getNew(` ${when} score ${extra.firstEntity.selector} ${extra.operator} ${extra.secondEntity.selector} ${extra.secondScoreboard}`)
  }

  public run( runCommand: Command ) {
    this.functionCompiler.assign( new Command(`${this.command} run ${runCommand.compile()}`) );
  }
}