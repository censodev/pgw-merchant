import { PayOSRes, WebhookReq } from "~/composables/usePayOS"

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as PayOSRes<WebhookReq>
    console.log('PAYOS WEBHOOK >>', body);
    return {
        success: true
    }
})