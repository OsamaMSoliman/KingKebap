import DayOffer from "~/components/SpecialOffers/DayOffer";
import Pizzablech from "~/components/SpecialOffers/Pizzablech";
import Combo from "~/components/SpecialOffers/Combo";

export default function () {
  const menuItems = [
    {
      name: "Dönertasche",
      price: "10,00",
      image: "", // Replace with actual path
    },
    {
      name: "Lahmacun-Döner",
      price: "11,00",
      image: "", // Replace with actual path
    },
    {
      name: "Dürüm Döner",
      price: "10,50",
      image: "", // Replace with actual path
    },
    {
      name: "Sucuk Tasche",
      price: "10,00",
      image: "", // Replace with actual path
    },
  ];

  return (
    <>
      <p className="text-center text-6xl font-extrabold">ANGEBOTE</p>
      <DayOffer
        title="Donnerstag ist Pizzatag"
        food="JEDE PIZZA"
        price="6,00"
      />
      <DayOffer title="Montag ist Dönertag" food="DÖNERGERICHTE" price="4,50" />

      <Pizzablech />

      <p className="text-center text-6xl font-extrabold">Menü</p>
      {menuItems.map((item, index) => (
        <Combo key={index} id={index + 1} {...item} />
      ))}
    </>
  );
}
