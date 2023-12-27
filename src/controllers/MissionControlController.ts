import inquirer from "inquirer";
import chalkPipe from "chalk-pipe";

import {
  parsePointParams,
  parseRoverPositionParams,
  validateExplorationAreaParams,
  validateRoverInstructionsParams,
  validateRoverPositionParams,
} from "../utils/index.js";
import ExplorationCenterController from "./ExplorationCenterController.js";
import { COLORS } from "../constants/index.js";

const headerContent =
  "=====================================\n" +
  "= NASA Mars Rover - Mission Control =\n" +
  "=====================================\n";

export class MissionControlController {
  explorationCenter: ExplorationCenterController | undefined;
  displayMode: DisplayMode = "individual";
  fenceMode: FenceMode = "manually";

  constructor() {}

  private showHeader() {
    console.log(chalkPipe(COLORS.Header)(headerContent));
  }

  private showSubheader() {
    console.log(chalkPipe(COLORS.Success)("\nMission Control is connected!"));
    console.log(
      chalkPipe(COLORS.Text)('Press "q" at any time to disconect.\n')
    );
  }

  private async configDisplayMode(): Promise<void> {
    const question = [
      {
        type: "list",
        name: "display_mode",
        message: "Select the display mode:",
        choices: ["Individual", "Map", "List"],
        default: "Individual",
      },
    ];
    return new Promise((resolve) => {
      inquirer.prompt(question).then((answers) => {
        this.displayMode = answers.display_mode.toLowerCase();
        resolve();
      });
    });
  }

  private async configFenceMode(): Promise<void> {
    const question = [
      {
        type: "list",
        name: "fence_mode",
        message: "Applying an electronic fence for Rover movement:",
        choices: ["Manually", "Automatically"],
        default: "Manually",
      },
    ];
    return new Promise((resolve) => {
      inquirer.prompt(question).then((answers) => {
        this.fenceMode = answers.fence_mode.toLowerCase();
        resolve();
      });
    });
  }

  private validateInput(
    params: string,
    callBack: (params: string) => boolean | string
  ) {
    if (params === "Q") return true;
    return callBack(params);
  }

  private async configExplorationArea(): Promise<void> {
    const question = [
      {
        type: "input",
        name: "exploration_area",
        message: "Provide the size of the exploration area (in meters) [W H]:",
        transformer: (answer: string) => answer.toUpperCase(),
        validate: (answer: string) =>
          this.validateInput(answer, validateExplorationAreaParams),
      },
    ];
    return new Promise((resolve) => {
      inquirer.prompt(question).then((answers) => {
        const answer = answers.exploration_area.toUpperCase();
        if (answer === "Q") this.disconnect();

        const point = parsePointParams(answer);
        this.explorationCenter = new ExplorationCenterController(
          point.y,
          point.x,
          this.displayMode,
          this.fenceMode
        );
        this.explorationCenter.draw();
        resolve();
      });
    });
  }

  private async landNewRover(): Promise<boolean> {
    const question = [
      {
        type: "input",
        name: "rover_position",
        message:
          "Provide the destination position and direction [X Y D] to land a new Rover:",
        transformer: (answer: string) => answer.toUpperCase(),
        validate: (answer: string) =>
          this.validateInput(answer, validateRoverPositionParams),
      },
    ];
    return new Promise<boolean>((resolve) => {
      inquirer.prompt(question).then((answers) => {
        const answer = answers.rover_position.toUpperCase();
        if (answer === "Q") this.disconnect();

        const position = parseRoverPositionParams(answer);
        const response = this.explorationCenter?.landNewRover(
          position.pos.x,
          position.pos.y,
          position.direction
        );

        resolve(response || false);
      });
    });
  }

  private async sendRoverInstructions(): Promise<boolean> {
    const question = [
      {
        type: "input",
        name: "rover_instructions",
        message: "Provide the Rover's movement instructions:",
        transformer: (answer: string) => answer.toUpperCase(),
        validate: (answer: string) =>
          this.validateInput(answer, validateRoverInstructionsParams),
      },
    ];
    return new Promise<boolean>((resolve) => {
      inquirer.prompt(question).then((answers) => {
        const answer = answers.rover_instructions.toUpperCase();
        if (answer === "Q") this.disconnect();

        const isValid = this.explorationCenter?.setRoverInstructions(answer);
        resolve(isValid || false);
      });
    });
  }

  async connect() {
    this.showHeader();
    await this.configDisplayMode();
    await this.configFenceMode();
    this.showSubheader();
    await this.configExplorationArea();
    while (true) {
      const roverLanded = await this.landNewRover();
      if (roverLanded) {
        let isValid = false;
        do {
          isValid = await this.sendRoverInstructions();
        } while (!isValid);
      }
    }
  }

  disconnect() {
    console.log(chalkPipe(COLORS.Error)("Mission Control disconnected!\n"));
    process.exit(0);
  }
}
