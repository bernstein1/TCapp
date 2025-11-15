import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const TUTORIAL_URL = 'http://localhost:5000/tutorial';
const SCREENSHOTS_DIR = './tutorial-screenshots';
const TOTAL_STEPS = 13;

async function captureTutorialScreenshots() {
  console.log('🚀 Starting tutorial screenshot capture...\n');

  // Create screenshots directory
  await mkdir(SCREENSHOTS_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: false, // Show browser for debugging
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();

  try {
    // Navigate to tutorial page
    console.log('📱 Opening tutorial page...');
    await page.goto(TUTORIAL_URL, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for animations

    // Capture each tutorial step
    for (let step = 0; step < TOTAL_STEPS; step++) {
      console.log(`📸 Capturing Step ${step + 1}/${TOTAL_STEPS}...`);

      // Wait for content to be visible
      await page.waitForSelector('[data-testid="tutorial-overlay"]', { visible: true });
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for transitions

      // Get step title for filename
      const titleElement = await page.$('[data-testid="tutorial-title"]');
      const title = await page.evaluate(el => el.textContent, titleElement);
      const filename = `step-${String(step + 1).padStart(2, '0')}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;

      // Take screenshot
      await page.screenshot({
        path: join(SCREENSHOTS_DIR, filename),
        fullPage: false,
      });

      console.log(`   ✅ Saved: ${filename}`);

      // Click next button (unless it's the last step)
      if (step < TOTAL_STEPS - 1) {
        await page.click('[data-testid="button-next"]');
        await new Promise(resolve => setTimeout(resolve, 800)); // Wait for transition
      }
    }

    console.log('\n✨ All screenshots captured successfully!');
    console.log(`📁 Screenshots saved to: ${SCREENSHOTS_DIR}/`);

  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureTutorialScreenshots();
