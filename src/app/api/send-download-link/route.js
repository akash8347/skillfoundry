// export async function POST(req) {
//   try {
//     const { email, name, hasPythonAccess, hasJavaScriptAccess } = await req.json();
//     const pythonLink = "https://drive.google.com/drive/folders/18hG0Omuwj8Se1xJQuDYtvPdhEEY44qt3?usp=sharing";
//     const jsLink = "https://drive.google.com/drive/folders/1veiv54vM5rqb-YSgSZXw-YMBuOYIIGyV?usp=sharing";

//     let contentParts = [];

//     if (hasPythonAccess) {
//       contentParts.push(`<li><a href="${pythonLink}">Download Python Course Materials</a></li>`);
//     }
//     if (hasJavaScriptAccess) {
//       contentParts.push(`<li><a href="${jsLink}">Download JavaScript Course Materials</a></li>`);
//     }

//     const htmlDownloadSection =
//       contentParts.length > 0
//         ? `<ul>${contentParts.join("")}</ul>`
//         : "<p>You currently have no active course downloads.</p>";

//     const response = await fetch("https://api.brevo.com/v3/smtp/email", {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "api-key": process.env.BREVO_API_KEY,
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         sender: { name: "Skill Foundry", email: "akashgohil.av@gmail.com" },
//         to: [{ email }],
//         subject: "Your Skill Foundry Download Links",
//         htmlContent: `
//         <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 32px; background-color: #f9fafb; color: #333;">
//     <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); padding: 32px;">
//       <h2 style="color: #1f2937;">👋 Hello ${name || "there"},</h2>
//       <p style="font-size: 16px; line-height: 1.6;">
//         Thank you for purchasing a course from <strong>Skill Foundry</strong>! Below you'll find the download links for the material(s) you have access to.
//       </p>

//       ${contentParts.length > 0 ? `
//         <ul style="padding-left: 20px; margin-top: 24px; font-size: 16px; line-height: 1.6;">
//           ${contentParts.join("")}
//         </ul>
//       ` : `
//         <p style="margin-top: 24px;">It looks like you don't currently have any active course access. If this seems incorrect, please contact support.</p>
//       `}

//       <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
//         <p>This email was sent by Skill Foundry, Surat, IN.</p>
//         <p>If you have any issues accessing your materials, simply reply to this email or reach out to our support team.</p>
//       </div>
//     </div>
//   </div>
//         `,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("Email send error:", data);
//       return Response.json({ error: "Failed to send email." }, { status: 500 });
//     }
    

//     return Response.json({ success: true });
//   } catch (error) {
//     console.error("API error:", error);
//     return Response.json(
//       { error: "An error occurred. Please try again later." },
//       { status: 500 }
//     );
//   }
// }


import nodemailer from "nodemailer";

export async function POST(req) {

  try {
    const { email, name, hasPythonAccess, hasJavaScriptAccess } = await req.json();

    const pythonLink = "https://drive.google.com/drive/folders/18hG0Omuwj8Se1xJQuDYtvPdhEEY44qt3?usp=sharing";
    const jsLink = "https://drive.google.com/drive/folders/1veiv54vM5rqb-YSgSZXw-YMBuOYIIGyV?usp=sharing";

    let contentParts = [];

    if (hasPythonAccess) {
      contentParts.push(`<li><a href="${pythonLink}">Download Python Course Materials</a></li>`);
    }
    if (hasJavaScriptAccess) {
      contentParts.push(`<li><a href="${jsLink}">Download JavaScript Course Materials</a></li>`);
    }

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 32px; background-color: #f9fafb; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); padding: 32px;">
          <h2 style="color: #1f2937;">👋 Hello ${name || "there"},</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for purchasing a course from <strong>Skill Foundry</strong>! Below you'll find the download links for the material(s) you have access to.
          </p>
          ${
            contentParts.length > 0
              ? `<ul style="padding-left: 20px; margin-top: 24px; font-size: 16px; line-height: 1.6;">${contentParts.join("")}</ul>`
              : `<p style="margin-top: 24px;">It looks like you don't currently have any active course access. If this seems incorrect, please contact support.</p>`
          }
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <p>This email was sent by Skill Foundry.</p>
            <p>If you have any issues accessing your materials, simply reply to this email or reach out to our support team.</p>
          </div>
        </div>
      </div>
    `;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or another service, e.g., "Outlook", "Yahoo", or use 'host', 'port', and 'secure' if custom SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    const mailOptions = {
      from: `"Skill Foundry" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your 30 days Mastery Course Download Links",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "An error occurred. Please try again later." }, { status: 500 });
  }
}

