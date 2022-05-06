export const fetchOrders = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
    method: 'GET',
  });
  const data = await res.json();

  return data;
};
