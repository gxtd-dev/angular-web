export function isEmptyObj(obj: any): boolean {
    if (obj === undefined) {
        return true;
    }
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export function isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
}
