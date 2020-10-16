import { Latinise } from './latin-map';

export const randomString = (): string => Math.random().toString(36).substring(5);

export const isString = (stringTest): boolean => Object.prototype.toString.call(stringTest) === '[object String]';

export const isStringEmpty = (value: string): boolean => (value === undefined || value == null || value.toString().trim() === '');

export const latinize = (value: string): string => value.replace(/[^A-Za-z0-9\[\] ]/g, (a) => (Latinise.latin_map[a] || a));

export const isInclude = (testString: string, value: string): boolean => latinize(testString).toLowerCase().includes(latinize(value.toLowerCase()));

export const duplicateItems = arr => {
    const mapping = arr.reduce((map, curr) => {
        return (map.set(curr, (map.get(curr) || 0) + 1), map);
    }, new Map());

    return Array.from(mapping).filter(([key, val]) => val > 1).map(([key, val]) => key);
};
