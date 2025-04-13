enum Direction {
  N = 'N',
  E = 'E',
  S = 'S',
  O = 'O',
}

enum Instruction {
  A = 'A',
  G = 'G',
  D = 'D',
}

const MOVES: Record<Direction, { x: number; y: number }> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  O: { x: -1, y: 0 },
};

const DIRECTIONS: Direction[] = [
  Direction.N,
  Direction.E,
  Direction.S,
  Direction.O,
];

type Position = {
  x: number;
  y: number;
  direction: Direction;
};

type ParsedInput = {
  start: Position;
  instructions: Instruction[];
};

export { Direction, Instruction, Position, ParsedInput, DIRECTIONS, MOVES };
