export const fetchWarehouse = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/warehouse`, {
    method: 'GET',
  });
  const data = await res.json();

  return data;
};
