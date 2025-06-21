import { supabase } from '@/lib/supabaseClient';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    area: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  // Address selection state
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!isAuthenticated || !user?.id) return;
      setLoadingAddresses(true);
      const { data, error } = await supabase
        .from('addresses')
        .select('address_line,area,city,state,zip,country,user_id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setAddresses(data || []);
      setLoadingAddresses(false);
    };
    fetchAddresses();
  }, [isAuthenticated, user?.id]);

  // Autofill form when an address is selected
  useEffect(() => {
    if (!selectedAddressId) return;
    const addr = addresses.find(a => a.id === selectedAddressId);
    if (addr) {
      console.log('Autofilling with:', addr);
      setFormData(prev => ({
        ...prev,
        address: addr.address_line || '',
        area: addr.area || '',
        city: addr.city || '',
        state: addr.state || '',
        zip: addr.zip || '',
        country: addr.country || '',
      }));
    }
  }, [selectedAddressId]);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Razorpay handler
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      toast({ title: "You must be signed in to place an order.", variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    await loadRazorpayScript();
    const amount = Number((getTotalPrice() * 1.08).toFixed(2)) * 100; // Razorpay expects paise
    const options = {
      key: 'RAZORPAY_KEY_ID', // TODO: Replace with your Razorpay key
      amount,
      currency: 'INR',
      name: 'brainrot',
      description: 'Order Payment',
      handler: async function (response: any) {
        // Payment success, now insert order
        const { error } = await supabase.from('orders').insert([
          {
            user_id: user.id,
            status: 'placed',
            total: amount / 100,
            items: items.map(({ id, name, price, size, quantity }) => ({ id, name, price, size, quantity })),
            razorpay_payment_id: response.razorpay_payment_id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ]);
        if (error) {
          toast({ title: 'Order saved, but failed in DB', description: error.message, variant: 'destructive' });
          setIsProcessing(false);
          return;
        }
        toast({ title: 'Payment successful!', description: 'Your order has been placed.' });
        clearCart();
        navigate('/orders');
        setIsProcessing(false);
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      },
      theme: { color: '#121212' },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
          toast({ title: 'Payment Cancelled', variant: 'destructive' });
        }
      }
    };
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <Button onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Contact Information</h2>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Shipping Address</h2>

            {/* Address Selector for logged-in users */}
            {isAuthenticated && (
              <div className="mb-2">
                <div className="font-medium mb-1 text-gray-700">Select a saved address:</div>
                {loadingAddresses ? (
                  <div className="text-gray-500 text-sm">Loading addresses...</div>
                ) : addresses.length === 0 ? (
                  <div className="text-gray-400 text-sm">No saved addresses</div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {addresses.map(addr => (
                      <label key={addr.id} className={`flex items-start gap-2 p-2 rounded border ${selectedAddressId === addr.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'} cursor-pointer`}>
                        <input
                          type="radio"
                          name="saved-address"
                          value={addr.id}
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1"
                        />
                        <span className="flex flex-col text-sm">
                          <span className="font-medium text-gray-900">{addr.address_line}</span>
                          <span className="text-gray-700">{addr.area ? addr.area + ', ' : ''}{addr.city}, {addr.state}, {addr.zip}</span>
                          <span className="text-gray-700">{addr.country}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="area">Area</Label>
              <Input
                id="area"
                name="area"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  name="zip"
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Payment Information</h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>🔒</span>
              <span>Your payment information is secure and encrypted</span>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Payment...' : `Pay ₹${getTotalPrice().toFixed(2)}`}
            </Button>
          </div>
        </form>

        {/* Order Summary */}
        {!isAuthenticated && (
          <div className="mb-4 text-center text-base text-red-600 font-semibold">
            Please Sign In first to Order
          </div>
        )}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Order Summary</h2>
          
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover bg-muted/30 rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
