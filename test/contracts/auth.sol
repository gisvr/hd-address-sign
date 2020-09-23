pragma solidity ^0.4.15;

contract Auth {
    function verify( bytes32 hash, uint8 v, bytes32 r, bytes32 s) constant returns(address retAddr) {
      bytes memory prefix = "\x19Ethereum Signed Message:\n32";
      bytes32 prefixedHash = sha3(prefix, hash);
      return ecrecover(prefixedHash, v, r, s);
    }
}