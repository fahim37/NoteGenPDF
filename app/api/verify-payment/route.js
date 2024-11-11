import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const session_id = searchParams.get('session_id')

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id)

        if (session.payment_status === 'paid') {
            const userEmail = session.customer_email
            return NextResponse.json({ success: true, userEmail })
        } else {
            return NextResponse.json({ success: false }, { status: 400 })
        }
    } catch (error) {
        console.error('Error verifying payment session:', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
