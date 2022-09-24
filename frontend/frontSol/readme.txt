connect button :
signer.tsx in src/state folder
connectbutton.tsx src/components/topbar folder
_app.tsx src/pages folder

to store ipfs :
nft.storage website 

create nft:
we use ipfs 
 index.tsx modules/creationpage
 index.tsx modules/creationpage/creationform
 index.ts state/nft-market 

 we also add api in .env file and build empty tmp folder in root

then we call create function in deploy contract and pass the ipfs uri to it
if artifact folder is not there so we need abi so we run :
npx hardhat compile  

to index smartcontract we use thegraph.com 
build account and choise your network


