// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Imports
// ========================================================
import "./ICircuitValidator.sol";

// Interface
// ========================================================
interface IZKPVerifier {
    /**
     * @dev submitZKPResponse
     */
    function submitZKPResponse(
        uint64 requestId,
        uint256[] memory inputs,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c
    ) external returns (bool);

    /**
     * @dev setZKPRequest
     */
    function setZKPRequest(
        uint64 requestId,
        ICircuitValidator validator,
        ICircuitValidator.CircuitQuery memory query
    ) external returns (bool);

    /**
     * @dev getZKPRequest
     */
    function getZKPRequest(
        uint64 requestId
    ) external returns (ICircuitValidator.CircuitQuery memory);
}
