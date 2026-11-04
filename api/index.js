process.env.NETWORK = process.env.NETWORK || "sepolia";
process.env.PAY_TO = process.env.PAY_TO || "0xF9b1A20C6ef13F693CA1FA0E834A1ce956677519";
const path = require("path");
const { app } = require("../src/server");
module.exports = app;
