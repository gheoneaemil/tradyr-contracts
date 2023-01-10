// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import './Params.sol';


contract SALES is SALESPARAMS {

    function setParams(uint _fee, address _discounts, address _methods) external onlyOwner {
        (bool success, ) = _methods.delegatecall(msg.data);
        require(success);
    }

    function get(uint saleId) external view returns(Sale memory) {
        return sales[saleId];
    }

    function operationDiscountCosts(
        address buyer, 
        uint saleId
    ) public view returns(
        uint discount,
        uint operationFee,
        uint operationFeeDiscount,
        uint bmarketFee,
        uint totalToPay
    ) {
        discount = IDiscounts(discounts).calculateDiscount(buyer);
        operationFee = sales[saleId].price / fee;
        operationFeeDiscount = discount == 1 ? 0 : operationFee / discount;
        bmarketFee = operationFee - operationFeeDiscount;
        totalToPay = sales[saleId].price - operationFeeDiscount;
    }

    function sell(
        address[] calldata _nftAddresses, 
        uint[] calldata _nftIds, 
        uint[] calldata _nftAmounts, 
        uint32[] calldata _nftTypes, 
        uint _price, 
        address _currency
    ) external {
        (bool success, ) = methods.delegatecall(msg.data);
        require(success);
    }

    function cancel(uint saleId) external nonReentrant {
        (bool success, ) = methods.delegatecall(msg.data);
        require(success);
    }

    function buy(uint saleId) external payable nonReentrant {
        (bool success, ) = methods.delegatecall(msg.data);
        require(success);
    }

}
