import { Namespace } from "../namespace";
import { NamespaceContext } from "./namespaceContext";


export interface ModuleContext extends NamespaceContext {
  namespace: Namespace;
}