const {Before, BeforeAll, AfterAll, After, setDefaultTimeout} = require('@cucumber/cucumber');
const {chromium} = require('playwright');
 
setDefaultTimeout(10000);
 
// launch the browser
BeforeAll(async () => {
  global.browser = await chromium.launch({
    headless: true, //PARA QUE NO SE VEA EN EL BROWSER = TRUE // PARA QUE SE VEA EL BROWSER = FALSE
    slowMo: 1,      //VELOCIDAD DE HACER LOS TESTS
  });
});
 
// close the browser
AfterAll(async () => {
  await global.browser.close();
});
 
// Create a new browser context and page per scenario
Before(async () => {
  global.context = await global.browser.newContext(); 
  global.page = await global.context.newPage();
});
 
// Cleanup after each scenario
After(async () => {
  await global.page.close();
  await global.context.close();
});
