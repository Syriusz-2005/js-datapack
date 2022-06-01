import { Module } from "../module";
import { ModuleContext } from "./moduleContext";


export interface FunctionContext extends ModuleContext {
  module: Module;
}