const boxStore = {};

export const getBox = name => {
    if (!boxStore[name]) {
        boxStore[name] = document.createElement('div');
    }
    
    return boxStore[name];
}