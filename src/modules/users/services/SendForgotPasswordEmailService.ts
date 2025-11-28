import AppError from '@shared/erros/AppError'
import { usersRepositories } from '../infra/database/repositories/UsersRepositories'
import { userTokensRepositories } from '../infra/database/repositories/UserTokensRepositories'
import { sendEmail } from '@config/email'

interface IForgotPassword {
  email: string
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await usersRepositories.findByEmail(email)
    if (!user) throw new AppError('User not found', 404)

    const token = await userTokensRepositories.generate(user.id)

    sendEmail({
      to: email,
      subject: 'Password Reset',
      body: `
              <body style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 32px;">
                <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; padding: 32px;">
                  <h2 style="color: #2d7ff9;">Password Reset</h2>
                  <p>Hello, ${user.name}</p>
                  <p>We received a request to reset your password. Use the token below to proceed:</p>
                  <div style="background: #f0f0f0; padding: 16px; border-radius: 4px; font-size: 16px; word-break: break-all; margin: 24px 0; text-align: center;">
                    <strong>${token?.token}</strong>
                  </div>
                  <p>If you did not request this, please ignore this email.</p>
                  <p style="color: #888; font-size: 12px;">My Sales Team</p>
                </div>
              </body>
            `,
    }).catch((error) => {
      console.error('Error sending email:', error)
      throw new AppError(`Error sending email`, 500)
    })
  }
}
