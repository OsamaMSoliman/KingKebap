import Combo from "~/components/SpecialOffers/Combo";

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

export default function ComboMeals() {
  return (
    <>
      <p className="text-center text-6xl font-extrabold my-4">Menü</p>
      {menuItems.map((item, index) => (
        <Combo key={index} id={index + 1} {...item} />
      ))}
    </>
  );
}
