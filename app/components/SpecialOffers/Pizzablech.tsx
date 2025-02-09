interface IProps {}

export default function ({}: IProps) {
  return (
    <div className="bg-white p-4 m-4 flex">
      <p className="text-red-500 font-bold text-5xl">Pizzablech 60x40cm</p>

      <div className="grow flex-col space-y-2 ml-16">
        <div className="flex items-center">
          <div
            className="w-0"
            style={{
              borderLeft: "2em solid white",
              borderBottom: "2.5em solid var(--color-red-500)",
            }}
          />
          <p className="flex-1 bg-red-500 font-bold text-4xl">
            25,-
            <span className="text-black text-xl ml-4">
              Basisbelag + 3€ pro Belag
            </span>
          </p>
        </div>

        <div className="flex items-center">
          <div
            className="w-0"
            style={{
              borderLeft: "2em solid white",
              borderBottom: "2.5em solid var(--color-red-500)",
            }}
          />
          <p className="flex-1 bg-red-500 font-bold text-4xl">
            30,-
            <span className="text-black text-xl ml-4">
              mit 3 Zutaten nach Wahl
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// export default function ({}: IProps) {
//   return (
//     <div className="bg-white p-4 m-4">
//       <p className="text-red-500 font-bold text-4xl">Pizzablech 60x40cm</p>

//       <div className="flex items-center">
//         <p className="flex-3 ml-16 text-black font-bold text-2xl">mit 3 Zutaten nach Wahl</p>
//         <div
//           className="w-0"
//           style={{
//             borderLeft: "2em solid white",
//             borderBottom: "2.25em solid var(--color-red-500)",
//           }}
//         />
//         <p className="flex-1 bg-red-500 font-bold text-3xl">
//           30,-
//         </p>
//       </div>

//       <div className="flex items-center">
//         <p className="flex-3 ml-16 text-black font-bold text-2xl">Basisbelag 25,00€ + 3€ pro Belag</p>
//         <div
//           className="w-0"
//           style={{
//             borderLeft: "2em solid white",
//             borderBottom: "2.25em solid var(--color-red-500)",
//           }}
//         />
//         <p className="flex-1 bg-red-500 font-bold text-3xl">
//           30,-
//         </p>
//       </div>
//     </div>
//   );
// }
