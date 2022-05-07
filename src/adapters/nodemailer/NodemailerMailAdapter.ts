import { MailAdapter, SendMailData } from "../MailAdapter"
import nodemailer from "nodemailer"

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "99f54b9043110c",
    pass: "1648e89c1f5e45",
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData): Promise<void> {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Ricardo Rodrigues <ricardor662@gmail.com>",
      subject,
      html: body,
    })
  }
}
