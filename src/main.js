const fs = require('fs');
const { amazon } = require("./amazon")
const { target } = require("./target")
// const { walmart } = require("./walmart")


async function getResponses(busqueda) {
    const res_amazon = await amazon(busqueda)
    const res_target = await target(busqueda)
    // const res_walmart = await walmart(busqueda)

    return {
        res_amazon,
        res_target,
        // res_walmart,
    }
}


(async () => {
    const res = await getResponses('ps4 console');
    console.log(`output->res`, res)
})()