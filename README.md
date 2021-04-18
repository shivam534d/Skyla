# Sklya

Skyla is a Voice Recognition automation assistant | Script Handler that runs on #node.js using #puppeteer.
  
The challenge which made this project interesting was that we weren't allowed to create a server, So I had to manage a few workarounds that I never thought even existed So that I could run backend script through client-side Dom-manipulation or Js.

I have tried to write it in a way such that you can write your own Puppeteer scripts and voice commands to expand the capabilities of Skyla

## Dependencies

Skyla uses [puppeteer-extra](https://github.com/berstend/puppeteer-extra) and its plugin [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)
To Install these Dependencies us this.

```bash
npm install puppeteer-extra puppeteer-extra-plugin-stealth
```

## Installation and Configuration

> Download a zip or clone in your working directory.

##### 1. Open runMe.js

```javascript
// Add these variables according to your machine.
// Location to chrome Installation
const chromeExeFilePath = 'CHROME_EXE_FILEPATH';
//'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'

// Set your Starting Point to get directions from home to destination.
const homeLocation = 'HOME_LOCATION_STRING';
```

##### 2. Open credentials.js

```javascript
/module.exports = {
  id: 'emailt@gmail.com', // Replace with test google account credentials
  pass: 'password', // Replace with test google account credentials
};
```

##### 3. Run runMe.js

```bash
node runMe.js
```

## Functionality

As of now Skyla has a few built in puppeteer scripts and can be executed by saying
| To Do | Say |
| ------------- | ---------------- |
| Crypto Trades | _How is Crypto doing today_ |
| Weather | _How's the Weather Outside_ |
| Covid Cases | _Show Covid cases in Delhi_ or _Maharashtra_ |
| Ask Google | _Search for Dynamic Behavior_ |
| Ask Questions | _How many died in world war 1_ |
| Play Songs and Videos | _Play Watermelon Sugar_ |
| Get Directions on your phone | _Get Directions to Manali_ or _Get Directions to Manali and Send it to my phone_ |
| Take Google Keep Notes | _Take a note shop some maggie tomorrow with title Shopping List_ |
| Search for notes in your Google Keep | _Search in my note for Shopping List_ |
