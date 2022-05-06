export const fetchUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: 'GET',
  });
  const data = await res.json();

  return data;
};
