import type { ICartItem } from '~/stores/CartStore';

// Helper functions to generate email content
export function generateTextEmail(
  vorname: string,
  nachname: string,
  email: string,
  telefon: string,
  adresse: string,
  bemerkungen: string,
  wo: string | undefined,
  order: ICartItem[],
  total: string
): string {
  let text = `Neue Bestellung erhalten!\n\n`;
  text += `Kunde: ${vorname} ${nachname}\n`;
  text += `Email: ${email}\n`;
  text += `Telefon: ${telefon}\n`;
  text += `Adresse: ${adresse}\n`;
  if (wo) text += `Wo: ${wo}\n`;
  if (bemerkungen) text += `Bemerkungen: ${bemerkungen}\n\n`;

  text += `Bestellung:\n`;
  order.forEach((item) => {
    text += `${item.quantity}x ${item.name} - ${item.price}\n`;
    if (item.options) {
      Object.entries(item.options).forEach(([key, value]) => {
        text += `  - ${key}: ${value}\n`;
      });
    }
    if (item.note) text += `  - Hinweis: ${item.note}\n`;
  });

  text += `\nGesamtbetrag: ${total}€\n`;
  return text;
}

export function generateBusinessHtmlEmail(
  vorname: string,
  nachname: string,
  email: string,
  telefon: string,
  adresse: string,
  bemerkungen: string,
  wo: string | undefined,
  order: ICartItem[],
  total: string
): string {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .order-title { font-size: 20px; margin-bottom: 20px; color: #2c3e50; }
              .order-details { background: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
              .customer-info { margin-bottom: 30px; }
              .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
              .item-name { font-weight: bold; }
              .item-options { font-size: 14px; color: #7f8c8d; margin-top: 5px; }
              .item-note { font-style: italic; color: #7f8c8d; font-size: 14px; }
              .total { font-weight: bold; text-align: right; margin-top: 15px; font-size: 18px; }
          </style>
      </head>
      <body>
          <div class="header">
              <div class="order-title">Neue Bestellung erhalten</div>
          </div>
  
          <div class="customer-info">
              <p><strong>Kunde:</strong> ${vorname} ${nachname}</p>
              <p><strong>Telefon:</strong> ${telefon}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Lieferadresse:</strong> ${adresse}</p>
              ${wo ? `<p><strong>Wo zu finden:</strong> ${wo}</p>` : ''}
              ${bemerkungen ? `<p><strong>Bemerkungen:</strong> ${bemerkungen}</p>` : ''}
          </div>
  
          <div class="order-details">
              <div class="order-items">
                  ${order
                    .map(
                      (item) => `
                  <div class="item">
                      <div class="item-details">
                          <div class="item-name">${item.quantity} × ${item.name}</div>
                          ${
                            item.options
                              ? `
                          <div class="item-options">
                              ${Object.entries(item.options)
                                .map(
                                  ([key, value]) => `
                              ${key}: ${value}<br>
                              `
                                )
                                .join('')}
                          </div>
                          `
                              : ''
                          }
                          ${item.note ? `<div class="item-note">Hinweis: ${item.note}</div>` : ''}
                      </div>
                      <div class="item-price">${item.price}€</div>
                  </div>
                  `
                    )
                    .join('')}
              </div>
              
              <div class="total">
                  Gesamtbetrag: ${total}€
              </div>
          </div>
      </body>
      </html>
    `;
}

export function generateCustomerHtmlEmail(
  //   vorname: string,
  //   nachname: string,
  //   email: string,
  //   telefon: string,
  //   adresse: string,
  //   bemerkungen: string,
  //   wo: string | undefined,
  order: ICartItem[],
  total: string
): string {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .logo { font-size: 24px; font-weight: bold; color: #e74c3c; margin-bottom: 10px; }
              .order-title { font-size: 20px; margin-bottom: 20px; color: #2c3e50; }
              .order-details { background: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
              .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
              .item-name { font-weight: bold; }
              .item-options { font-size: 14px; color: #7f8c8d; margin-top: 5px; }
              .item-note { font-style: italic; color: #7f8c8d; font-size: 14px; }
              .total { font-weight: bold; text-align: right; margin-top: 15px; font-size: 18px; }
              .footer { text-align: center; font-size: 14px; color: #95a5a6; margin-top: 30px; }
          </style>
      </head>
      <body>
          <div class="header">
              <div class="logo">Restaurant Name</div>
              <div class="order-title">Ihre Bestellbestätigung</div>
          </div>
  
          <div class="order-details">
              <div class="order-items">
                  ${order
                    .map(
                      (item) => `
                  <div class="item">
                      <div class="item-details">
                          <div class="item-name">${item.quantity} × ${item.name}</div>
                          ${
                            item.options
                              ? `
                          <div class="item-options">
                              ${Object.entries(item.options)
                                .map(
                                  ([key, value]) => `
                              ${key}: ${value}<br>
                              `
                                )
                                .join('')}
                          </div>
                          `
                              : ''
                          }
                          ${item.note ? `<div class="item-note">Hinweis: ${item.note}</div>` : ''}
                      </div>
                      <div class="item-price">${item.price}€</div>
                  </div>
                  `
                    )
                    .join('')}
              </div>
              
              <div class="total">
                  Gesamtbetrag: ${total}€
              </div>
          </div>
  
          <div class="footer">
              Vielen Dank für Ihre Bestellung! Wir bereiten Ihr Essen jetzt zu.
          </div>
      </body>
      </html>
    `;
}
