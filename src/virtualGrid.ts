// Virtual dimensions of the output
export const virtualWidth = 10;
export const virtualHeight = 20;

// Actual dimension of canvas divided by virtual dimensions
export const blockLen = 30;

// Converts virtual dimensions to actual dimensions for use on the canvas
export const virtualToActual = (dim: number): number => {
  return dim * blockLen;
};
