const app = require('express')();
const port = 3000;
const puppeteer = require('puppeteer');

const buttonSelector = '#index > div.layout-left-right.el-row > div.boxes-wrapper.layout-main.el-col.el-col-17.el-col-xs-24.el-col-sm-24.el-col-md-17 > div.ssr-list-wrapper.base-box > div.ssr-btn-bar > button';

app.get('/', async (req, res) => {
  const token = await getToken();
  res.send(token);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


const getToken = async () => {
  const browser = await puppeteer.launch({
    // headless: false,
  });

  // clipboard setting
  const context = browser.defaultBrowserContext();
  context.overridePermissions('https://lncn.org/', ['clipboard-write', 'clipboard-read']);

  // get page content
  const page = await browser.newPage();
  await page.goto('https://lncn.org/');
  await page.click(buttonSelector);
  const copiedText = await page.evaluate(`(async () => await navigator.clipboard.readText())()`);

  await browser.close();
  return copiedText;
};
