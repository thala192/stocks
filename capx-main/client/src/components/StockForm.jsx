import { useState, useEffect } from "react";

const StockForm = ({ addStock, updateStock, initialStock }) => {
  const [stock, setStock] = useState({ name: "", ticker: "", quantity: 1, buyPrice: 0 });

  useEffect(() => {
    if (initialStock) {
      setStock(initialStock);
    }
  }, [initialStock]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({
      ...stock,
      [name]: name === "quantity" || name === "buyPrice" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialStock) {
      updateStock(stock);
    } else {
      addStock(stock);
    }
    setStock({ name: "", ticker: "", quantity: 1, buyPrice: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 w-full p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">{initialStock ? "Edit Stock" : "Add Stock"}</h2>
      <div className="mb-4">
        <label className="block text-white mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={stock.name}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Ticker</label>
        <input
          type="text"
          name="ticker"
          value={stock.ticker}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={stock.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          min="1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Buy Price</label>
        <input
          type="number"
          name="buyPrice"
          value={stock.buyPrice}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          min="0"
          step="0.01"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
        {initialStock ? "Update Stock" : "Add Stock"}
      </button>
    </form>
  );
};

export default StockForm;