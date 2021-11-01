const nodemailer = require("nodemailer");
const emailTemplate = require("./mailTemplate/mailTemplate");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.SERVICE_EMAIL_ID,
    pass: process.env.SERVICE_EMAIL_PASSWORD,
  },
});
module.exports = async (receiver, totalPrice, listItems, shippingFee) => {
  try {
    let info = await transporter.sendMail({
      from: " Fitness Shop", // sender address
      to: receiver, // list of receivers
      subject: "Thanks for your shopping ❤ ", // Subject line
      text: "Order details", // plain text body
      html: `
        ${emailTemplate}
      `, // html body
    });
    return Promise.resolve("Success");
  } catch (error) {
    return Promise.reject(error);
  }
};
// ${listItems.map(
//   (e) =>
//     `<p> Product name:${e.product.prodName} </p><p> Quantity:${e.quantity} </p><p> Price ${e.product.prodPrice} </p>`
// )}
