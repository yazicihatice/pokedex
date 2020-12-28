export const isEmpty = (value) => {
    if (!value) {
        return true;
    }
    if (typeof value === Object) {
        return Object.keys(value).length <= 0;
    }
    if (Array.isArray(value)) {
        return value.length <= 0;
    }
    
};
