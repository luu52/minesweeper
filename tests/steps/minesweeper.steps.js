/* eslint-disable no-undef */
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const url = "http://127.0.0.1:5501/index.html";

async function buttonClick(buttonId) {
  await page.click(`[data-testid = "${buttonId}"]`, {force: true});
}

Given("a user opens the app", async () => {
  await page.goto(url);
});

Then('the board should be an {int} x {int}', async function (int, int2) {
  let numberOfDivsInBoard = await page.$$('#board div');                      //save divs in array
  let numberOfDivsShouldBe = int * int2;
  expect(numberOfDivsInBoard.length).toBe(numberOfDivsShouldBe);
});

Then('the counter should be set to {string}', async (string) => {
	const display = await page.locator('data-testid=count').innerText();
	expect(display).toBe(string);
});

Given( "the user loads the following mockData: {string}", async function (string) {
  let mockDataUrl = "http://127.0.0.1:5501/index.html?" + string;
  await page.goto(mockDataUrl);
});

When('the user unleash the cell {string}', async function (string) {
  await buttonClick(string);
});

Then('the cell {string} shows the mine', async function (string) { 
  let mineCharacter = await page
    .locator(`[data-testid="${string}"]`)
    .innerText();
  expect(mineCharacter).toBe("\u{1F4A3}");
});

Then('the user should lose the game', function () {
  
});