/**
 * waits for *timeout* milliseconds and then resolve promise
 * @param {int} timeout milliseconds that should be waited.
 */
const wait = timeout => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout);
    })
};


module.exports = wait