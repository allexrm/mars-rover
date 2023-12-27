import Rover from "../classes/Rover.js";
import { COLORS } from "../constants/index.js";
import { intToChar } from "../utils/index.js";
import chalkPipe from "chalk-pipe";

class ExplorationCenterController {
  rows: number;
  cols: number;
  matrix: ExplorationMatrix;
  rovers: Rover[] = [];
  displayMode: DisplayMode;
  fenceMode: FenceMode;

  constructor(
    rows: number,
    cols: number,
    displayMode: DisplayMode = "individual",
    fenceMode: FenceMode = "manually"
  ) {
    this.rows = rows;
    this.cols = cols;
    this.displayMode = displayMode;
    this.fenceMode = fenceMode;
    this.matrix = this.createExplorationMatrix(rows, cols);
  }

  createExplorationMatrix(rows: number, cols: number): ExplorationMatrix {
    const response: ExplorationMatrix = new Array(rows).fill(null).map((_) =>
      Array(cols)
        .fill(null)
        .map((_) => null)
    );
    return response;
  }

  landNewRover(x: number, y: number, dir: RoverDirection): boolean {
    if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) {
      console.log(chalkPipe(COLORS.Error)("Out of the exploration area!\n"));
      return false;
    }
    if (this.matrix[y][x] !== null) {
      console.log(
        chalkPipe(COLORS.Error)("The specified quadrant is not empty!\n")
      );
      return false;
    }

    const index = this.rovers.length;
    const roverId = `R${String(index + 1).padStart(2, "0")}`;
    const rover = new Rover(roverId, x, y, dir);
    this.rovers.push(rover);
    this.matrix[y][x] = roverId;
    return true;
  }

  validatePath(path: RoverPath, roverId: string) {
    // Validating Limits
    if (
      path.findIndex(
        (step) =>
          step.pos.x < 0 ||
          step.pos.x >= this.cols ||
          step.pos.y < 0 ||
          step.pos.y >= this.rows
      ) >= 0
    ) {
      console.log(
        chalkPipe(COLORS.Error)(
          "The path exceeds the boundaries of the exploration area.\nPlease provide new instructions."
        )
      );
      return false;
    }
    // Validating colisions
    const colision = path
      .filter((step) => step.action === "M")
      .findIndex((step) => {
        const roverIndex = this.rovers
          .filter((rover) => rover.id !== roverId)
          .findIndex(
            (rover) => rover.pos.x === step.pos.x && rover.pos.y === step.pos.y
          );
        if (roverIndex >= 0) {
          console.log(
            chalkPipe(COLORS.Error)(
              `Collision detected in quadrant [${step.pos.x},${step.pos.y}] with Rover ${this.rovers[roverIndex].id}.\nPlease provide new instructions.`
            )
          );
          return true;
        }
        return false;
      });
    if (colision >= 0) return false;
    return true;
  }
  setRoverInstructions(params: string): boolean {
    const index = this.rovers.length - 1;
    const rover = this.rovers[index];
    rover.parseInstructions(
      params,
      this.cols - 1,
      this.rows - 1,
      this.fenceMode
    );

    const isValid = this.validatePath(rover.path, rover.id);
    if (!isValid) return false;

    this.matrix[rover.pos.y][rover.pos.x] = null;
    rover.move();
    this.matrix[rover.pos.y][rover.pos.x] = rover.id;
    this.draw();

    return true;
  }

  draw() {
    switch (this.displayMode) {
      case "map":
        this.drawMap();
        break;
      case "list":
        this.drawList();
      default:
        this.drawIndividual(this.rovers.length - 1);
    }
  }

  private drawIndividual(index: number) {
    if (index < 0 || index > this.rovers.length - 1) return;
    console.log(
      chalkPipe(COLORS.Text)(
        `${this.rovers[index].pos.x} ${this.rovers[index].pos.y} `
      ) + chalkPipe(COLORS.Error)(this.rovers[index].direction)
    );
  }

  private drawList() {
    this.rovers.forEach((_, index) => this.drawIndividual(index));
  }

  private getColContent(col: string | null, empty: string) {
    if (col === null) return empty;
    const rIndex = this.rovers.findIndex((rover) => rover.id === col);
    if (rIndex < 0) return empty;
    return (
      chalkPipe(COLORS.Success)(col) +
      chalkPipe(COLORS.Error)(this.rovers[rIndex].directionChar)
    );
  }
  private drawMap() {
    const sep = chalkPipe(COLORS.Text)(intToChar(166));
    const padLength = String(this.rovers.length).length + 3;
    const colSep = Array(padLength).fill("-").join("");
    const empty = Array(padLength).fill(" ").join("");
    this.matrix
      .slice()
      .reverse()
      .forEach((row, rIndex) => {
        // Map Header
        console.log(
          chalkPipe(COLORS.Text)(
            `${colSep}` + Array(row.length).fill(colSep).join(sep) + "-"
          )
        );
        // Map Body
        console.log(
          chalkPipe(COLORS.Text)(
            String(this.rows - rIndex - 1).padEnd(3) + "|"
          ) +
            row.map((col) => this.getColContent(col, empty)).join(sep) +
            sep
        );
      });
    // Map footer
    console.log(
      chalkPipe(COLORS.Text)(
        `${colSep}` + Array(this.cols).fill(colSep).join(sep) + sep
      )
    );
    console.log(
      chalkPipe(COLORS.Text)(
        `   ${sep}` +
          Array(this.cols)
            .fill(0)
            .map((_, index) => String(index).padEnd(padLength))
            .join(sep) +
          sep +
          "\n"
      )
    );
  }
}

export default ExplorationCenterController;
