import { Module } from "../module";
import { Namespace } from "../namespace";


export class NamespaceUse {
  constructor(
    private namespace: Namespace,
  ) {}

  public assignModule( module: Module ) {
    this.namespace.modules.push( module );
  }
}