const HASH_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const getRandomNum = (max) => Math.floor(Math.random() * max);

export function generateHash(length) {
    return Array
        .from({ length }, () => HASH_CHARACTERS[getRandomNum(HASH_CHARACTERS.length)])
        .join('');
}
