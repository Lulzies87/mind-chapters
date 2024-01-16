# How to setup locally

Create a database in mongo with two collections:

 - chapters
 - users
 
 Load the content of following files to the respective collection:
 - data/chapters.json
 - data/users.json

Create a .env file with following variables:
 - `CONN_STRING=<mongodb_connection_string>`
 - `COOKIE_SECRET=<generated UUID>`
