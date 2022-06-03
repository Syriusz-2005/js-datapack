


export class EntitySelector {
  constructor(
    private _selector: `@${string}`,
  ) {}

  public get selector() {
    return this._selector;
  }

  public getExecuteAs() {
    return `execute as ${this._selector}`;
  }

  public getUnless() {
    return `unless entity ${this._selector}`;
  }

  public getIf() {
    return `if entity ${this._selector}`;
  }

  public filter( selector: `@s${string}` ) {
    return new EntitySelector(`${this._selector} if entity ${selector}`);
  }
}