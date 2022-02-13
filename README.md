# to-do-list-nodejs-expressjs-mysql

## Steps to perform to execute the project:

- 1. Open the file located in the folder: **src/app.js**
- 2. Import the file into your database manager. The file is located in the **src/database** folder
- 3. Configure to *MySQL*

```
// Mysql
server.use(mysqlConnection(mysql, {
  host: '',
  user: '',
  password: '',
  port: 3306,
  database: 'todolist-nodejs-expressjs'
}, 'single'))
```

### Projects setup
```
npm install
```

### Compiles and minifies for production

```
npm run dev
```
