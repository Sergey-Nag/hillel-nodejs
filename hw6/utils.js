const HASH_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const getRandomNum = (max) => Math.floor(Math.random() * max);

const generatedHashesMap = new Map();

export function generateHash(length) {
    const hash = Array.from({ length }, () => HASH_CHARACTERS[getRandomNum(HASH_CHARACTERS.length)])
        .join('');
    
    const generated = generatedHashesMap.get(length) ?? new Set();

    if (generated.has(hash)) {
        return generateHash(length);
    }

    generated.add(hash);
    generatedHashesMap.set(length, generated);

    return hash;
}

