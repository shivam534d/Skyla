// ######### CONFIGURATION ##########
const chromeExeFilePath =
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const SklyaIndexFilePath = 'file:///D:/Hackathon/index.html';

let puppy = require('puppeteer');
let price = require('./puppet_modules/price-comparison');
let crypto = require('./puppet_modules/crypto');
let search = require('./puppet_modules/search');
let play = require('./puppet_modules/play');

(async function () {
  try {
    // Switched to Chrome Browser as Chromium doesn't Support Speech Text API
    let executablePath = chromeExeFilePath;
    let browserInstance = await puppy.launch({
      executablePath,
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized'],
    });
    main(browserInstance); //Executes the Main Block of Code
  } catch (err) {
    console.log(err);
  }
})();

async function main(browserInstance) {
  let [newTab] = await browserInstance.pages(); // Current Tab
  await newTab.goto(SklyaIndexFilePath); // Opens Skyla
  await newTab.waitForSelector('.output', {
    visible: true,
  });

  newTab.exposeFunction('puppeteerMutationListener', puppeteerMutationListener);

  await newTab.evaluate(() => {
    const target = document.querySelector('.output');
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        window.puppeteerMutationListener(
          mutation.removedNodes[0].textContent,
          mutation.addedNodes[0].textContent
        );
      }
    });
    observer.observe(target, { childList: true });
  });

  function puppeteerMutationListener(oldValue, newValue) {
    commandHandler(newValue);
  }

  async function commandHandler(command) {
    if (command.includes('crypto') || command.includes('bitcoin')) {
      await crypto.trade(browserInstance);
    }
    else if (command.includes("buy") || command.includes("price")) {
      await price.runPriceComparison(browserInstance, command);
    }
    else if (command.includes("play") || command.includes("video")) {
      await play.video(browserInstance, command);
    }
    else if (
      command.includes('show') ||
      command.includes('search') ||
      command.includes('weather') ||
      command.includes('who') ||
      command.includes('how') ||
      command.includes('when') ||
      command.includes('where') ||
      command.includes('google')  
    ) {
      await search.getResults(browserInstance, command);
    }
    // newTab.bringToFront();
  }
}
