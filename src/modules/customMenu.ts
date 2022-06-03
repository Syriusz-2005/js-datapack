import { Module } from "../module";
import { Usable } from "../types/usable";
import { CustomMenuUse, ViewProps } from "../use/customMenuUse";

export class CustomMenuModule extends Module implements Usable {
  public override use: CustomMenuUse = new CustomMenuUse(this);
  public views: ViewProps[] = [];

}