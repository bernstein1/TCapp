import puppeteer from 'puppeteer';

async function findMissingAssets() {
  console.log('🔍 Finding Missing Assets (404s)...\n');

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();

  const missing404s = [];

  page.on('response', response => {
    const status = response.status();
    const url = response.url();

    if (status === 404) {
      missing404s.push(url);
    }
  });

  try {
    console.log('Testing all calculator pages for missing assets...\n');

    const urls = [
      'http://localhost:5000/calculators',
      'http://localhost:5000/calculators/hsa',
      'http://localhost:5000/calculators/fsa',
      'http://localhost:5000/calculators/commuter',
      'http://localhost:5000/calculators/life-insurance',
    ];

    for (const url of urls) {
      console.log(`Checking: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n' + '='.repeat(80));
    console.log(`Total 404 Errors Found: ${missing404s.length}`);
    console.log('='.repeat(80));

    if (missing404s.length > 0) {
      console.log('\n❌ MISSING ASSETS (404):');

      // Group by type
      const images = missing404s.filter(u => /\.(png|jpg|jpeg|svg|gif|webp)$/i.test(u));
      const fonts = missing404s.filter(u => /\.(woff|woff2|ttf|otf|eot)$/i.test(u));
      const scripts = missing404s.filter(u => /\.(js|jsx|ts|tsx)$/i.test(u));
      const styles = missing404s.filter(u => /\.(css)$/i.test(u));
      const others = missing404s.filter(u =>
        !images.includes(u) && !fonts.includes(u) && !scripts.includes(u) && !styles.includes(u)
      );

      if (images.length > 0) {
        console.log('\n  📷 Images:');
        images.forEach(url => console.log(`    - ${url}`));
      }

      if (fonts.length > 0) {
        console.log('\n  🔤 Fonts:');
        fonts.forEach(url => console.log(`    - ${url}`));
      }

      if (scripts.length > 0) {
        console.log('\n  📜 Scripts:');
        scripts.forEach(url => console.log(`    - ${url}`));
      }

      if (styles.length > 0) {
        console.log('\n  🎨 Stylesheets:');
        styles.forEach(url => console.log(`    - ${url}`));
      }

      if (others.length > 0) {
        console.log('\n  📦 Other:');
        others.forEach(url => console.log(`    - ${url}`));
      }
    } else {
      console.log('\n✅ No 404 errors - all assets loaded successfully!');
    }

    await browser.close();
    process.exit(missing404s.length > 0 ? 1 : 0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await browser.close();
    process.exit(1);
  }
}

findMissingAssets();
