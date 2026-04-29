import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { name, email, business, message } = await request.json()

    if (!name || !email) {
      return Response.json({ error: 'Name and email are required' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'SENTIA Website <onboarding@resend.dev>',
      to: ['pawan.ece25@cmrit.ac.in'],  // sent email to yourself for demo requests
      subject: `New demo request from ${name}`,
      html: `
        <h2>New demo request — SENTIA</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Business type:</strong> ${business || 'Not specified'}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }
}