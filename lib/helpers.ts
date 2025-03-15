import axios from "axios";
import { cookies } from "next/headers";
import qs from "qs";


const paypalUrl = "https://api-m.sandbox.paypal.com/v1/oauth2/token";

const ZOOM_TOKEN_URL = "https://zoom.us/oauth/token";

export const getZoomAccessToken = async () => {
  const storedToken = cookies().get("zoom_access_token")?.value;
  const storedExpiry = cookies().get("zoom_token_expiry")?.value;
  const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds

  // Check if token exists and is still valid
  if (storedToken && storedExpiry && parseInt(storedExpiry) > now) {
    return storedToken;
  }

  try {
    //  Token expired or missing → Fetch a new one
    const response = await axios.post(
      ZOOM_TOKEN_URL,
      qs.stringify({
        grant_type: "account_credentials",
        account_id: process.env.ZOOM_ACCOUNT_ID,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = response.data;
    const expiryTime = now + expires_in; // Calculate expiry timestamp
    cookies().set("zoom_access_token", access_token, {
      httpOnly: true,
      secure: true,
      maxAge: expires_in, // Set expiration in seconds
      // path: "/",
    });

    cookies().set("zoom_token_expiry", expiryTime.toString(), {
      httpOnly: true,
      secure: true,
      maxAge: expires_in,
      // path: "/",
    });

    return access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

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
            username: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
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


 