const { createHash } = require("crypto");

const email = process.env.ACCOUNT;

const hash = createHash("sha256").update(email).digest("hex");

const hexColor = hash.slice(0, 6);

console.log(`color: ${hexColor}`);

const binaryString = hash
  .split("")
  .map((hexDigit) => parseInt(hexDigit, 16).toString(2).padStart(4, "0"))
  .join("");

console.log(binaryString);

const firstColumn = binaryString.slice(0, 5);
const secondColumn = binaryString.slice(5, 10);
const thirdColumn = binaryString.slice(10, 15);
const fourthColumn = secondColumn.split("").reverse().join("");
const fifthColumn = firstColumn.split("").reverse().join("");

console.log([
  firstColumn,
  secondColumn,
  thirdColumn,
  fourthColumn,
  fifthColumn,
]);
