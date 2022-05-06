export const fetchUserItems = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-items`, {
    method: 'GET',
  });
  const data = await res.json();

  return data;
};
