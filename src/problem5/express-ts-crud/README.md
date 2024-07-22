# ExpressJS TypeScript CRUD API

This is a simple CRUD Web and API built with ExpressJS and TypeScript. It uses MongoDB for data persistence.

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd express-ts-crud
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Config MongoDB:
    setup mongoose in: src/config/db/moongoose

4. Run the application:

    ```bash
    npm start
    ```
## Web
    address:   http://127.0.0.1:3000 
## API Endpoints

- **Create a Course**

    ```
    POST /api/v1/courses
    {
      "name": "Course Name",
      "description": "Course Description",
      "image": "Course Image",
      "level": "Course level "
    }
    ```

- **List Resources**

    ```
    GET /api/v1/courses
    ```

- **Get Resource Details**

    ```
    GET /courses/:id
    ```

- **Update Course**

    ```
    PUT /api/v1/courses/:id
    {
      "name": "Update Course Name",
      "description": "Update Course Description",
      "image": "Update Course Image",
      "level": "Update Course level "
    }
    ```

- **Delete Resource**

    ```
    DELETE /api/v1/courses/:id
    ```

## License

This project is licensed under the MIT License.
