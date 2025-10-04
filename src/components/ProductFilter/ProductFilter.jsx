// import React, { useState } from "react";

// const ProductFilter = () => {
//   // Исправлено: состояние должно быть внутри компонента
//   const [activeCategory, setActiveCategory] = useState("drinks");

//   // Исправлено: id должны быть строками
//   const categories = [
//     { id: "drinks", name: "Напитки" },
//     { id: "bakery", name: "Выпечка" },
//     { id: "pop", name: "Популярное" },
//   ];

//   // Исправлено: правильное объявление переменной
//   const menuData = {
//     drinks: [
//       {
//         id: 1,
//         name: "Капучино",
//         price: 120,
//         volume: 200,
//         image: "default-drink.png",
//         description: "Кофейный напиток...",
//       },
//       // ... остальные напитки
//     ],
//     bakery: [
//       {
//         id: 101,
//         name: "Круассан",
//         price: 85,
//         image: "croissant.png",
//         description: "Свежий круассан",
//       },
//       // ... остальная выпечка
//     ],
//     pop: [
//       {
//         id: 1,
//         name: "Капучино",
//         price: 120,
//         volume: 200,
//         image: "default-drink.png",
//         description: "Популярный напиток",
//       },
//       // ... популярные товары
//     ],
//   };

//   return (
//     <div>
//       <nav>
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => setActiveCategory(category.id)}
//             style={{
//               backgroundColor:
//                 activeCategory === category.id ? "#8B4513" : "white",
//               color: activeCategory === category.id ? "white" : "#8B4513",
//             }}
//           >
//             {category.name}
//           </button>
//         ))}
//       </nav>

//       <div>
//         {activeCategory === "drinks" && (
//           <div>
//             {menuData.drinks.map((item) => (
//               <div key={item.id}>
//                 <h3>{item.name}</h3>
//                 <p>{item.price} руб</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeCategory === "bakery" && (
//           <div>
//             {menuData.bakery.map((item) => (
//               <div key={item.id}>
//                 <h3>{item.name}</h3>
//                 <p>{item.price} руб</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeCategory === "pop" && (
//           <div>
//             {menuData.pop.map((item) => (
//               <div key={item.id}>
//                 <h3>{item.name}</h3>
//                 <p>{item.price} руб</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductFilter;
