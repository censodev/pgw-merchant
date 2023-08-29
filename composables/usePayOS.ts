import CryptoJS from 'crypto-js'

export type PayOSRes<TData> = {
    code: string
    desc: string
    data: TData
    signature: string
}

export type PaymentCreateRes = {
    bin: string
    accountNumber: string
    accountName: string
    paymentLinkId: string
    amount: number
    description: string
    orderCode: number
    status: string
    checkoutUrl: string
    qrCode: string
}

export type PaymentCreateReq = {
    orderCode: number
    amount: number
    description: string
    buyerName?: string
    buyerEmail?: string
    buyerPhone?: string
    buyerAddress?: string
    items?: {
        name: string
        quantity: number
        price: number
    }[]
    cancelUrl: string
    returnUrl: string
    signature?: string
}

export default () => {
    const { baseUrl, clientId, apiKey, checksumKey } = useRuntimeConfig().payos
    const authHeaders = {
        'x-client-id': clientId,
        'x-api-key': apiKey,
    }
    function sign(data: any) {
        const stringifyData = Object.keys(data).sort().map(key => `${key}=${data[key]}`).join('&')
        return CryptoJS.HmacSHA256(stringifyData, checksumKey).toString(CryptoJS.enc.Hex)
    }
    function verify(data: any, incomingSignature: string) {
        return sign(data) === incomingSignature
    }
    function createPayment(data: PaymentCreateReq) {
        data.signature = sign(data)
        return useFetch<PayOSRes<PaymentCreateRes>>(`${baseUrl}/v2/payment-requests`, {
            method: 'POST',
            headers: { ...authHeaders },
            body: { ...data },
            onRequest: ({ request, options }) => {
                console.log('REQ HEADERS >>', options.headers);
                console.log('REQ BODY >>', options.body);
            },
            onResponse: ({ request, options, response }) => {
                console.log('RES STATUS >>', response.status);
                console.log('RES HEADERS >>', response.headers);
                console.log('RES BODY >>', response._data);
            },
        })
    }
    return {
        createPayment,
    }
}