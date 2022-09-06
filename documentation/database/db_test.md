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

| UserName | National Code | Birth Date | Mobile Number | Home Number | Address | Role   |
|----------|---------------|------------|---------------|-------------|---------|--------|
| artist_1 | 1234567890    | 1990-01-01 | 09123456789   | 02123456789 | Tehran  | artist |
| artist_2 | 2345678901    | 1990-01-02 | 09124567892   | 02134567892 | Tehran  | artist |
| artist_3 | 3456789012    | 1990-01-03 | 09125678923   | 02145678923 | Tehran  | artist |

