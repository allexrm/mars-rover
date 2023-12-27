# MARS ROVER - MISSION CONTROL SIMULATOR

This is a simplified Mission Control simulator for NASA's Mars Exploration Rover project. \
Manage the landing and movements of a group of Rovers on the Martian surface.

- Developed by Allex M. Campos in Node.js with TypeScript.

### Prerequisites

- GIT
- Node.js ^v18.17.1

### Default Setup

```bash
git clone https://github.com/allexrm/mars-rover.git
cd mars-rover
npm install
npm start
```

## Project Structure

This project comprises three main components:

1. **Mission Control:** Responsible for user interaction and sending commands to the Exploration Center;
2. **Exploration Center:** Manages the exploration area, facilitates Rover landings, transmits instructions, and validates movement routes;
3. **Rover:** Explores the Martian soil.

## Usage Instructions

**Step 1: Configuration**

After running the project, you will be prompted to configure the display mode:

- **Individual:** [default] Displays the coordinates [x, y] and the direction of the last Rover to receive movement instructions;
- **Map:** Displays the exploration area in a grid format, showing the Rovers in their respective quadrants;
- **Text:** Displays a list of all Rovers containing their position [x, y] and their direction [N: North, E: East, S: South, W: West];

After configuring the display mode, you will be prompted to configure the Electronic Fence mode:

- **Manually:** [default] Whenever the Rover receives instructions that result in a path outside the exploration area, Mission Control will receive an alert requesting manual correction of the route.
- **Automatically:** Whenever the Rover receives instructions that result in a path outside the exploration area, the route will be automatically adjusted to keep the Rover within the boundaries of the exploration area.

After configuring the Electronic Fence mode, you will be prompted for the size, in meters [W: Width, H: Height], of the exploration area.

**Step 2: Landing and Controlling Rovers**

For each Rover to be activated, 2 pieces of information will be requested. They are:

- Position [x, y] for landing and orientation [N: North, E: East, S: South, W: West].
  Example: '1 1 N' Lands the Rover in quadrant x=1 and y=1 facing North.
- Instructions for the Rover's movement, which should be entered as a simple text containing the available commands. They are:
  - **M :** To make the Rover move in the direction of its orientation;
  - **L :** To make the Rover turn 90 degrees to the left;
  - **R :** To make the Rover turn 90 degrees to the right;
    Example: 'MMRMMLMMM' Makes the rover advance 2 quadrants ('MM'), turn 90 degrees to the right ('R'), advance 2 quadrants ('MM'), turn 90 degrees to the left ('L'), advance 3 more quadrants ('MMM').

**PS:** Keeping the instructions empty will maintain the Rover's original landing position and orientation.

Send the **Q** instruction at any time to disconnect Mission Control.

## Rules

1. The exploration area cannot be smaller than 1x1.
2. A Rover cannot land outside the exploration area.
3. A Rover cannot follow a path that exits the exploration area.
4. A Rover cannot land in a quadrant occupied by another Rover.
5. A Rover cannot traverse a path on a collision course with another Rover.

For any of the above situations, Mission Control will receive an alert requesting correction of the given instructions. If the fence mode is set to 'Automatically,' situation 3 will be ignored, and the Rover will be automatically kept inside the exploration area.

### Running Tests

```bash
npm test
```

### Used Packages

- Typescript
- Babel
- Jest
- Inquirer
- Chalk-Pipe
