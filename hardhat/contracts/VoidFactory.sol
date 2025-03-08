// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./VoidPair.sol";

contract VoidFactory {
    address[] public pairs;
    mapping(address => mapping(address => address)) public getPair;

    uint8 public fee = 2;

    constructor(uint8 _fee) {
        require(_fee >= 0 && _fee <= 50, "Incorrect fee amount");
        fee = _fee;
    }

    function createPair(
        address _tokenA,
        address _tokenB
    ) public returns (address) {
        require(_tokenA != _tokenB, "Using the same address");
        require(getPair[_tokenA][_tokenB] == address(0), "Pair exists");

        VoidPair newPair = new VoidPair(_tokenA, _tokenB, fee);

        address newPairAddress = address(newPair);

        // add pair to list of all pairs
        pairs.push(newPairAddress);
        // add mapping of the pair address
        getPair[_tokenA][_tokenB] = newPairAddress;
        getPair[_tokenB][_tokenA] = newPairAddress;

        return newPairAddress;
    }

    function getPairAddress(
        address tokenA,
        address tokenB
    ) public view returns (address) {
        return getPair[tokenA][tokenB];
    }
}
