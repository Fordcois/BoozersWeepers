# Boozers Weepers

<div style="text-align:center;">
  <img src="frontend/src/Assets/BoozersWeepersLogo_trans.png" height="150" alt="Boozers Weepers Logo">
</div>

This branch represents an extension of [Team Tavern](https://github.com/Catherine-Russell/TeamTavern), developed in collaboration between [Sam Ford](https://github.com/Fordcois) & [Rachel Roberts](https://github.com/Rachel853). The modifications made to this branch focus on styling and refactoring the code structure.

Originally, the project was executed within a two-week timeframe, building upon a legacy codebase. It features the contributions of myself, [Rachel Roberts](https://github.com/Rachel853), [Ben Dixon](https://github.com/BenDixon96), and [Catherine Russell](https://github.com/Catherine-Russell), with [Karys Barbrook](https://github.com/karysbarbrook) and [Manuela Iacobovici](https://github.com/ManuelaIacobovici) serving as quality engineers for the project.

## Features
<div style="text-align:center;">
<img src='public/images/Activebet Screenshot.png' style='border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); height: 350; width: auto;'>
</div>

<b>BoozersWeepers</b> is a lifestyle web application for tracking and settling pub bets and IOUs between friends. <br/>

🟠 Users are able to register accounts using unique credentials and log-in securely<br>

🟠 Users can use live search for other users on the site either using their unique username or by searching for their real name. 

🟠 Users can challenge another User to a Wager, giving a condition for a win and a date by which the condition must be met.

🟠 Users can see incoming wager requests and approve/deny before the wager is counted against them.<br>


## Technology Stack

- MongoDB
- Express.js
- React.js
- Node.js

## Set up 

1. Install Node.js dependencies for both the `frontend` and `api` directories.
   ```
   ; cd api
   ; npm install
   ; cd ../frontend
   ; npm install
   ```

> You might get warning messages about the installed dependencies at this point. You can ignore them, as long as the installation process doesn't fail. If the setup fails at this point, don't wait for too long and reach out to your coach.

2. Install an ESLint plugin for your editor. For example: [`linter-eslint`](https://github.com/AtomLinter/linter-eslint) for Atom.
3. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```
   *Note:* If you see a message that says `If you need to have mongodb-community@5.0 first in your PATH, run:`, follow the instruction. Restart your terminal after this.
4. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```

### How to run the server and use the app 
1. Start the server application (in the `api` directory)

  **Note the use of an environment variable for the JWT secret**
   ```
   ; cd api
   ; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm start
   ```
2. Start the front end application (in the `frontend` directory)
  In a new terminal session...
  ```
  ; cd frontend
  ; npm start
  ```

You should now be able to open your browser and go to `http://localhost:3000/` 

### How to run automated tests
The automated tests run by sending actual HTTP requests to the API. Therefore, before anything, you'll need to start the backend server in test mode (so that it connects to the test DB).

**Note the use of an environment variable for the JWT secret**
```bash
# Make sure you're in the api directory
; cd api
; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run start:test
```

You should leave this running in a terminal.

Then, you can either run tests for the backend or the frontend following the steps below. 

#### Running tests for the backend

Run the tests in a new terminal session:
```bash
# Make sure you're in the api directory
; cd api
; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run test
```

####  Running tests for the frontend

Start the front end in a new terminal session
```bash
# Make sure you're in the frontend directory
; cd frontend
; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm start
```

Then run the tests in a new terminal session
```bash
# Make sure you're in the frontend directory
; cd frontend
; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run test
```
