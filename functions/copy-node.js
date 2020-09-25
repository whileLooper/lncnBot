const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');
const buttonSelector = '#index > div.layout-left-right.el-row > div.boxes-wrapper.layout-main.el-col.el-col-18.el-col-xs-24.el-col-sm-24.el-col-md-18 > div.ssr-list-wrapper.base-box > div.ssr-btn-bar > button';

exports.handler = async (event, context) => {

  const browser = await chromium.puppeteer.launch({
    // Required
    executablePath: await chromium.executablePath,

    // Optional
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless
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
}