const puppeteer = require('puppeteer');
const { sleep } = require('./utils/sleep.js');
const fs = require('fs');

async function walmart(params) {


    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {


        const _cookies = fs.readFileSync('cookies.json', 'utf8')

        const deserializedCookies = JSON.parse(_cookies)
        console.log(`output->`, deserializedCookies.length)
        if (deserializedCookies.length) {
            await page.setCookie(...deserializedCookies)
        }


        await page.goto('https://www.walmart.com/search?q=' + params);

        await sleep(2000);

        const cookies = await page.cookies()
        const cookieJson = JSON.stringify(cookies)

        fs.writeFileSync('cookies.json', cookieJson)

        const script = document.querySelector('script#__NEXT_DATA__');
        if (script) {
            fs.writeFileSync('./json/walmart.json', JSON.stringify(script.textContent), 'utf8');
        } else {
            return false;
        }

        // Escribe la cadena JSON en un archivo .json

        return true
    } catch (error) {
        console.error('Error ', error);
    } finally {
        await browser.close();
    }

    await browser.close();

}


module.exports = { walmart }