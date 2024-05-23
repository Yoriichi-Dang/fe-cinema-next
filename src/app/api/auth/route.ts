import { cookies } from "next/headers";

export function isExpired(expiresTokenDate: string | undefined): boolean {
  if (!expiresTokenDate) {
    return true; // Nếu không có expiresTokenDate thì token đã hết hạn
  }
  const currentDate = new Date();
  const expiresDate = new Date(expiresTokenDate);

  // So sánh currentDate và expiresDate
  return currentDate > expiresDate;
}

export async function POST(request: Request) {
  const res = await request.json();
  const accessToken = res?.access_token;
  const expiresToken = res?.expires_in;
  const date = new Date();
  date.setSeconds(date.getSeconds() + expiresToken);
  if (!accessToken) {
    return Response.json(
      { message: "Can't received token from client" },
      { status: 400 }
    );
  }
  return Response.json(
    { accessToken, date },
    {
      status: 200,
      headers: {
        "Set-Cookie": [
          `accessToken=${accessToken}; Path=/; HttpOnly;`,
          `expiresTokenDate=${date}; Path=/; HttpOnly;`,
        ].join(", "),
      },
    }
  );
}
