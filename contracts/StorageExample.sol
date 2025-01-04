pragma solidity ^0.8.0;

contract StorageExample {
  string first;
  string last;
  string twitter;
  address myAddress;
  uint dateJoined;
  function StorageExample(){
    first = 'Leopold';
    last = 'Joy';
    twitter = '@leopoldjoy';
    myAddress = msg.sender;
    dateJoined = block.timestamp;
  }   
}
