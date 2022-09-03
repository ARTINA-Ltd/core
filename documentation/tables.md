# Tables of Database

## Account
- ### 1. Permission Table

| Column | Type      | Max_length | Verbose_name | null  | blank |
|--------|-----------|------------|--------------|-------|-------|
| id     | int       | None       | ID           | False | False |
| name   | CharField | 10         | نوع دسترسی   | False | False |

- ### 2. Role Table

| Column      | Type                            | Max_length | Verbose_name | null  | blank |
|-------------|---------------------------------|------------|--------------|-------|-------|
| id          | int                             | None       | ID           | False | False |
| name        | CharField                       | 10         | نقش          | False | False |
| permissions | ManyToManyField -> `Permission` | None       | None         | None  | None  |


- ### 3. Profile Table

| Column                | Type                                                      | Max_length | Verbose_name | null  | blank |
|-----------------------|-----------------------------------------------------------|------------|--------------|-------|-------|
| id                    | int                                                       | None       | ID           | False | False |
| user                  | OneToOneField -> `User`, on_delete -> Cascade, pk -> True | None       | None         | False | False |
| national_code         | CharField                                                 | 10         | کد ملی       | True  | True  |
| birthdate             | CharField                                                 | 10         | تاریخ تولد   | True  | True  |
| phone_number          | CharField                                                 | 11         | شماره تلفن   | True  | True  |
| cell_number           | CharField                                                 | 11         | شماره ثابت   | True  | True  |
| address               | TextField                                                 | 200        | آدرس         | True  | True  |
| national_code_picture | ImageField   upload_to -> `pictures of users`             | None       | عکس کارت ملی | True  | True  |
| image                 | ImageField   upload_to -> `pictures of profile`           | None       | عکس پروفایل  | True  | True  |
| role                  | ForeignKey -> `Role`, on_delete -> Cascade                | None       | نقش          | False | False |


## Core
- ### 1. NFT Table

| Column     | Type                                       | Max_length | Verbose_name       | null  | blank |
|------------|--------------------------------------------|------------|--------------------|-------|-------|
| id         | int                                        | None       | ID                 | False | False |
| name       | CharField                                  | 15         | None               | False | False |
| owner      | ForeignKey -> `User`, on_delete -> Cascade | None       | None               | False | False |
| creator    | CharField                                  | 15         | None               | False | False |
| date       | DateTimeField                              | None       | تاریخ              | False | False |
| last_price | IntegerField                               | None       | آخرین قیمت         | False | False |
| image      | ImageField   upload_to -> `NFTS`           | None       | عکس                | True  | True  |
| start_date | DateTimeField   default -> timezone.now    | None       | تاریخ شروع مزایده  | False | False |
| end_date   | DateTimeField   default -> timezone.now    | None       | تاریخ پایان مزایده | False | False |


- ### 2. Wallet Table

| Column  | Type                                       | Max_length | Verbose_name   |
|---------|--------------------------------------------|------------|----------------|
| id      | int                                        | None       | ID             |
| user    | ForeignKey -> `User`, on_delete -> Cascade | None       | None           |
| address | CharField                                  | 100        | wallet address |


- ### 3. Order Table

| Column | Type                                          | Max_length | Verbose_name | null  | blank |
|--------|-----------------------------------------------|------------|--------------|-------|-------|
| id     | int                                           | None       | ID           | False | False |
| nft    | ManyToManyField -> `NFT`                      | None       | None         | False | False |
| bidder | ForeignKey -> `User`, on_delete -> Cascade    | None       | None         | False | False |
| fee    | IntegerField                                  | None       | قیمت         | False | False |
| date   | DateTimeField                                 | None       | تاریخ        | False | False |
| status | CharField   choices -> `O`: open , `C`: close | 5          | None         | False | False |


## Exhibition
- ### 1. Exhibition Table

| Column     | Type                                                | Max_length | Verbose_name | null  | blank |
|------------|-----------------------------------------------------|------------|--------------|-------|-------|
| id         | int                                                 | None       | ID           | False | False |
| user       | ForeignKey -> `User`, on_delete -> Cascade          | None       | None         | False | False |
| marketName | CharField                                           | 15         | None         | False | False |
| image      | ImageField   upload_to -> `pictures of Exhibitions` | None       | Exhibition   | True  | True  |
| start_date | DateTimeField   default -> timezone.now             | None       | تاریخ شروع   | False | False |
| end_date   | DateTimeField   default -> timezone.now             | None       | تاریخ پایان  | False | False |

- ### 2. NFtEx Table

| Column     | Type                                                                                  | Max_length | Verbose_name | null  | blank |
|------------|---------------------------------------------------------------------------------------|------------|--------------|-------|-------|
| id         | int                                                                                   | None       | ID           | False | False |
| nfts       | ManyToManyField -> `NFT`, related_name -> `nftexs`                                    | None       | None         | False | False |
| ex         | ForeignKey -> `Exhibition`, on_delete -> Cascade, related_name -> `nftexs`            | None       | None         | False | False |
| date       | DateTimeField                                                                         | None       | تاریخ        | False | False |
| commission | IntegerField   default -> 1, validators -> Max : 100, Min : 1                         | None       | None         | False | False |
| state      | CharField   choices -> `pending`: pending, `accepted`: accepted, `rejected`: rejected | 12         | None         | False | False |

- ### 3. Transaction Table

| Column     | Type                                                                                 | Max_length | Verbose_name | null  | blank |
|------------|--------------------------------------------------------------------------------------|------------|--------------|-------|-------|
| id         | int                                                                                  | None       | ID           | False | False |
| nftex      | ForeignKey -> `NFTEx`, on_delete -> Cascade                                          | None       | None         | False | False |
| last_price | IntegerField   default -> 0                                                          | None       | آخرین قیمت   | False | False |
| seller     | ForeignKey -> `User`, on_delete -> Cascade, related_name -> `as_seller_transactions` | None       | None         | False | False |
| buyer      | ForeignKey -> `User`, on_delete -> Cascade, related_name -> `as_buyer_transactions`  | None       | None         | False | False |
| date       | DateTimeField                                                                        | None       | تاریخ        | False | False |

