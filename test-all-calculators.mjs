import puppeteer from 'puppeteer';

const CALCULATORS = [
  { name: 'Calculator Hub', url: 'http://localhost:5000/calculators' },
  { name: 'HSA Calculator', url: 'http://localhost:5000/calculators/hsa' },
  { name: 'FSA Calculator', url: 'http://localhost:5000/calculators/fsa' },
  { name: 'Commuter Calculator', url: 'http://localhost:5000/calculators/commuter' },
  { name: 'Life Insurance Calculator', url: 'http://localhost:5000/calculators/life-insurance' },
];

async function testAllCalculators() {
  console.log('🔍 Testing ALL Calculator Pages...\n');
  console.log('='.repeat(80));

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
  });

  const results = [];

  for (const calculator of CALCULATORS) {
    console.log(`\n📊 Testing: ${calculator.name}`);
    console.log(`   URL: ${calculator.url}`);

    const page = await browser.newPage();

    const errors = [];
    const warnings = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    try {
      const response = await page.goto(calculator.url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      const status = response.status();
      const title = await page.title();
      const h1Text = await page.$eval('h1', el => el.textContent).catch(() => 'Not found');

      // Wait for page to settle
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Take screenshot
      const screenshotName = `./test-${calculator.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      await page.screenshot({ path: screenshotName, fullPage: true });

      const result = {
        name: calculator.name,
        status: status,
        title: title,
        h1: h1Text,
        errors: errors.length,
        warnings: warnings.length,
        screenshot: screenshotName,
        passed: status === 200 && errors.length === 0
      };

      results.push(result);

      console.log(`   ✓ Status: ${status}`);
      console.log(`   ✓ Title: ${title}`);
      console.log(`   ✓ H1: ${h1Text}`);
      console.log(`   ✓ Errors: ${errors.length}`);
      console.log(`   ✓ Warnings: ${warnings.length}`);
      console.log(`   ✓ Screenshot: ${screenshotName}`);

      if (errors.length > 0) {
        console.log(`   ❌ ERRORS DETECTED:`);
        errors.slice(0, 3).forEach(err => console.log(`      - ${err.substring(0, 100)}`));
      }

      if (status !== 200 || errors.length > 0) {
        console.log(`   ❌ FAILED`);
      } else {
        console.log(`   ✅ PASSED`);
      }

    } catch (error) {
      console.log(`   ❌ FATAL ERROR: ${error.message}`);
      results.push({
        name: calculator.name,
        status: 'CRASH',
        errors: [error.message],
        passed: false
      });
    }

    await page.close();
  }

  await browser.close();

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('📋 SUMMARY');
  console.log('='.repeat(80));

  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.name.padEnd(30)} Status: ${result.status}  Errors: ${result.errors}`);
  });

  const allPassed = results.every(r => r.passed);

  console.log('\n' + '='.repeat(80));
  if (allPassed) {
    console.log('✅ ALL CALCULATORS WORKING PERFECTLY!');
  } else {
    console.log('❌ SOME CALCULATORS HAVE ISSUES');
    const failed = results.filter(r => !r.passed);
    console.log(`\nFailed: ${failed.map(f => f.name).join(', ')}`);
  }
  console.log('='.repeat(80));

  process.exit(allPassed ? 0 : 1);
}

testAllCalculators();
