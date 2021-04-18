async function getDirections(browserInstance, command, home, id, pass) {
  try {
    var direction;
    if (command.includes('direction')) {
      let newQuery = command.split('directions to ').pop();
      direction = newQuery.split(' and ')[0];
    }

    var link = 'https://www.google.com/maps/search/' + direction;
    let newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.waitForTimeout(2000);
    await newTab.waitForSelector('div[data-value="Directions"]', {
      visible: true,
    });
    await newTab.click('div[data-value="Directions"] button');
    await newTab.waitForSelector(
      '#directions-searchbox-0 input[aria-label="Choose starting point, or click on the map..."]',
      {
        visible: true,
      }
    );
    await newTab.click('#directions-searchbox-0 input');
    await newTab.type('#directions-searchbox-0 input', home);

    await newTab.keyboard.press('Enter');
    if (command.includes('phone')) {
      sendToPhone();
    }
    async function sendToPhone() {
      // Send To Phone
      await newTab.waitForSelector(
        'div.section-action-popup-container button[jsaction="pane.action.sendOpen"]',
        {
          visible: true,
        }
      );
      await newTab.click(
        'div.section-action-popup-container button[jsaction="pane.action.sendOpen"]'
      );

      await newTab.waitForSelector(
        'div.section-action-popup-container button[jsaction="pane.action.sendSignIn"]',
        { visible: true }
      );
      // await newTab.waitForTimeout(2000);
      await newTab.click(
        'div.section-action-popup-container button[jsaction="pane.action.sendSignIn"]'
      );

      await newTab.waitForSelector("input[type='email']", { visible: true });
      await newTab.type("input[type='email']", id, { delay: 80 });
      await newTab.keyboard.press('Enter');
      await newTab.waitForSelector("input[type='password']", { visible: true });
      await newTab.type("input[type='password']", pass, { delay: 80 });
      await newTab.keyboard.press('Enter');
      await newTab.waitForSelector(
        'div.section-info-hoverable:first-child div[role="button"]',
        {
          visible: true,
        }
      );
      await newTab.click(
        'div.section-info-hoverable:first-child div[role="button"]'
      );
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getDirections,
};
