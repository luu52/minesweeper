/* eslint-disable no-undef */
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const url = "http://127.0.0.1:5501/index.html";

Given("a user opens the app", async () => {
  await page.goto(url);
});

Then('the board should be an {int} x {int}', async function (int, int2) {
  let numberOfDivsInBoard = await page.$$('#board div');                      //save divs in array
  let numberOfDivsShouldBe = int * int2;
  expect(numberOfDivsInBoard.length).toBe(numberOfDivsShouldBe);
});

