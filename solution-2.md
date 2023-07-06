## Challenges

One of the major challenges that we had to face are Polygon ID crashes. Even though the app overall functions flawlessly, there are some occasions that it crashes without giving error messages. 
We do not know the reason for those crashes, but in order to fix it, we have to delete the previously added credential and add it again. 

There is also an unexpected error that keeps breaking the dapp frontend, that I could not fix, but it can be easily closed and the dapp continues working.


## Code
The developed dapp is the following one: [dapp](https://github.com/ferrabled/idthon-dapp)
The developed dapp functions as a counter that can be incremented or decremented based on your prediction of whether Polygon's price will rise or fall. Access to the dapp is restricted to individuals above the age of 18 and requires age verification before entry, this verification is done with Polygon ID.

There is also a new smart contract deployed -> \
🔍 [explorer](https://testnet-zkevm.polygonscan.com/address/0x98fca914ebb5b5457839274bacf607595fbc390d) \
👨🏼‍💻 [code](https://github.com/ferrabled/idthon-dapp/blob/main/frontend/src/demoSmartContract/Counter.sol)
