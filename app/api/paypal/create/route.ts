import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const paypalUrl = "https://api-m.sandbox.paypal.com/v1/oauth2/token";

export async function getAccessToken() {
  const storedToken = cookies().get("paypal_access_token");
  const storedExpiry = cookies().get("paypal_token_expiry");

  if (storedToken && storedExpiry) {
    const expiryTime = Number(storedExpiry.value);
    if (Date.now() < expiryTime) {
      return storedToken.value; // Return existing token if still valid
    }
  }

  const res = await axios
    .post(
      paypalUrl,
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.PAYPAL_CLIENT_ID as string,
          password: process.env.PAYPAL_CLIENT_SECRET as string,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });

  const newAccessToken = res?.access_token;
  const expiresIn = res?.expires_in * 1000;
  const expiryTimestamp = Date.now() + expiresIn;

  // Store new token and expiry time in cookies
  cookies().set("paypal_access_token", newAccessToken, {
    httpOnly: true,
    secure: true,
  });
  cookies().set("paypal_token_expiry", expiryTimestamp.toString(), {
    httpOnly: true,
    secure: true,
  });

  return newAccessToken;
}

export async function POST(request: Request) {
  const paypal_access_token = await getAccessToken()
  
  const createOrder = await axios
    .post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "10.00",
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${paypal_access_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
      return Response.json({ error: "Failed to create order" }, { status: 500 });
    });

  return Response.json(createOrder);
}
