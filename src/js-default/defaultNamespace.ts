import { Namespace } from "../namespace";
import { jsMainModule } from "./mainModule/jsModule";

const defaultNamespace = new Namespace('js', [ jsMainModule ]);

export { defaultNamespace }