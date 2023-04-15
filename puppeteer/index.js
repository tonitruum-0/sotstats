const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdBlockerPlugin = require('puppeteer-extra-plugin-adblocker');
const dotenv = require('dotenv');
dotenv.config();

puppeteer.use(StealthPlugin());
puppeteer.use(AdBlockerPlugin({ blockTrackers: true }));

(async () => {
  await page.setRequestInterception(true);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('response', async (response) => {
    if (response.url().includes('example.com/api/endpoint')) {
      console.log(await response.json()); // Access the response data
    }
  });

  await page.goto('https://www.seaofthieves.com/profile/reputation/');

  await page.click('a.button--standard');

  // Wait for the login page to load
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // Wait for email input to appear
  await page.waitForSelector('#i0116', { visible: true });
  await page.type('#i0116', process.env.email);

  // Click the next button and wait for navigation to finish
  await page.click('#idSIButton9');

  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // Wait for password input to appear
  await page.waitForFunction(() => {
    const myElement = document.querySelector('#i0118');
    return myElement && !myElement.classList.contains('moveOffScreen');
  });

  await page.type('#i0118', process.env.password);

  // Click the submit button and wait for navigation to finish
  await page.waitForSelector('#idSIButton9');
  await page.click('#idSIButton9');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  await page.waitForSelector('#idBtn_Back');
  await page.click('#idBtn_Back');

  // await browser.close();
})();
