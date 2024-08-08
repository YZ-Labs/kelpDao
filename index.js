/*
 * @Author: 苍南 914067438@qq.com
 * @Date: 2024-08-07 22:45:19
 * @LastEditors: 苍南 914067438@qq.com
 * @LastEditTime: 2024-08-08 16:54:37
 * @FilePath: /kelpdao/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "./data.json");
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function autoFillForm() {
  // puppeteer usage as normal
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    dumpio: true,
    autoClose: false,
    args: ["--no-sandbox", "--window-size=1366,850"],
  });
  
  const page = await browser.newPage();

  await page.setViewport({ width: 1366, height: 768 });
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  let count = 0
  for (const item of data) {
    count++
    console.log(count)
    await page.goto("https://kelpdao.xyz/gain/");
    await page.type(".css-upy4bi", item);

    await page.click(".css-1m6m3n0");
    
    const cookies = await page.cookies();
    await page.deleteCookie(...cookies);
    const randomWaitTime = Math.floor(17000); // 生成1000到5000毫秒之间的随机数
    await sleep(randomWaitTime);
    await page.reload();
  }
  await browser.close();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

autoFillForm();
