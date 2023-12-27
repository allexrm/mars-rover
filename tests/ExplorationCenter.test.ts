import ExplorationCenterController from "../src/controllers/ExplorationCenterController";
import { expect } from "@jest/globals";

describe("Exploration Center", () => {
  describe("When an Exploration Center is created with 10 cols and 10 rows", () => {
    it("It should have an exploration matrix with a size of 10x10", () => {
      const explorationCenter = new ExplorationCenterController(10, 10);
      expect(explorationCenter.matrix.length).toBe(10);
      expect(explorationCenter.matrix[0].length).toBe(10);
    });

    describe("When a new Rover tries to land out of the exploration area [11 1]", () => {
      it("It should return false", () => {
        const explorationCenter = new ExplorationCenterController(10, 10);
        const response = explorationCenter.landNewRover(11, 1, "N");
        expect(response).toBe(false);
      });
    });

    describe("When a new Rover lands on an empty quadrant at [1 1] facing North", () => {
      const explorationCenter = new ExplorationCenterController(10, 10);
      const response = explorationCenter.landNewRover(1, 1, "N");
      it("It should return true", () => {
        expect(response).toBe(true);
      });
      it("Exploration Center Rover's list should have 1 item", () => {
        expect(explorationCenter.rovers.length).toBe(1);
      });
      const rover = explorationCenter.rovers[0];
      const quadrant = explorationCenter.matrix[1][1];
      it("Exploration Center's matrix at position [1 1] should have the same ID as the first rover on the list", () => {
        expect(quadrant).toBe(rover.id);
      });
    });

    describe("When a new Rover tries to land on an occupied quadrant", () => {
      it("It should return false", () => {
        const explorationCenter = new ExplorationCenterController(10, 10);
        explorationCenter.landNewRover(11, 1, "N");
        const response = explorationCenter.landNewRover(11, 1, "N");
        expect(response).toBe(false);
      });
    });

    describe("When a Rover landed at quadrant [1 1] facing North.", () => {
      describe("When the Rover receives the following instructions MMRMM.", () => {
        const explorationCenter = new ExplorationCenterController(10, 10);
        explorationCenter.landNewRover(1, 1, "N");
        const response = explorationCenter.setRoverInstructions("MMRMM");
        it("It should return true", () => {
          expect(response).toBe(true);
        });
        it("Exploration Center's matrix at position [3 3] should have the same ID as the first rover on the list", () => {
          expect(explorationCenter.matrix[3][3]).toBe(
            explorationCenter.rovers[0].id
          );
        });
      });

      describe("When the Rover receives instructions to move out of exploration area.", () => {
        const explorationCenter = new ExplorationCenterController(10, 10);
        explorationCenter.landNewRover(1, 1, "N");
        const response = explorationCenter.setRoverInstructions("MMLMM");
        it("It should return false", () => {
          expect(response).toBe(false);
        });
      });

      describe("When a second Rover tries to follow a path occupied by another Rover", () => {
        const explorationCenter = new ExplorationCenterController(10, 10);
        explorationCenter.landNewRover(1, 1, "N");
        explorationCenter.setRoverInstructions("MM");
        explorationCenter.landNewRover(1, 1, "N");
        const response = explorationCenter.setRoverInstructions("MM");
        it("It should return false", () => {
          expect(response).toBe(false);
        });
      });
    });
  });
});
