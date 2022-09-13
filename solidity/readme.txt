to run and deploy the system 

1 - go to solidity/nft-marketplace and run the local blockchain :
npx hardhat node 

2- you can copy server and add it manualy to the metamask test server it,s easy search 

3- to test the program you have to deploy it first , after you deploy anything tou cant change it so if you change contract 
then you have to deploy it again

4- to deploy the contract and get the address and abi :
npx hardhat run src/backend/scripts/deploy.js --network {networknam in here is localhost}

5- deploy.js is trying to  deploy the contract and get the information then send that information to the 
front , contractsData folder

6- to test each contract manualy :
npx hardhat console --network {network name in here is localhost}

7- to test contract automaticly you can use test :
npx hardhat test 

8- test folder contain NFTMarketplace.test.js and we write it from scrach to test the diffrent
variable and names and functions 

9- if everything pass then you have access to the abi and contract address 

10- we use them in front and wallet 
