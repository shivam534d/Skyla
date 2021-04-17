let puppy = require('puppeteer');
let price = require('./puppet-modules/price-comparison');

(async function () {
  try {
    const executablePath =
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
    let browserInstance = await puppy.launch({
      executablePath,
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized'],
      ignoreDefaultArgs: ['--enable-automation'],
    });
    main(browserInstance);
  } catch (err) {
    console.log(err);
  }
})();

async function main(browserInstance) {
  let [newTab] = await browserInstance.pages();
  await newTab.goto('file:///D:/Hackathon/index.html');
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
    console.log(newValue);
    tes(newValue);
  }

  async function tes(par) {
    if (par == 'Speech received: papa papa.') {
      price.runPriceComparison(browserInstance, 'iphone 11');
      console.log(par);
    } else if (par == 'Speech received: lol.') {
      console.log("didn't work");
    }
  }
}
