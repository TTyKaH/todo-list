# todo list

Project has web and api parts. Using Node v19.4

front include:
- js, vue 3

back include:
- Node.js, Express.js, Sequelize, Postgresql

## First project deployment

### Prepare front part

In /web folder need install packages:

- npm install

### Prepare backend part

- install postgresql v12
- start postgresql by command "sudo service postgresql start"
- create user or use default user
- create db
- in /api/src/config/db.config.js add db user name, password and db name. It will look like this:
  
  <code>
    module.exports = {
      HOST: "localhost",
      USER: "user_name",
      PASSWORD: "password",
      DB: "db_name",
      dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  </code>

- in /api/src/server.js in corsOptions variable need add url your front-server (by default using url "http://localhost:5173" created by vite)
- install packages in api folder
- run backend server in /api/src by command "node server" or "nodemon server" if nodemon exist 


# commands for starting project

## frontend part

<ul>
  <li>cd web</li>
  <li>npm run dev</li>
</ul>

## backend part

<ul>
  <li>sudo service postgresql start</li>
  <li>cd api/src</li>
  <li>node server</li>
</ul>