import { gql, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import useSigner from "state/signer";
import { parseRawNFT } from "./helpers";

import { NFT } from "./interfaces";
import {
  GetOwnedNFTs,
  GetOwnedNFTsVariables,
  GetOwnedNFTs_nfts,
} from "./__generated__/GetOwnedNFTs";

const useOwnedNFTs = () => {
  const { address } = useSigner();

  const { data } = useQuery<GetOwnedNFTs, GetOwnedNFTsVariables>(
    GET_OWNED_NFTS,
    { variables: { owner: address ?? "" }, skip: !address }
  );
  const ownedNFTs = data?.nfts.map(parseRawNFT);

  return { ownedNFTs };
};

// const parseRawNFT = (row: GetOwnedNFTs_nfts): NFT => {
//     return{
//         id: row.id,
//         owner: row.price == "0" ? row.to : row.from,
//         price: row.price == "0" ? "0" : ethers.utils.formatEther(row.price),
//         tokenURI: row.tokenURI,
//     };
// };

const GET_OWNED_NFTS = gql`
  query GetOwnedNFTs($owner: String!) {
    nfts(where: { to: $owner }) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;


export default useOwnedNFTs;
