export const updateUser = async (body: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return data;
};
