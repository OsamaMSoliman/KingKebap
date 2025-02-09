import DayOffer from "~/components/SpecialOffers/DayOffer";

export default function () {
  return (
    <>
      <p className="text-6xl text-center font-extrabold">ANGEBOTE</p>
      <DayOffer title="Donnerstag ist Pizzatag" food="JEDE PIZZA" price="6,00" />
      <DayOffer title="Montag ist Dönertag" food="DÖNERGERICHTE" price="4,50" />
    </>
  );
}
