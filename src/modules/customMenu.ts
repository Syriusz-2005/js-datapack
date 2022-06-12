import { AbstractModule } from './moduleCompilable';
import { CustomMenuUse, ViewProps } from "../use/customMenuUse";

export class CustomMenuModule extends AbstractModule {
  public override use: CustomMenuUse = new CustomMenuUse(this);
  public views: ViewProps[] = [];
}