 Financial Portfolio Tracker

 Setup

1. Clone the repository
2. Install dependencies:
    ```sh
    npm install
    ```
3. Set up PostgreSQL and create the database and table as described above.
4. Create a `.env` file with the following contents:
    ```
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=portfolio_tracker
    DB_HOST=localhost
    DB_PORT=5432
    ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
    ```
5. Start the application:
    ```sh
    node index.js
    ```

## API Endpoints

- `POST /api/portfolio`: Add a stock to the portfolio.
- `GET /api/portfolio`: Retrieve all portfolio entries.
- `GET /api/portfolio/:id`: Retrieve a specific portfolio entry by ID.
- `PUT /api/portfolio/:id`: Update a portfolio entry by ID.
- `DELETE /api/portfolio/:id`: Remove a stock from the portfolio by ID.
