import { FunctionCompiler } from "../local/functionCompiler";


export abstract class CommandManager {

  public abstract getLoadCommand(): FunctionCompiler;
  public abstract getTickCommand(): FunctionCompiler;
}