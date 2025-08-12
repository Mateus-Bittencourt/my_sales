import nodemailer from 'nodemailer'
import 'dotenv/config'
import AppError from '@shared/erros/AppError'

interface ISendEmail {
  to: string
  subject: string
  body: string
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email_user,
    pass: process.env.email_pass,
  },
})

export const sendEmail = async ({
  to,
  subject,
  body,
}: ISendEmail): Promise<void> => {
  if (!process.env.email_user || !process.env.email_pass)
    throw new AppError(
      'Email user or password not configured in environment variables'
    )

  const mailOptions = {
    from: process.env.email_user,
    to,
    subject,
    html: body,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error('Error sending email:', error)
    else console.log('Email sent:', info.response)
  })
}
