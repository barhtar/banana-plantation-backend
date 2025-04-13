import { validateInput } from '../functions/position/position.validator';

describe('validateInput', () => {
  it('should validate correct input successfully', () => {
    const input = `(1, 2, N)\nAGD`;
    const result = validateInput(input);
    expect(result).toEqual({
      start: { x: 1, y: 2, direction: 'N' },
      instructions: ['A', 'G', 'D'],
    });
  });

  it('should throw an error if x is less than 0', () => {
    const input = `(-1, 2, N)\nAGD`;
    expect(() => validateInput(input)).toThrow('x must be >= 0');
  });

  it('should throw an error if y is less than 0', () => {
    const input = `(1, -2, N)\nAGD`;
    expect(() => validateInput(input)).toThrow('y must be >= 0');
  });

  it('should throw an error if direction is invalid', () => {
    const input = `(1, 2, X)\nAGD`;
    expect(() => validateInput(input)).toThrow(
      'Direction must be one of N, S, E, W',
    );
  });

  it('should throw an error if instructions contain invalid characters', () => {
    const input = `(1, 2, N)\nAGX`;
    expect(() => validateInput(input)).toThrow(
      'Instructions must only contain A, G, or D',
    );
  });

  it('should throw an error if x is missing', () => {
    const input = `(, 2, N)\nAGD`;
    expect(() => validateInput(input)).toThrow(
      'Invalid format for the starting position',
    );
  });

  it('should throw an error if y is missing', () => {
    const input = `(1, , N)\nAGD`;
    expect(() => validateInput(input)).toThrow(
      'Invalid format for the starting position',
    );
  });

  it('should throw an error if direction is missing', () => {
    const input = `(1, 2, )\nAGD`;
    expect(() => validateInput(input)).toThrow(
      'Invalid format for the starting position',
    );
  });
});
