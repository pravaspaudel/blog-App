export async function serverFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`, {
    cache: "no-store",
  });

  let data;

  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid JSON response");
  }

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch");
  }

  return data;
}
