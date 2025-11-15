import puppeteer from 'puppeteer';

async function check404Errors() {
  console.log('🔍 Checking for 404 errors...\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();

  const failed404s = [];

  // Intercept all network requests
  page.on('response', response => {
    const status = response.status();
    const url = response.url();

    if (status === 404) {
      failed404s.push(url);
      console.log(`❌ 404 Error: ${url}`);
    }
  });

  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.message);
    console.log(`❌ Page Error: ${error.message}`);
  });

  try {
    console.log('📱 Loading calculators hub...');
    await page.goto('http://localhost:5000/calculators', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('\n📱 Loading HSA calculator...');
    await page.goto('http://localhost:5000/calculators/hsa', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    await page.screenshot({ path: './404-check.png', fullPage: true });

    console.log('\n' + '='.repeat(80));
    console.log(`Total 404 Errors: ${failed404s.length}`);
    console.log(`Total Page Errors: ${errors.length}`);
    console.log('='.repeat(80));

    if (failed404s.length > 0) {
      console.log('\n❌ 404 ERRORS FOUND:');
      failed404s.forEach((url, i) => console.log(`${i + 1}. ${url}`));
    }

    if (errors.length > 0) {
      console.log('\n❌ PAGE ERRORS:');
      errors.forEach((err, i) => console.log(`${i + 1}. ${err}`));
    }

    if (failed404s.length === 0 && errors.length === 0) {
      console.log('\n✅ NO 404 ERRORS FOUND - All resources loaded successfully!');
    }

    await browser.close();
    process.exit(failed404s.length > 0 ? 1 : 0);

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error.message);
    await browser.close();
    process.exit(1);
  }
}

check404Errors();
