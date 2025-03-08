const deployFixture = require("../scripts/deployFixture");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// Reset to the deployFixture before every test
beforeEach(async function () {
  await loadFixture(deployFixture);
});

describe("VoidFactory", function () {
  describe("Deployment", function () {
    it("Should always pass", async function () {
      const fee = await voidFactory.fee();
      expect(fee).to.equal(2);
    });
  });
});
