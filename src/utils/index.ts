/// <reference path="../../types.d.ts" />

const validRoverDirections = ["N", "E", "S", "W"];

export const intToChar = (val: number) => {
  return String.fromCharCode(val);
};

/**
 * Returns an array containing only the numeric values contained in a string.
 *
 * @param {string} params String containing numeric values.
 * @returns {Array<number>}
 */
export const parseNumberArray = (params: string): Array<number> =>
  params
    .replace(/[^0-9]+|\s+/g, " ")
    .split(" ")
    .map((val) => parseInt(val))
    .filter((val) => !isNaN(val));

/**
 * Validates if the input string has the required parameters [w:number and h:number] for defining the size of the exploration area.
 *  - If the string is valid, returns true;
 *  - If the string is invalid, returns a string containing the text 'Invalid Params.'
 * Minimum values for W and H: 1
 *
 * @param {string} params Input parameters.
 * @returns {boolean | string}
 * @example
 * // Usage examples:
 * validateExplorationAreaParams('1 1'); // Expected output: true
 * validateExplorationAreaParams('1 a'); // Expected output: 'Invalid Params'
 * validateExplorationAreaParams('0 0'); // Expected output: 'Invalid Params'
 */
export const validateExplorationAreaParams = (
  params: string
): boolean | string => {
  const value = params.toUpperCase();
  if (value === "Q") return true;
  const arr = parseNumberArray(value).slice(0, 2);
  if (arr.length < 2 || arr[0] < 0 || arr[1] < 0) return "Invalid Params";
  return true;
};

/**
 * Validates if the input string has the required parameters [x: number, y: number] for creating a new Point object.
 *  - If the string is valid, returns true;
 *  - If the string is invalid, returns a string containing the text 'Invalid Params.'
 * Minimum values for x and y: 0
 *
 * @param {string} params Input parameters.
 * @returns {boolean | string}
 * @example
 * // Usage examples:
 * validatePointParams('1 1'); // Expected output: true
 * validatePointParams('1 a'); // Expected output: 'Invalid Params'
 * validatePointParams('0 0'); // Expected output: true
 */
export const validatePointParams = (params: string): boolean | string => {
  const value = params.toUpperCase();
  if (value === "Q") return true;
  const arr = parseNumberArray(value).slice(0, 2);
  if (arr.length < 2 || arr[0] < 0 || arr[1] < 0) return "Invalid Params";
  return true;
};

/**
 * Gets the data from the provided parameter and returns an instance of Point.
 *  - If both coordinates exist in the input string, returns an instance of Point with the provided x and y coordinates;
 *  - If only one coordinate is valid, returns an instance of Point with the coordinates {x: valid coordinate, y: 0}
 *  - If no coordinates are valid, returns an instance of Point with the coordinates {x: 0, y: 0}
 * Minimum values for x and y: 0
 *
 * @param {string} params Input parameters.
 * @returns {Point}
 * @example
 * // Usage examples:
 * parsePointParams('1 1'); // Expected output: {x: 1, y: 1}
 * parsePointParams('1 a'); // Expected output: {x: 1, y: 0}
 * parsePointParams('a a'); // Expected output: {x: 0, y: 0}
 */
export const parsePointParams = (params: string): Point => {
  const arr = parseNumberArray(params);
  return {
    x: arr[0] || 0,
    y: arr[1] || 0,
  };
};

/**
 * Returns an array of 3 elements containing only numeric values or orientation coordinates of the Rover 'N','E','S', and 'W'.
 * The returned array will be sorted so that numeric values are presented first.
 *
 * @param {string} params Input parameters.
 * @returns {Array<number | 'N' | 'E' | 'S' | 'W'>}
 * @example
 * // Usage examples:
 * parseRoverPositionArray('1 1 N'); // Expected output: [1, 1, 'N']
 * parseRoverPositionArray('1 E 2'); // Expected output: [1, 2, 'E']
 * parseRoverPositionArray('2Wa3'); // Expected output: [2, 3, 'W']
 */
export const parseRoverPositionArray = (params: string) =>
  params
    .replace(/[^0-9NESW]+|\s+/g, "")
    .split("")
    .map((val) => (isNaN(parseInt(val)) ? val : parseInt(val)))
    .sort((a, b) => (typeof b === "string" && typeof a === "number" ? -1 : 0))
    .slice(0, 3);

/**
 * Validates if the input string has the required parameters [x: number, y: number, dir: RoverDirection]
 *  for creating a new RoverPosition object.
 *  - If the string is valid, returns true;
 *  - If the string is invalid, returns a string containing the text 'Invalid Params.'
 * Minimum values for x and y: 0
 *
 * @param {string} params Input parameters.
 * @returns {boolean | string}
 * @example
 * // Usage examples:
 * validateRoverPositionParams('1 1 N'); // Expected output: true
 * validateRoverPositionParams('1 1 T'); // Expected output: 'Invalid Params'
 * validateRoverPositionParams('0 0 W'); // Expected output: true
 */
export const validateRoverPositionParams = (
  params: string
): boolean | string => {
  const value = params.toUpperCase();
  if (value === "Q") return true;
  const arr = parseRoverPositionArray(value);
  if (
    arr.length < 3 ||
    typeof arr[0] !== "number" ||
    arr[0] < 0 ||
    typeof arr[1] !== "number" ||
    arr[1] < 0 ||
    !validRoverDirections.includes(String(arr[2]))
  )
    return "Invalid Params";
  return true;
};

/**
 * Retrieves the x, y, and direction coordinates in the provided parameter and returns an instance of RoverPosition.
 *  - If the input string is valid, returns an instance of RoverPosition with the provided x, y, and direction coordinates;
 *  - If the input string is not valid, returns an instance of RoverPosition with coordinates {x: 0, y: 0, direction: 'N'};
 * Minimum values for x and y: 0
 * Possible values for direction: 'N', 'E', 'S', and 'W'
 *
 * @param {string} params Input parameters.
 * @returns {RoverPosition}
 * @example
 * // Usage examples:
 * parseRoverPositionParams('1 1 W'); // Expected output: {x: 1, y: 1, direction: 'W'}
 * parseRoverPositionParams('1 a'); // Expected output: {x: 0, y: 0, direction: 'N'}
 * parseRoverPositionParams('1x1xE'); // Expected output: {x: 1, y: 1, direction: 'E'}
 */
export const parseRoverPositionParams = (params: string): RoverPosition => {
  const arr =
    validateRoverPositionParams(params) === true
      ? parseRoverPositionArray(params)
      : [0, 0, "N"];
  return {
    pos: {
      x: Number(arr[0]) || 0,
      y: Number(arr[1]) || 0,
    },
    direction: arr[2] as RoverDirection,
  };
};

/**
 * Returns an array containing only Rover movement instructions 'M', 'R', and 'L'.
 *
 * @param {string} params Input parameters.
 * @returns {Array<'M' | 'R' | 'L'>}
 * @example
 * // Usage examples:
 * parseRoverInstructionsArray('MMRMM'); // Expected output: ['M', 'M', 'R', 'M', 'M']
 * parseRoverInstructionsArray('mmMRMlL'); // Expected output: ['M', 'R', 'M', 'L']
 * parseRoverInstructionsArray('mmrmml'); // Expected output: []
 */
export const parseRoverInstructionsArray = (
  params: string
): RoverInstruction[] =>
  params
    .replace(/[^RLM]/g, "")
    .split("")
    .map((value) => value as RoverInstruction);

/**
 * Validates whether the input string contains Rover movement instructions: 'M', 'R', and 'L'.
 *  - Returns true if the string is valid or empty;
 *  - Returns a string containing 'Invalid Params' if the string is invalid.
 *
 * @param {string} params Input parameters.
 * @returns {boolean | string}
 * @example
 * // Usage examples:
 * validateRoverInstructionsParams('MMRMM'); // Expected output: true
 * validateRoverInstructionsParams('mmMRMlL'); // Expected output: true
 * validateRoverInstructionsParams(''); // Expected output: true
 * validateRoverInstructionsParams('mmrmml'); // Expected output: 'Invalid Params'
 */
export const validateRoverInstructionsParams = (
  params: string
): boolean | string => {
  const value = params.toUpperCase();
  if (value === "Q") return true;
  if (value === "") return true;
  const pArr = parseRoverInstructionsArray(value);
  if (pArr.length === 0) return "Invalid Params";
  return true;
};
