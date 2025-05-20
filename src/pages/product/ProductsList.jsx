// import React from "react";
// import { Edit, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/Button";
// import { Card } from "@/components/ui/Card";

// export const ProductsList = ({
//   products,
//   formatPrice,
//   onEdit,
//   onDelete,
// }) => {
//   return (
//     <Card>
//       <div className="divide-y">
//         {products.map((product) => (
//           <div key={product.id} className="flex items-center p-4 gap-4">
//             <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="font-medium">{product.name}</h3>
//               <div className="text-sm text-gray-500">{product.category}</div>
//             </div>
//             <div className="hidden md:block text-right">
//               <span
//                 className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                   product.stock > 0
//                     ? "bg-green-100 text-green-800"
//                     : "bg-red-100 text-red-800"
//                 }`}
//               >
//                 {product.status}
//               </span>
//             </div>
//             <div className="text-right">
//               <div className="font-bold">{formatPrice(product.price)}</div>
//               <div className="text-sm text-gray-500">
//                 <span>Kho: </span>
//                 {product.stock}
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button 
//                 size="icon" 
//                 variant="ghost" 
//                 onClick={() => onEdit(product)}
//               >
//                 <Edit size={18} />
//               </Button>
//               <Button 
//                 size="icon" 
//                 variant="ghost"
//                 onClick={() => onDelete(product)}
//               >
//                 <Trash2 size={18} />
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// };
