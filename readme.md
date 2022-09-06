# Artina NFT Marketplace

Visit these links to see the project in action:  
- [Requirements](https://gitlab.com/zehish/artina/-/tree/main/documentation/requirements.txt)  
- [Documentation](https://gitlab.com/zehish/artina/-/tree/main/documentation)  
- [Weekly Reports](https://gitlab.com/zehish/artina/-/tree/main/documentation/weekly-reports)  
- [Endpoints](https://gitlab.com/zehish/artina/-/tree/main/documentation/endpoints.md)  
- [Table Structure](https://gitlab.com/zehish/artina/-/tree/main/documentation/database/tables.md)
- [Database Schema](https://gitlab.com/zehish/artina/-/tree/main/documentation/database/db_schema.jpg)
- [Database Test](https://gitlab.com/zehish/artina/-/tree/main/documentation/database/db_test.md)



## Installation
1. Run `source venv/bin/activate` to activate virtual environment.
2. Run `pip install -r ./documentation/requirements.txt` to install dependencies.
3. Run `python manage.py makemigrations` to create migrations.
4. Run `python manage.py migrate` to apply migrations.
5. Run `python manage.py runserver` to start the server.


## Main TODOs
- [ ] Change directory of db_test.sqlite3, db_schema.jpg, and tables.md to documentation/database.
- [ ] Make dump data for testing and development.
- [ ] Add virtual environment installation guide to readme.md.
- [ ] National code validation while sign up.
- [ ] Account application should be lowercase and fix where it used.
- [ ] Writing comments in each file to declare the style of coding and calling other files.
- [ ] ...