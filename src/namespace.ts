import { Module } from "./module";
import * as fs from 'fs/promises';
import { onError } from "./local/error";
import { NamespaceContext } from "./types/namespaceContext";
import { NamespaceUse } from "./use/namespaceUse";

/**
 * A container similar to the mc datapacks' classic namespace
 * 
 * Usage:
 * ```ts
 * const namespace = new Namespace("your_namespace_name", [ yourModule, ...more_modules ])
 * 
 * export { namespace }
 * ```
 * {@link Module} - Learn about Modules
 */
export class Namespace {
  public use: NamespaceUse = new NamespaceUse(this);
  /**
   * 
   * @param name can not contain camelCase since it will be used to define the namespace for mc datapack
   * @param modules An array of {@link Module} that will be compiled to this namespace
   */
  constructor(
    public name: string,
    public modules: Module[],
  ) {}

  public async _compile( context: NamespaceContext ) {
    await fs.mkdir(`../${context.pack.options.name}/data/${this.name}`).catch( onError )
    await fs.mkdir(`../${context.pack.options.name}/data/${this.name}/functions`).catch( onError )

    for (const module of this.modules) {
      await module._compile({ ...context, namespace: this });
    }
  }
}