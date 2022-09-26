baraye run system vared frontsol shode va 
: yarn dev 
minevisim
*-------------------------------------------------------------------------*

taqir signer va deploy system :
baraye deploy system 
behtar ast az poshe solidity/nft estefade konim ama az khod front sol ham mishe estefade kard
dar poshe solidity :

npx hardhat run scripts/deploy.ts ---network goerli

baraye karkard in khat code 
ebteda dar infura hesab baz karde va shbake entekhabi ro dar file .env ezafe mikonim 
sepas private key kif pol asli ro dar .env ezafe mikonim 

sepas dar file hardhat.config.js 
mitonim shabake ro ezafe konim 

agar deploy be dorosti kar konad contract address be ma midahad  

in contract address radar .env poshe frontsol jaigozin mikonim

*----------------------------------------------------------------------*

nft.storage website : mohem

in site baraye zakhire etelaat hast va be ma ipfs barmigardonad
dar code frontsol mozoii hast be esm abi ke estefade mishavad  
darhalat koli farz mikonam abi kar mikonad ama agar moshkeli ijad shod 
lazem ast abi jadid gerefte va jaigozin konim dar tamami jaha.
baraye sakhte shodan abi jadid va poshe artifact dar frontsol agar nabod 
minevisim :

npx hardhat compile 
 
 tavajo agra in khad compile ejrakonid bayad 
abi jadid dar marhale  subgraph bejaye abi man bayad jaigozin shavad

*---------------------------------------------------------------------*
front place:

connect button :
signer.tsx in src/state folder
connectbutton.tsx src/components/topbar folder
_app.tsx src/pages folder

infura.io we need to get our net adrress from here

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

owned NFT:
 src/state/  useOwnedNFTs.ts
 src/pages _app.tsx
 src/modules/Ownedpage index.tsx
 src/pages  owned.tsx
 src/components  NFTCard.tsx

list nft : pop up miad baraye price va bad entekhab function list nft seda zade shode va 
ba graph api fetch mishavad
 src/state/  useOwnedListedNFTs.ts
 src/pages _app.tsx
 src/modules/Ownedpage index.tsx
 src/components  NFTCard.tsx
 src/state/nft-market  config.ts
 src/state/nft-market  helpers.ts

buy and home nft:

 src/state/  useListedNFTs.ts
 src/modules/HomePage index.tsx
 src/components  NFTCard.tsx
 src/state/nft-market  index.ts


** marhale miani vasl kardan site ha **
-----------------------------------------------------------------------------------
1--: subgraph: ba amozesh khod site ebteda nasb mikonim  
tavajo : in marahel bayd az ebteda zade shavad va code ha az file gozashte shode copy shavad

note : we use subgraph to deploy our contract and abi to it then this program store our data and everythings we need
so we can use that in our front and list or cansle or sell the nft 

yarn global add @graphprotocol/graph-cli
graph init --studio artinatest

hengam nasb eth ra entekhab shabake ra entekhab sepas 
contract address ra vared mikonim 

sepass vared poshe fronsol shode va code:  npx hardhat compile

ra ejra karde sepas abi tashkil shode dar poshe artifact ra copy karde 
dar poshe ijad shode tavasot graph rafte va file abi.json ra misazim (ehtemalan abi ke khodam gozashtm kar kone
hamino copy konid)
hal barayee contract name hamon ArtinaNFT bezanid
sepas file poshe mesal artinatest sakhte mishavad
hal vared poshe shode va file : subgraph.yaml ra taqir midahim (hamini ke khodam neveshtaam address ro taqir midim)
va startblock contract ro az eth escan peida mikonim
hala vared poshe 
generated/ArtinaNFT shode file ArtinaNFT  assembly hast

hal teerminal type mikoim graph codegen
hala vared schima.graphql shode 
va code mn ra copy konid jaye on 
hal teerminal type mikoim graph codegen

hala vared src/ shode va file dakhel ra entekhab va code mn ra jaigozari konid
hala ba estefade az rahnamaye site :
graph auth --studio undefined
graph codegen && graph build
graph deploy --studio artinatest

status bayad taqir kone be deployed
dar soraat anjam dorost marahel contract dar site deploy shode va nft haye sakhte shode ma
bayad dar inja etelaatesh namayesh dade shavad
publish nashavad.!


tavajo etelaat graph url ra az site gerefte va dar ,env ezafe mikonim
//bad az taqir queri hamishe codgen dobare farakhani mishe

---------------------------------------------------------------------------------------------
2--: niaz be anjam kari nist marahel nasb ast ke anjam shod
quering graph api to display owned nft
apollographql.com 
berid frontsol 
npx apollo client:download-schema --endpoint https://api.studio.thegraph.com/query/35327/artinatest/v0.0.1
npx apollo client:codegen --localSchemaFile schema.graphql --target=typescript

//bad az taqir queri hamishe codgen dobare farakhani mishe

in system be pars va estefade az site qabl komak mikonad
-----------------------------------------------------------------------------------------------
