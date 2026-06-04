import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const imagesDir = path.join(rootDir, "public", "images");

const pages = [
    {
        url: "http://localhost:3000",
        file: "dashboard.png",
        waitFor: "[data-testid='dashboard'], main, .recharts-wrapper",
    },
    {
        url: "http://localhost:3000/group",
        file: "groups.png",
        waitFor: "#group-list, main",
    },
    {
        url: "http://localhost:3000/records",
        file: "records.png",
        waitFor: "#record-list, main",
    },
    {
        url: "http://localhost:3000/emission-factors",
        file: "emission-factors.png",
        waitFor: "main",
    },
];

await mkdir(imagesDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
});

for (const pageInfo of pages) {
    const page = await context.newPage();
    console.log(`Capturing ${pageInfo.url}...`);

    await page.goto(pageInfo.url, { waitUntil: "networkidle", timeout: 60000 });

    try {
        await page.waitForSelector(pageInfo.waitFor, { timeout: 15000 });
    } catch {
        console.warn(`Selector not found for ${pageInfo.url}, continuing...`);
    }

    await page.waitForTimeout(2500);

    await page.screenshot({
        path: path.join(imagesDir, pageInfo.file),
        fullPage: true,
    });

    await page.close();
    console.log(`Saved ${pageInfo.file}`);
}

await browser.close();
console.log("Done.");
