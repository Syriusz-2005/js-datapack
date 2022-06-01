import { ToMcCommandCompilable } from "../types/compilable";
import { defineScore, Score } from "../compilable/globalScore";
import { FunctionCompiler } from "../local/functionCompiler";
import { Module } from "../module";
import { Command } from "../compilable/command";
import { Namespace } from "../namespace";
import { PersistentScore } from "../compilable/persistentScore";
import { LocalFunctionCall } from "../compilable/localFunctionCall";
import { Loggable } from "../types/loggable";
import { Scoreboard } from "../compilable/scoreboard";

export class FunctionUse {
  constructor( 
    private compiler: FunctionCompiler 
  ) {}

  public prepareAndRunCommand( value: string ): ToMcCommandCompilable {
    const command = new Command(value);
    this.compiler.assign(command);
    return command;
  }

  public defineScore( score: number | Score, name?: string ): Score {
    const scoreCompiler = defineScore( score, name );
    this.compiler.assign(scoreCompiler);
    return scoreCompiler;
  }


  public defineScoreboard( name: string, displayName?: string ) {
    if ( name.length > 16 ) throw new Error(`Comilation Error: ${name} is too long name for a scoreboard`);

    const scoreboard = new Scoreboard(name, displayName);
    this.compiler.assign( scoreboard );
    return scoreboard;
  }

  /**
   * Works as defineScore but does not force the score to have a value at first
   * usefull for scores that must store their values between world sessions
   * @param name 
   */
  public score( name: string ) {
    const score = new PersistentScore( name );
    this.compiler.assign( score );
    return score;
  }

  public log( prefix: string, ...args: Loggable[] ) {
    const p = new Command(`tellraw @a {"text": "${prefix}"}`);
    this.compiler.assign(p);
    args
      .map( ( arg ) => arg.log() )
      .forEach( command => this.compiler.assign( command ) );
  }

  public runFunction( namespace: Namespace, module: Module, compilableFunction: FunctionCompiler ): ToMcCommandCompilable {
    const callingModule = new Command(`function ${namespace.name}:${module.name}/${compilableFunction.name}`);
    this.compiler.assign(callingModule);
    return callingModule;
  }

  public runFunctionFromFile( functionName: string ): ToMcCommandCompilable {
    const callingFunction = new LocalFunctionCall( functionName );
    this.compiler.assign(callingFunction);
    return callingFunction;
  }

  public run( command: ToMcCommandCompilable ) {
    this.compiler.assign(command);
  }
}