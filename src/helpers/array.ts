export const shuffle = <T>(array: T[]): T[] => {
    const arrayCopy = [...array]
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy
}

const range = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const sortedRange = (start: number, end: number, first: number): number[] => {
    return range(start, end).sort((a, b) => {
        if (a >= first && b >= first) return a - b;
        if (a < first && b < first) return a - b;
        return a >= first ? -1 : 1;
    });
};
