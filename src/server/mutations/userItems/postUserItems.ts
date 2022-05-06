export const createUserItems = async (body: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-items`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return data;
};
