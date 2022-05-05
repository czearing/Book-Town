export const fetchInquiry = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inquiry`);
  const data = await res.json();

  return data;
};
