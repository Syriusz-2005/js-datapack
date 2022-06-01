import { ToMcCommandCompilable } from "../types/compilable";
import * as fs from "fs/promises";
import { onError } from "./error";
import { FunctionUse } from "../use/functionUse";
import { Usable } from "../types/usable";
import { FunctionContext } from "../types/functionContext";

export class FunctionCompiler implements Usable {
  public readonly use: FunctionUse = new FunctionUse( this );

  /**
   * 
   * @param name minecraft-friendly function name
   * @param parts An array of function parts that can be compiled to mc command(s)
   */
  constructor(
    public readonly name: string,
    public parts: ToMcCommandCompilable[]
  ) {}

  public assign( ...compilable: ToMcCommandCompilable[] ) {
    this.parts.push( ...compilable );
    return this;
  }

  public async _compile(path: string, context: FunctionContext ) {
    await fs.writeFile(
      `${path}/${this.name}.mcfunction`,
      this.parts.reduce((acc, curr) => acc + curr.compile({ ...context, function: this }), 
        `#module ./mdinfo.json \n`
      )
    ).catch( onError )
  }
}
