const puppeteer = require('puppeteer-core');
const which = require('which');
const chromiumPath = which.sync('chromium-browser');

(async () => {
    const browser = await puppeteer.launch({
        product: 'chrome',
        executablePath: chromiumPath,
    });
    const page = await browser.newPage();
    page.on('console', msg => console.log(msg.text()));
    await page.goto(`file://${__dirname}/index.html`);
    setTimeout(() => {
        browser.close()
    }, 10000);
})();
