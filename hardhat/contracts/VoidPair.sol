// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
import "./VoidFactory.sol";

contract VoidPair is ERC20 {
    address public tokenA;
    address public tokenB;

    address public factory;

    // Fee % (0-50)
    uint8 fee;

    constructor(
        address _tokenA,
        address _tokenB,
        uint8 _fee
    ) ERC20("VoidLPToken", "V-LP") {
        require(
            _tokenA != address(0) && _tokenB != address(0),
            "Incorrect token address"
        );
        require(_fee >= 0 && _fee <= 50, "Incorrect fee amount");
        tokenA = _tokenA;
        tokenB = _tokenB;
        fee = _fee;

        factory = msg.sender;
    }

    function getReserves() public view returns (uint reserveA, uint reserveB) {
        uint balanceA = ERC20(tokenA).balanceOf(address(this));
        uint balanceB = ERC20(tokenB).balanceOf(address(this));

        return (balanceA, balanceB);
    }

    function swap(
        address _from,
        address _to,
        uint _inputAmount,
        uint _minOutput
    ) public {
        require(_to != _from, "Incorrect input and output address");
        require(_from == tokenA || _from == tokenB, "Incorrect input address");
        require(_to == tokenA || _to == tokenB, "Incorrect output address");

        uint inputReserve = ERC20(_from).balanceOf(address(this));
        uint outputReserve = ERC20(_to).balanceOf(address(this));

        // Find out trade
        uint outputAmount = getTradeAmount(
            _inputAmount,
            inputReserve,
            outputReserve
        );

        console.log("VoidPair.sol inputAmount: ", _inputAmount);
        console.log("VoidPair.sol outputAmount: ", outputAmount);
        // Check slippage
        require(outputAmount >= _minOutput, "Output amount too low");
        // Transfer the input to contract, transfer output to sender
        ERC20(_from).transferFrom(msg.sender, address(this), _inputAmount);
        ERC20(_to).transfer(msg.sender, outputAmount);
    }

    // Returns received amount of output token
    function getTradeAmount(
        uint _inputAmount,
        uint _inputReserve,
        uint _outputReserve
    ) public view returns (uint) {
        require(_inputReserve > 0 && _outputReserve > 0, "Invalid reserves");

        // First take fee that goes to liquidity providers
        uint inputAmountWithFee = _inputAmount * (100 - fee);

        // Following x*y=k
        // ( x + INPUT ) * ( y - OUTPUT ) = x * y
        //                  |
        //                  |
        //                  V
        // OUTPUT = (y * INPUT) / (x + INPUT)

        uint numerator = inputAmountWithFee * _outputReserve;
        uint denominator = (_inputReserve * 100) + inputAmountWithFee;

        return numerator / denominator;
    }

    // Adds liquidity to the pair
    function addLiquidity(uint _amountA, uint _amountB) public returns (uint) {
        uint liquidity;
        (uint reserveA, uint reserveB) = getReserves();

        if (reserveA == 0 && reserveB == 0) {
            // if there is no liquidity yet, mint _amountA of liquidity tokens
            ERC20(tokenA).transferFrom(msg.sender, address(this), _amountA);
            ERC20(tokenB).transferFrom(msg.sender, address(this), _amountB);
            liquidity = _amountA;
            _mint(msg.sender, liquidity);
        } else {
            // Calculate required amount of tokenA considering current ratio and _amountB
            // this is the amount of tokenA that will keep current pool ratio when _amountB of tokenB is added
            uint tolerableSlippage = 5;
            uint requiredAmountA = (_amountB * reserveA) / reserveB;
            uint maxRequiredAmountA = requiredAmountA +
                ((requiredAmountA * tolerableSlippage) / 100);
            uint minRequiredAmountA = requiredAmountA -
                ((requiredAmountA * tolerableSlippage) / 100);

            require(
                minRequiredAmountA > 0 &&
                    maxRequiredAmountA > minRequiredAmountA
            );

            require(
                _amountA > minRequiredAmountA && _amountA < maxRequiredAmountA,
                "Incorrect ratio"
            );

            ERC20(tokenA).transferFrom(msg.sender, address(this), _amountA);
            ERC20(tokenB).transferFrom(msg.sender, address(this), _amountB);

            liquidity = (totalSupply() * _amountA) / reserveA;
            _mint(msg.sender, liquidity);
        }
        return liquidity;
    }

    // Removes liquidity from the pair
    function removeLiquidity(uint _amount) public returns (uint, uint) {
        require(_amount > 0, "Incorrect amount");
        (uint reserveA, uint reserveB) = getReserves();
        uint _totalSupply = totalSupply();

        // Calculate received tokens amount based on current liquidity ratio
        uint receivedAmountA = (reserveA * _amount) / _totalSupply;
        uint receivedAmountB = (reserveB * _amount) / _totalSupply;

        console.log("receive amount A: ", receivedAmountA);
        console.log("receive amount B: ", receivedAmountB);

        // Burn liquidity from sender
        _burn(msg.sender, _amount);

        ERC20(tokenA).transfer(msg.sender, receivedAmountA);
        ERC20(tokenB).transfer(msg.sender, receivedAmountB);

        return (receivedAmountA, receivedAmountB);
    }
}
