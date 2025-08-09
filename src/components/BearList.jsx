// // BearList.jsx
// import React, { useState } from 'react'
// import { useBearStore } from "/stores/useBearStore"
// import { useAuthBear } from "/stores/useAuthBear"


// const BearList = () => {
//   const { bears, addBear, removeBear } = useBearStore()
//   const { bearUser, loginBear, logoutBear } = useAuthBear()

//   const [newBear, setNewBear] = useState('')
//   const [bearName, setBearName] = useState('')

//   const handleAdd = () => {
//     if (newBear.trim() !== '') {
//       addBear(newBear)
//       setNewBear('')
//     }
//   }

//   const handleLogin = () => {
//     if (bearName.trim() !== '') {
//       loginBear(bearName)
//       setBearName('')
//     }
//   }

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🐻 Bear Store Example</h2>

//       {bearUser ? (
//         <div className="mb-4">
//           <p className="mb-2">Hi, <strong>{bearUser.name}</strong>! 🐻</p>
//           <button onClick={logoutBear} className="bg-red-500 text-white px-4 py-2 rounded">
//             Logout Bear
//           </button>
//         </div>
//       ) : (
//         <div className="flex mb-4">
//           <input
//             type="text"
//             value={bearName}
//             onChange={(e) => setBearName(e.target.value)}
//             placeholder="Bear name..."
//             className="border p-2 flex-grow mr-2"
//           />
//           <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
//             Login Bear
//           </button>
//         </div>
//       )}

//       <div className="flex mb-4">
//         <input
//           type="text"
//           value={newBear}
//           onChange={(e) => setNewBear(e.target.value)}
//           placeholder="Add a bear..."
//           className="border p-2 flex-grow mr-2"
//         />
//         <button
//           onClick={handleAdd}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add Bear
//         </button>
//       </div>

//       <ul className="list-disc pl-5">
//         {bears.map((bear, index) => (
//           <li key={index} className="mb-2 flex justify-between items-center">
//             <span>{bear}</span>
//             <button
//               onClick={() => removeBear(index)}
//               className="text-red-500"
//             >
//               Remove Bear
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default BearList
