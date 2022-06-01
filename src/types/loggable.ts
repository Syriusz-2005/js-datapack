import { Command } from "../compilable/command";


export type Loggable = {
  log: () => Command;
};