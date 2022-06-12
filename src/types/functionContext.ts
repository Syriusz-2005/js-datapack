import { AbstractModule } from "../modules/moduleCompilable";
import { ModuleContext } from "./moduleContext";


export interface FunctionContext extends ModuleContext {
  module: AbstractModule;
}