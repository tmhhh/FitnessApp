const nodemailer = require("nodemailer");
const emailTemplate = require("./mailTemplate/mailTemplate");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "mail.service.hcmute@gmail.com",
    // user: process.env.SERVICE_EMAIL_ID,
    pass: "yxhdrlgykztnrawp",
  },
});
module.exports = {
  testSendMail: async () => {
    try {
      let info = await transporter.sendMail({
        from: "Fitness Shop", // sender address
        to: "tmhoangs1206@gmail.com", // list of receivers
        subject: "Thanks for your shopping ❤ ", // Subject line
        text: "Order details", // plain text body
        html: `<h1>hello </h1>`,
      });
    } catch (error) {
      console.log({ error });
    }
  },
  billConfirm: async (receiver, bill, billID) => {
    try {
      const imgURL = "https://apiserver-fitnessapp.herokuapp.com/img/products/";

      // console.log(bill.listItems[0]);
      let info = await transporter.sendMail({
        from: "Fitness Shop", // sender address
        to: receiver, // list of receivers
        subject: "Thanks for your shopping ❤ ", // Subject line
        text: "Order details", // plain text body
        html: `
        ${emailTemplate.billConfirm(bill, billID)}
      `, // html body,
        attachments: bill.listItems.map((e) => ({
          filename: e.product.prodThumbnail,
          path: imgURL + e.product.prodThumbnail,
          cid: e.product._id.toString(),
        })),
      });
      return Promise.resolve("Success");
    } catch (error) {
      console.log({ error });
      return Promise.reject(error);
    }
  },
  discountNoti: async (listReceivers, discount) => {
    try {
      const listSendEmail = [];
      for (const user of listReceivers) {
        listSendEmail.push(
          transporter.sendMail({
            from: "Fitness Shop", // sender address
            to: user.userEmail || "tmhoang126@gmail.com", // list of receivers
            subject: " ❤ ", // Subject line
            text: "", // plain text body
            html: `
        ${emailTemplate.discountNoti(
          user.userName,
          discount.vouDiscount,
          discount.vouCode,
          discount.vouExpired
        )}
      `, // html body,
          })
        );
      }
      await Promise.all([...listSendEmail]);
      return Promise.resolve("Success");
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
