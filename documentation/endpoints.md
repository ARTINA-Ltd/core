# API Endpoints


## Artist Work Flows:

> **Note**: After the implementation of authentication system the `<id>` will be removed from url and will handle by API_TOKEN of each user. 

| Url                                              | Allowed Methods          | Functionality                                                                                                           | TODO                                                                                                                                    |
|--------------------------------------------------|--------------------------|-------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| */account/artists/*                              | GET, POST, HEAD, OPTIONS | Getting list of all artists                                                                                             |                                                                                                                                         |
| */account/artists/`<id>`/*                       | GET, POST, HEAD, OPTIONS | Getting a specific artist                                                                                               |                                                                                                                                         |
| */account/artists/`<id>`/get_exhibitions*        | GET                      | Getting an artist participated exhibitions, and the income of that exhibition if the end_date of exhibition is arrived. | Login is required, winner function should be moved to the exhibition class, I see no reasons for start_date, end_date on the NFT model. |
| */account/artists/`<id>`/get_applications*       | GET                      | Getting an artist applications for different exhibitions                                                                | :heavy_check_mark: Done                                                                                                                 |
| */account/artists/`<id>`/request_for_exhibition* | POST                     | Getting a exhibition ID, an NFT ID, a commission which creates a NFtEx object with is_nft_accepted_by_exhibitor=`False` | needs some minor changes, routing                                                                                                       |


## Core Work Flows:
- API Root : `/core`

| Url                                              | Allowed Methods          | Functionality             | TODO |
|--------------------------------------------------|--------------------------|---------------------------|------|
| */transaction/orders/*                           | GET, HEAD, OPTIONS       | Getting all orders        |      |
| */transaction/orders/`<id>`/*                    | GET, POST, HEAD, OPTIONS | Getting a specific order  |      |


## Exhibition Work Flows:
- API Root : `/exhibition`

| Url                                                 | Allowed Methods          | Functionality                                             | TODO |
|-----------------------------------------------------|--------------------------|-----------------------------------------------------------|------|
| */exhibition/exhibitions/*                          | GET, POST, HEAD, OPTIONS | Getting list of all exhibitions                           |      |
| */exhibition/exhibitions/`<id>`/*                   | GET, POST, HEAD, OPTIONS | Getting a specific exhibition                             |      |
| */exhibition/nftexs/*                               | GET, POST, HEAD, OPTIONS | Getting list of all NFTs related to exhibitions           |      |
| */exhibition/nftexs/`<id>`/*                        | GET, POST, HEAD, OPTIONS | Getting a specific NFT related to exhibitions             |      |
| */exhibition/nftexs/`<id>`/changing_state_accepted* | POST                     | Change state of an NFT related to Exhibition to: accepted |      |
| */exhibition/nftexs/`<id>`/changing_state_rejected* | POST                     | Change state of an NFT related to Exhibition to: rejected |      |
| */exhibition/transactions/*                         | GET, POST, HEAD, OPTIONS | Getting list of all transactions                          |      |
| */exhibition/transactions/`<id>`/*                  | GET, POST, HEAD, OPTIONS | Getting a specific transaction                            |      |
| *exhibition/exhibitors/*                            | GET, POST, HEAD, OPTIONS | Getting list of all exhibitors                            |      |
| *exhibition/exhibitors/`<id>`/*                     | GET, POST, HEAD, OPTIONS | Getting a specific exhibitor                              |      |
| *exhibition/exhibitors/`<id>`/get_exhibitions*      | GET, HEAD, OPTIONS       | Getting all exhibitions of a specific exhibitor           |      |
| *exhibition/exhibitors/`<id>`/get_pending_state*    | GET, POST, HEAD, OPTIONS | Getting all pending NFTs of a specific exhibitor          |      |


## Transaction Work Flows:
- API Root : `/transaction`

| Url                                 | Allowed Methods          | Functionality                                   | TODO |
|-------------------------------------|--------------------------|-------------------------------------------------|------|
| */transaction/orders/*              | GET, POST, HEAD, OPTIONS | Getting list of all orders                      |      |
| */transaction/orders/`<id>`/*       | GET, POST, HEAD, OPTIONS | Getting a specific order                        |      |

## Account Work Flows:
- API Root : `/account`

| Url                                 | Allowed Methods          | Functionality                                   | TODO |
|-------------------------------------|--------------------------|-------------------------------------------------|------|
| */account/artists/*                 | GET, POST, HEAD, OPTIONS | Getting list of all artists                     |      |
| */account/artists/`<id>`/*          | GET, POST, HEAD, OPTIONS | Getting a specific artist                       |      |

