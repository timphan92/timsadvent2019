const fs = require("fs");

console.log(run());

function run() {
  const input = fs.readFileSync("input.txt", "utf8");
  const minRange = Number(input.split("-")[0]);
  const maxRange = Number(input.split("-")[1]);
  const validPasswords = countPasswords(minRange, maxRange);
  return validPasswords;
}

function countPasswords(minRange, maxRange) {
  let sum = 0;
  for (let i = minRange; i <= maxRange; i++) {
    if (
      noDecreasingDigits(i) &&
      twoAdjacentDigits(i) &&
      isWithinRange(i, minRange, maxRange) &&
      isSixDigit(i)
    ) {
      sum++;
    }
  }
  return sum;
}

function noDecreasingDigits(password) {
  const individualNumbers = [...(password + "")];
  let decreasingDigit = false;
  for (let i = 0; i < individualNumbers.length - 1; i++) {
    if (Number(individualNumbers[i + 1]) < Number(individualNumbers[i])) {
      decreasingDigit = true;
    }
  }
  return !decreasingDigit;
}

function twoAdjacentDigits(password) {
  const individualNumbers = [...(password + "")];
  let hasAdjacentDigit = false;
  for (let i = 0; i < individualNumbers.length - 1; i++) {
    if (individualNumbers[i] === individualNumbers[i + 1]) {
      hasAdjacentDigit = true;
    }
  }
  return hasAdjacentDigit;
}

function isWithinRange(password, min, max) {
  return password >= min && password <= max;
}

function isSixDigit(password) {
  return password.toString().length === 6;
}
