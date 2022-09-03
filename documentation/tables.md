# Tables of Database

## Account
- ### 1. Permission Table

| Column | Type      | Max_length | Verbose_name | null  | blank |
|--------|-----------|------------|--------------|-------|-------|
| id     | int       | None       | ID           | False | False |
| name   | CharField | 10         | نوع دسترسی   | False | False |

### 2. Role Table

| Column      | Type                            | Max_length | Verbose_name | null  | blank |
|-------------|---------------------------------|------------|--------------|-------|-------|
| id          | int                             | None       | ID           | False | False |
| name        | CharField                       | 10         | نقش          | False | False |
| permissions | ManyToManyField -> `Permission` | None       | None         | None  | None  |


### 3. Profile Table

| Column      | Type                                                      | Max_length | Verbose_name | null  | blank |
|-------------|-----------------------------------------------------------|------------|--------------|-------|-------|
| id          | int                                                       | None       | ID           | False | False |
| user        | OneToOneField -> `User`, On_delete -> Cascade, pk -> True | None       | None         | False | False |
