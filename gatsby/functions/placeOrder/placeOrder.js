const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
  <h2>Your recent Order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 20mins.</p>
  <ul>
    ${order
      .map(
        (item) => `<li>
                  <img src="${item.thumbnail}" alt="${item.name}"/>
                  ${item.size} ${item.name} - ${item.price}
                </li>`
      )
      .join('')}
  </ul>
  <p>Your total is <strong>${total}</strong> due at pickup.</p>
  <style>
      ul{
        list-style: none;
      }
  </style>
  </div>`;
}

// use postmark for real email
// ethereal.email to create temporary email
// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  // await wait(5000);
  // validate the data coming in is correct
  const body = JSON.parse(event.body);

  // Check if they have filled out the honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop beep bop zssst goodbye ERROR 234423',
      }),
    };
  }

  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! you are missing ${field} field`,
        }),
      };
    }
  }

  // make sure they actually have items in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?`,
      }),
    };
  }

  // send the email

  // send the success or error message

  // test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log('***info***', info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'success' }),
  };
};
