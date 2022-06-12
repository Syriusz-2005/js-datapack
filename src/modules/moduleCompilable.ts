import * as fs from 'fs/promises';
import { onError } from '../local/error';
import { FunctionCompiler } from "../local/functionCompiler";
import { FunctionContext } from "../types/functionContext";
import { ModuleContext } from "../types/moduleContext";
import { UseTypes } from '../types/usable';


export abstract class AbstractModule {
  public abstract use: UseTypes;
  public loadFunction: FunctionCompiler = new FunctionCompiler('js_at_load', []);
  public tickFunction: FunctionCompiler = new FunctionCompiler('js_at_tick', []);
  public functions: FunctionCompiler[] = [];

  constructor(
    public readonly name: string,
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