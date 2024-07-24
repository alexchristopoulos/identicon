const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const { createHash } = require("crypto");

const email = process.env.ACCOUNT;

const hash = createHash("md5").update(email).digest("hex");

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

const pixels = [
  firstColumn.split(""),
  secondColumn.split(""),
  thirdColumn.split(""),
  fourthColumn.split(""),
  fifthColumn.split(""),
];

const height = 5;
const width = 5;
const canvas = createCanvas(height, width);
const ctx = canvas.getContext("2d");

ctx.fillStyle = `#${hexColor}`;

pixels.forEach((row, xIndex) =>
  row.forEach((toFill, yIndex) => {
    if (toFill === "1") {
      ctx.fillStyle = `#${hexColor}`;
      ctx.fillRect(xIndex + 1, yIndex + 1, 1, 1);
    }
  })
);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./identicon.png", buffer);
