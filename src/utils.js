export const randomize = (array) => [...array].sort(() => Math.random() * 2 - 1);
