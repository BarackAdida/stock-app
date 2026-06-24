import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Slider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://yfapi.net/v6/finance/quote/marketSummary',
          headers: { 'x-api-key': apiKey }
        };
        const response = await axios.request(options);
        const result = response.data?.marketSummaryResponse?.result || [];
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiKey]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>No data available</div>;

  // Filter out items that lack required fields
  const validItems = data.filter(item =>
    item.shortName &&
    item.regularMarketPrice &&
    item.regularMarketChange &&
    item.regularMarketChangePercent
  );

  if (!validItems.length) return <div>No valid market data</div>;

  return (
    <div className="slider">
      <div>
        {validItems.map((item, index) => {
          const price = item.regularMarketPrice;
          const change = item.regularMarketChange;
          const changePercent = item.regularMarketChangePercent;
          const isPositive = change.raw > 0;

          return (
            <span className="slider-market-raw" key={index}>
              <span className="slider-name">{item.shortName}</span>
              {' '}
              {price.fmt}
              <span style={{ color: isPositive ? 'green' : 'red' }}>
                {' '}
                {isPositive ? '+' : ''}{change.fmt} ({changePercent.fmt})
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;