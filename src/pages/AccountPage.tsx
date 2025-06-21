import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient'; // Fixed import: use named import

const AccountPage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Editable name state
  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [savingName, setSavingName] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  // Address modal state and fields
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editAddress, setEditAddress] = useState<any | null>(null);
  const [addressFields, setAddressFields] = useState({
    address_line: '',
    area: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [addressSaving, setAddressSaving] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  // Prefill fields when editing
  useEffect(() => {
    if (editAddress) {
      setAddressFields({
        address_line: editAddress.address_line || '',
        area: editAddress.area || '',
        city: editAddress.city || '',
        state: editAddress.state || '',
        zip: editAddress.zip || '',
        country: editAddress.country || '',
      });
    } else {
      setAddressFields({ address_line: '', area: '', city: '', state: '', zip: '', country: '' });
    }
    setAddressError(null);
  }, [showAddressModal, editAddress]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?.id) return;
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('addresses')
        .select('address_line,area,city,state,zip,country,user_id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) {
        setError('Failed to load addresses: ' + error.message);
        setAddresses([]);
        console.error('Supabase fetch error:', error);
      } else {
        setAddresses(data || []);
      }
      setLoading(false);
    };
    fetchAddresses();
  }, [user?.id]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Account</h1>
        <p className="mb-6 text-lg">You are not signed in.</p>
        <Button onClick={() => navigate('/login')} className="text-base h-12 px-8">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto px-4 w-full max-w-2xl flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-left text-gray-900 mb-2">Account</h1>
        {/* Profile Card */}
        <section className="bg-gray-50 rounded-xl p-6 shadow border border-gray-200 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Profile</h2>
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-base text-gray-700">Name</span>
            {editName ? null : (
              <button
                className="p-1 hover:bg-gray-200 rounded"
                title="Edit Name"
                type="button"
                onClick={() => {
                  setEditName(true);
                  setNameInput(user?.name || '');
                  setNameError(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm0 0v3a1 1 0 001 1h3" /></svg>
              </button>
            )}
          </div>
          {editName ? (
            <div className="flex items-center gap-2 mb-2 ml-1">
              <input
                className="border border-gray-300 rounded px-2 py-1 text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                disabled={savingName}
                autoFocus
              />
              <button
                className="px-3 py-1 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 text-sm"
                onClick={async () => {
                  setSavingName(true);
                  setNameError(null);
                  const { error } = await supabase.from('users').update({ name: nameInput }).eq('id', user.id);
                  setSavingName(false);
                  if (error) {
                    setNameError('Could not update name.');
                  } else {
                    setEditName(false);
                    window.location.reload(); // For now, reload to update context (improve later)
                  }
                }}
                disabled={savingName || !nameInput.trim()}
              >
                Save
              </button>
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 text-sm"
                onClick={() => setEditName(false)}
                disabled={savingName}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="text-base mb-2 ml-1 text-gray-900">{user?.name}</div>
          )}
          {nameError && <div className="text-red-500 text-xs ml-1 mb-2">{nameError}</div>}
          <div className="font-medium text-base mb-1 text-gray-700">Email</div>
          <div className="text-base ml-1 text-gray-900">{user?.email}</div>
        </section>
        {/* Addresses Card */}
        <section className="bg-gray-50 rounded-xl p-6 shadow border border-gray-200 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-800">Addresses</h2>
            <button
              className="text-blue-600 font-medium text-sm hover:underline px-2 py-1 rounded transition-colors"
              type="button"
              onClick={() => { setEditAddress(null); setShowAddressModal(true); }}
            >
              + Add
            </button>
            {/* Address Modal Scaffold */}
            {showAddressModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white rounded-lg shadow-lg p-6 min-w-[340px] max-w-[95vw]">
                  <div className="font-semibold mb-4">{editAddress ? 'Edit Address' : 'Add Address'}</div>
                  <form
                    onSubmit={async e => {
                      e.preventDefault();
                      setAddressSaving(true);
                      setAddressError(null);
                      // Validate
                      if (!addressFields.address_line.trim() || !addressFields.city.trim() || !addressFields.country.trim() || !addressFields.state.trim() || !addressFields.zip.trim()) {
                        setAddressError('Address, City, State, ZIP, and Country are required.');
                        setAddressSaving(false);
                        return;
                      }
                      let result;
                      if (editAddress) {
                        result = await supabase
                          .from('addresses')
                          .update(addressFields)
                          .eq('id', editAddress.id)
                          .eq('user_id', user.id);
                      } else {
                        result = await supabase
                          .from('addresses')
                          .insert([{ ...addressFields, user_id: user.id }]);
                      }
                      setAddressSaving(false);
                      if (result.error) {
                        setAddressError('Could not save address: ' + result.error.message);
                        console.error('Supabase insert error:', result.error);
                      } else {
                        setShowAddressModal(false);
                        setEditAddress(null);
                        // Refresh addresses
                        setLoading(true);
                        const { data, error } = await supabase
                          .from('addresses')
                          .select('address_line,area,city,state,zip,country,user_id')
                          .eq('user_id', user.id)
                          .order('created_at', { ascending: false });
                        setAddresses(data || []);
                        setLoading(false);
                      }
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <input
                        className="border rounded px-2 py-1 text-base text-gray-900"
                        placeholder="Address Line *"
                        value={addressFields.address_line}
                        onChange={e => setAddressFields(f => ({ ...f, address_line: e.target.value }))}
                        disabled={addressSaving}
                        required
                      />
                      <input
                        className="border rounded px-2 py-1 text-base text-gray-900"
                        placeholder="Area"
                        value={addressFields.area}
                        onChange={e => setAddressFields(f => ({ ...f, area: e.target.value }))}
                        disabled={addressSaving}
                      />
                      <input
                        className="border rounded px-2 py-1 text-base text-gray-900"
                        placeholder="City *"
                        value={addressFields.city}
                        onChange={e => setAddressFields(f => ({ ...f, city: e.target.value }))}
                        disabled={addressSaving}
                        required
                      />
                      <input
                        className="border rounded px-2 py-1 text-base text-gray-900"
                        placeholder="State *"
                        value={addressFields.state}
                        onChange={e => setAddressFields(f => ({ ...f, state: e.target.value }))}
                        disabled={addressSaving}
                        required
                      />
                      <input
                        className="border rounded px-2 py-1 text-base text-gray-900"
                        placeholder="ZIP *"
                        value={addressFields.zip}
                        onChange={e => setAddressFields(f => ({ ...f, zip: e.target.value }))}
                        disabled={addressSaving}
                        required
                      />
                      <input
                        className="border rounded px-2 py-1 text-base text-gray-900"
                        placeholder="Country *"
                        value={addressFields.country}
                        onChange={e => setAddressFields(f => ({ ...f, country: e.target.value }))}
                        disabled={addressSaving}
                        required
                      />
                    </div>
                    {addressError && <div className="text-red-500 text-xs mt-2">{addressError}</div>}
                    <div className="flex gap-2 mt-4">
                      <button
                        type="submit"
                        className="px-4 py-1 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 text-sm"
                        disabled={addressSaving}
                      >
                        {addressSaving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        type="button"
                        className="px-4 py-1 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 text-sm"
                        onClick={() => { setShowAddressModal(false); setEditAddress(null); }}
                        disabled={addressSaving}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
          {loading ? (
            <div className="bg-gray-100 rounded p-3 text-gray-500 flex items-center text-sm ml-1">
              Loading addresses...
            </div>
          ) : error ? (
            <div className="bg-gray-100 rounded p-3 text-red-500 flex items-center text-sm ml-1">
              {error}
            </div>
          ) : addresses.length === 0 ? (
            <div className="bg-gray-100 rounded p-3 text-gray-500 flex items-center text-sm ml-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m4-4h.01M12 8v.01" /></svg>
              No addresses added
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {addresses.map(addr => (
                <section key={addr.id} className="bg-white border border-gray-200 rounded p-3 flex flex-col text-sm ml-1 relative group">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">{addr.address_line}</div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Edit Address"
                        onClick={() => { setEditAddress(addr); setShowAddressModal(true); }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm0 0v3a1 1 0 001 1h3" /></svg>
                      </button>
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Delete Address"
                        onClick={() => {/* implement delete logic */}}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-700">{addr.area}, {addr.city}, {addr.state}, {addr.zip}</div>
                  <div className="text-gray-700">{addr.country}</div>
                </section>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountPage;
