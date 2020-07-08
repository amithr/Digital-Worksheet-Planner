export const stringToArray = (string) => {
    return string.trim().split(" ");
};

export const transformArrayToString = (array) => {
    let arrayString = array.toString();
    return arrayString.replace(/,/g , " ");
}