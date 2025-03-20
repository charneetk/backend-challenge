`nestjs-project`
This project is a basic NestJS service that provides functionality to interact with a MySQL database. It includes API endpoints for inserting/querying the database.

`Prerequisites`
Ensure the following are installed and configured:
    Node.js (version 20.x or higher)
    npm (for managing dependencies)
    MySQL configured with a User and a Database

`Steps to Start Application` 

1. Clone the repository `git clone <repo>`
   
2. Install project dependencies `npm install`

3. Ensure MySQL database is up running and accessible in local machine

4. create a .env file at the root of the project to store the configuration details for MySQL
      DB_PORT=3306
      DB_HOST=localhost
      DB_USER=your_user
      DB_PASSWORD=your_password3
      DB_NAME=your_database_name

5. Run application using npm run start . The application runs on port 3000

6. Once the application is running, you can interact with the API using any HTTP client (e.g., Postman, curl)
    
    API Endpoints:
    
    `Create a node with a specified parent`
      Method: POST
      URL: /node/
      Description: Create a node with a specified parent
      Request Body:
          {
            "name": "HDD",
            "parentNodeId": 27
          }
      Response Format:
      Status: 200 OK
      Body: Returns the created node object


    `Add a new property on a specific existing node`
      Method: POST
      URL: /property/:nodeId
      Description: Add a new property on a specific existing node
      Request Body:
          {
            "name": "Capacity1",
            "value": "5120.00"
          }
      Response Format:
      Status: 200 OK
      Body: Returns the created property object 


    `Get a Node Subtree by Node Path`
      Method: GET
      URL: /node/subtree?nodePath=/root/parent/
      Description: This endpoint returns all nodes that match the given path as a prefix
      Query Parameters:
          nodePath (required) 
      Response Format:
      Status: 200 OK
      Body: Returns an array of node objects that match the provided nodePath      

7. Run Unit Test with command `npm run test`      

   






