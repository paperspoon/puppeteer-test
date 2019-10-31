const puppeteer = require('puppeteer');
const chalk = require('chalk');
const excel = require('exceljs');

function log(text) {
  console.log(chalk.yellow(text));
}

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://192.168.10.161:10277/renobit/login.do');
  await page.screenshot({path: 'test_1_login.png'});
  log('test_1_login\t로그인 화면 진입 성공')

  await page.type('#idInput', 'admin');
  await page.type('#pwInput', 'admin');
  await page.click('.loginBtn');

  await page.waitForSelector('#editMainArea');
  await page.screenshot({path: 'test_2_editor.png'});
  log('test_2_editor\t로그인 후 에디터 화면 진입 성공')

  await browser.close();
  
  const workbook = new excel.Workbook();
  const sheet = workbook.addWorksheet('테스트 결과');
  sheet.addTable({
    name: '테스트 결과',
    ref: 'A1',
    columns: [{name: 'name'}, {name: 'pass'}],
    rows: [
      ['test1', 'pass'],
      ['test2', 'false'],
    ]
  });

  await workbook.xlsx.writeFile('result.xlsx');
})()