import Rover from "../src/classes/Rover";

describe("Rovers", () => {
  describe("When a Rover is landed at [1 1 N]", () => {
    const rover = new Rover("R01", 1, 1, "N");

    it("Rover's position should be defined at pos [1,1] pointed to N", () => {
      expect(rover.pos).toBeDefined();
      if (rover.pos) {
        expect(rover.pos.x).toBe(1);
        expect(rover.pos.y).toBe(1);
        expect(rover.direction).toBe("N");
      }
    });
  });

  describe("When a Rover is in position [1,1] facing North", () => {
    describe("If it parses the instructions MMRM", () => {
      const rover = new Rover("R01", 1, 1, "N");
      rover.parseInstructions("MMRM");
      it("It should return an array containing 4 steps to move to quadrant [2,3] facing East", () => {
        expect(rover.path.length).toBe(4);
        expect(rover.path[0]).toEqual({
          pos: { x: 1, y: 2 },
          direction: "N",
          action: "M",
        });
        expect(rover.path[1]).toEqual({
          pos: { x: 1, y: 3 },
          direction: "N",
          action: "M",
        });
        expect(rover.path[2]).toEqual({
          pos: { x: 1, y: 3 },
          direction: "E",
          action: "R",
        });
        expect(rover.path[3]).toEqual({
          pos: { x: 2, y: 3 },
          direction: "E",
          action: "M",
        });
      });
    });

    describe("If it receives the instruction R", () => {
      const rover = new Rover("R01", 1, 1, "N");
      rover.parseInstructions("R");
      rover.move();
      it("It should remain in quadrant [1,1] facing East.", () => {
        expect(rover.pos).toBeDefined();
        if (rover.pos) {
          expect(rover.pos.x).toBe(1);
          expect(rover.pos.y).toBe(1);
          expect(rover.direction).toBe("E");
        }
      });
    });

    describe("If it receives the instruction L", () => {
      const rover = new Rover("R01", 1, 1, "N");
      rover.parseInstructions("L");
      rover.move();
      it("It should remain in quadrant [1,1] facing Weast.", () => {
        expect(rover.pos).toBeDefined();
        if (rover.pos) {
          expect(rover.pos.x).toBe(1);
          expect(rover.pos.y).toBe(1);
          expect(rover.direction).toBe("W");
        }
      });
    });

    describe("If it receives the instruction M", () => {
      const rover = new Rover("R01", 1, 1, "N");
      rover.parseInstructions("M");
      rover.move();
      it("It should move to quadrant [1,2] facing North.", () => {
        expect(rover.pos).toBeDefined();
        if (rover.pos) {
          expect(rover.pos.x).toBe(1);
          expect(rover.pos.y).toBe(2);
          expect(rover.direction).toBe("N");
        }
      });
    });

    describe("If it receives the instructions MMRMM", () => {
      const rover = new Rover("R01", 1, 1, "N");
      rover.parseInstructions("MMRMM");
      rover.move();
      it("It should move to quadrant [3,3] facing East", () => {
        expect(rover.pos).toBeDefined();
        if (rover.pos) {
          expect(rover.pos.x).toBe(3);
          expect(rover.pos.y).toBe(3);
          expect(rover.direction).toBe("E");
        }
      });
    });

    describe("If it receives the instructions LMMRMM with fence mode set to 'automatically'", () => {
      const rover = new Rover("R01", 1, 1, "N");
      rover.parseInstructions("LMMRMM", 10, 10, "automatically");
      rover.move();
      it("It should move to quadrant [0,3] facing North", () => {
        expect(rover.pos).toBeDefined();
        if (rover.pos) {
          expect(rover.pos.x).toBe(0);
          expect(rover.pos.y).toBe(3);
          expect(rover.direction).toBe("N");
        }
      });
    });
  });
});
