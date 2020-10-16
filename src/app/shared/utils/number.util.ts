export const isNumber = (value: any): boolean => !isNaN(parseFloat(value)) && !isNaN(value - 0);
