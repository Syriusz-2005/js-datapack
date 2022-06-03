import { EntitySelector } from "../local/entitySelector";
import { FunctionCompiler } from "../local/functionCompiler";
import { CommandBuilderChainable } from "../types/commandBuilderChainable";
import { Command } from "./command";


/**
 * nice
 * @implements {Chainable} s
 */
export class ExecuteCommand implements CommandBuilderChainable {
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

  public whenEntity( when: 'if' | 'unless', entitySelector: EntitySelector ) {
    return this.getNew(` ${when} entity ${entitySelector.selector}`);
  }

  public whenBlock( when: 'if' | 'unless', x: number, y: number, z: number, block: string) {
    return this.getNew(` ${when} block ${x} ${y} ${z} ${block}`);
  }

  public end( runCommand: Command ) {
    this.functionCompiler.assign( new Command(`${this.command} run ${runCommand.compile()}`) );
  }
}