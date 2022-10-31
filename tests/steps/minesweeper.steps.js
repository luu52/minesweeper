/* eslint-disable no-undef */
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const url = "http://127.0.0.1:5501/index.html";

const flagSymbol = "\u{1F6A9}";
const uncertainSymbol = "\u{2753}";

let rows;
let columns;

async function buttonClick(buttonId) {
  await page.click(`[data-testid = "${buttonId}"]`, { force: true });
}

async function checkMockData(String){
  rows = String.split("-").length;
  columns = String.split("-")[0].length;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let checkCellContent = await page.locator('data-testid=' + r + "-" + c).innerText();
      if (String.split("-")[r].charAt[c] == "0") {
        expect(checkCellContent).toBe("");
      }else if (String.split("-")[r].charAt[c] == "o"){
        expect(await toBe.getAttribute("class")).toBe("cell-clicked");
      }
    }
  }
}

async function buttonRightClick(buttonId) {
  await page.locator(`[data-testid = "${buttonId}"]`).click({ button: "right" });
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

Given("the user loads the following mockData: {string}", async function (string) {
  let mockDataUrl = "http://127.0.0.1:5501/index.html?" + string;
  await page.goto(mockDataUrl);
});

When('the user unleash the cell {string}', async function (string) {
  await buttonClick(string);
});

Then('the cell {string} shows the mine', async function (string) {
  let mineCharacter = await page.locator(`[data-testid="${string}"]`).innerText();
  expect(mineCharacter).toBe("\u{1F4A3}");
});

Then('the user should lose the game', async function () {
  let gameOverMessage = await page.locator(`[data-testid="gameOverMessage"]`).innerText();
  expect(gameOverMessage).toBe("GAME OVER");
});

Then('the user should win the game', async function () {
  let youWinMessage = await page.locator(`[data-testid="youWinMessage"]`).innerText();
  expect(youWinMessage).toBe("YOU WON");
});

Then('the cell {string} should be empty', async function (string){
  let emptyCell = await page.locator(`[data-testid="${string}"]`).innerText();
  expect(emptyCell).toBe("");
});

Then('the board should look like: {string}', async function (string) {
  await checkMockData(string);
});

Then('the cell 1-1 shows a {string}', async function (string) {
  let cell = await page.locator(`[data-testid="1-1"]`).innerText();
  expect(cell).toBe(string);
});

When('the user marks as mined the cell 1-1', async function () {
  if (await page.locator(`[data-testid="1-1"]`).innerText() == "") {
    await buttonRightClick("1-1");
  }else{
    await buttonRightClick("1-1");
    await buttonRightClick("1-1");
  }
});

Then('the cell 1-1 is marked with the mined symbol', async function () {
  let minedSymbol = await page.locator(`[data-testid="1-1"]`).innerText();
  expect(minedSymbol).toBe(flagSymbol);
});

When('the user marks as uncertain the cell 1-1', async function () {
  if (await page.locator(`[data-testid="1-1"]`).innerText() == flagSymbol) {
    await buttonRightClick("1-1");
  }else if (await page.locator(`[data-testid="1-1"]`).innerText() == "")
      await buttonRightClick("1-1");
      await buttonRightClick("1-1");
});

Then('the cell 1-1 is marked with a unertainty symbol', async function () {
  let uncertainSymbol = await page.locator(`[data-testid="1-1"]`).innerText();
  expect(uncertainSymbol).toBe("\u{2753}");
});

When('the user unmarks the cell 1-1', async function () {
  if (await page.locator(`[data-testid="1-1"]`).innerText() == uncertainSymbol) {
    await buttonRightClick("1-1");
  }else{
    await buttonRightClick("1-1");
    await buttonRightClick("1-1");
  }
});

Then('then the counter should set to {string}', async function (string) {
  let counter = await page.locator(`[data-testid="flag-count"]`).innerText();
  expect(counter).toBe(string);
});

When('the user presses the button reset', async function () {
  await buttonClick("resetGame");
});

Then('the game resets', async function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let checkCellContent = await page.locator('data-testid=' + r + "-" + c);
      let className = await checkCellContent.getAttribute("class");
      expect(className).toBe(null);
    }
  }
      let checkTimeCounter = await page.locator(`[data-testid="count"]`);
      let timeCount = await checkTimeCounter.innerText();
      expect(timeCount).toBe("0");

      let Flagcounter = await page.locator(`[data-testid="flag-count"]`);
      let flagCount = await Flagcounter.innerText();
      expect(flagCount).toBe("10");
});

Then('the cell {string} should be disabled', async function (string) {
      let checkCellContent = await page.locator('data-testid=' + string);
      let makeSplit = await checkCellContent.getAttribute("class");
      expect(makeSplit.includes("disabledCells")).toBeTruthy();
});