const puppeteer = require('puppeteer');
const { sleep } = require('./utils/sleep.js');
const fs = require('fs');

async function amazon(params) {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    º
    // Navigate the page to a URL
    try {

        const _cookies = fs.readFileSync('./json/cookies-amazon.json', 'utf8')
        const deserializedCookies = JSON.parse(_cookies)
        console.log(`output->`, deserializedCookies.length)

        if (deserializedCookies.length) {
            console.log(`output-> cookie seteadas de amazon`)
            await page.setCookie(...deserializedCookies)
        }

        // Navegar a la página
        // await page.goto('URL_DE_LA_PÁGINA');
        await page.goto('https://www.amazon.com/s?k=' + params + '&crid=JZA1XYGQX948&sprefix=%2Caps%2C163&ref=nb_sb_ss_recent_2_0_recent');


        if (!!!deserializedCookies.length) {
            // Esperar a que el input esté disponible en la página
            await page.waitForSelector('input#e');

            // // Escribir "iphone 13" en el input
            await page.type('input#e', params);

            // Presionar la tecla "Enter"
            await page.keyboard.press('Enter');

        }

        // Esperar a que los elementos que necesitas estén presentes en la página
        // await page.waitForSelector('div[data-component-type="s-search-results"]');

        await sleep(4000);

        const cookies = await page.cookies()
        const cookieJson = JSON.stringify(cookies)

        fs.writeFileSync('./json/cookies-amazon.json', cookieJson)


        // Evaluar la página en el contexto del navegador para obtener los src de las imágenes
        const productos = await page.evaluate(async () => {
            const divs = document.querySelectorAll('div[data-component-type="s-search-result"]');
            console.log(`output-div`, divs);
            const data = [];


            for (const div of divs) {

                const img = div.querySelector('img');
                const nombre = div.querySelector('span.a-size-medium.a-color-base.a-text-normal');
                // const precio = div.querySelector('span.a-offscreen');

                const src = img.getAttribute('src');
                const nombreProducto = nombre.innerText.trim();
                // const precioProducto = parseFloat((precio.innerText.trim()).replace('$', ''));

                await new Promise(resolve => setTimeout(resolve, 50));

                data.push({
                    imagen: src,
                    nombre: nombreProducto,
                    precio: 600
                });


            }

            return data;
        });



        // Escribe la cadena JSON en un archivo .json
        fs.writeFileSync('./json/amazon.json', JSON.stringify(productos), 'utf8');


        return productos
    } catch (error) {
        console.error('Error al obtener productos amazon:', error);
    } finally {
        await browser.close();
    }

    
    await browser.close();
}



module.exports = { amazon }