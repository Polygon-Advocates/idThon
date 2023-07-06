// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Imports
// ========================================================
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/ICircuitValidator.sol";
import "../interfaces/IZKPVerifier.sol";

// Contract
// ========================================================
contract ZKPVerifier is IZKPVerifier, Ownable {
    // Variables
    // msg.sender-> ( requestID -> is proof given )
    mapping(address => mapping(uint64 => bool)) public proofs;
    mapping(uint64 => ICircuitValidator.CircuitQuery) public requestQueries;
    mapping(uint64 => ICircuitValidator) public requestValidators;
    uint64[] public supportedRequests;
    bool result;

    // Functions
    /**
     * @dev submitZKPResponse
     */
    function submitZKPResponse(
        uint64 requestId,
        uint256[] memory inputs,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c
    ) external override returns (bool) {
        require(
            requestValidators[requestId] != ICircuitValidator(address(0)),
            "validator is not set for this request id"
        ); // validator exists
        require(
            requestQueries[requestId].schema != 0,
            "query is not set for this request id"
        ); // query exists

        _beforeProofSubmit(requestId, inputs, requestValidators[requestId]);

        require(
            requestValidators[requestId].verify(
                inputs,
                a,
                b,
                c,
                requestQueries[requestId]
            ),
            "proof response is not valid"
        );

        proofs[msg.sender][requestId] = true; // user provided a valid proof for request

        result = _afterProofSubmit(
            requestId,
            inputs,
            requestValidators[requestId]
        );
        return result;
    }

    /**
     * @dev getZKPRequest
     */
    function getZKPRequest(
        uint64 requestId
    ) external view override returns (ICircuitValidator.CircuitQuery memory) {
        return requestQueries[requestId];
    }

    /**
     * @dev setZKPRequest
     */
    function setZKPRequest(
        uint64 requestId,
        ICircuitValidator validator,
        ICircuitValidator.CircuitQuery memory query
    ) external override onlyOwner returns (bool) {
        if (requestValidators[requestId] == ICircuitValidator(address(0x00))) {
            supportedRequests.push(requestId);
        }
        requestQueries[requestId].value = query.value;
        requestQueries[requestId].operator = query.operator;
        requestQueries[requestId].circuitId = query.circuitId;
        requestQueries[requestId].slotIndex = query.slotIndex;
        requestQueries[requestId].schema = query.schema;

        requestQueries[requestId].circuitId = query.circuitId;

        requestValidators[requestId] = validator;
        return true;
    }

    /**
     * @dev getSupportedRequests
     */
    function getSupportedRequests()
        external
        view
        returns (uint64[] memory arr)
    {
        return supportedRequests;
    }

    /**
     * @dev Hook that is called before any proof response submit
     */
    function _beforeProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal virtual {}

    /**
     * @dev Hook that is called after any proof response submit
     */
    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal virtual returns (bool) {}
}
