# API Endpoints
Artist Work Flows:

**Note**: After the implementation of authentication system the `<id>` will be removed from url and will handle by API_TOKEN of each user. 
Url | Method | functinality | TODO
----------|--------------|--------------|----------
*/account/artists/`<id>`/get_exhibitions* | GET |Getting an artist participated exhibitions, and the income of that exhibition if the end_date of exhibition is arrived. | Login is required, winner function should be moved to the exhibition class, I see no reasons for start_date, end_date on the NFT model.
*/account/artists/`<id>`/get_applications* | GET |Getting an artist applications for different exhibitions | :heavy_check_mark: Done
*/account/artists/`<id>`/request_for_exhibition* | POST |Getting a exhibition ID, an NFT ID, a commission which creates a NFtEx object with is_nft_accepted_by_exhibitor=`False` | needs some minor changes, routing 