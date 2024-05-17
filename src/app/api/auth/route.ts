import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const accessToken = res?.access_token;
  if (!accessToken) {
    return Response.json(
      { message: "Can't received token from client" },
      { status: 400 }
    );
  }
  return Response.json(
    { message: "Login successfully" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `accessToken=${accessToken}`,
      },
    }
  );
}
