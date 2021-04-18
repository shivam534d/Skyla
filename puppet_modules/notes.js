async function takeNote(browserInstance, command, id, pass) {
  try {
    var note, title;
    var link = 'https://keep.google.com';
    let newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.waitForTimeout(2000);
    // Login
    await newTab.waitForSelector("input[type='email']", { visible: true });
    await newTab.type("input[type='email']", id, { delay: 80 });
    await newTab.keyboard.press('Enter');
    await newTab.waitForSelector("input[type='password']", { visible: true });
    await newTab.type("input[type='password']", pass, { delay: 80 });
    await newTab.keyboard.press('Enter');
    // Login
    await newTab.waitForTimeout(2000);
    // New Note
    await newTab.waitForSelector('div[aria-label="Take a note…"]', {
      visible: true,
    });
    await newTab.click('div[aria-label="Take a note…"]');
    // Type A New Note
    await newTab.waitForTimeout(2000);
    await newTab.waitForSelector('div[aria-label="Take a note…"]', {
      visible: true,
    });
    await newTab.click('div[aria-label="Take a note…"]');
    // Actual Typing
    if (command.includes('title')) {
      note = command.split('note').pop().split(' with a title ')[0];
      title = command.split(' with a title ').pop();
      withTitle(note, title);
    } else if (command.includes('note')) {
      note = command.split('note').pop();
      withOutTitle(note);
    }

    async function withTitle(note, title) {
      await newTab.type('div[aria-label="Take a note…"]', note, { delay: 50 });
      await newTab.type('div[aria-label="Title"]', title, { delay: 50 });
      // Close Button
      await newTab.click(
        'div.Q0hgme-LgbsSe.Q0hgme-fmcmS-LgbsSe.IZ65Hb-iib5kc.VIpgJd-LgbsSe'
      );
    }

    async function withOutTitle(note) {
      await newTab.type('div[aria-label="Take a note…"]', note, { delay: 50 });
      // Close Button
      await newTab.click(
        'div.Q0hgme-LgbsSe.Q0hgme-fmcmS-LgbsSe.IZ65Hb-iib5kc.VIpgJd-LgbsSe'
      );
    }
  } catch (err) {
    console.log(err);
  }
}

async function searchNotes(browserInstance, command, id, pass) {
  var sQuery;
  if (command.includes('notes')) {
    sQuery = command.split('notes for ').pop();
  }
  var link = 'https://keep.google.com';
  let newTab = await browserInstance.newPage();
  await newTab.goto(link);
  await newTab.waitForTimeout(2000);
  // Login
  await newTab.waitForSelector("input[type='email']", { visible: true });
  await newTab.type("input[type='email']", id, { delay: 80 });
  await newTab.keyboard.press('Enter');
  await newTab.waitForSelector("input[type='password']", { visible: true });
  await newTab.type("input[type='password']", pass, { delay: 80 });
  await newTab.keyboard.press('Enter');
  // Login
  await newTab.waitForTimeout(2000);

  await newTab.waitForSelector('input[aria-label="Search"]', { visible: true });
  await newTab.click('input[aria-label="Search"]');
  await newTab.type("input[aria-label='Search']", sQuery, { delay: 80 });
  await newTab.keyboard.press('Enter');
}

module.exports = {
  takeNote,
  searchNotes,
};