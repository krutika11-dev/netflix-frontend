import { Children, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';
import HomePage from './pages/home/HomePage'
import HomeScreen from './pages/home/HomeScreen'
import OtpPage from './pages/OtpPage'
import { isTokenExpired } from './utils/checkTOken'
import MoviesPage from './pages/Home/MoviesPage'
import PopularPage from './pages/Home/PopularPage'
import TvShowsPage from './pages/Home/TvShowsPage'
import ChatBot from './pages/Home/chatBot.jsx'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <MoviesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tv-shows"
          element={
            <ProtectedRoute>
              <TvShowsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/popular"
          element={
            <ProtectedRoute>
              <PopularPage />
            </ProtectedRoute>
          }
        />
         /* ✅ New Chatbot Route */
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <ChatBot />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

// function App() {
//   const [purchased, setPurchased] = useState({});

//   // const [name, setName] = useState()
//   // const [abc, setabc] = useState()

//   // const [visible, setVisible] = useState(true)

//   // const hideShow = () => {
//   //   setVisible(!visible)
//   // }


//   // Handle buy button
//   const buyProduct = (id, name) => {
//     alert(`You purchased ${name}`);
//     setPurchased((prev) => ({
//       ...prev,
//       [id]: true,
//     }));
//   };

//   useEffect(()=> {
//     setTimeout(()=> {
//       console.log('I am console')
//     },1000)
//   },[])

//   const arr1 = [
//     {
//       name: 'Laptop',
//       id: 111,
//       stock: 'available',
//     },
//     {
//       name: 'Mouse',
//       id: 222,
//       stock: 'available',
//     },
//     {
//       name: 'Keyboard',
//       id: 333,
//       stock: 'available',
//     },
//   ];


//   // const arr = [
//   //   {
//   //     name: 'Harry',
//   //     id: 1
//   //   },
//   //   {
//   //     name: 'asd',
//   //     id: 2
//   //   },
//   //   {
//   //     name: 'lmn',
//   //     id: 3
//   //   }
//   // ]



//   return (
//     <>
//       {/* <Header name={'abc'} age={21} gender={'female'} ></Header> */}

//       {
//         arr1
//           .filter(product => product.stock === 'available') // Only show available products
//           .map((product) => (
//             <div
//               key={product.id}
//               style={{
//                 border: '1px solid gray',
//                 padding: '10px',
//                 margin: '10px',
//                 borderRadius: '8px',
//                 width: '300px'
//               }}
//             >
//               <h2>Name: {product.name}</h2>
//               <p>ID: {product.id}</p>
//               <p>Stock: {product.stock}</p>

//               <button
//                 onClick={() => buyProduct(product.id, product.name)}
//                 disabled={purchased[product.id]}
//               >
//                 {purchased[product.id] ? 'Purchased' : 'Buy Product'}
//               </button>
//             </div>
//           ))
//       }

//       {/* {
//         arr.map((a) => {
//           return (
//             <div key={a.id}>
//               <h1 >
//                 ID : {a.id}
//                 Name : {a.name}
//               </h1>
//             </div>
//           )
//         })
//       } */}

//       {/* <h1>
//         My name is {name}<br></br>
//         Everyone {abc}
//       </h1> */}
//       {/* {
//       <button onClick={() => setName("Krutika")}>Krutika</button>
//       <button onClick={() => setabc("Good Morning")}>Click</button>
//       } */}

//       {/* {
//         visible
//           ? <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias tempore amet maxime nisi voluptate possimus similique ullam nostrum incidunt rerum eligendi in quibusdam,
//             veritatis quia hic illo laborum quisquam ea!</h1>
//           : <h1>False</h1>
//       }  */}

//       {/* <div style={{ margin: '10px' }}>
//         <button onClick={hideShow}>
//           {visible ? 'Hide' : 'Show'}

//         </button>
//       </div> */}

//     </>
//   )
// }

// export default App

// function CounterComponent() {
//   const [count, setCount] = useState(0); // start count from 0

//   useEffect(() => {
//     setTimeout(() => {
//       setCount(count + 1); // increase count by 1
//       console.log('Count:', count + 1);
//     }, 1000);
//   }, [count]); // run this again when count changes

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//     </div>
//   );
// }

// export default CounterComponent;

//front end

// function App() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <BearList />
//     </div>
//   )
// }

// export default App
