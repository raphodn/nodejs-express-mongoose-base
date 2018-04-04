# Node.js-Express-Mongoose Base

## Goal

Basic Node.js Express backend API, with MongoDB database.


## Get started

0. Prerequisites: You need to have Git, Node/npm and MongoDB installed on your computer

1. Clone the repo

2. Install npm dependencies (`package.json`)
```
npm install
```

3. Run MongoDB in the background (in another terminal)
```
sudo service mongod start
```

4. Run the server. It will be available at `http://localhost:3000`
```
npm run start
```


## More details

### Tech Stack

- Node.js (v8) + Express (v4) + Mongoose (v5)
- MongoDB database
- Tests with Mocha & Chai
- Linting with ESLint (Airbnb Style Guide + some custom rules)


### API Available

Users
- `GET /api/users`
- `POST /api/users`
- `GET /api/users/:user_id`
- `PUT /api/users/:user_id`
- `DELETE /api/users/:user_id`

Transactions
- `GET /api/transactions`
- `POST /api/transactions`
- `GET /api/transactions/:transaction_id`

User Transactions
- `GET /api/users/:user_id/transactions`

Tip: you can interact with the API with a tool like [Postman](https://www.getpostman.com/)


### Seed Database

```
node db/seed.js
```


### Run Test

```
npm run test
```


### Run Linting

```
npm run lint
```


## Things missing & futur improvements

- Authentication
- Unit Tests
- Use [Mockgoose](https://github.com/mockgoose/mockgoose) for tests (in-memory database)
- REPL to interact with the database using the models