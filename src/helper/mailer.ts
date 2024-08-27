import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Make token
    //  https://youtu.be/Hmoc9Y8wXVo?list=PLu71SKxNbfoCXO80Z4miZHTL5GxfFbz7A&t=4127
    // uuidv4 Library
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Configure email for usage
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "341c7633961f78", // 🔥 ❌ -> Put these in env variable
        pass: "1c92dbd862d04b", // 🔥 ❌
      },
    });

    const mailOptions = {
      from: '"zaryab@gmail.com',
      to: email,
      subject:
        emailType === "VERFIY" ? "Verify your Email" : "Reset your Password",
      html: `<p>Click here <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"></a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link in your browser <br /></p> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
