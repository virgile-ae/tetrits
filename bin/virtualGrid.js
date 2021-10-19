export const virtualWidth = 10;
export const virtualHeight = 20;
export const blockLen = 30;
export const virtualToActual = (dim) => {
    return dim * blockLen;
};
