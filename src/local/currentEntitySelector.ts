import { EntitySelector } from "./entitySelector";



export class CurrentEntitySelector extends EntitySelector {
  constructor( selector: `@s[${string}]` ) {
    super( selector );
  }

  public runAsSelected() {
    return `execute as @e ${this.getIf()}`;
  }
}