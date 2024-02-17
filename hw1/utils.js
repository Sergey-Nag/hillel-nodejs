const getRandomNum = (max) => Math.floor(Math.random() * max);

function generateHash(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return new Array(length)
        .fill(0)
        .map(() => characters[getRandomNum(characters.length)])
        .join("");
}

module.exports = {
    generateHash,
};
