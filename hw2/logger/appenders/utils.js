export const createCloseStream = (stream) => () => {
    stream.push(null);
}
