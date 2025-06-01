// export async function POST(req) {
//     try {
//         const { email, mobile } = await req.json();
//         console.log("email:" + email + "mobile: " + mobile);

//         const htmlMessage = `
//   <div style="font-family: Arial, sans-serif; padding: 20px;">
//     <h2 style="color: #333;">🛒 New Checkout Activity</h2>
//     <p>A user just filled out the checkout form. Here are the details:</p>
//     <ul style="list-style: none; padding: 0;">
//       <li><strong>Email:</strong> ${email}</li>
//       <li><strong>Mobile:</strong> ${mobile}</li>
//     </ul>
//     <p style="margin-top: 20px;">Go get them! 🚀</p>
//   </div>
// `;


//         const response = await fetch("https://api.brevo.com/v3/smtp/email", {
//             method: "POST",
//             headers: {
//                 accept: "application/json",
//                 "api-key": process.env.BREVO_API_KEY,
//                 "content-type": "application/json",
//             },
//             body: JSON.stringify({
//                 sender: { name: "from Akash", email: "akashgohil.av@gmail.com" },
//                 to: [{ email: "akashgohil.av@gmail.com" }],
//                 // subject: "Potential Customer Loading... ",
//                 subject: `New Lead: ${email || 'Customer'} just filled checkout`,
//                 htmlContent: htmlMessage,
//             }),

//         });

//         const data = await response.json();

//         if (!response.ok) {
//             console.error("Email send error:", data);
//             return Response.json({ error: "Failed to send email." }, { status: 500 });
//         }


//         return Response.json({ success: true });
//     } catch (error) {
//         console.error("API error:", error);
//         return Response.json(
//             { error: "An error occurred. Please try again later." },
//             { status: 500 }
//         );
//     }
// }



import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, mobile } = await req.json();

    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">🛒 New Checkout Activity</h2>
        <p>A user just filled out the checkout form. Here are the details:</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Mobile:</strong> ${mobile}</li>
        </ul>
        <p style="margin-top: 20px;">Go get them! 🚀</p>
      </div>
    `;

    // Configure your SMTP transporter (using Gmail as example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // e.g., "youremail@gmail.com"
        pass: process.env.EMAIL_PASS, // App password or real password (use env vars)
      },
    });

    const mailOptions = {
      from: `"from Akash" <${process.env.EMAIL_USER}>`,
      to: "akashgohil.av@gmail.com",
      subject: `New Lead: ${email || 'Customer'} just filled checkout`,
      html: htmlMessage,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });

  } catch (error) {
    console.error("Nodemailer error:", error);
    return Response.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

