import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import emailConfirmation from "../../../lib/emailTemplates/emailConfirmation"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: true,
  })

  const message = `Dear ${req.body.firstname}, please confirm your email by clicking on the link below.`

  const html = await render(
    emailConfirmation({
      firstname: `${req.body.firstname}`,
      emailConfirmationString: `${req.body.emailConfirmationString}`,
    }),
  )

  console.log(req.body.email)

  const mailData = {
    from: "no-reply@producn.com",
    to: req.body.email,
    subject: "Confirm your email.",
    text: message,
    html: html,
  }

  transporter.sendMail(mailData, (err, info) => {
    if (err) console.log(err)
    else console.log(info)
  })
  res.status(200)
}
