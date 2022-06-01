import { FunctionCompiler } from "../local/functionCompiler";
import { FunctionContext } from "./functionContext";


/**
 * Compile-time command context
 */
export interface CommandContext extends FunctionContext {
  readonly function: FunctionCompiler;
}