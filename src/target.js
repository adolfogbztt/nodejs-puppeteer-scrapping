const puppeteer = require('puppeteer');
const { sleep } = require('./utils/sleep.js');
const fs = require('fs');

async function target(params) {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {

        await page.goto('https://www.target.com/s?searchTerm=' + params);
        // await page.exposeFunction("clearPriceWalmart", clearPriceWalmart);

        const _cookies = fs.readFileSync('./json/cookies-target.json', 'utf8')

        const deserializedCookies = JSON.parse(_cookies)
        console.log(`output->`, deserializedCookies.length)

        if (!!deserializedCookies.length) {
            await page.setCookie(...deserializedCookies)
        }


        await sleep(4000);

        await page.waitForSelector('div[data-test="product-grid"]');
        // await page.waitForSelector('div.styles__ProductListGridFadedLoading-sc-u8zdb1-0');

        const productos = await page.evaluate(async () => {
            const divs = document.querySelectorAll('div[data-test="@web/ProductCard/ProductCardVariantDefault"]');
            const data = [];

            // Definir una función asincrónica para iterar sobre los elementos

            for (const div of divs) {
                const img = div.querySelector('img');
                const nombre = div.querySelector('a[data-test="product-title"]');
                const precio = div.querySelector('span[data-test="current-price"]');


                const src = img.getAttribute('src');
                const nombreProducto = nombre.innerText.trim();
                // const precioProducto = await clearPriceWalmart(precio.innerText.trim());
                const precioProducto = parseFloat((precio.innerText.trim()).replace('$', ''));
                // Esperar a que cada iteración se complete antes de continuar con la siguiente
                await new Promise(resolve => setTimeout(resolve, 0));

                data.push({
                    imagen: src,
                    nombre: nombreProducto,
                    precio: precioProducto
                });
            }

            return data;
        });


        const cookies = await page.cookies()
        const cookieJson = JSON.stringify(cookies)

        fs.writeFileSync('./json/cookies-target.json', cookieJson)

        // Escribe la cadena JSON en un archivo .json
        fs.writeFileSync('./json/target.json', JSON.stringify(productos), 'utf8');


        return productos
    } catch (error) {
        console.error('Error ', error);
    } finally {
        await browser.close();
    }

    await browser.close();

}

// re = clearPriceWalmart('$11332\ncurrent price $113.32\n+$5.05 shipping');
// console.log(`output-re`,re)


module.exports = { target }