const deployFixture = require("../scripts/deployFixture");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// Reset to the deployFixture before every test
beforeEach(async function () {
  await loadFixture(deployFixture);
});

const FEE = 2;

describe("VoidPair", function () {
  describe("Deployment", function () {
    it("Should have 0 reserves initially", async function () {
      const reserves = await voidPair.getReserves();
      expect(reserves.reserveA).to.equal(0);
      expect(reserves.reserveB).to.equal(0);
    });
  });
  describe("addLiquidity()", function () {
    it("Should add initial liqudity", async function () {
      await voidPair.addLiquidity(100, 200);
      const reserves = await voidPair.getReserves();
      expect(reserves.reserveA).to.equal(100);
      expect(reserves.reserveB).to.equal(200);
    });
    it("Should add more liquidity", async function () {
      await voidPair.addLiquidity(100, 200);
      await voidPair.addLiquidity(200, 400);
      const reserves = await voidPair.getReserves();
      expect(reserves.reserveA).to.equal(300);
      expect(reserves.reserveB).to.equal(600);
    });
  });
  describe("removeLiquidity()", function () {
    it("Should remove liqudity", async function () {
      await voidPair.addLiquidity(100, 200);
      await expect(voidPair.removeLiquidity(100))
        .to.changeTokenBalance(tokenA, Deployer, 100)
        .and.to.changeTokenBalance(tokenB, Deployer, 200);
    });
  });
  describe("getTradeAmount()", function () {
    it("Should calculate output amount", async function () {
      await voidPair.addLiquidity(100, 200);
      const { reserveA, reserveB } = await voidPair.getReserves();

      const _inputAmount = 20;

      const inputAmountWithFee = parseInt(_inputAmount * (100 - FEE));
      const numerator = parseInt(inputAmountWithFee * reserveB);
      const denominator = parseInt(reserveA * 100 + inputAmountWithFee);

      const expectedOutputAmount = parseInt(numerator / denominator);

      const outputAmount = await voidPair.getTradeAmount(
        _inputAmount,
        reserveA,
        reserveB
      );

      expect(outputAmount).to.equal(expectedOutputAmount);
    });
  });
  describe("swap()", function () {
    it("Should swap tokens", async function () {
      await voidPair.addLiquidity(100, 200);
      const { reserveA, reserveB } = await voidPair.getReserves();

      const _inputAmount = 20;

      const inputAmountWithFee = parseInt(_inputAmount * (100 - FEE));
      const numerator = parseInt(inputAmountWithFee * reserveB);
      const denominator = parseInt(reserveA * 100 + inputAmountWithFee);

      const expectedOutputAmount = parseInt(numerator / denominator);

      await expect(
        voidPair.swap(
          tokenA.address,
          tokenB.address,
          _inputAmount,
          expectedOutputAmount
        )
      )
        .to.changeTokenBalances(
          tokenB,
          [Deployer, voidPair.address],
          [expectedOutputAmount, -expectedOutputAmount]
        )
        .and.to.changeTokenBalances(
          tokenA,
          [Deployer, voidPair.address],
          [-_inputAmount, _inputAmount]
        );
    });
    it("Should not swap tokens if slippage is too high", async function () {
      await voidPair.addLiquidity(100, 200);
      const { reserveA, reserveB } = await voidPair.getReserves();

      const _inputAmount = 20;

      const inputAmountWithFee = parseInt(_inputAmount * (100 - FEE));
      const numerator = parseInt(inputAmountWithFee * reserveB);
      const denominator = parseInt(reserveA * 100 + inputAmountWithFee);

      const expectedOutputAmount = parseInt(numerator / denominator) + 5;

      await expect(
        voidPair.swap(
          tokenA.address,
          tokenB.address,
          _inputAmount,
          expectedOutputAmount
        )
      ).to.be.revertedWith("Output amount too low");
    });
  });
});
