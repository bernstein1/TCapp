import puppeteer from 'puppeteer';

async function watchFor404s() {
  console.log('🔍 Watching for 404 errors in REAL-TIME...\n');
  console.log('This will open a visible browser and show you EXACTLY what happens\n');

  const browser = await puppeteer.launch({
    headless: false,
    devtools: true, // Open DevTools automatically
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();

  console.log('👀 Browser is open - watch the DevTools console for errors\n');

  // Log ALL network activity
  page.on('response', response => {
    const status = response.status();
    const url = response.url();

    if (status === 404) {
      console.log(`\n❌❌❌ 404 ERROR: ${url}\n`);
    } else if (status >= 400) {
      console.log(`\n⚠️  ${status} ERROR: ${url}\n`);
    }
  });

  page.on('pageerror', error => {
    console.log(`\n❌ PAGE ERROR: ${error.message}\n`);
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`\n❌ CONSOLE ERROR: ${msg.text()}\n`);
    }
  });

  try {
    console.log('📱 Step 1: Loading Calculator Hub...');
    await page.goto('http://localhost:5000/calculators', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('✅ Calculator Hub loaded');
    console.log('⏸️  Waiting 5 seconds for you to inspect...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('📱 Step 2: Loading HSA Calculator...');
    await page.goto('http://localhost:5000/calculators/hsa', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('✅ HSA Calculator loaded');
    console.log('⏸️  Waiting 5 seconds for you to inspect...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('📱 Step 3: Loading FSA Calculator...');
    await page.goto('http://localhost:5000/calculators/fsa', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('✅ FSA Calculator loaded');
    console.log('⏸️  Waiting 5 seconds for you to inspect...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('\n' + '='.repeat(80));
    console.log('✅ Test complete - browser will stay open for you to inspect');
    console.log('Press Ctrl+C when done');
    console.log('='.repeat(80));

    // Keep browser open
    await new Promise(() => {});

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}

watchFor404s();
