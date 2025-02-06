/* src/App.js */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import OrderList from './components/OrderList';
import AddOrderForm from './components/AddOrder';
import orderData from './data/db.json';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sortedOrders = orderData.map(order => ({
      ...order,
      purchaseDate: format(parseISO(order.purchaseDate), 'dd/MM/yyyy')
    })).map(order => ({
      ...order,
      products: order.products.sort((a, b) => a.price - b.price)
    }));
    setOrders(sortedOrders);
  }, []);

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  return (
      <Router>
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Tổng Kết Đơn Hàng</h2>
              <Link to="/add-order" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Thêm Đơn Hàng</Link>
              <Routes>
                <Route path="/" element={<OrderList orders={orders} />} />
                <Route path="/add-order" element={<AddOrderForm addOrder={addOrder} />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
  );
}

export default App;