let links = [
  {
    link: 'https://www.amazon.in',
    searchInput: 'input#twotabsearchtextbox',
  },
  {
    link: 'https://www.flipkart.com',
    searchInput: 'form[action="/search"] input[type="text"]',
  },
  {
    link: 'https://www.paytmmall.com',
    searchInput: '[id="searchInput"]',
  },
];

async function runPriceComparison(browserInstance, command) {
  try {
    var pName;
    if (command.includes('buy')) {
      pName = command.split(' buy ').pop();
    } else if (
      command.includes('prices') ||
      command.includes('price') ||
      command.includes('compare')
    ) {
      pName = command.split('for ').pop();
    }
    for (let i in links) {
      await getListing(
        links[i].link,
        browserInstance,
        pName,
        links[i].searchInput //Search Input
      );
    }
  } catch (err) {
    console.log(err);
  }
}

async function getListing(link, browserInstance, prodName, inputSearchEle) {
  let newTab = await browserInstance.newPage();
  await newTab.goto(link);
  if (link.includes('flipkart')) {
    await newTab.waitForSelector('._2KpZ6l._2doB4z', { visible: true });
    await newTab.click('._2KpZ6l._2doB4z');
  }
  await newTab.type(inputSearchEle, prodName, { delay: 50 });
  await newTab.keyboard.press('Enter');
}

module.exports = {
  runPriceComparison,
};
