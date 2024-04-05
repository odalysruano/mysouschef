# MERN-Stack Infrastructure

Clone this repo to provide the starter code for a comprehensive MERN-Stack project including token-based authentication.

## Instructions: Using `mern-infrastructure` to Create MERN-Stack Projects in the Future

Here's the process to create a new MERN-Stack project that starts with the infrastructure code:

1. Clone the **mern-infrastructure** repo: `git clone <url of mern-infrastructure> <name-of-project>`
    > Note that the folder created will be same as `<name-of-project>` instead of mern-infrastructure

2. `cd <name-of-project>`

3. Install the Node modules:  `npm i`

4. Open the project in VS Code: `code .`

5. Open an integrated terminal and build the React code to create the build folder, otherwise the Express server will not start up: `npm run build`

6. Update the `"name": "mern-infrastructure"` in **package.json** to the name of your project.

7. Create a .env (`touch .env`) and add entries for `DATABASE_URL` and `SECRET`

8. Now you can start the Express server: `nodemon server`

9. Open another integrated terminal and start React's development server: `npm start`

10. Create a new repo on your personal GH account.

11. Copy the new GH repo's URL.

12. Update the remote's URL: `git remote set-url origin <paste the copied GH url>`

13. Make the initial commit:  `git add -A && git commit -m "Initial commit"`

14. Push for the first time:  `git push -u origin main`

15. Have fun coding your new project and don't forget to make frequent commits!
