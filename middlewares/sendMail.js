 /*
 email →
Ye us insaan ka receiver email address hai jisko mail bhejna hai.
Example: "friend@gmail.com"

subject →
Ye email ka title / heading hoga.
Example: "Your OTP Code"

data →
Ye ek object hai jisme extra details hoti hain jo mail ke andar dikhengi.
Example:

{ name: "Khushi", otp: 123456 }


data.name → receiver ka naam (mail me “Hello Khushi” aayega)

data.otp → OTP number jo mail me show hoga
 
 */

// import dotenv from "dotenv";
// dotenv.config();
// import nodemailer from 'nodemailer';

// const sendMail = async (email, subject, data) => {
//     try {
//         console.log("🔹 Attempting to send email to:", email);
//         console.log("🔹 Gmail configured:", !!process.env.GMAIL);
        
//         if (!process.env.GMAIL || !process.env.PASSWORD) {
//             throw new Error("GMAIL credentials not configured");
//         }
        
//         // const transporter = nodemailer.createTransport({
//         //     service: 'gmail',
//         //     auth: {
//         //         user: process.env.GMAIL,
//         //         pass: process.env.PASSWORD,
//         //     },
//         // });
//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com", // Gmail SMTP server
//             port: 587,              // Use 587 for cloud servers
//             secure: false,          // false for 587
//             auth: {
//                 user: process.env.GMAIL,
//                 pass: process.env.PASSWORD, // 16-char App Password
//             },
//             tls: {
//                 rejectUnauthorized: false // avoids SSL issues on Render
//             }
//         });

        
//         const html = `<h1>OTP Verification</h1><p>Hello ${data.name}, your OTP is: <strong>${data.otp}</strong></p>`;
        
//         const info = await transporter.sendMail({
//             from:process.env.GMAIL,
//             to:email,
//             subject,
//             html,
//         });
        
//         console.log("✅ Email sent successfully:", info.messageId);
//         return info;
        
//     } catch (error) {
//         console.error("❌ Email sending failed:", error.message);
//         throw error;
//     }
// };





// export const sendForgotMail=async(subject,data)=>{
    
//     const transporter=nodemailer.createTransport({
//       host:"smtp.gmail.com",
//       port:587,
//       secure:false,
//       auth:{
//         user:process.env.GMAIL,
//         pass:process.env.PASSWORD
//       },
//       tls:{rejectUnauthorized: false}
//     })
//     const html = `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Reset Your Password</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f3f3f3;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       background-color: #ffffff;
//       padding: 20px;
//       margin: 20px auto;
//       border-radius: 8px;
//       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//       max-width: 600px;
//     }
//     h1 {
//       color: #5a2d82;
//     }
//     p {
//       color: #666666;
//     }
//     .button {
//       display: inline-block;
//       padding: 15px 25px;
//       margin: 20px 0;
//       background-color: #5a2d82;
//       color: white;
//       text-decoration: none;
//       border-radius: 4px;
//       font-size: 16px;
//     }
//     .footer {
//       margin-top: 20px;
//       color: #999999;
//       text-align: center;
//     }
//     .footer a {
//       color: #5a2d82;
//       text-decoration: none;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <h1>Reset Your Password</h1>
//     <p>Hello,</p>
//     <p>You have requested to reset your password. Please click the button below to reset your password.</p>
//     <a href="${process.env.frontendurl}/reset-password/${data.token}" class="button">Reset Password</a>
//     <p>If you did not request this, please ignore this email.</p>
//     <div class="footer">
//       <p>Thank you,<br>Your Website Team</p>
//       <p><a href="https://yourwebsite.com">yourwebsite.com</a></p>
//     </div>
//   </div>
// </body>
// </html>
// `;
//     await transporter.sendMail({
//     from:process.env.GMAIL,
//     to:data.email,  //jisko bhej rhe hai
//     subject,
//     html

// })
    

// }
// export default sendMail;
import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

// initialize resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ================= OTP MAIL =================
const sendMail = async (email, subject, data) => {
  try {
    console.log("🔹 Sending email to:", email);

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // your email
      to: email,
      subject: subject,
      html: `<h1>OTP Verification</h1>
             <p>Hello ${data.name}, your OTP is: <strong>${data.otp}</strong></p>`,
    });

    console.log("✅ Email sent successfully:", response);
    return response;

  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

// ================= FORGOT PASSWORD =================
export const sendForgotMail = async (subject, data) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",   // your email
      to: data.email,
      subject: subject,
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Reset Password</title>
</head>
<body style="font-family: Arial; background:#f3f3f3; padding:20px;">
  <div style="background:white; padding:20px; border-radius:8px;">
    <h2 style="color:#5a2d82;">Reset Your Password</h2>
    <p>You requested to reset your password.</p>
    <a href="${process.env.frontendurlL}/reset-password/${data.token}" 
       style="background:#5a2d82; color:white; padding:10px 20px; text-decoration:none;">
       Reset Password
    </a>
    <p>If not requested, ignore this email.</p>
  </div>
</body>
</html>`
    });

    console.log("✅ Reset email sent:", response);

  } catch (error) {
    console.error("❌ Error:", error);
  }
};

export default sendMail;