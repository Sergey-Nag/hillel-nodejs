const getRandomNum = (max) => Math.floor(Math.random() * max);
const NUMBERS = '0123456789';
const LOWERCASE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const HASH_CHARACTERS = UPPERCASE_CHARACTERS + LOWERCASE_CHARACTERS + NUMBERS;

export function generateHash(length) {
    return Array
        .from({ length }, () => HASH_CHARACTERS[getRandomNum(HASH_CHARACTERS.length)])
        .join('');
}
