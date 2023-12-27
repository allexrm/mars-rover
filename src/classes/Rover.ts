import { parseRoverInstructionsArray } from "../utils/index.js";

export default class Rover {
  id: string;
  pos: Point;
  direction: RoverDirection;
  path: RoverPath;

  constructor(
    roverId: string,
    x: number,
    y: number,
    direction: RoverDirection
  ) {
    this.id = roverId;
    this.path = [];
    this.pos = {
      x,
      y,
    };
    this.direction = direction;
  }

  move() {
    if (this.path.length === 0) return;
    const step = this.path[this.path.length - 1];
    this.pos.x = step.pos.x;
    this.pos.y = step.pos.y;
    this.direction = step.direction;
    this.path = [];
    return step;
  }

  get directionChar() {
    switch (this.direction) {
      case "E":
        return "→";
      case "S":
        return "↓";
      case "W":
        return "←";
      default:
        return "↑";
    }
  }

  parseInstructions(
    params: string,
    maxX: number = 0,
    maxY: number = 0,
    fenceMode: FenceMode = "manually"
  ) {
    const paramArr = parseRoverInstructionsArray(params);
    if (paramArr.length === 0) return [];

    let x = this.pos.x;
    let y = this.pos.y;
    let direction = this.direction;
    this.path = paramArr.map((param: RoverInstruction) => {
      switch (param) {
        case "M":
          x += direction === "E" ? 1 : direction === "W" ? -1 : 0;
          y += direction === "N" ? 1 : direction === "S" ? -1 : 0;
          break;
        case "R":
          direction =
            direction === "N"
              ? "E"
              : direction === "E"
              ? "S"
              : direction === "S"
              ? "W"
              : "N";
          break;
        case "L":
          direction =
            direction === "N"
              ? "W"
              : direction === "W"
              ? "S"
              : direction === "S"
              ? "E"
              : "N";
          break;
        default:
          break;
      }
      // Applying automatic eletronic fence
      if (fenceMode === "automatically") {
        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));
      }
      return {
        pos: {
          x,
          y,
        },
        direction: direction as RoverDirection,
        action: param as RoverInstruction,
      };
    });
  }
}
