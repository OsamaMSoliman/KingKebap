import nodemailer from 'nodemailer';
import type { ActionFunctionArgs } from 'react-router';
import { Form, useActionData } from 'react-router';

// Configure your email transporter
const transporter = nodemailer.createTransport({
  // service: 'gmail', // or your email service
  host: 'smtp.gmail.com',
  port: 587, //465,
  authMethod: 'PLAIN',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { name, email, message } = Object.fromEntries(formData);

  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVING_EMAIL,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return { ok: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { ok: false, error: 'Failed to send message' };
  }
}

export default function ContactPage() {
  const actionData = useActionData<typeof action>();

  console.log(actionData);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Contact Us
      </h1>

      <Form method="post" className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send Message
        </button>
      </Form>

      {actionData?.ok && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
          Your message has been sent successfully!
        </div>
      )}

      {actionData?.error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
          {actionData.error}
        </div>
      )}
    </div>
  );
}
