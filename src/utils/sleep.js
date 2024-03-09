function sleep(time) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(true)
        }, time);
    })
}
module.exports = { sleep }