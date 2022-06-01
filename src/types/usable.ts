import { FunctionUse } from "../use/functionUse";
import { ModuleUse } from "../use/moduleUse";


/**
 * Usable objects always has the `use` namespace with some usefull methods that belongs to the parent object
 */
export interface Usable {
  use: ModuleUse | FunctionUse;
}