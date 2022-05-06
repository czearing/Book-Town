export const updateWarehouse = async (body: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/warehouse`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return data;
};
