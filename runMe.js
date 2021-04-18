// ### CONFIGURATION

// Location to chrome Installation
const chromeExeFilePath =
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

// Set your Starting Point to get direstions from and to destination.
const homeLocation = 'India Gate ,Delhi';

// ### CONFIGURATION END

// ### Puppet Command END
// ## Built In
let { id, pass } = require('./credentials');
let price = require('./puppet_modules/price-comparison');
let crypto = require('./puppet_modules/crypto');
let search = require('./puppet_modules/search');
let play = require('./puppet_modules/play');
let map = require('./puppet_modules/map');
let notes = require('./puppet_modules/notes');
// ## Add Your Own Below

// ### Puppet Command END

// ### Puppet
const puppy = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppy.use(StealthPlugin());
// ### Puppet End

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
  await newTab.goto(`file:///${process.cwd()}/index.html`); // Opens Skyla
  await newTab.waitForSelector('.output', {
    visible: true,
  });
  // Listens For New Commands and Run tem
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
    await newTab.waitForTimeout(2000);
    if (
      command.includes('crypto') ||
      command.includes('bitcoin') ||
      command.includes('cryptocurrency')
    ) {
      await crypto.trade(browserInstance);
    } else if (command.includes('buy') || command.includes('price')) {
      await price.runPriceComparison(browserInstance, command);
    } else if (command.includes('play') || command.includes('video')) {
      await play.video(browserInstance, command);
    } else if (
      command.includes('directions') ||
      command.includes('direction')
    ) {
      await map.getDirections(browserInstance, command, homeLocation, id, pass);
    } else if (
      command.includes('take') ||
      command.includes('remember') ||
      command.includes('write')
    ) {
      if (command.includes('notes') || command.includes('note')) {
        await notes.takeNote(browserInstance, command, id, pass);
      }
    } else if (command.includes('search') && command.includes('my notes')) {
      await notes.searchNotes(browserInstance, command, id, pass);
    } else if (command.includes('need') && command.includes('notes')) {
      await notes.takeNote(browserInstance, command, id, pass);
    } else if (
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
  }
}
