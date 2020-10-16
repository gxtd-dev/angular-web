export const sortBy = (arr, prop) => {
    arr.sort((a, b) => a[prop].localeCompare(b[prop]));
    return arr;
};


