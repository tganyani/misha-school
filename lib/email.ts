import nodemailer from "nodemailer";

// Create the transporter using Gmail's SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // App password (not your real password!)
  },
});
// Function to send a verification email
export async function sendVerificationEmail(email: string, code: string) {
  try {
    const mailOptions = {
      from: `Misha online school <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      text: `Your verification code is: ${code}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Welcome to Misha online school!</h2>
          <p>Your verification code is:</p>
          <h3 style="color: #2e6c80;">${code}</h3>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}
export async function sendLessonFreeTrialEmail(
  email: string,
  subject: string,
  phone: string,
  description: string,
  studEmail: string
) {
  try {
    const mailOptions = {
      from: `Misha online school <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Free trial lesson in ${subject}`,
      text: `Dear Tutor `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
         
           <p>${description}</p>

          <p>Here is my whatsapp number and email<br/>
          <strong>${phone}</strong> <br/><strong>${studEmail}</strong> <br/>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function sendLessonBookEmail(
  email: string,
  subject: string,
  phone: string,
  description: string,
  studEmail: string
) {
  try {
    const mailOptions = {
      from: `Misha online school <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Lesson Booking in ${subject}`,
      text: `Dear Tutor `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
         
           <p>${description}</p>

          <p>Here is my whatsapp number and email<br/>
          <strong>${phone}</strong> <br/><strong>${studEmail}</strong> <br/>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function sendTutorInviteEmail(
  email: string,
  phone: string,
  description: string,
  studEmail: string
) {
  try {
    const mailOptions = {
      from: `Misha online school <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Lesson invitation`,
      text: `Dear Tutor `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
         
           <p>${description}</p>

          <p>Here is my whatsapp number and email<br/>
          <strong>${phone}</strong> <br/><strong>${studEmail}</strong> <br/>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function sendContactUsEmail(email: string, description: string) {
  try {
    const mailOptions = {
      from: `Misha online school <${email}>`,
      to: email,
      subject: `Website client email`,
      text: `Dear Misha `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
         
           <p>${description}</p>

          <p>Here is my email<br/>
          <strong>${email}</strong> <br/>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
