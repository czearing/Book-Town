export const fetchUser = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`);
  const data = await res.json();

  return data;
};
