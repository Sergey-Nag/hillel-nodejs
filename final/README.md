# URL Shortener

Demo: [https://url-shortener-w6ks.onrender.com/](https://url-shortener-w6ks.onrender.com/)

The project is placed in the `/final` folder.

## Start the project

### Prerequisites
- Node.js installed on your machine
- PostgreSQL database installed and running
- Redis server installed and running

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Sergey-Nag/hillel-nodejs
   ```
2. Navigate to the project directory:
   ```bash
   cd final
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:

    [List of the variables](#environment-variables)
   - Specify them in `.env` file in the root directory.
   - Or provide them mannualy before a start command execution.

5. Start Redis server:
   - Ensure Redis is installed on your machine.
   - Start Redis server using the appropriate command for your system. For example:
     ```bash
     redis-server
     ```

6. Run database migrations:
   ```bash
   npm run db:migration
   ```
   > run `db:migration:env` to use env variables from the .env file
7. Run database seed to create an admin:
    ```bash
    npm run db:seed
    ```
    > run `db:seed:env` to use env variables from the .env file
7. Start the server:
   ```bash
   npm start
   ```
   > run `start:env` to use env variables from the .env file


### Usage
- Access the URL shortener application at [http://localhost:3000](http://localhost:3000) in your web browser.
- Shorten URLs and manage them using the provided interface.

## Environment Variables

The following environment variables are used in the project:

- **PORT**: The port on which the server runs. Defaults to 3000 if not specified.
- **HOST**: The host address for the server. Defaults to '127.0.0.1' if not specified.
- **PROTOCOL**: The protocol used by the server. Defaults to 'http' if not specified.
- **SECRET**: A secret key used for password encryption.
- **REDIS_URL**: The URL for the Redis server. Defaults to 'redis://localhost:6379' if not specified.

### Rate limit

- **CODE_RATE_LIMIT_PREFIX**: Prefix for the rate limit key. Defaults to 'code' if not specified.
- **CODE_RATE_LIMIT_ALLOWED_CALLS**: The number of allowed calls within a certain time frame for code-related operations. Defaults to 100 if not specified.
- **CODE_RATE_LIMIT_SECONDS_GAP**: The time frame (in seconds) within which the allowed number of calls is calculated for code-related operations. Defaults to 3600 seconds (1 hour) if not specified.
- **USER_RATE_LIMIT_PREFIX**: Prefix for the rate limit key. Defaults to 'user' if not specified.
- **USER_RATE_LIMIT_ALLOWED_CALLS**: The number of allowed calls within a certain time frame for user-related operations. Defaults to 1000 if not specified.
- **USER_RATE_LIMIT_SECONDS_GAP**: The time frame (in seconds) within which the allowed number of calls is calculated for user-related operations. Defaults to 86400 seconds (24 hours) if not specified.
- **IP_RATE_LIMIT_PREFIX**: Prefix for the rate limit key. Defaults to 'ip' if not specified.
- **IP_RATE_LIMIT_ALLOWED_CALLS**: The number of allowed calls within a certain time frame for IP-related operations. Defaults to 1000 if not specified.
- **IP_RATE_LIMIT_SECONDS_GAP**: The time frame (in seconds) within which the allowed number of calls is calculated for IP-related operations. Defaults to 86400 seconds (24 hours) if not specified.

### Postgress

- **POSTGRESS_USER**: The username for connecting to the PostgreSQL database. Defaults to 'postgres' if not specified.
- **POSTGRESS_HOST**: The host address of the PostgreSQL database. Defaults to 'localhost' if not specified.
- **POSTGRESS_DATABASE**: The name of the PostgreSQL database. Defaults to 'postgres' if not specified.
- **POSTGRESS_PASSWORD**: The password for connecting to the PostgreSQL database. Defaults to 'password' if not specified.
- **POSTGRESS_PORT**: The port on which the PostgreSQL database server is running. Defaults to 5432 if not specified.

### Admin user in the DB

- **ADMIN_PASSWORD**: The password for the admin user. Defaults to 'admin' if not specified.
- **ADMIN_EMAIL**: The email address for the admin user. Defaults to 'admin@admin.aa' if not specified.

### Logger

- **APPENDER**: Output for logs. Defaults to `CONSOLE` if not specified.
    - Supported values: `CONSOLE`, `FILE`, `NETWORK`.
    - Supports multiple appenders. Specify with `,`.
- **LEVEL**: Enumerates different log levels. Defaults to `INFO` if not specified.
    - Supported values: `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`.
- **DELIMETER**: Delimiter used for log entries. Default is `, `.
- **FORMATTER**: Log format. Defaults to `DEFAULT` if not specified.
    - Supported values: `DEFAULT`, `JSON`, `CSV`.
