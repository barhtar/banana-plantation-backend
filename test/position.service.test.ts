import { getResult } from '../functions/position/position.service';
import {
  Direction,
  Instruction,
  Position,
} from '../functions/position/position.namespace';

describe('getResult', () => {
  it.each`
    initialPosition                           | instructions                                                                                                                               | expected
    ${{ x: 0, y: 0, direction: Direction.N }} | ${[]}                                                                                                                                      | ${'(0, 0, N)'}
    ${{ x: 0, y: 0, direction: Direction.N }} | ${[Instruction.A]}                                                                                                                         | ${'(0, 1, N)'}
    ${{ x: 0, y: 0, direction: Direction.N }} | ${[Instruction.D]}                                                                                                                         | ${'(0, 0, E)'}
    ${{ x: 0, y: 0, direction: Direction.N }} | ${[Instruction.G]}                                                                                                                         | ${'(0, 0, O)'}
    ${{ x: 0, y: 0, direction: Direction.N }} | ${[Instruction.A, Instruction.D, Instruction.A, Instruction.G]}                                                                            | ${'(1, 1, N)'}
    ${{ x: 0, y: 0, direction: Direction.N }} | ${[Instruction.G, Instruction.G, Instruction.G, Instruction.G]}                                                                            | ${'(0, 0, N)'}
    ${{ x: 2, y: 1, direction: Direction.E }} | ${[Instruction.A, Instruction.G, Instruction.A, Instruction.A, Instruction.D, Instruction.D, Instruction.A, Instruction.D, Instruction.A]} | ${'(2, 2, O)'}
  `(
    `should handle wrapping of directions correctly for $initialPosition and $instructions`,
    ({ initialPosition, instructions, expected }) => {
      expect(getResult(initialPosition, instructions)).toBe(expected);
    },
  );
  it('should throw an error if x or y are less than 0', () => {
    const input = `(-1, 2, N)\nAGD`;
    try {
      getResult({ x: -1, y: 2, direction: Direction.N }, [Instruction.A]);
    } catch (e) {
      expect(e).toEqual(new Error('Invalid position, x and y must be >= 0'));
    }
  });
});
