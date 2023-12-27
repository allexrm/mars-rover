import {
  intToChar,
  parseNumberArray,
  parsePointParams,
  parseRoverInstructionsArray,
  parseRoverPositionArray,
  parseRoverPositionParams,
  validateExplorationAreaParams,
  validatePointParams,
  validateRoverInstructionsParams,
  validateRoverPositionParams,
} from "../src/utils";

describe("Utils", () => {
  describe("inToChar function", () => {
    it("Should convert number 65 to char A", () => {
      const char = intToChar(65);
      expect(char).toBe("A");
    });
  });

  describe("parseNumberArray function", () => {
    describe("For param '1 1 3'", () => {
      it("Should return [1,1,3]", () => {
        const arr = parseNumberArray("1 1 3");
        expect(arr).toEqual([1, 1, 3]);
      });
    });
    describe("For param '1X1abc3'", () => {
      it("Should return [1,1,3]", () => {
        const arr = parseNumberArray("1X1abc3");
        expect(arr).toEqual([1, 1, 3]);
      });
    });
    describe("For param 'Xabc'", () => {
      it("Should return []", () => {
        const arr = parseNumberArray("Xabc");
        expect(arr).toEqual([]);
      });
    });
  });

  describe("validateExplorationAreaParams function", () => {
    describe("For param 'Q'", () => {
      it("Should return true", () => {
        const arr = validateExplorationAreaParams("Q");
        expect(arr).toBe(true);
      });
    });
    describe("For param '1 1'", () => {
      it("Should return true", () => {
        const arr = validateExplorationAreaParams("1 1");
        expect(arr).toBe(true);
      });
    });
    describe("For any parameter other than 'Q' that does not contain at least 2 numeric values", () => {
      it("Should return 'Invalid Params'", () => {
        const arr = validateExplorationAreaParams("1ab  Xs");
        expect(arr).toBe("Invalid Params");
      });
    });
  });

  describe("validatePointParams function", () => {
    describe("For param 'Q'", () => {
      it("Should return true", () => {
        const arr = validatePointParams("Q");
        expect(arr).toBe(true);
      });
    });
    describe("For param '1 1'", () => {
      it("Should return true", () => {
        const arr = validatePointParams("1 1");
        expect(arr).toBe(true);
      });
    });
    describe("For any parameter other than 'Q' that does not contain at least 2 numeric values.", () => {
      it("Should return 'Invalid Params'", () => {
        const arr = validatePointParams("1ab  Xs");
        expect(arr).toBe("Invalid Params");
      });
    });
  });

  describe("parsePointParams function", () => {
    describe("For param '1 1'", () => {
      it("Should return an instance of Point with x=1 and y=1", () => {
        const arr = parsePointParams("1 1");
        expect(arr).toEqual({ x: 1, y: 1 });
      });
    });
    describe("For a parameter with just 1 numeric values.", () => {
      it("Should return an instance of Point with x=the first valid number and y=0", () => {
        const arr = parsePointParams("1ab  Xs");
        expect(arr).toEqual({ x: 1, y: 0 });
      });
    });
    describe("For any parameter that does not contain at least 2 numeric values.", () => {
      it("Should return an instance of Point with x=0 and y=0", () => {
        const arr = parsePointParams("ab  Xs");
        expect(arr).toEqual({ x: 0, y: 0 });
      });
    });
  });

  describe("parseRoverPositionArray function", () => {
    describe("From any string param like '1x2wsGFN'", () => {
      it("Should return an array of 3 elements with only numbers from 0 to 9 and the characters 'N','E','S' and 'W'", () => {
        const arr = parseRoverPositionArray("1x2wsGFN");
        expect(arr).toEqual([1, 2, "N"]);
      });
    });
    describe("For param '1 N 2'", () => {
      it("Should return [1, 2, N]", () => {
        const arr = parseRoverPositionArray("1 N 2");
        expect(arr).toEqual([1, 2, "N"]);
      });
    });
  });

  describe("validateRoverPositionParams function", () => {
    describe("For param 'Q'", () => {
      it("Should return true", () => {
        const arr = validateRoverPositionParams("Q");
        expect(arr).toBe(true);
      });
    });
    describe("For param '1 1 N'", () => {
      it("Should return true", () => {
        const response = validateRoverPositionParams("1 1 N");
        expect(response).toBe(true);
      });
    });
    describe("For param '11E'", () => {
      it("Should return true", () => {
        const response = validateRoverPositionParams("11E");
        expect(response).toBe(true);
      });
    });
    describe("For param '1W'", () => {
      it("Should return  'Invalid Params", () => {
        const response = validateRoverPositionParams("1W");
        expect(response).toBe("Invalid Params");
      });
    });
  });

  describe("parseRoverPositionParams function", () => {
    describe("For a valid Rover position param like '1 1 N'", () => {
      it("Should return an instance of RoverPosition with pos={x:1, y:1} and direction='N'", () => {
        const position = parseRoverPositionParams("1 1 N");
        expect(position).toEqual({ pos: { x: 1, y: 1 }, direction: "N" });
      });
    });
    describe("For any invalid Rover position parameter", () => {
      it("Should return an instance of RoverPosition with pos = {x:0, y:0} and direction='N'", () => {
        const position = parseRoverPositionParams("1ab  Xs");
        expect(position).toEqual({ pos: { x: 0, y: 0 }, direction: "N" });
      });
    });
  });

  describe("parseRoverInstructionsArray function", () => {
    describe("For any string param like 'abxMmRMMlLmM'", () => {
      it("Should return an array with only valid instructions for Rover movement: 'M', 'R', and 'L'.", () => {
        const position = parseRoverInstructionsArray("abxMmRMMlLmM");
        expect(position).toEqual(["M", "R", "M", "M", "L", "M"]);
      });
    });
  });

  describe("validateRoverInstructionsParams function", () => {
    describe("For param 'Q'", () => {
      it("Should return true", () => {
        const arr = validateRoverInstructionsParams("Q");
        expect(arr).toBe(true);
      });
    });
    describe("For an empty param", () => {
      it("Should return true", () => {
        const arr = validateRoverInstructionsParams("");
        expect(arr).toBe(true);
      });
    });
    describe("For a valid instruction for Rover movement like 'MMMRMM", () => {
      it("Should return true", () => {
        const response = validateRoverInstructionsParams("MMMRMM");
        expect(response).toBe(true);
      });
    });
    describe("For an invalid instruction for Rover movement like 'agtsf t", () => {
      it("Should return 'Invalid Params", () => {
        const response = validateRoverInstructionsParams("agtsf t");
        expect(response).toBe("Invalid Params");
      });
    });
  });
});
