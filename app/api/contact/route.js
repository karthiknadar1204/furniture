// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// const user = process.env.EMAIL;
// const pass = process.env.PASSWORD;

// export async function POST(request) {
//   try {
//     const { name, email,subject, message } = await request.json();

//     const transporter = nodemailer.createTransport({
//       service: "zoho",
//       host: "smtp.zoho.in",
//       port: 465,
//       secure: true,
//       auth: {
//         user,
//         pass,
//       },
//     });

//     const mailOptions = {
//       from: user,
//       to: "karthiknadar1204@gmail.com",
//       subject: "New message from your-website",
//       text: `Name: ${name}\nEmail: ${email}\n${subject}\nMessage: ${message}`,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json(
//       { message: "Message sent successfully" },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error(error);
//     return new NextResponse("Failed to send message.", { status: 500 });
//   }
// }







import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const user = process.env.EMAIL;
const pass = process.env.PASSWORD;

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "zoho",
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: user,
      to: "karthiknadar1204@gmail.com",
      subject: `New message from your-website: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to send message.", { status: 500 });
  }
}
