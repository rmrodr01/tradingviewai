import express from "express";
import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

let browser;
let page;

// Launch TradingView
async function initBrowser() {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  page = await browser.newPage();
  await page.goto("https://www.tradingview.com/chart/");
}

// Simple test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Screenshot route (proves TradingView connection works)
app.get("/screenshot", async (req, res) => {
  try {
    const image = await page.screenshot({ encoding: "base64" });
    res.json({ image });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error taking screenshot");
  }
});

app.listen(3000, async () => {
  console.log("Server running on http://localhost:3000");
  await initBrowser();
});
