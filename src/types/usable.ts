import { CustomMenuUse } from "../use/customMenuUse";
import { FunctionUse } from "../use/functionUse";
import { ModuleUse } from "../use/moduleUse";


export type UseTypes = ModuleUse | FunctionUse | CustomMenuUse;
/**
 * Usable objects always has the `use` namespace with some usefull methods that belongs to the parent object
 */
export interface Usable {
  use: UseTypes;
}