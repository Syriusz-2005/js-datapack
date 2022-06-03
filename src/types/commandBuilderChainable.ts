

export type CommandBuilderChainable<ChainEndName extends string = "end"> = {
  [key in ChainEndName]: (...args: any[]) => void;
};