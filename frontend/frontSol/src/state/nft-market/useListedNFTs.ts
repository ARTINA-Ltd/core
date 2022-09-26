import { gql, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import useSigner from "state/signer";
import { NFT_MARKET_ADDRESS } from "./config";

import { parseRawNFT } from "./helpers";

import { NFT } from "./interfaces";
import { GetListedNFTs, GetListedNFTsVariables } from "./__generated__/GetListedNFTs";
import { GetOwnedListedNFTs, GetOwnedListedNFTsVariables } from "./__generated__/GetOwnedListedNFTs";
import {
  GetOwnedNFTs,
  GetOwnedNFTsVariables,
  GetOwnedNFTs_nfts,
} from "./__generated__/GetOwnedNFTs";
//query baraye farakhani data az subgraph
const useListedNFTs = () => {
  const { address } = useSigner();

  const { data } = useQuery<GetListedNFTs, GetListedNFTsVariables>(
    GET_LISTED_NFTS,
    { variables: { currentAddress: address ?? "" }, skip: !address }
  );
  const listedNFTs = data?.nfts.map(parseRawNFT);

  return { listedNFTs };
};

// const parseRawNFT = (row: GetOwnedNFTs_nfts): NFT => {
//     return{
//         id: row.id,
//         owner: row.price == "0" ? row.to : row.from,
//         price: row.price == "0" ? "0" : ethers.utils.formatEther(row.price),
//         tokenURI: row.tokenURI,
//     };
// };
//bad az taqir queri hamishe codgen dobare farakhani mishe
const GET_LISTED_NFTS = gql`
  query GetListedNFTs($currentAddress: String!) {
    nfts(
      where: {
        to: "${NFT_MARKET_ADDRESS}"
        from_not: $currentAddress
      }
    ) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;


export default useListedNFTs;
