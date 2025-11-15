import puppeteer from 'puppeteer';

async function diagnoseCalculators() {
  console.log('🔍 Diagnosing Calculator Issues...\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();

  const errors = [];
  const warnings = [];

  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') {
      errors.push(text);
      console.error('❌ Console Error:', text);
    } else if (msg.type() === 'warning') {
      warnings.push(text);
    }
  });

  page.on('pageerror', error => {
    errors.push(error.message);
    console.error('❌ Page Error:', error.message);
  });

  page.on('requestfailed', request => {
    console.error('❌ Request Failed:', request.url(), request.failure().errorText);
  });

  try {
    console.log('📱 Loading /calculators page...');
    const response = await page.goto('http://localhost:5000/calculators', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log(`📄 Status: ${response.status()}`);

    await new Promise(resolve => setTimeout(resolve, 3000));

    const title = await page.title();
    console.log(`📄 Page Title: ${title}`);

    const h1 = await page.$eval('h1', el => el.textContent).catch(() => 'Not found');
    console.log(`📄 H1 Content: ${h1}`);

    await page.screenshot({ path: './calculator-diagnosis.png', fullPage: true });
    console.log('📸 Screenshot saved: calculator-diagnosis.png\n');

    console.log('='.repeat(60));
    console.log(`Total Errors: ${errors.length}`);
    console.log(`Total Warnings: ${warnings.length}`);
    console.log('='.repeat(60));

    if (errors.length > 0) {
      console.log('\n❌ ERRORS FOUND:');
      errors.forEach((err, i) => console.log(`${i + 1}. ${err}`));
    }

    await browser.close();
    process.exit(errors.length > 0 ? 1 : 0);

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error.message);
    await page.screenshot({ path: './calculator-crash.png', fullPage: true });
    await browser.close();
    process.exit(1);
  }
}

diagnoseCalculators();
