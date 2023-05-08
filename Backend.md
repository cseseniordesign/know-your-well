# Backend

## Overview
* The entire app is served through the Node.js backend.
    * Accomplished by configuring project as Node app, and serving React front-end using [express.static()](https://expressjs.com/en/starter/static-files.html).
* The app by default tries to match the request to an API endpoint using app.get methods if it fails to do this it redirects users to static files served using the method mentioned above.
* Connects to database using Express, and [Node MSSQL](https://www.npmjs.com/package/mssql). 
    * Handles requests from the client app to retrieve, or update information in the DB.