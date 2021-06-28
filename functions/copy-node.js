const chromium = require('chrome-aws-lambda');
const buttonSelector = '#index > div.layout-left-right.el-row > div.boxes-wrapper.layout-main.el-col.el-col-17.el-col-xs-24.el-col-sm-24.el-col-md-17 > div.ssr-list-wrapper.base-box > div.ssr-btn-bar > button';

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
  context = browser.defaultBrowserContext();
  context.overridePermissions('https://lncn.org/', ['clipboard-write', 'clipboard-read']);

  // get page content
  const page = await browser.newPage();
  await page.goto('https://lncn.org/');
  await page.click(buttonSelector);
  return {
    statusCode: 200,
    body: JSON.stringify({ 
        message: 'text', 
    })
  };
  const copiedText = await page.evaluate(async () => {
    const text = await navigator.clipboard.readText();
    console.log(text);
    return text;
  });

  await browser.close();
  return {
    statusCode: 200,
    body: JSON.stringify({ 
        message: copiedText, 
    })
  };
}
