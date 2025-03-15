import { NextRequest} from "next/server";
import axios from "axios";

import { getAccessToken } from "../create/route";


export async function POST(request: NextRequest) {
  const paypal_access_token = await getAccessToken()
  const body = await request.json()
  const approveOrder = await axios.post(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${body?.orderId}/capture`,{},
    
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${paypal_access_token}`,
      },
    }
  ).then((res)=>res.data)
  .catch((error)=>{
    console.error(error)
    return Response.json({ error: "Failed to approve order" }, { status: 500 });
  });
console.log(approveOrder)
return Response.json(approveOrder);
}
