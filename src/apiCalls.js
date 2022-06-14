export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
  .then(response => response.json())
  .catch(err => console.error('Error fetching:', err));
}