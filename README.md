# to-do-list-nodejs-expressjs-mysql

## Steps to perform to execute the project:

- Open the file located in the folder: **src/app.js**
- Import the file into your database manager. The file is located in the **src/database** folder
- Configure to *MySQL*

```javascript
// Mysql
server.use(mysqlConnection(mysql, {
  host: 'localhost',
  user: '',
  password: '',
  port: 3306,
  database: 'todolist-nodejs-expressjs'
}, 'single'))
```

### Projects setup
```python
npm install
```

### Compiles and minifies for production

```python
npm run dev
```
