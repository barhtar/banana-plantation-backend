import * as yup from "yup";

import { Instruction, ParsedInput, Position } from "./position.namespace";
import { CustomError } from "../../functions/custom-error";

const schema = yup.object({
  start: yup.object({
    x: yup.number().integer("x must be an integer").min(0, "x must be >= 0"),
    y: yup.number().integer("y must be an integer").min(0, "y must be >= 0"),
    direction: yup
      .string()
      .oneOf(["N", "S", "E", "O"], "Direction must be one of N, S, E, O"),
  }),
  instructions: yup
    .string()
    .matches(/^[AGD]+$/, "Instructions must only contain A, G, or D"),
});

const parseInput = (input: string | null) => {
  const lines = input
    ?.trim()
    .split("\n")
    .filter((line) => line.trim() !== "");

  if (!lines || lines.length !== 2)
    throw new CustomError("Input must contain exactly two lines", 400);

  const match = lines[0].match(/^\((-?[\w]+),\s*(-?[\w]+),\s*([\w])\)$/);
  if (!match)
    throw new CustomError("Invalid format for the starting position", 400);

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
  try {
    const { start, instructions } = schema.validateSync(parsed, {
      abortEarly: false,
    }) as {
      start: Position;
      instructions: string;
    };

    return {
      start,
      instructions: instructions.split("") as Instruction[],
    };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      throw new CustomError(err.inner.map((e) => e.message).join(", "), 400);
    }
    throw err;
  }
};
