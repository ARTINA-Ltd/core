import { CreationValues } from "modules/CreationPage/CreationForm";
import { BigNumber, Contract } from "ethers";
import NFT_MARKET from '../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import useSigner from "state/signer";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import useOwnedNFTs from "./useOwnedNFTs";
import useOwnedListedNFTs from "./useOwnedListedNFTs";
import { NFT_MARKET_ADDRESS } from "./config";

const useNFTMarket = () => {
    const { signer } = useSigner();
    const nftMarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer);
    
    const ownedNFTs = useOwnedNFTs();
    const ownedListedNFTs = useOwnedListedNFTs();
    //create function
    const createNFT = async (values: CreationValues) => {
        try {
          const data = new FormData();
          data.append("name", values.name);
          data.append("description", values.description);
          data.append("image", values.image!);
          //build ipfs uri
          const response = await fetch("/api/nft-storage", {
            method: "POST",
            body: data,
          });
          //201 is accept code
          if (response.status == 201) {
            const json = await response.json();
            const transaction: TransactionResponse = await nftMarket.createNFT(
                json.uri
            );
            await transaction.wait();
            // console.log("tokenuri :" ,json.uri)
          }
        } catch (e) {
          console.log(e);
        }
      };
      
      //list nft function
      //bad az in nft be nam contract market hast na user 
      const listNFT = async (tokenID: string, price: BigNumber) => {
        const transaction: TransactionResponse = await nftMarket.listNFT(
          tokenID,
          price
        );
        await transaction.wait();
      };
    
      //cancel nft function 
      const cancelListing = async (tokenID: string) => {
        const transaction: TransactionResponse = await nftMarket.cancelListing(
          tokenID,
        );
        await transaction.wait();
      };


      return{ createNFT ,listNFT, cancelListing,   ...ownedNFTs , ...ownedListedNFTs};
};

export default useNFTMarket;