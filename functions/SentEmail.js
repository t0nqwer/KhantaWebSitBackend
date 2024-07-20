import nodemailer from "nodemailer";
export const verifyEmail = async (email, token) => {
  console.log(token);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "khwanta.sale@gmail.com",
      pass: "tnjj xmsa zrrh ifui",
    },
  });
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: {
        name: "Khwanta Sale",
        address: "khwanta.sale@gmail.com",
      },
      // sender address
      to: [email], // list of receivers
      subject: "verify email ", // Subject line
      text: "verify email for khwanta ecommerce dashboard", // plain text body
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
        .text {
          color: rgb(0, 0, 0);
          font-size: 20px;
          text-decoration: none;
          text-align: center;
          width: 100%;
        }
        .header {
          background-color: rgb(161, 0, 14);
          padding: 15px 32px;
          color: white;
          font-size: 30px;
          text-decoration: none;
          text-align: center;
        }
        a {
          color: rgb(0, 0, 0);
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div id="buttton" class="button" onclick="">
    
        <p class="header">welcome to khwanta dashboard</p>
        <p class="text">
          <a href="http://localhost:3000/verifyEmail?token=${token}"> Click to Verify your email</a>
        </p>
      </div>
    </body>
    
    </html>`,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};
