import {
  generateBusinessHtmlEmail,
  generateCustomerHtmlEmail,
  generateTextEmail,
} from '~/.server/email-templates';
import { transporter } from '~/.server/transporter';
import type { ICartItem } from '~/stores/CartStore';
import type { ContactInfo } from '~/stores/ContactStore';
import type { Route } from './+types/checkout';

interface CheckoutData extends ContactInfo {
  order: ICartItem[];
}

export async function action({ request }: Route.ActionArgs) {
  const {
    vorname,
    nachname,
    email,
    telefon,
    adresse,
    bemerkungen,
    'wo?': wo,
    order,
  } = (await request.json()) as CheckoutData;

  console.log('Received order:', {
    vorname,
    nachname,
    email,
    telefon,
    adresse,
    bemerkungen,
    'wo?': wo,
    order,
  });

  if (order.length === 0) {
    console.error('Error sending email: Empty order!');
    return { ok: false, error: 'Failed to send order, Empty order!' };
  }

  try {
    // Calculate total
    const total = order
      .reduce((sum, item) => {
        return sum + parseFloat(item.price) * item.quantity;
      }, 0)
      .toFixed(2);

    // Send  email to restaurant
    await transporter.sendMail({
      from: `"Restaurant Orders" <${process.env.EMAIL}>`,
      to: process.env.EMAIL, // or process.env.EMAIL if same
      replyTo: email,
      subject: `Neue Bestellung von ${vorname} ${nachname}`,
      text: generateTextEmail(
        vorname,
        nachname,
        email,
        telefon,
        adresse,
        bemerkungen,
        wo,
        order,
        total
      ),
      html: generateBusinessHtmlEmail(
        vorname,
        nachname,
        email,
        telefon,
        adresse,
        bemerkungen,
        wo,
        order,
        total
      ),
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"Restaurant Name" <${process.env.EMAIL}>`,
      to: email,
      subject: `Ihre Bestellbestätigung`,
      html: generateCustomerHtmlEmail(
        // vorname,
        // nachname,
        // email,
        // telefon,
        // adresse,
        // bemerkungen,
        // wo,
        order,
        total
      ),
    });

    return { ok: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { ok: false, error: 'Failed to send order confirmation' };
  }
}
