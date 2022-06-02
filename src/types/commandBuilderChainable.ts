import { ToMcCommandCompilable } from "./compilable";



export interface CommandBuilderChainable {
  end: () => ToMcCommandCompilable;
}