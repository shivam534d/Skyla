let links = [
  {
    link: 'https://www.amazon.in',
    searchInput: 'input#twotabsearchtextbox',
    productCardEle: "[data-component-type='s-search-result']",
    productNameEle: "[data-component-type='s-search-result'] h2",
    productPriceEle: '[data-component-type="s-search-result"] .a-price-whole',
  },
  {
    link: 'https://www.flipkart.com',
    searchInput: 'form[action="/search"] input[type="text"]',
    productCardEle: 'div._3pLy-c.row',
    productNameEle: 'div._3pLy-c.row div.col.col-7-12 > div:first-child',
    productPriceEle:
      'div._3pLy-c.row div.col.col-5-12 > div:first-child > div:first-child > div:first-child',
  },
  {
    link: 'https://www.paytmmall.com',
    searchInput: '[id="searchInput"',
    productCardEle: 'div._1LZ3',
    productNameEle: 'div._3WhJ .UGUy',
    productPriceEle: 'div._3WhJ ._1kMS',
  },
];

async function runPriceComparison(browserInstance, pName) {
  try {
    for (let i in links) {
      await getListing(
        links[i].link,
        browserInstance,
        pName,
        links[i].searchInput, //Search Input
        links[i].productCardEle, // Product Card To Wait for
        links[i].productNameEle, //Search Result Name
        links[i].productPriceEle // Search Result Price
      );
    }
  } catch (err) {
    console.log(err);
  }
}

async function getListing(
  link,
  browserInstance,
  prodName,
  inputSearchEle,
  resultCard,
  h2Ele,
  priceEle
) {
  let newTab = await browserInstance.newPage();
  await newTab.goto(link);
  await newTab.type(inputSearchEle, prodName, { delay: 50 });
  await newTab.keyboard.press('Enter');
  await newTab.waitForSelector(resultCard, {
    visible: true,
  });

  function getDetailsArr(h2Ele, priceEle) {
    let nameArr = document.querySelectorAll(h2Ele);
    let priceArr = document.querySelectorAll(priceEle);
    let productDetails = [];
    for (let i = 0; i < 5; i++) {
      let price = priceArr[i].innerText;
      let name = nameArr[i].innerText;
      productDetails.push({ name, price });
    }
    return productDetails;
  }

  let detailsArr = await newTab.evaluate(getDetailsArr, h2Ele, priceEle);
  let name = link.split('.')[1];
  console.log(` $$$$$$$$$$$$$$$$$$  ${name}  $$$$$$$$$$$$$$$$$$`);
  console.table(detailsArr);
}

module.exports = {
  runPriceComparison,
};
