async function video(browserInstance, command) {
  try {
    var query;
    if (command.includes('play')) {
      query = command.split('play ').pop().split(' ').join('+');
    }
    var link = 'https://www.youtube.com/results?search_query=' + query;
    let newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.waitForSelector('.ytd-two-column-search-results-renderer', {
      visible: true,
    });
    await newTab.click('.ytd-item-section-renderer a#thumbnail:first-child');
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  video,
};
