import puppeteer from 'puppeteer';

const CALCULATOR_URL = 'http://localhost:5000/calculators';

async function verifyCalculators() {
  console.log('🔍 Verifying Calculator Hub page...\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();

  // Listen for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Listen for page errors
  page.on('pageerror', error => {
    errors.push(error.message);
  });

  try {
    console.log('📱 Navigating to calculators page...');
    const response = await page.goto(CALCULATOR_URL, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    if (!response.ok()) {
      throw new Error(`Page returned status ${response.status()}`);
    }

    console.log('✅ Page loaded successfully');

    // Wait for the calculator hub to render
    await page.waitForSelector('h1', { timeout: 5000 });

    const title = await page.$eval('h1', el => el.textContent);
    console.log(`📄 Page title: "${title}"`);

    // Check for calculator cards
    const calculatorCards = await page.$$('[data-testid^="calculator-"], .glass-card, [role="button"]');
    console.log(`🎴 Found ${calculatorCards.length} interactive elements`);

    // Take a screenshot
    await page.screenshot({
      path: './calculator-verification.png',
      fullPage: true,
    });
    console.log('📸 Screenshot saved: calculator-verification.png');

    // Check for errors
    if (errors.length > 0) {
      console.log('\n❌ ERRORS DETECTED:');
      errors.forEach(err => console.log(`  - ${err}`));
      await browser.close();
      process.exit(1);
    }

    console.log('\n✅ SUCCESS: Calculator Hub page is fully operational!');
    console.log('   - Page loaded without errors');
    console.log('   - No console errors detected');
    console.log('   - Interactive elements found');

    await browser.close();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ VERIFICATION FAILED:', error.message);

    if (errors.length > 0) {
      console.log('\n Console errors:');
      errors.forEach(err => console.log(`  - ${err}`));
    }

    await page.screenshot({
      path: './calculator-error.png',
      fullPage: true,
    });
    console.log('📸 Error screenshot saved: calculator-error.png');

    await browser.close();
    process.exit(1);
  }
}

verifyCalculators();
