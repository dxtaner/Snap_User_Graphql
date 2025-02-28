📊 Apollo GraphQL Snap API
==========================

This project is a GraphQL API developed using Apollo Server and Express. It manages user and snap (post) data. MongoDB is used as the database, and JWT (JSON Web Token) is used for user authentication.

📁 Project Structure
--------------------

    ├── graphql
    │   ├── resolvers
    │   │    └── index.js
    │   └── schema.graphql
    ├── models
    │   ├── User.js
    │   └── Snap.js
    ├── .env
    ├── package.json
    └── server.js
    

🚀 Setup and Run
----------------

1.  Clone the repository:
    
                git clone https://github.com/dxtaner/Snap_User_Graphql
                cd Snap_User_Graphql
                
    
2.  Install dependencies:
    
                npm install
                
    
3.  Create a `.env` file and add the required variables:
    
                PORT=4001
                DB\_URI=<MongoDB\_Connection\_URL>
                SECRET\_KEY=<JWT\_Secret\_Key>
                
    
4.  Start the server:
    
                npm start
                
    

The server will run on `http://localhost:4001/graphql`.

📌 Features
-----------

*   GraphQL API with Apollo Server
*   MongoDB connection using Mongoose
*   JWT-based authentication
*   Subscription support for real-time events using PubSub

📊 GraphQL Structure
--------------------

### User Model

*   `username`: User name
*   `email`: Email address
*   `password`: Hashed password

### Snap Model

*   `content`: Snap content
*   `author`: User who created the snap

📚 API Request Examples
-----------------------

### User Registration

    mutation {
      signup(username: "taner", email: "taner@example.com", password: "123456") {
        token
        user {
          id
          username
        }
      }
    }
    

### Create Snap

    mutation {
      createSnap(content: "First Snap!") {
        id
        content
        author {
          username
        }
      }
    }
    

📌 Subscription Example
-----------------------

Listen for real-time snap updates:

    subscription {
      snapAdded {
        id
        content
        author {
          username
        }
      }
    }
    

🛠️ Development
---------------

Use `nodemon` for automatic restarts during development:

    npm install -g nodemon
    nodemon server.js
    

📄 License
----------

This project is licensed under the MIT License.
