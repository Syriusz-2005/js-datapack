import fs from 'fs/promises';
import { Namespace } from './namespace';
import { Module } from './module';
import { Command } from './compilable/command';
import { FunctionCompiler } from './local/functionCompiler';
import { onError } from './local/error';
import { ToMcCommandCompilable } from './types/compilable';
import { defaultNamespace } from './js-default/defaultNamespace';
import { jsMainModule } from './js-default/mainModule/jsModule';
import { EntitySelector } from './local/entitySelector';
import { Coords } from './local/coords';
import { CurrentEntitySelector } from './local/currentEntitySelector';
import { CustomMenuModule } from './modules/customMenu';

export interface DatapackOptions {
  description: string;
  name: string;
  format: number;
  creator: string;
}

/**
 * The main entry point for the datapack compiler. Use it to create a new Datapack
 * 
 * **1. Please use Typesctipt!**
 * 
 * **2. Make sure the file structure is organized in the way that will make your future life easier**
 * 
 * Somethink like this should be fine:
 * ```
 * your_datapacks_directory/
 * |
 * | js-datapacks/
 * | | src/
 * | | | namespaces/
 * | | | | namespaceName.ts
 * | | | modules/
 * | | | | moduleName/
 * | | | | | moduleName.ts
 * | | | | | functionUsedHere.ts
 * | | | | |
 * | | out/
 * | | package.json
 * |
 * | your_datapack_name/ (output files will go here)
 * ```
 * 
 * **3. Remember to name your namespaces, modules and functions in an accessible way for mc datapack.**
 * Don't use CamelCase for that.
 * However, your files with code (.ts, .js) can be named however you want
 * 
*/
export class Datapack {
  /**
   * @param options is used to define the datapack main params such as `description` or a `pack_format`
   * @param namespaces a list of namespaces that will be compiled in your datapck
   */
  constructor(
    public options: DatapackOptions,
    private namespaces: Namespace[],
  ) {}

  private async defineDirs( path: string ) {
    const parts = path.split('/');
    let currentPath = "";
    for (const pathPart of parts) {
      currentPath += pathPart + '/';
      await fs.mkdir(currentPath).catch(onError);
    }
  }

  public async compile() {
    console.time('Compiled in');

    await fs.mkdir(`../${this.options.name}`).catch(onError);
    await fs.mkdir(`../${this.options.name}/data`).catch(onError);
    await fs.mkdir(`../${this.options.name}/data/js`).catch(onError);
    await fs.mkdir(`../${this.options.name}/data/js/functions`).catch(onError);
    await this.defineDirs(`../${this.options.name}/data/minecraft/tags/functions`);
    await fs.writeFile(`../${this.options.name}/data/minecraft/tags/functions/load.json`, JSON.stringify({
      values: [
        "js:js-load-tick/js_at_load"
      ]
    }));
    await fs.writeFile(`../${this.options.name}/data/minecraft/tags/functions/tick.json`, JSON.stringify({
      values: [
        "js:js-load-tick/js_at_tick"
      ]
    }));
    
    for (const namespace of this.namespaces) {
      await namespace._compile({ pack: this });
    }

    await fs.writeFile(`../${this.options.name}/pack.mcmeta`, JSON.stringify({
      pack: {
        pack_format: this.options.format,
        description: this.options.description,
      },
      creator: this.options.creator,
      createdWith: 'js-datapack',
    }));

    const moduleLoadRunners: ToMcCommandCompilable[] = [];
    const moduleTickRunners: ToMcCommandCompilable[] = [];

    for (const namespace of this.namespaces) {
      for (const module of namespace.modules) {
        moduleLoadRunners.push( new Command(`function ${namespace.name}:${module.name}/js_at_load`) );
        moduleTickRunners.push( new Command(`function ${namespace.name}:${module.name}/js_at_tick`) );
      }
    }

    const loadFunction = new FunctionCompiler('load', [
      new Command(`scoreboard objectives add jsScores dummy`),
      ...moduleLoadRunners,
    ]);

    const tickFunction = new FunctionCompiler('tick', moduleTickRunners);

    jsMainModule.use.runBeforeLoad( loadFunction );
    jsMainModule.use.runOnTick( tickFunction );

    defaultNamespace._compile({ pack: this });
    
    console.timeEnd('Compiled in')
    console.log('Compilation ended successfully!')
  }
}

export default Datapack;
export { Module, Command, EntitySelector as EntitySelector, Namespace, FunctionCompiler, Coords, CurrentEntitySelector, CustomMenuModule };
