export const deleteOrders = async (body: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return data;
};
