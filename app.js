const app = require('express')();
const port = 3000;
const puppeteer = require('puppeteer');

const buttonSelector = '#index > div.layout-left-right.el-row > div.boxes-wrapper.layout-main.el-col.el-col-18.el-col-xs-24.el-col-sm-24.el-col-md-18 > div.ssr-list-wrapper.base-box > div.ssr-btn-bar > button';

app.get('/', async (req, res) => {
  const token = await getToken();
  res.send(token);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


const getToken = async () => {
  const brower = await puppeteer.launch({
    // headless: false,
  });

  // clipboard setting
  const context = brower.defaultBrowserContext();
  context.overridePermissions('https://lncn.org/', ['clipboard-write', 'clipboard-read']);

  // get page content
  const page = await brower.newPage();
  await page.goto('https://lncn.org/');
  await page.click(buttonSelector);
  const copiedText = await page.evaluate(`(async () => await navigator.clipboard.readText())()`);

  await brower.close();
  return copiedText;
};