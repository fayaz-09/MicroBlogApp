Set up steps for running locally:
1. After cloning run the npm install command in the blog-server and microblog directories to install required node modules for the api and client.
2. Create a new mySQL schema called microblog within your local database.
3. Create the following tables in the microblog schema. (I have include the mySQL create querys):

   user -

   CREATE TABLE `microblog`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));


   posts-
   
   CREATE TABLE `microblog`.`posts` (
  `idposts` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(500) NOT NULL,
  `comments` INT NOT NULL,
  `likes` INT NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`idposts`),
  INDEX `uid_idx` (`uid` ASC) VISIBLE,
  CONSTRAINT `uid`
    FOREIGN KEY (`uid`)
    REFERENCES `microblog`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
   comments -
   
   CREATE TABLE `microblog`.`comments` (
  `idcomments` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(500) NOT NULL,
  `date` VARCHAR(50) NOT NULL,
  `postid` INT NOT NULL,
  `userid` INT NOT NULL,
  PRIMARY KEY (`idcomments`),
  INDEX `postid_idx` (`postid` ASC) VISIBLE,
  CONSTRAINT `postid`
    FOREIGN KEY (`postid`)
    REFERENCES `microblog`.`posts` (`idposts`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `userid`
    FOREIGN KEY (`userid`)
    REFERENCES `microblog`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

  likedposts -
  
  CREATE TABLE `microblog`.`likedposts` (
  `idlike` INT NOT NULL AUTO_INCREMENT,
  `userlikeid` INT NOT NULL,
  `postlikeid` INT NOT NULL,
  PRIMARY KEY (`idlike`),
  INDEX `postlikeid_idx` (`postlikeid` ASC) VISIBLE,
  INDEX `userlikeid_idx` (`userlikeid` ASC) VISIBLE,
  CONSTRAINT `postlikeid`
    FOREIGN KEY (`postlikeid`)
    REFERENCES `microblog`.`posts` (`idposts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userlikeid`
    FOREIGN KEY (`userlikeid`)
    REFERENCES `microblog`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
4. Update the db.ts file in the blog-server directory with the valid data to connect to a root mySQL database.
5. The app should now be useable by running the npm start command in the blog-server then microblog directory.
6. Initially now content will be shown in the page. You can create a user by clicking login and then navigating to register.
7. Once logged in as a user you can create posts on the main page, visit the page on an individual post by clicking its content.
8. You can add or delete a comment on a post by visiting the individual post page. Likes can be given on either the main or post page.




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
