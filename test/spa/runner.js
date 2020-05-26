const puppeteer = require('puppeteer-core');
const which = require('which');
const chromiumPath = which.sync('chromium-browser');

(async () => {
    const browser = await puppeteer.launch({
        product: 'chrome',
        executablePath: chromiumPath,
    });
    const page = await browser.newPage();
    const forceCloseTimer = setTimeout(() => {
        browser.close();
    }, 60000);
    page.on('console', msg => {
        const text = msg.text();
        console.log(text);
        if (/^# failure:/u.test(text)) {
            clearTimeout(forceCloseTimer);
            browser.close();
        }
    });
    await page.goto(`file://${__dirname}/index.html`, {
        timeout: 0
    });
})();
