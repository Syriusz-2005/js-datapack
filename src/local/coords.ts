

export type coord = `${'~' | '^' | ''}${string}`;

export class Coords {
  constructor( 
    private x: coord, 
    private y: coord, 
    private z: coord,
  ) {}

  public get() {
    return `${this.x} ${this.y} ${this.z}`;
  }
}