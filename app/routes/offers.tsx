import DayOffer from '~/components/SpecialOffers/DayOffer';

export default function Offers() {
  return (
    <>
      <p className="text-center text-6xl font-extrabold my-4">ANGEBOTE</p>
      <DonnerstagAngebot />
      <MontagAngebot />
      <DayOffer
        title="Pizzablech 60x40cm 🍕"
        food="Dein Pizzablech"
        note="mit 3 Zutaten nach Wahl"
        price="30,-"
        to="/#Pizzablech"
      />
    </>
  );
}

export const DonnerstagAngebot = () => (
  <DayOffer
    title="Donnerstag ist Pizzatag"
    food="JEDE PIZZA"
    price="6,00"
    to="/#Pizza 🍕"
  />
);

export const MontagAngebot = () => (
  <DayOffer
    title="Montag ist Dönertag"
    food="DÖNERGERICHTE"
    price="4,50"
    to="/#Taschen Gerichte 🥙"
  />
);
