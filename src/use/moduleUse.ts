import { Module } from "../module";
import { FunctionCompiler } from "../local/functionCompiler";
import { TriggerCommandManager, TriggerCommandOptions } from "../compilable/triggerCommand";
import { CommandManager } from "../types/commandManager";

export class ModuleUse {
  constructor(
    private compiler: Module,
  ) {}

  private assignManager( manager: CommandManager ) {
    const loadFunction = manager.getLoadCommand();
    const tickFunction = manager.getTickCommand();

    this.compiler.functions.push( loadFunction );
    this.compiler.functions.push( tickFunction );

    this.compiler.loadFunction.use.runFunctionFromFile(loadFunction.name);
    this.compiler.tickFunction.use.runFunctionFromFile(tickFunction.name);
  }

  public runBeforeLoad( functionCompiler: FunctionCompiler ) {
    this.compiler.loadFunction = new FunctionCompiler( 'js_at_load', [...this.compiler.tickFunction.parts, ...functionCompiler.parts] );
  }

  public runOnTick( functionCompiler: FunctionCompiler ) {
    this.compiler.tickFunction = new FunctionCompiler( 'js_at_tick', [...this.compiler.tickFunction.parts, ...functionCompiler.parts] );
  }

  public assignFunction( functionCompiler: FunctionCompiler ) {
    this.compiler.functions.push( functionCompiler );
  }

  public createTriggerCommand( commandName: string, options: TriggerCommandOptions ) {
    const triggerCommand = new TriggerCommandManager(commandName, options);
    this.assignManager(triggerCommand);
    return triggerCommand;
  }
}