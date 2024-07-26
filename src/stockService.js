const axios = require('axios');

const API_KEY = 'KXYND3BAKSBB2RPZ'; // Replace with your API key

const getStockPrice = async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${API_KEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data['Time Series (1min)'];
        const latestTimestamp = Object.keys(data)[0];
        const latestPrice = data[latestTimestamp]['1. open'];
        return parseFloat(latestPrice);
    } catch (error) {
        throw new Error('Error fetching stock price');
    }
};

module.exports = { getStockPrice };