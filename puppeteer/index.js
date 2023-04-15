const { exec } = require('child_process');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdBlockerPlugin = require('puppeteer-extra-plugin-adblocker');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

puppeteer.use(StealthPlugin());
puppeteer.use(AdBlockerPlugin({ blockTrackers: true }));

function navigate() {
  exec('cd .. && cd vite-project && npm run dev', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  console.log('Page is live! http://127.0.0.1:5173/');
}

navigate();

/* (async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
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
  page.on('response', async (response) => {
    if (response.url().endsWith('/api/profilev2/reputation')) {
      let responseBody = await response.text();
      responseBody = `export let data = ${responseBody}`;
      fs.writeFile('../vite-project/utils/data.js', responseBody, (err) => {
        if (err) throw err;
        console.log('Response saved to file!');
        browser.close();
      });
    }
  });
})();
 */
