declare type ExplorationMatrix = Array<Array<string | null>>;
declare type DisplayMode = "map" | "list" | "individual";
declare type FenceMode = "manually" | "automatically";

declare type RoverDirection = "N" | "E" | "S" | "W";
declare type Point = {
  x: number;
  y: number;
};
declare type RoverPosition = {
  pos: Point;
  direction: RoverDirection;
};

declare type RoverInstruction = "M" | "R" | "L";
declare type RoverPathStep = {
  pos: Point;
  direction: RoverDirection;
  action: RoverInstruction;
};
declare type RoverPath = RoverPathStep[];
