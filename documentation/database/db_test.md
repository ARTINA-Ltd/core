# DataBase Test Documentation

## Authentication and Authorization
- ### Users Table

| UserName    | Email Address        | Password     | Is Superuser | Role      |
|-------------|----------------------|--------------|--------------|-----------|
| ali         | ali@gmail.com        | 123          | True         | None      |
| aria        | aria@gmail.com       | 123          | True         | None      |
| shervin     | shervin@gmail.com    | 123          | True         | None      |
| zahra       | zahra@gmail.com      | 123          | True         | None      |
| artist_1    | artist1@gmail.com    | Honarmand@1  | False        | artist    |
| artist_2    | artist2@gmail.com    | Honarmand@2  | False        | artist    |
| artist_3    | artist3@gmail.com    | Honarmand@3  | False        | artist    |
| exhibitor_1 | exhibitor1@gmail.com | Majmooedar@1 | False        | exhibitor |
| exhibitor_2 | exhibitor2@gmail.com | Majmooedar@2 | False        | exhibitor |
| exhibitor_3 | exhibitor3@gmail.com | Majmooedar@3 | False        | exhibitor |
| mehdi       | mehdi@gmail.com      | User@Default | False        | user      |
| sepide      | sepide@gmail.com     | User@Default | False        | user      |
| mahdigh     | mahdigh@gmail.com    | User@Default | False        | user      |
| mohammad    | mohammad@gmail.com   | User@Default | False        | user      |


## Account 
- ### Permission Table

| Permission | 
|------------|
| simple-usr |

- ### Roles Table

| Role Name | Permission |
|-----------|------------|
| artist    | simple-usr |
| exhibitor | simple-usr |
| user      | simple-usr |

- ### Profile Table
> Note: `national_code_` and `image` fields are not mentioned here.

| UserName    | National Code | Birth Date | Mobile Number | Home Number | Address | Role      |
|-------------|---------------|------------|---------------|-------------|---------|-----------|
| artist_1    | 1234567890    | 1990-01-01 | 09123456789   | 02123456789 | Tehran  | artist    |
| artist_2    | 2345678901    | 1990-01-02 | 09124567892   | 02134567892 | Tehran  | artist    |
| artist_3    | 3456789012    | 1990-01-03 | 09125678923   | 02145678923 | Tehran  | artist    |
| exhibitor_1 | 4567890123    | 1990-02-01 | 09126789234   | 02156789234 | Shiraz  | exhibitor |
| exhibitor_2 | 5678901234    | 1990-02-02 | 09127892345   | 02167892345 | Shiraz  | exhibitor |
| exhibitor_3 | 6789012345    | 1990-02-03 | 09128923456   | 02178923456 | Shiraz  | exhibitor |
| mehdi       | 7890123456    | 1990-03-01 | 09129034567   | 03123456789 | Esfahan | user      |
| sepide      | 8901234567    | 1990-03-02 | 09103456789   | 03134567892 | Esfahan | user      |
| mahdigh     | 9012345678    | 1990-03-03 | 09104567892   | 03145678923 | Esfahan | user      |
| mohammad    | 0123456789    | 1990-03-04 | 09105678923   | 03156789234 | Esfahan | user      |


## Core
- ### NFTs Table
> Note: `image` field is not mentioned here.

| Name   | Owner       | Creator     | Last Price | Start Date | End Date   |
|--------|-------------|-------------|------------|------------|------------|
| NFT1   | artist_1    | artist_1    | 100        | 2021-09-06 | 2021-11-06 |
| NFT2   | artist_2    | exhibitor_1 | 200        | 2022-09-06 | 2022-11-06 |
| NFT3   | artist_3    | mehdi       | 300        | 2023-09-06 | 2023-11-06 |
| NFT4   | artist_3    | artist_2    | 400        | 2021-09-06 | 2021-11-06 |
| NFT5   | exhibitor_1 | exhibitor_1 | 500        | 2022-09-06 | 2022-11-06 |
| NFT6   | exhibitor_2 | artist_1    | 600        | 2023-09-06 | 2023-11-06 |
| NFT7   | exhibitor_3 | sepide      | 700        | 2021-09-06 | 2021-11-06 |
| NFT8   | exhibitor_3 | exhibitor_2 | 800        | 2022-09-06 | 2022-11-06 |
| NFT9   | mahdigh     | mahdigh     | 900        | 2023-09-06 | 2023-11-06 |
| NFT10  | mohammad    | artist_1    | 1000       | 2021-09-06 | 2021-11-06 |
| NFT11  | mohammad    | exhibitor_1 | 1100       | 2022-09-06 | 2022-11-06 |
| NFT12  | mehdi       | sepide      | 1200       | 2023-09-06 | 2023-11-06 |


- ### Orders Table

| NFT Name | Bidder      | Price | Status |
|----------|-------------|-------|--------|
| NFT1     | artist_2    | 1000  | Open   |
| NFT3     | exhibitor_1 | 3000  | Open   |
| NFT5     | sepide      | 5000  | Close  |
| NFT7     | artist_1    | 7000  | Close  |
| NFT9     | mohammad    | 9000  | Close  |
| NFT11    | artist_3    | 11000 | Open   |
| NFT11    | exhibitor_2 | 12000 | Open   |


- ### Wallet Table

| UserName    | Wallet Address |
|-------------|----------------|
| artist_1    | 0x123456789    |
| artist_2    | 0x234567890    |
| artist_3    | 0x345678901    |
| exhibitor_1 | 0x456789012    |
| exhibitor_2 | 0x567890123    |
| exhibitor_3 | 0x678901234    |
| mehdi       | 0x789012345    |
| sepide      | 0x890123456    |
| mahdigh     | 0x901234567    |
| mohammad    | 0x012345678    |


## Exhibition
- ### Exhibitions Table
> Note: `image` field is not mentioned here.

| UserName    | Market Name | Start Date | End Date   |
|-------------|-------------|------------|------------|
| exhibitor_1 | Exhibition1 | 2023-01-01 | 2023-03-01 |
| exhibitor_1 | Exhibition2 | 2022-08-01 | 2022-11-01 |
| exhibitor_2 | Exhibition3 | 2022-10-01 | 2022-10-20 |
| exhibitor_3 | Exhibition4 | 2022-12-21 | 2023-01-13 |


- ### NFtEx Table

| NFT Name | Market Name | Commission | State    |
|----------|-------------|------------|----------|
| NFT1     | Exhibition1 | 10         | Pending  |
| NFT2     | Exhibition1 | 20         | Pending  |
| NFT4     | Exhibition1 | 30         | Accepted |
| NFT5     | Exhibition2 | 40         | Pending  |
| NFT7     | Exhibition2 | 50         | Rejected |
| NFT8     | Exhibition3 | 60         | Pending  |
| NFT10    | Exhibition3 | 70         | Accepted |
| NFT11    | Exhibition3 | 80         | Rejected |
| NFT12    | Exhibition4 | 90         | Rejected |


- ### Transactions Table

| NFtEx | Last Price | 


