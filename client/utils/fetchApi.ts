const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type Method = "GET" | "POST" | "PATCH" | "DELETE";

export default async function fetchApi(
  endpoint: string,
  method: Method,
  options = {},
) {
  try {
    const url = `${SERVER_URL}${endpoint}`;
    console.log("URL HIT ON SERVER IS", url);
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      ...(method !== "GET" && {
        body: JSON.stringify(options),
      }),
    });

    if (!response.ok) {
      console.log("resposne error");
      throw new Error("Request failed");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("some error", error);
    throw error;
  }
}
