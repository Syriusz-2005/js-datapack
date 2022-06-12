import { FunctionCompiler } from "./local/functionCompiler";
import { ModuleUse } from "./use/moduleUse";
import { Usable } from "./types/usable";
import { AbstractModule } from "./modules/moduleCompilable";

export class Module extends AbstractModule implements Usable {
  public use: ModuleUse = new ModuleUse( this );
  
  /**
 * A virtual storage for some functions that usually are focued on one specific feature
 * @implements {Usable}
 * 
 * 
 * Check out this: {@link Usable}.
 * 
 * Because it is usable you can modify it's params and behaviour by using the functions contained in the `use` param
 * 
 * Example:
 * ```ts
 * const module = new Module('my_module', []);
 * 
 * m.use.runBeforeTick(someFunctionCompiler);
 * m.use.runOnTick( otherFunctionCompiler );
 * 
 * export { module as MyModule }
 * ```
 * Using `use` methods is the safest and easiest way to modify some params in any object that supports it.
 */
  constructor(
    name: string,
    public functions: FunctionCompiler[],
  ) {
    super(name);
  }
}