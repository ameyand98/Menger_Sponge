import { Mat3, Mat4, Vec3, Vec4 } from "../lib/TSM.js";

/* A potential interface that students should implement */
interface IMengerSponge {
  setLevel(level: number): void;
  isDirty(): boolean;
  setClean(): void;
  normalsFlat(): Float32Array;
  indicesFlat(): Uint32Array;
  positionsFlat(): Float32Array;
}

/**
 * Represents a Menger Sponge
 */
export class MengerSponge implements IMengerSponge {

  private dirty: boolean;
  private nesting_level: number;
  private minx: number;
  private maxx: number;
  private miny: number;
  private minz: number;
  private bb_len: number;
  private start: number;
  private ob_array: Array<number>;
  private v_array: Array<number>;
  private n_array: Array<number>;
  
  constructor(level: number) {
	  this.setLevel(level);
    this.setClean();
    this.minx = -0.5;
    this.miny = -0.5;
    this.minz = -0.5;
    this.maxx = 0.5;
    this.bb_len = this.maxx - this.minx;
    this.start = 0;
    this.ob_array = new Array();
    this.v_array = new Array();
    this.n_array = new Array();
	  // TODO: other initialization	
  }

  /**
   * Returns true if the sponge has changed.
   */
  public isDirty(): boolean {
    // console.log(this.dirty);
    return this.dirty;
      // return false;
  }

  public setClean(): void {
    this.dirty = false;
  }
  
  public setLevel(level: number) {
	  this.nesting_level = level;
    this.dirty = true;
    // this.drawCube(0, 0);
    // this.drawCube(1, 0);
    // this.drawCube(2, 0);
    this.createSponge();
    console.log(this.dirty);
  }

  /* Returns a flat Float32Array of the sponge's vertex positions */
  public positionsFlat(): Float32Array {
	  // TODO: right now this makes a single triangle. Make the cube fractal instead.
    // var pos_array: Array<number> = new Array();
    // pos_array = this.drawCube(0, pos_array, 0);
    // // for (var i = 0; i < pos_array.length; i = i + 1) {


    // // }
    // // console.log(pos_array);
    // let parray = new Float32Array(pos_array);
    // // console.log(parray);
    // return parray;
    let array = new Float32Array(this.v_array);
    console.log("v array len", array.length)
    return array;

  }

  /**
   * Returns a flat Uint32Array of the sponge's face indices
   */
  public indicesFlat(): Uint32Array {
    // TODO: right now this makes a single triangle. Make the cube fractal instead.
    var ob_array: Array<number> = new Array();
    // ob_array = this.drawCube(2, ob_array, 0);
    // console.log(ob_array);
    let array = new Uint32Array(this.ob_array);
    console.log("ob array len", array.length)
    return array;
    // return new Uint32Array([19, 20, 18])
  }

  /**
   * Returns a flat Float32Array of the sponge's normals
   */
  public normalsFlat(): Float32Array {
	  // TODO: right now this makes a single triangle. Make the cube fractal instead.
	  // return new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0,
    //   0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0]);
    var norm_array: Array<number> = new Array();
    // norm_array = this.drawCube(1, norm_array, 0);
    // console.log(norm_array)
    let array = new Float32Array(this.n_array);
    console.log("n array len", array.length)
    return array;
    // return new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0])
  }

  /**
   * Returns the model matrix of the sponge
   */
  public uMatrix(): Mat4 {

    // TODO: change this, if it's useful
    const ret : Mat4 = new Mat4().setIdentity();

    return ret;    
  }

  public drawCube(type: number, start: number, minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number){
        // vertex positions
        // this.v_array = new Array();
        // T1
    this.v_array = this.v_array.concat([minx, miny, maxz, 1.0, maxx, maxy, maxz, 1.0, maxx, miny, maxz, 1.0]);

    // T2
    this.v_array = this.v_array.concat([minx, miny, maxz, 1.0, minx, maxy, maxz, 1.0, maxx, maxy, maxz, 1.0]);


    // T3
    this.v_array = this.v_array.concat([minx, miny, maxz, 1.0, minx, miny, minz, 1.0, minx, maxy, maxz, 1.0]);

    // T4
    
    this.v_array = this.v_array.concat([minx, maxy, maxz, 1.0]); // 1
    this.v_array = this.v_array.concat([minx, miny, minz, 1.0]); // 2
    this.v_array = this.v_array.concat([minx, maxy, minz, 1.0]); // 3
    
    

    // T5
    this.v_array = this.v_array.concat([minx, miny, minz, 1.0]);
    this.v_array = this.v_array.concat([maxx, miny, minz, 1.0]);
    this.v_array = this.v_array.concat([maxx, maxy, minz, 1.0]);
    

    // T6
    this.v_array = this.v_array.concat(new Array(minx, miny, minz, 1.0));
    this.v_array = this.v_array.concat(new Array(maxx, maxy, minz, 1.0));
    this.v_array = this.v_array.concat(new Array(minx, maxy, minz, 1.0));
    

    // T7
    this.v_array = this.v_array.concat(new Array(maxx, miny, maxz, 1.0)); // 1
    
    this.v_array = this.v_array.concat(new Array(maxx, maxy, maxz, 1.0)); // 3
    this.v_array = this.v_array.concat(new Array(maxx, miny, minz, 1.0)); // 2

    // T8
    this.v_array = this.v_array.concat(new Array(maxx, maxy, maxz, 1.0)); // 1
    
    this.v_array = this.v_array.concat(new Array(maxx, maxy, minz, 1.0)); // 3
    this.v_array = this.v_array.concat(new Array(maxx, miny, minz, 1.0)); // 2

    // T9
    this.v_array = this.v_array.concat(new Array(minx, maxy, maxz, 1.0));
    
    this.v_array = this.v_array.concat(new Array(maxx, maxy, minz, 1.0));
    this.v_array = this.v_array.concat(new Array(maxx, maxy, maxz, 1.0));
    

    // T10
    this.v_array = this.v_array.concat(new Array(minx, maxy, maxz, 1.0));
    this.v_array = this.v_array.concat(new Array(minx, maxy, minz, 1.0));
    this.v_array = this.v_array.concat(new Array(maxx, maxy, minz, 1.0));
    

    // T11
    this.v_array = this.v_array.concat(new Array(minx, miny, maxz, 1.0));
    this.v_array = this.v_array.concat(new Array(maxx, miny, maxz, 1.0));
    this.v_array = this.v_array.concat(new Array(maxx, miny, minz, 1.0));
    

    // T12
    this.v_array = this.v_array.concat(new Array(minx, miny, maxz, 1.0));
    
    this.v_array = this.v_array.concat(new Array(maxx, miny, minz, 1.0));
    this.v_array = this.v_array.concat(new Array(minx, miny, minz, 1.0));
    
    
    // console.log(array);
    // console.log(array.length);

    // vertex normals
    // T1
    // this.n_array = new Array();
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));

    // T2
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));

    // T3
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));

    // T4
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));

    // T5
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));
    
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));

    // T6 
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));
    
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 0.0, 1.0, 0.0));

    // T7
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));

    // T8
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(1.0, 0.0, 0.0, 0.0));

    // T9 
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));
    
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));

    // T10
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));

    // T11
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));
    
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));
    

    // T12
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));
    this.n_array = this.n_array.concat(new Array(0.0, 1.0, 0.0, 0.0));
    
    // console.log(array.length);

    // face indices
    // array.concat(new Array())
    this.ob_array = new Array();
    for (let i = 0; i < 36; i++) {
      this.ob_array.push(start + i);
    }
    // array.push(this.start);
    // this.start = this.start + 1;
    
    // return array
  }

  public drawRecursiveCube(box_len: number, curr_depth: number, start: number, minx: number, miny: number, minz: number): number {
    let x: number, y: number, z: number;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          if (i % 2 + j % 2 + k % 2 < 2) {
            x = minx + i * box_len;
            y = miny + j * box_len;
            z = minz + k * box_len;
            if (curr_depth > 1) {
              let new_len = box_len / 3.0;
              start = this.drawRecursiveCube(new_len, curr_depth - 1, start, x, y, z);
            } else {
              this.drawCube(0, start, x, y, z, x + box_len, y + box_len, z + box_len);
              start += 36;
            }
          }
        }
      }
    }
    return start
  }

  public createSponge() {
    this.ob_array = new Array();
    this.n_array = new Array();
    this.v_array = new Array();

    if (this.nesting_level == 0) {
      this.drawCube(0, 0, this.minx, this.miny, this.minz, this.minx + this.bb_len, this.miny + this.bb_len, this.minz + this.bb_len);
    } else {
      this.drawRecursiveCube(this.bb_len, this.nesting_level, 0, this.minx, this.miny, this.minz);
    }
  }
  
}
