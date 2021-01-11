const puppeteer = require('puppeteer');

async function htmlToPdf(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, {waitUntil: 'networkidle2'});
  const pdfBuffer = await page.pdf({format: 'letter'});
  await browser.close();
  return Promise.resolve(pdfBuffer);
}

module.exports = {htmlToPdf};
