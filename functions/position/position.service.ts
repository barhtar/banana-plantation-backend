import { CustomError } from "../../functions/custom-error";
import { DIRECTIONS, Instruction, MOVES, Position } from "./position.namespace";

const getNextPosition = (
  actualPosition: Position,
  instruction: Instruction
): Position => {
  if (instruction === Instruction.A) {
    const { x, y, direction } = actualPosition;

    const move = MOVES[direction];

    const NewPosition = {
      ...actualPosition,
      x: x + move.x,
      y: y + move.y,
    };

    if (NewPosition.x < 0 || NewPosition.y < 0) {
      throw new CustomError("Invalid position, x and y must be >= 0", 500);
    }

    return NewPosition;
  }
  const { direction } = actualPosition;
  const actualIndex = DIRECTIONS.indexOf(direction);

  const rotation = instruction === Instruction.D ? 1 : -1;

  const newDirection = DIRECTIONS[(actualIndex + rotation + 4) % 4];
  return {
    ...actualPosition,
    direction: newDirection,
  };
};

export const getResult = (
  actualPosition: Position,
  instructions: Instruction[]
): string => {
  if (!instructions.length) {
    const { x, y, direction } = actualPosition;
    return `(${x}, ${y}, ${direction})`;
  }

  const nextPosition = getNextPosition(actualPosition, instructions[0]);

  instructions.shift();

  return getResult(nextPosition, instructions);
};
