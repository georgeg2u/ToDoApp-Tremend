# ToDoApp-Tremend

This repository contains the solution I made for a Todo Application with NodeJS in order to evaluate my proficiency in RESTful APIs.

## Project Demo

Watch a video demonstration of the project on [YouTube](https://youtu.be/Ek0O7ODP49A).

## System Requirements

- Node.js (v16.18.0)
- MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/georgeg2u/ToDoApp-Tremend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd server
    ```

3. Install dependencies:

    ```bash
    npm install
    ```
    
## Running the Project

Run the project with:
    
    npm start  

## Endpoints

  ### Create a Todo
  
- Endpoint: POST /todos
- Request Body:
{
  "title": "Your Todo Title",
  "description": "Todo description"
}
- Response:
201 Created on success, with the created todo object.
400 Bad Request on invalid input.
409 if todo with the same title already exists.

  ### Retrieve a list of all todos
  
- Endpoint: GET /todos
- Response:
200 OK with an array of all todos.

  ### Retrieve a specific todo by its ID

- Endpoint: GET /todos/:id
- Response:
200 OK with the specific todo object.
404 Not Found if the todo with the given ID does not exist.

  ### Get paged todos

- Endpoint: GET /todos/paged-todos
- Query Parameters:
offset - Number of skipped todos.
limit - Limit of todos numbers.
- Response:
200 OK with the paged todos.
Empty array if the conditions of pagination don't match the number of existing todos.

  ### Update a todo

- Endpoint: PUT /todos/:id
- Request Body:
{
  "title": "Updated Todo Title",
  "description": "Updated description"
}
- Response:
200 OK with the updated todo object.
409 if another todo with the same title already exists.
404 if the todo was not found.

  ### Delete a todo

- Endpoint: DELETE /todos/:id
- Response:
404 Not Found if todo was not found.
200 OK if the todo was deleted successfully.

  ### User Registration

- Endpoint: POST /register
-  Response:
409 Conflict if user with the same name already exists.
201 Created, user created successfully.
400 Bad Request if user credetials are not valid.

  ### User Authentication
- Endpoint: POST /login
- Response:
404 Not found, if user with given credentials does not exist.
401 Unauthorized, if username or password is invalid.
200 Ok, User logged in successfully with authorization token.


