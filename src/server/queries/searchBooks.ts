export const searchBooks = async (bookTitle: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookTitle}`);
  const data = await res.json();

  return data;
};
