import { Command } from "../compilable/command";
import { CustomMenuModule } from "../modules/customMenu";

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

export class CustomMenuUse {
  private customMenu: CustomMenuModule;

  constructor(
    compiler: CustomMenuModule,
  ) {
    this.customMenu = compiler;
  }

  public defineViews( views: ViewProps[] ) {
    for (const view of views) {
      this.customMenu.views.push( view );
    }
  }
}