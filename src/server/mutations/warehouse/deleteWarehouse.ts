export const deleteWarehouse = async (body: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/warehouse`, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return data;
};
