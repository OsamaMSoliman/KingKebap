// interface IProps {}

// export default function ({}: IProps) {

//   return (
//     <div className="bg-red-700 p-4 rounded-lg">
//       {" "}
//       {/* Main container */}
//       <h2 className="text-white text-2xl font-bold mb-4 text-center">MENÜ</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {" "}
//         {/* Responsive grid */}
//         {menuItems.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-lg shadow-md p-4 flex flex-col"
//           >
//             {" "}
//             {/* Menu item container */}
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-48 object-cover rounded-t-lg mb-2"
//             />{" "}
//             {/* Image */}
//             <div className="flex-grow">
//               {" "}
//               {/* Content container */}
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {item.name}
//               </h3>
//               <p className="text-gray-600 text-sm">{item.description}</p>
//             </div>
//             <div className="mt-auto flex justify-between items-center">
//               {" "}
//               {/* Price and button container */}
//               <span className="text-red-700 font-bold text-xl">
//                 {item.price}
//               </span>
//               <button className="bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-800">
//                 Add to Cart {/* Or any other action */}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

interface IProps {
  id: number;
  image: string;
  name: string;
  price: string;
  description?: string;
}

export default function ({ id, image, name, price, description="+ Pommes + Getränk" }: IProps) {
  return (
    <div className="flex m-4">
      <p
        className="bg-white text-red-500 text-center py-2"
        style={{ writingMode: "sideways-lr" }}
      >
        Menü + {id}
      </p>
      <div className="grow bg-red-700 p-2 flex items-center space-x-4">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div>
          <h3 className="text-white font-bold text-3xl">{name}</h3>
          <p className="text-white">{description}</p>
        </div>
        <span className="text-white font-bold text-3xl ml-auto">{price}</span>
      </div>
    </div>
  );
};

