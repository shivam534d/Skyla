async function getResults(browserInstance, command) {
  try {
    var query;
    if (command.includes('search')) {
      query = command.split('search for ').pop().split(' ').join('+');
    } else if (command.includes('show')) {
      query = command.split('show ').pop().split(' ').join('+');
    } else if (command.includes('google')) {
      query = command.split('google ').pop().split(' ').join('+');
    } else if (command.includes('weather')) {
      query = command.split('the ').pop().split(' ').join('+');
    } else if (
      command.includes('how') ||
      command.includes('when') ||
      command.includes('where') ||
      command.includes('who')
    ) {
      query = command;
    }

    var link = 'https://www.google.com/search?q=' + query;
    let newTab = await browserInstance.newPage();
    await newTab.goto(link);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getResults,
};
