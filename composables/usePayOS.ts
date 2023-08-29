import CryptoJS from 'crypto-js'

export type PayOSRes<TData> = {
    code: '00' | string
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

export type WebhookReq = {
    orderCode: number
    amount: number
    description: string
    accountNumber: string
    reference: string
    transactionDateTime: string
    paymentLinkId: string
    code: '00' | string
    desc: string
    counterAccountBankId: string
    counterAccountBankName: string
    counterAccountName: string
    counterAccountNumber: string
    virtualAccountName: string
    virtualAccountNumber: string
}

export type PaymentInfo = {
    orderCode: number
    amount: number
    amountPaid: number
    amountRemaining: number
    status: string
    createdAt: string
    transactions: {
        amount: number
        description: string
        accountNumber: string
        reference: string
        transactionDateTime: string
        counterAccountBankId: string
        counterAccountBankName: string
        counterAccountName: string
        counterAccountNumber: string
        virtualAccountName: string
        virtualAccountNumber: string
    }[]
}

export type CallbackParams = {
    code: '00' | string
    id: string
    cancel: boolean
    status: 'PAID' | 'PENDING' | 'PROCESSING' | 'CANCELLED'
    orderCode: number
}

export default () => {
    const { baseUrl, clientId, apiKey, checksumKey } = useRuntimeConfig().public.payos
    const authHeaders = {
        'x-client-id': clientId,
        'x-api-key': apiKey,
    }
    function sign(data: any) {
        const stringifyData = Object.keys(data).filter(key => key !== 'signature').sort().map(key => `${key}=${data[key]}`).join('&')
        return CryptoJS.HmacSHA256(stringifyData, checksumKey).toString(CryptoJS.enc.Hex)
    }
    function verifySignature(data: any, incomingSignature: string) {
        return sign(data) === incomingSignature
    }
    function createPayment(data: PaymentCreateReq) {
        data.signature = sign(data)
        return useFetch<PayOSRes<PaymentCreateRes>>(`${baseUrl}/v2/payment-requests`, {
            method: 'POST',
            headers: { ...authHeaders },
            body: { ...data },
            onRequest: ({ options }) => {
                console.log('REQ HEADERS >>', options.headers)
                console.log('REQ BODY >>', options.body)
            },
            onResponse: ({ response }) => {
                console.log('RES STATUS >>', response.status)
                console.log('RES HEADERS >>', response.headers)
                console.log('RES BODY >>', response._data)
            },
        })
    }
    function getPayment(orderCode: number) {
        return useFetch<PayOSRes<PaymentInfo>>(`${baseUrl}/v2/payment-requests/${orderCode}`, {
            headers: { ...authHeaders },
            onResponse: ({ response }) => {
                console.log('RES STATUS >>', response.status)
                console.log('RES HEADERS >>', response.headers)
                console.log('RES BODY >>', response._data)
            },
        })
    }
    return {
        verifySignature,
        createPayment,
        getPayment,
    }
}