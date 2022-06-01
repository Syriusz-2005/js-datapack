import * as fs from "fs/promises";
import { FunctionCompiler } from "./local/functionCompiler";
import { ModuleUse } from "./use/moduleUse";
import { FunctionContext } from "./types/functionContext";
import { ModuleContext } from "./types/moduleContext";
import { Usable } from "./types/usable";


const onError = (_: any) => undefined;

export class Module implements Usable {
  public use: ModuleUse = new ModuleUse( this );
  public loadFunction: FunctionCompiler = new FunctionCompiler('js_at_load', []);
  public tickFunction: FunctionCompiler = new FunctionCompiler('js_at_tick', []);
  
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
    public readonly name: string,
    public functions: FunctionCompiler[],
  ) {}

  private getPath(namespace: string, packName: string) {
    return `../${packName}/data/${namespace}/functions/${this.name}`;
  }

  public async _compile( context: ModuleContext ) {
    const { namespace: { name: namespace }, pack: { options: { name: packName } } } = context;
    const functionContext: FunctionContext = { ...context, module: this };

    await fs.mkdir(this.getPath(namespace, packName)).catch(onError);

    await fs
      .writeFile(
        `${this.getPath(namespace, packName)}/mdinfo.json`,
        JSON.stringify({
          namespace,
          module: this.name,
          lastCompiled: new Date(),
          functions: this.functions.map( f => f.name ),
        })
      )
      .catch(onError);

    for (const f of this.functions) {
      await f._compile(this.getPath(namespace, packName), functionContext );
    }
    await this.tickFunction._compile(this.getPath(namespace, packName), functionContext );
    await this.loadFunction._compile(this.getPath(namespace, packName), functionContext );
  }
}
