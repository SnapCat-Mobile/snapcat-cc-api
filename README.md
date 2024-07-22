## SnapCat API Server Using Express.js

  This repository contains the source code for the SnapCat Application's API Server. The API server is built using JavaScript programming language and the Express.js framework.

## To use it, follow these steps:

### Dev Environment:

1. Database Setup

   Create a database (e.g., snapcat) in your preferred database management system (e.g., MySQL).
   
2. Environment Variables

   Fill in the required environment variables. Refer to the list of environment variables in the .env.development file.

3. Run Prisma Migration

   Execute the Prisma migration command:
   ```bash
   npx prisma migrate dev
   ```
   Prisma will automatically read the migration from the migration file and apply changes to the database.

4. Generate Prisma Client

   Run the following command to create the Prisma client:
   ```bash
   npx prisma generate
   ```
   This generates the Prisma client necessary for interacting with the database.

5. Start the Server

   Launch the application using:
   ```bash
   npm run start
   ```
6. The application is now ready to be used.

## Tech Stack 
JavaScript, Express.js, Prisma ORM, Cloud Run, Cloud SQL (MySQL), Cloud Storage, Cloud Build, and Secret Manager.

## Documentation API
For details regarding the endpoints, please refer to the provided documentation [here](https://documenter.getpostman.com/view/29897876/2s9Ykobfzc).

```bash
# User
[POST] https://snapcat-api.example/api/users/register
[POST] https://snapcat-api.example/api/users/login
[GET]  https://snapcat-api.example/api/users/:id
[POST] https://snapcat-api.example/api/users/forgot-password
[POST] https://snapcat-api.example/api/users/logout

# History
[POST] https://snapcat-api.example/api/history
[GET]  https://snapcat-api.example/api/histories/:id
[GET]  https://snapcat-api.example/api/history/:id

# Shop
[POST] https://snapcat-api.example/api/shop
[GET]  https://snapcat-api.example/api/shops/:id
```

<details>
  <summary>User</summary>

  - **Register**
  <pre>POST /users/register</pre>
  Request Body:
  ```json
  {
    "username": "kibay",
    "email": "kibay182@gmail.com",
    "password": "123456789"
  }
  ```
  Response Body:
  ```json
  {
    "data": {
        "id": "clqanjxnx0000ld607nggq4rw",
        "username": "kibay",
        "email": "kibay182@gmail.com",
        "password": "$2b$10$uaAQK8JWy7T2rWi7YAPwUOfK/C8p7N1COMyp11Zl.XseCshtJBFny",
        "url_profile": "https://www.vhv.rs/dpng/d/471-4710221_do-you-want-a-talkative-whiskas-cat-png.png",
        "createdAt": "2023-12-18T08:26:49.773Z",
        "updatedAt": "2023-12-18T08:26:49.773Z"
    },
    "message": "User created successfully."
  }
  ```
  - **Login**
  <pre>POST /users/login</pre>
  Request Body:
  ```json
  {
    "email": "kibay182@gmail.com",
    "password": "123456789"
  }
  ```
  Response Body:
  ```json
  {
    "data": {
        "user": {
            "id": "clqanjxnx0000ld607nggq4rw",
            "username": "kibay",
            "email": "kibay182@gmail.com"
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNscWFuanhueDAwMDBsZDYwN25nZ3E0cnciLCJ1c2VybmFtZSI6ImtpYmF5IiwiZW1haWwiOiJraWJheTE4MkBnbWFpbC5jb20iLCJpYXQiOjE3MDI4ODgxNTYsImV4cCI6MTcwMjk3NDU1Nn0.5hE-j-Htbu6jbvqwpS93K43ScmUWdLjpY8KRbBOBhdI",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNscWFuanhueDAwMDBsZDYwN25nZ3E0cnciLCJ1c2VybmFtZSI6ImtpYmF5IiwiZW1haWwiOiJraWJheTE4MkBnbWFpbC5jb20iLCJpYXQiOjE3MDI4ODgxNTZ9.GKJ_p1kjNA_szLBsBvpGSIy0ChCoMSJP9qscRE1YCBk"
    },
    "message": "Login successful."
  }
  ```
  - **User by Id**
  <pre>GET /users/:id</pre>
  Response Body:
  ```json
  {
    "data": {
        "id": "clqanjxnx0000ld607nggq4rw",
        "username": "kibay",
        "email": "kibay182@gmail.com",
        "password": "$2b$10$uaAQK8JWy7T2rWi7YAPwUOfK/C8p7N1COMyp11Zl.XseCshtJBFny",
        "url_profile": "https://www.vhv.rs/dpng/d/471-4710221_do-you-want-a-talkative-whiskas-cat-png.png",
        "createdAt": "2023-12-18T08:26:49.773Z",
        "updatedAt": "2023-12-18T08:26:49.773Z"
    },
    "message": "User retrieved successfully."
  }
  ```
  - **Forgot Password**
  <pre>POST /users/forgot-password</pre>
  Request Body:
  ```json
  {
    "email": "kibay182@gmail.com"
  }
  ```
  Response Body:
  ```json
  {
    "data": {
        "id": "clqanjxnx0000ld607nggq4rw",
        "username": "kibay",
        "email": "kibay182@gmail.com",
        "password": "$2b$10$b/maBtPj6qhALtgl7qmk9uq/Hf8vB9pq97Ov9tStkc9uoDFlq010S",
        "url_profile": "https://www.vhv.rs/dpng/d/471-4710221_do-you-want-a-talkative-whiskas-cat-png.png",
        "createdAt": "2023-12-18T08:26:49.773Z",
        "updatedAt": "2023-12-18T08:35:49.670Z"
    },
    "message": "New password sent to your email."
  }
  ```
  - **Logout**
  <pre>POST /users/logout</pre>
  Response Body:
  ```json
  {
    "message": "Logout successful."
  }
  ```
</details>

<details>
  <summary>History</summary>

  - **Add History**
  <pre>POST /history</pre>
  Request Body:
  ```json
  {
    "image": "Abyssinian.png",
    "breed": "Abyssinian",
    "description": "THIS SLINKY, GRACEFUL CAT IS FULL OF ENERGY AND NEEDS SPACE TO PLAY AND EXPLORE. There are various accounts of the Abyssinian’s history, including the attractive but highly improbable story that it descends from the sacred cats of Ancient Egypt. With its athletic build, aristocratic bearing, and beautiful ticked coat, the Abyssinian is a striking cat with a hint of wild about it. Intelligent and affectionate, Abyssinians make wonderful companions but they like an all-action life.",
    "userId": "clqanjxnx0000ld607nggq4rw"
  }
  ```
  Response Body:
  ```json
  {
    "data": {
        "id": "clqaoo5z60001vrrqt6nk6lvd",
        "image": "Abyssinian.png",
        "breed": "Abyssinian",
        "description": "THIS SLINKY, GRACEFUL CAT IS FULL OF ENERGY AND NEEDS SPACE TO PLAY AND EXPLORE. There are various accounts of the Abyssinian’s history, including the attractive but highly improbable story that it descends from the sacred cats of Ancient Egypt. With its athletic build, aristocratic bearing, and beautiful ticked coat, the Abyssinian is a striking cat with a hint of wild about it. Intelligent and affectionate, Abyssinians make wonderful companions but they like an all-action life.",
        "createdAt": "2023-12-18T08:58:06.786Z",
        "userId": "clqanjxnx0000ld607nggq4rw"
    },
    "message": "History created successfully."
  }
  ```
  - **All Histories**
  <pre>GET /histories/:id</pre>
  Response Body:
  ```json
  {
    "data": [
        {
            "id": "clqaoo5z60001vrrqt6nk6lvd",
            "image": "Abyssinian.png",
            "breed": "Abyssinian",
            "description": "THIS SLINKY, GRACEFUL CAT IS FULL OF ENERGY AND NEEDS SPACE TO PLAY AND EXPLORE. There are various accounts of the Abyssinian’s history, including the attractive but highly improbable story that it descends from the sacred cats of Ancient Egypt. With its athletic build, aristocratic bearing, and beautiful ticked coat, the Abyssinian is a striking cat with a hint of wild about it. Intelligent and affectionate, Abyssinians make wonderful companions but they like an all-action life.",
            "createdAt": "2023-12-18T08:58:06.786Z",
            "userId": "clqanjxnx0000ld607nggq4rw"
        },
        {
            "id": "clqaouzq30003vrrqkvlhc732",
            "image": "American Bobtail.png",
            "breed": "American Bobtail",
            "description": "BIG AND BEAUTIFUL, THIS CAT IS AN EXCELLENT AND HIGHLY ADAPTABLE COMPANION. The breeding of domestic bobtail cats native to the US has been reported several times since about the middle of the 20th century, but so far only this one has been fully recognized. This cat is happy to be among people, without overwhelming them with its attention, and ﬁts in comfortably with any type of household.",
            "createdAt": "2023-12-18T09:03:25.269Z",
            "userId": "clqanjxnx0000ld607nggq4rw"
        }
    ],
    "message": "Histories retrieved successfully."
  }
  ```
  - **History by Id**
  <pre>GET /history/:id</pre>
  Response Body:
  ```json
  {
    "data": {
        "id": "clqaoo5z60001vrrqt6nk6lvd",
        "image": "Abyssinian.png",
        "breed": "Abyssinian",
        "description": "THIS SLINKY, GRACEFUL CAT IS FULL OF ENERGY AND NEEDS SPACE TO PLAY AND EXPLORE. There are various accounts of the Abyssinian’s history, including the attractive but highly improbable story that it descends from the sacred cats of Ancient Egypt. With its athletic build, aristocratic bearing, and beautiful ticked coat, the Abyssinian is a striking cat with a hint of wild about it. Intelligent and affectionate, Abyssinians make wonderful companions but they like an all-action life.",
        "createdAt": "2023-12-18T08:58:06.786Z",
        "userId": "clqanjxnx0000ld607nggq4rw"
    },
    "message": "History retrieved successfully."
  }
  ```
</details>

<details>
  <summary>Shop</summary>

  - **Add Shop**
  <pre>POST /shop</pre>
  Request Body:
  ```json
  {
    "name": "Gudang Pet Store",
    "address": "Jakarta Selatan",
    "url_shop": "https://shopee.co.id/gudangpetstore"
  }
  ```
  Response Body:
  ```json
  {
    "data": {
        "id": "clqaqqcuw000074pjzh173jbe",
        "name": "Gudang Pet Store",
        "address": "Jakarta Selatan",
        "url_shop": "https://shopee.co.id/gudangpetstore"
    },
    "message": "Shop created successfully."
  }
  ```
  - **All Shops**
  <pre>GET /shops/:id</pre>
  Response Body:
  ```json
  {
    "data": [
        {
            "id": "clqaqqcuw000074pjzh173jbe",
            "name": "Gudang Pet Store",
            "address": "Jakarta Selatan",
            "url_shop": "https://shopee.co.id/gudangpetstore"
        },
        {
            "id": "clqaqr6m0000174pj114ec7yu",
            "name": "PetStore",
            "address": "Jakarta Selatan",
            "url_shop": "https://shopee.co.id/petstore_"
        }
    ],
    "message": "Shops retrieved successfully."
  }
  ```
</details>
