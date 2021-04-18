async function trade(browserInstance) {
  var link = 'https://coindcx.com/trade/BTCINR';
  try {
    let newTab = await browserInstance.newPage();
    await newTab.goto(link);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  trade,
};
