import { transporter } from '~/.server/transporter';
import type { ICartItem } from '~/stores/CartStore';
import type { ContactInfo } from '~/stores/ContactStore';
import type { Route } from './+types/checkout';

interface CheckoutData extends ContactInfo {
  order: ICartItem[];
}

export async function action({ request }: Route.ActionArgs) {
  // const formData = await request.formData();
  // const { name, email, message } = Object.fromEntries(formData);
  // const data = Object.fromEntries(formData);

  const data = (await request.json()) as CheckoutData;
  console.log('checkout', { data });
  try {
    transporter;
    // await transporter.sendMail({
    //   from: `"Contact Form" <${process.env.EMAIL}>`,
    //   to: process.env.EMAIL,
    //   subject: `Bestellung von ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    //   html: `
    //     <h1>New Contact Form Submission</h1>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //   `,
    // });

    return { ok: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { ok: false, error: 'Failed to send message' };
  }
}
