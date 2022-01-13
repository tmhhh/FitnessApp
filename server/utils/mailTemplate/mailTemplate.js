const { calSubTotal, calTotalPrice } = require("../../utils/cartUtils");
module.exports = {
  billConfirm: (bill, billID) => {
    const imgURL = "https://apiserver-fitnessapp.herokuapp.com/img/products/";
    today = new Date();
    estimatedDate = new Date(today.getTime() + 36 * 60 * 60 * 1000);

    return `
  <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them.
      </div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
              <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="left" valign="top" style="font-size:0; padding: 35px;" bgcolor="#333">
                              <div style="display:block;; min-width:100px; vertical-align:top; width:100%;">
                                  <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                      <tr>
                                          <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                              <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">HHT</h1>
                                          </td>
                                      </tr>
                                  </table>
                              </div>
                              
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                  <tr>
                                      <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                                          <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> Thank You For Your Order! </h2>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                          <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium iste ipsa numquam odio dolores, nam. </p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="left" style="padding-top: 20px;">
                                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                              <tr>
                                                  <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> Order Confirmation # </td>
                                                  <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> #${billID.toString()} </td>
                                              </tr>
                                              <tr>
                                                  <td width="75%" align="left" style="color: #333;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; line-height: 24px; padding: 15px 10px 5px 10px;"> Purchased Item (${
                                                    bill.listItems.length
                                                  })
                                                </td>
                                                  <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; line-height: 24px; padding: 15px 10px 5px 10px; border-bottom: 1px solid black;"> $${calSubTotal(
                                                    bill.listItems
                                                  )} </td>
                                              </tr>
                                              ${bill.listItems.map(
                                                (e) =>
                                                  `<tr>
                                                   <td style="align-items:center; margin-left: 20px; padding: 15px 5px 10px 5px; display: flex; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600;color: #333; line-height: 24px">
                                                  <img alt="Logo" title="Logo" style="" heigh="30" width="50" src="
                                                    cid:${e.product._id.toString()}
                                                  "/>${e.product.prodName}
                                                   </td>
                                                   <td style= "padding: 15px 10px 5px
                                                   ;font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 24px;">
                                                $${
                                                  e.product.prodPrice *
                                                  (new Date(
                                                    e.product.prodDiscount?.startDate
                                                  ).getTime() -
                                                    new Date().getTime() <
                                                  0
                                                    ? 1 -
                                                      (e.product.prodDiscount
                                                        ?.discountPercent ||
                                                        0) /
                                                        100
                                                    : 1)
                                                } x(${e.quantity})</td>
                                                </tr>`
                                              )}
                                               <tr>
                                                  <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700;color: #333; line-height: 24px; padding: 5px 10px;"> Shipping  </td>
                                                  <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; line-height: 24px; padding: 5px 10px;"> $${
                                                    bill.price.shippingFee
                                                  } </td>
                                              </tr>
                                              <tr>
                                                  <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700;color: #333; line-height: 24px; padding: 5px 10px;"> Discount </td>
                                                  <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; line-height: 24px; padding: 5px 10px;"> ${
                                                    bill.price.discount
                                                  }% </td>
                                              </tr>
                                              <tr>
                                                  <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700;color: #333; line-height: 24px; padding: 5px 10px;"> Payment Method </td>
                                                  <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; line-height: 24px; padding: 5px 10px;"> ${
                                                    bill.payment.method
                                                  } </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="left" style="padding-top: 20px;">
                                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                              <tr>
                                                  <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> TOTAL </td>
                                                  <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> $${bill.price.totalPrice.toFixed(
                                                    2
                                                  )} </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                        <td align="center" style=" padding: 35px; background-color: #ff7361;" bgcolor="#1b9ba3">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                    <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                        <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;"> Get 30% off your next order. </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 25px 0 15px 0;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7"> <a href="localhost://localhost:3000/shopping" target="_blank" style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #F44336; padding: 15px 30px; border: 1px solid #F44336; display: block;">Shop Again</a> </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>`;
  },
  discountNoti: (
    name,
    discountValue,
    discountCode,
    expired
  ) => `<body style="background-color:#fff;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none">
  <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
      style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff">
      <tbody>
          <tr>
              <td>
                  <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                      role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#eae3dd">
                      <tbody>
                          <tr>
                              <td>

                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                      role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#eae3dd">
                      <tbody>
                          <tr>
                              <td>
                                  <table class="row-content stack" align="center" border="0" cellpadding="0"
                                      cellspacing="0" role="presentation"
                                      style="mso-table-lspace:0;mso-table-rspace:0;background-color:#892c63;color:#000"
                                      width="600">
                                      <tbody>
                                          <tr>
                                              <th class="column" width="100%"
                                                  style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                  <table class="image_block" width="100%" border="0" cellpadding="0"
                                                      cellspacing="0" role="presentation"
                                                      style="mso-table-lspace:0;mso-table-rspace:0">
                                                      <tr>
                                                          <td
                                                              style="padding-top:20px;width:100%;padding-right:0;padding-left:0">
                                                              <div align="center" style="line-height:10px"><img
                                                                      class="big"
                                                                      src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/69/Coupon_header.png"
                                                                      style="display:block;height:auto;border:0;width:600px;max-width:100%"
                                                                      width="600" alt="Image" title="Image"></div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                                  <table class="button_block" width="100%" border="0" cellpadding="0"
                                                      cellspacing="0" role="presentation"
                                                      style="mso-table-lspace:0;mso-table-rspace:0">
                                                      <tr>
                                                          <td style="padding-bottom:30px;text-align:center">
                                                              <div align="center">
                                                                  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:52px;width:195px;v-text-anchor:middle;" arcsize="0%" stroke="false" fillcolor="#FFFFFF"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#892C63; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                                                  <div
                                                                      style="text-decoration:none;display:inline-block;color:#892c63;background-color:#fff;border-radius:0;width:auto;border-top:1px solid #fff;border-right:1px solid #fff;border-bottom:1px solid #fff;border-left:1px solid #fff;padding-top:10px;padding-bottom:10px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all">
                                                                      <a href="http://localhost:4000"
                                                                          style="text-decoration:none;color:black;padding-left:25px;padding-right:25px;font-size:16px;display:inline-block;letter-spacing:normal;font-weight:700"><span
                                                                              style="font-size:16px;line-height:2;word-break:break-word;mso-line-height-alt:32px"><span
                                                                                  style="cursor:pointer;font-size:16px;line-height:32px"
                                                                                  data-mce-style="font-size: 16px; line-height: 32px;">VISIT
                                                                                  OUR WEBSITE</span></span></a>
                                                                  </div>
                                                                  <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </th>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                      role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#eae3dd">
                      <tbody>
                          <tr>
                              <td>
                                  <table class="row-content stack" align="center" border="0" cellpadding="0"
                                      cellspacing="0" role="presentation"
                                      style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ededed;color:#333"
                                      width="600">
                                      <tbody>
                                          <tr>
                                              <th class="column" width="33.333333333333336%"
                                                  style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-left:10px;padding-right:10px;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                  <table class="image_block" width="100%" border="0" cellpadding="0"
                                                      cellspacing="0" role="presentation"
                                                      style="mso-table-lspace:0;mso-table-rspace:0">
                                                      <tr>
                                                          <td
                                                              style="width:100%;padding-right:0;padding-left:0;padding-top:15px;padding-bottom:15px">
                                                              <div align="center" style="line-height:10px"><img
                                                                      src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/69/247support(0).jpg"
                                                                      style="display:block;height:auto;border:0;width:180px;max-width:100%"
                                                                      width="180" alt="Image" title="Image"></div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </th>
                                              <th class="column" width="33.333333333333336%"
                                                  style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-left:10px;padding-right:10px;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                  <table class="image_block" width="100%" border="0" cellpadding="0"
                                                      cellspacing="0" role="presentation"
                                                      style="mso-table-lspace:0;mso-table-rspace:0">
                                                      <tr>
                                                          <td
                                                              style="width:100%;padding-right:0;padding-left:0;padding-top:15px;padding-bottom:15px">
                                                              <div align="center" style="line-height:10px"><img
                                                                      src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/69/freedelivery(1).jpg"
                                                                      style="display:block;height:auto;border:0;width:180px;max-width:100%"
                                                                      width="180" alt="Image" title="Image"></div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </th>
                                              <th class="column" width="33.333333333333336%"
                                                  style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-left:10px;padding-right:10px;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                  <table class="image_block" width="100%" border="0" cellpadding="0"
                                                      cellspacing="0" role="presentation"
                                                      style="mso-table-lspace:0;mso-table-rspace:0">
                                                      <tr>
                                                          <td
                                                              style="width:100%;padding-right:0;padding-left:0;padding-top:15px;padding-bottom:15px">
                                                              <div align="center" style="line-height:10px"><img
                                                                      src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/69/todaysdeal(0).jpg"
                                                                      style="display:block;height:auto;border:0;width:180px;max-width:100%"
                                                                      width="180" alt="Image" title="Image"></div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </th>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                      role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#eae3dd">
                      <tbody>
                          <tr>
                              <td>
                                  <table class="row-content stack" align="center" border="0" cellpadding="0"
                                      cellspacing="0" role="presentation"
                                      style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;color:#333"
                                      width="600">
                                      <tbody>
                                          <tr>
                                              <th class="column" width="100%"
                                                  style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                  <table class="text_block" width="100%" border="0" cellpadding="0"
                                                      cellspacing="0" role="presentation"
                                                      style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                      <tr>
                                                          <td
                                                              style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:20px">
                                                              <div style="font-family:sans-serif">
                                                                  <div
                                                                      style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:14.399999999999999px;color:#892c63;line-height:1.2">
                                                                      <p style="margin:0;font-size:18px"><strong><span
                                                                                  style="font-size:14px">Hello
                                                                                  ${name},

                                                                              </span></strong></p>
                                                                  </div>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                                  <table class="text_block" width="100%" border="0" cellpadding="0"
                                                      cellspacing="0" role="presentation"
                                                      style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                      <tr>
                                                          <td
                                                              style="padding-bottom:20px;padding-left:20px;padding-right:20px">
                                                              <div style="font-family:sans-serif">
                                                                  <div
                                                                      style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:18px;color:#555;line-height:1.5">
                                                                      <p
                                                                          style="margin:0;font-size:12px;mso-line-height-alt:21px">
                                                                          <span style="font-size:14px">We’re so happy
                                                                              to have you on board! As a thank you,
                                                                              we’ve got a special <span style="font-weight:700">${discountValue}%</span>
                                                                              discount for
                                                                              you. Use <span style="font-weight:700"> ${discountCode}. </span>
                                                                              The offer is valid until <span style="font-weight:700">${expired.toLocaleDateString()}</span> and
                                                                              limited !!! Hope
                                                                              you’ll enjoy it!

                                                                          </span>

                                                                          <p style="font-size:16px;font-weight:700">Best,HHT.</p>
                                                                      </p>
                                                                  </div>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </th>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                      role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#eae3dd">
                      <tbody>
                          <tr>
                              <td>
                                  <table class="row-content stack" align="center" border="0" cellpadding="0"
                                      cellspacing="0" role="presentation"
                                      style="mso-table-lspace:0;mso-table-rspace:0;background-color:#eae3dd;color:#000"
                                      width="600">
                                      <tbody>
                                          <tr>
                                              <th class="column" width="100%"
                                                  style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                  <table class="divider_block" width="100%" border="0"
                                                      cellpadding="10" cellspacing="0" role="presentation"
                                                      style="mso-table-lspace:0;mso-table-rspace:0">
                                                      <tr>
                                                          <td>
                                                              <div align="center">
                                                                  <table border="0" cellpadding="0" cellspacing="0"
                                                                      role="presentation" width="100%"
                                                                      style="mso-table-lspace:0;mso-table-rspace:0">
                                                                      <tr>
                                                                          <td class="divider_inner"
                                                                              style="font-size:1px;line-height:1px;border-top:0 solid #bbb">
                                                                              <span>&#8202;</span>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                                  <table class="social_block" width="100%" border="0" cellpadding="0"
                                                      cellspacing="0" role="presentation"
                                                      style="mso-table-lspace:0;mso-table-rspace:0">
                                                      <tr>
                                                          <td
                                                              style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:10px;text-align:center">
                                                              <table class="social-table" width="126px" border="0"
                                                                  cellpadding="0" cellspacing="0" role="presentation"
                                                                  align="center"
                                                                  style="mso-table-lspace:0;mso-table-rspace:0">
                                                                  <tr>
                                                                      <td style="padding:0 10px 0 0"><a
                                                                              href="https://www.facebook.com/"
                                                                              target="_blank"><img
                                                                                  src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/facebook.png"
                                                                                  width="32" height="32"
                                                                                  alt="Facebook" title="Facebook"
                                                                                  style="display:block;height:auto;border:0"></a>
                                                                      </td>
                                                                      <td style="padding:0 10px 0 0"><a
                                                                              href="http://twitter.com/"
                                                                              target="_blank"><img
                                                                                  src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/twitter.png"
                                                                                  width="32" height="32" alt="Twitter"
                                                                                  title="Twitter"
                                                                                  style="display:block;height:auto;border:0"></a>
                                                                      </td>
                                                                      <td style="padding:0 10px 0 0"><a
                                                                              href="http://plus.google.com/"
                                                                              target="_blank"><img
                                                                                  src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/googleplus.png"
                                                                                  width="32" height="32" alt="Google+"
                                                                                  title="Google+"
                                                                                  style="display:block;height:auto;border:0"></a>
                                                                      </td>
                                                                  </tr>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </th>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                      role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                      <tbody>
                          <tr>
                              <td>
                                  <table class="row-content stack" align="center" border="0" cellpadding="0"
                                      cellspacing="0" role="presentation"
                                      style="mso-table-lspace:0;mso-table-rspace:0;color:#000" width="600">
                                      <tbody>
                                          <tr>
                                              <th class="column" width="100%"
                                                  style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0">

                                              </th>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
      </tbody>
  </table><!-- End -->
</body>

</html>`,
};
