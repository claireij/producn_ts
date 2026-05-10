export const sanitizeInput = (input: string) => {
  return input
    .trim()
    .slice(0, 1000);
};