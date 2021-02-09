
## Description

E-commerce store filled up by dummy data. 

MERN MongoDB, Express, React, Redux, Node.

## Demo Website
- 👉 Heroku: [https://my-ecommerce-store-app.herokuapp.com](https://my-ecommerce-store-app.herokuapp.com)

## Run Locally

### 1. Clone repo

```
$ git clone git@github.com:ejtooom/ecommerce-store.git
$ cd ecommerce-store
```

### 2. Setup MongoDB
- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb://localhost/ecommerce-store
- Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb+srv://your-db-connection

### 3. Run Backend

```
$ npm install
$ npm start
```

### 4. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 5. Seed Data

- Run this on chrome one by one: (It returns dummy data)
- http://localhost:5000/api/users/seed (save for later admin email and password)
- http://localhost:5000/api/products/seed
- http://localhost:5000/api/advertisingboxes/seed
- http://localhost:5000/api/infoboxes/seed
- http://localhost:5000/api/banners/seed
- http://localhost:5000/api/covers/seed
- http://localhost:5000/api/recommendedcategories/seed
- http://localhost:5000/api/contactforms/seed

### 6. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin