# Welcome to Artsy


## Live Heroku Link

- [Heroku Artsy](https://artsy-2022.herokuapp.com/)

## Challenges

    - The biggest challenge was getting the usernames to render when leaving a comment, the username was not rendering with its respective comments. To fix this, I was able to pass the username into the to_dict() method in the Comments Table, the to_dict() would now give me access to the username via comment.username in my map method to display comments. Another challenge I had was getting the PUT method on comments to work properly, I couldn't get the existing comments body to render in the edit comment input and the submission on editing the comment was changing another users comment instead. A lot of refactoring on the comments API and component solved this.


## Features

- Sign up/Log in and demo user login
- Browse gallery of digital art listings to view a collection of our users digital art pieces
- Post your digital work and leave comments on your art or other users digital art
- Edit your art listing title as well as delete your listing
- Leave comments on art listings and edit or delete your comments
- On your Profile page you can edit your username


## Installation

  1. Clone the repository ```git@github.com:DevDre783/Artsy-2022-Feb.git```
    - pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
  2. Install necessary dependencies for node.js ```npm install``` making sure youre in the react-app directory
  3. Create a database called `artsy_db`
  4. Set password as 'password' or any password. *Note: make sure it is the same password as the one in the .env file variables*
  5. Create a new env file with the appropriate settings.
  6. Run migrations and seed data: run pipenv ` npx dotenv sequelize db:migrate ` && `npx dotenv sequelize db:seed:all `
  7. Start both the backend and frontend server: cd into react-app folder and run `npm start` then cd.. back into Artsy_Capstone root directory run pipenv shell and then 'flask run'

  8. Flask commands:

   - pipenv shell

   - flask db upgrade

   - flask seed all

   - flask run

## Techologies Used

- JavaScript
- Python
- Git
- React
- CSS
- Redux
- Heroku
- Flask
- PostgreSQL

## Documentation Links
- [Database Schema](https://github.com/DevDre783/Artsy-2022-Feb/wiki/Database-Schema)
- [MVP Feature List](https://github.com/DevDre783/Artsy-2022-Feb/wiki/Features-List)
- [User Stories](https://github.com/DevDre783/Artsy-2022-Feb/wiki/User-Stories)

## Contributors
- [Andres Soca](https://github.com/DevDre783)
