# API Endpoints

## Exhibition Work Flows:
- API Root : `/exhibition`

| Url                                                 | Allowed Methods                        | Functionality                                             | TODO |
|-----------------------------------------------------|----------------------------------------|-----------------------------------------------------------|------|
| */exhibition/exhibitions/*                          | GET, POST, HEAD, OPTIONS               | Getting list of all exhibitions                           |      |
| */exhibition/exhibitions/`<id>`/*                   | GET, POST, HEAD, OPTIONS               | Getting a specific exhibition                             |      |
| */exhibition/nftexs/*                               | GET, POST, HEAD, OPTIONS               | Getting list of all NFTs related to exhibitions           |      |
| */exhibition/nftexs/`<id>`/*                        | GET, PUT, PATCH, DELETE, HEAD, OPTIONS | Getting a specific NFT related to exhibitions             |      |
| */exhibition/nftexs/`<id>`/changing_state_accepted* | GET, HEAD, OPTIONS                     | Change state of an NFT related to Exhibition to: accepted |      |
| */exhibition/nftexs/`<id>`/changing_state_rejected* | GET, HEAD, OPTIONS                     | Change state of an NFT related to Exhibition to: rejected |      |
| */exhibition/transactions/*                         | GET, POST, HEAD, OPTIONS               | Getting list of all transactions                          |      |
| */exhibition/transactions/`<id>`/*                  | GET, PUT, PATCH, DELETE, HEAD, OPTIONS | Getting a specific transaction                            |      |
| *exhibition/exhibitors/*                            | GET, POST, HEAD, OPTIONS               | Getting list of all exhibitors                            |      |
| *exhibition/exhibitors/`<id>`/*                     | GET, PUT, PATCH, DELETE, HEAD, OPTIONS | Getting a specific exhibitor                              |      |
| *exhibition/exhibitors/`<id>`/get_exhibitions*      | GET, HEAD, OPTIONS                     | Getting all exhibitions of a specific exhibitor           |      |
| *exhibition/exhibitors/`<id>`/get_pending_state*    | GET, HEAD, OPTIONS                     | Getting all pending NFTs of a specific exhibitor          |      |
| *exhibition/rate/*                                  | GET, POST, HEAD, OPTIONS               | Getting list of all rates                                 |      |
| *exhibition/rate/`<id>`/*                           | GET, PUT, PATCH, DELETE, HEAD, OPTIONS | Getting a specific rate                                   |      |



## Transaction Work Flows:
- API Root : `/transaction`

| Url                           | Allowed Methods                        | Functionality              | TODO |
|-------------------------------|----------------------------------------|----------------------------|------|
| */transaction/orders/*        | GET, POST, HEAD, OPTIONS               | Getting list of all orders |      |
| */transaction/orders/`<id>`/* | GET, POST, HEAD, OPTIONS               | Getting a specific order   |      |
| */transaction/Nfts/*          | GET, POST, HEAD, OPTIONS               | Getting list of all nfts   |      |
| */transaction/Nfts/`<id>`/*   | GET, PUT, PATCH, DELETE, HEAD, OPTIONS | Getting a specific NFT     |      |
| */transaction/rate/*          | GET, POST, HEAD, OPTIONS               | Getting list of all rates  |      |
| */transaction/rate/`<id>`/*   | GET, PUT, PATCH, DELETE, HEAD, OPTIONS | Getting a specific rate    |      |



## Account Work Flows:
- API Root : `/account`
> **Note**: After the implementation of authentication system the `<id>` will be removed from url and will handle by API_TOKEN of each user.

| Url                                          | Allowed Methods                        | Functionality                                            | TODO                              |
|----------------------------------------------|----------------------------------------|----------------------------------------------------------|-----------------------------------|
| */account/artists/*                          | GET, POST, HEAD, OPTIONS               | Getting list of all artists                              |                                   |
| */account/artists/`<id>`/*                   | GET, POST, HEAD, OPTIONS               | Getting a specific artist                                |                                   |
| */account/artists/`<id>`/get_applications*   | GET, HEAD, OPTIONS                     | Getting an artist applications for different exhibitions |                                   |
| */account/artists/`<id>`/request_exhibition* | POST, OPTIONS                          | Requesting an exhibition                                 | needs some minor changes, routing |
| */account/rate/*                             | GET, POST, HEAD, OPTIONS               | Getting list of all rates                                |                                   |
| */account/rate/`<id>`/*                      | GET, PUT, PATCH, DELETE, HEAD, OPTIONS | Getting a specific rate                                  |                                   |

