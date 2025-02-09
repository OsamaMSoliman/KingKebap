import DayOffer from "~/components/SpecialOffers/DayOffer";
import Menue from "~/components/SpecialOffers/Menue";
import Pizzablech from "~/components/SpecialOffers/Pizzablech";

export default function () {
  const menuItems = [
    {
      name: "Dönertasche",
      price: "10,00",
      image: "/path/to/donertasche.jpg", // Replace with actual path
    },
    {
      name: "Lahmacun-Döner",
      price: "11,00",
      image: "/path/to/lahmacun_doner.jpg", // Replace with actual path
    },
    {
      name: "Dürüm Döner",
      price: "10,50",
      image: "/path/to/durum_doner.jpg", // Replace with actual path
    },
    {
      name: "Sucuk Tasche",
      price: "10,00",
      image: "/path/to/sucuk_tasche.jpg", // Replace with actual path
    },
  ];

  return (
    <>
      <p className="text-6xl text-center font-extrabold">ANGEBOTE</p>
      <DayOffer
        title="Donnerstag ist Pizzatag"
        food="JEDE PIZZA"
        price="6,00"
      />
      <DayOffer title="Montag ist Dönertag" food="DÖNERGERICHTE" price="4,50" />

      <Pizzablech />

      {menuItems.map((item, index) => (
        <Menue
          key={index}
          id={index + 1}
          {...item}
        />
      ))}
    </>
  );
}
