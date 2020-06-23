import * as nodemailer from "nodemailer";
import { string } from "@hapi/joi";

export interface ISendToEmailOptions {
    host: string;
    port: number;
    user: string;
    pass: string;
    secure: boolean;
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}

export const sendToEmail = async (options: ISendToEmailOptions) => {

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: options.host,
        port: options.port,
        secure: options.secure, // true for 465, false for other ports
        auth: {
            user: options.user, // generated ethereal user
            pass: options.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: options.from,
        to: options.to, //"bar@example.com, baz@example.com",
        subject: options.subject,
        text: options.text,
        html: options.html,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
