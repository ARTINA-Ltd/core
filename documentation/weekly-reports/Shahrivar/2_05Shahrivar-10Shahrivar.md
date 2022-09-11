## (5 Shahrivar 1401 - 27 August 202) to (10 Shahrivar 1401 - 1 September 2022)

### Commit branches:
| request number | branch name                                        | by                 | merge date       |
|----------------|----------------------------------------------------|--------------------|------------------|
| 13             | function haye seen req by exhibitor va accepted    | Ali Khazaei        | 27 August 2022   |
| 14             | Models update                                      | Shervin Dadashzade | 29 August 2022   |
| 16             | request-for-exhibition added                       | Shervin Dadashzade | 29 August 2022   |
| 17             | change on NftEx model fields + adopt previous code | Shervin Dadashzade | 30 August 2022   |
| 18             | Finilize exhibitor workflowe                       | Shervin Dadashzade | 1 September 2022 |


### Changes in this week:
* `Transaction` model moved from **core/models.py** to **exhibition/models.py**
* Column **nft** in `NftEx` model changed to **nfts** as its type changed to ManyToManyField.
* 