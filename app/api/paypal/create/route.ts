import axios from "axios";

import { getAccessToken } from "@/lib/helpers";



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
