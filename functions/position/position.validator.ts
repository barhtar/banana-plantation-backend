import * as yup from 'yup';
import { Instruction, ParsedInput, Position } from './position.namespace';

const schema = yup.object({
  start: yup.object({
    x: yup.number().integer('x must be an integer').min(0, 'x must be >= 0'),
    y: yup.number().integer('y must be an integer').min(0, 'y must be >= 0'),
    direction: yup
      .string()
      .oneOf(['N', 'S', 'E', 'W'], 'Direction must be one of N, S, E, W'),
  }),
  instructions: yup
    .string()
    .matches(/^[AGD]+$/, 'Instructions must only contain A, G, or D'),
});

const parseInput = (input: string | null) => {
  const lines = input
    ?.trim()
    .split('\n')
    .filter((line) => line.trim() !== '');

  if (!lines || lines.length !== 2)
    throw new Error('Input must contain exactly two lines');

  const match = lines[0].match(/^\((-?[\w]+),\s*(-?[\w]+),\s*([\w])\)$/);
  if (!match) throw new Error('Invalid format for the starting position');

  const x = parseInt(match[1], 10);
  const y = parseInt(match[2], 10);
  const direction = match[3];

  return {
    start: { x, y, direction },
    instructions: lines[1].trim(),
  };
};

export const validateInput = (input: string | null): ParsedInput => {
  const parsed = parseInput(input);

  const { start, instructions } = schema.validateSync(parsed) as {
    start: Position;
    instructions: string;
  };

  return {
    start,
    instructions: instructions.split('') as Instruction[],
  };
};
