export const fetchBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`);
  const data = await res.json();

  return data;
};
