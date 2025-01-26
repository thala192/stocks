import React from "react";

const StockList = ({ stocks, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Stock Holdings</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-800">
            <th className="border p-2 uppercase">Name</th>
            <th className="border p-2 uppercase">Ticker</th>
            <th className="border p-2 uppercase">Quantity</th>
            <th className="border p-2 uppercase">Buy Price</th>
            <th className="border p-2 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td className="border p-2">{stock.name}</td>
              <td className="border p-2">{stock.ticker}</td>
              <td className="border p-2">{stock.quantity}</td>
              <td className="border p-2">₹{stock.buyPrice}</td>
              <td className="border p-2">
                <button
                  onClick={() => onEdit(stock)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(stock.ticker)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;