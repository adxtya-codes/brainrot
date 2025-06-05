
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const OrdersPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold">Please sign in</h1>
          <p className="text-muted-foreground">
            You need to be logged in to view your order history.
          </p>
          <Button onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  // Mock order data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 97.20,
      status: 'Delivered',
      items: [
        { name: 'Existential Crisis Tee', size: 'M', quantity: 1, price: 45 },
        { name: 'Doom Scroll Champion', size: 'L', quantity: 1, price: 48 }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center space-y-6">
          <p className="text-muted-foreground">No orders yet.</p>
          <Button onClick={() => navigate('/')}>
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">Order {order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-green-600">{order.status}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} (Size: {item.size}) x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
