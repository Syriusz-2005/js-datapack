import { Command } from "../compilable/command";
import { CustomMenuModule } from "../modules/customMenu";
import { ModuleUse } from "./moduleUse";

export type RunCommandViewItemClickAction = {
  type: 'runCommand';
  command: Command;
}

export type ChangeViewItemClickAction = {
  type: 'changeView';
  changeTo: string;
}

export type ViewItem = {
  slot: number;
  type: string;
  data: string;
  clickActions: (RunCommandViewItemClickAction | ChangeViewItemClickAction)[];
}

export type ViewProps = {
  name: string;
  isDefault: boolean;
  items: ViewItem[];
}

export class CustomMenuUse extends ModuleUse {
  private customMenu: CustomMenuModule;

  constructor(
    compiler: CustomMenuModule,
  ) {
    super(compiler);
    this.customMenu = compiler;
  }

  public defineViews( views: ViewProps[] ) {
    for (const view of views) {
      this.customMenu.views.push( view );
    }
  }
}