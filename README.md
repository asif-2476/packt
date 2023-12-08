Frontend - Angular 9
Backend - Laravel 10

Steps to run the project on local -

Frontend- 
Open terminal and go to the frontend directory inside packt  project root directory 
run command - npm install -f to install the angular packages
run command - ng serve to run angular frontend development server


Backend - 
create a new database on your local and go to packt  project root directory in code editor and configure accordingly in .env file 

Open terminal and go to the packt  project root directory 
run php artisan config:cache 
run composer install to install the packages
run php artisan migrate to create tables in DB
run php artisan db:seed to seed the book data with provided api
run php artisan serve to run development server

use url localhost:4200 provided by frontend development server in terminal in browser to run the project
use localhost:4200/auth/login to go the admin login page
use email- admin@gmail.com and password - admin2476 to login
