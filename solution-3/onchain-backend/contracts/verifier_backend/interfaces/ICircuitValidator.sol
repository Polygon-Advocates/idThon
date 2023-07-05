// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface
// ========================================================
interface ICircuitValidator {
    // Variables
    struct CircuitQuery {
        uint256 schema;
        uint256 slotIndex;
        uint256 operator;
        uint256[] value;
        string circuitId;
    }

    /**
     * @dev verify
     */
    function verify(
        uint256[] memory inputs,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        CircuitQuery memory query
    ) external view returns (bool r);

    /**
     * @dev getCircuitId
     */
    function getCircuitId() external pure returns (string memory id);

    /**
     * @dev getChallengeInputIndex
     */
    function getChallengeInputIndex() external pure returns (uint256 index);

    /**
     * @dev getUserIdInputIndex
     */
    function getUserIdInputIndex() external pure returns (uint256 index);
}
