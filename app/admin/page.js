"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Toaster, toast } from 'sonner'
import { Tab } from '@headlessui/react';
import { format } from "date-fns";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AdminPage = () => {
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);

  useEffect(() => {
    fetchMenus();
    fetchOrders();
  }, []);

  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu");
      setMenus(data);
    } catch (err) {
      toast.error("Failed to load menu items. Check your connection.");
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders");
      setOrders(data.orders || []); // Ensure orders is always an array
    } catch (err) {
      toast.error("Failed to load orders. Check your connection.");
      setOrders([]); // Fallback to an empty array on error
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price ) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/menu", formData);
      setFormData({ name: "", description: "", price: "", image: "" });
      toast.success("Menu item added successfully!");
      fetchMenus();
    } catch (err) {
      toast.error("Error adding menu item. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete("/api/menu", { data: { id } });
      toast.success("Menu item deleted.");
      fetchMenus();
    } catch (err) {
      toast.error("Failed to delete menu item.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;
    try {
      setLoading(true);
      await axios.put("/api/menu", { id, name: updatedName });
      toast.success("Menu item updated successfully.");
      fetchMenus();
    } catch (err) {
      toast.error("Failed to update menu item.");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      setLoading(true);
      await axios.patch("/api/orders", { id, status });
      toast.success("Order status updated successfully.");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update order status.");
    } finally {
      setLoading(false);
    }
  };

  // Group orders by date
  const groupedOrders = orders.reduce((acc, order) => {
    const date = format(new Date(order.createdAt), "MMMM d, yyyy");
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div className="container mx-auto w-5/6 my-10">
      <Toaster position="top-right" richColors />
      <h1 className="text-2xl font-bold">Admin <span className="text-red-600">Panel</span></h1>

      <Tab.Group>
        <Tab.List className="flex space-x-2 mt-5">
          <Tab className={({ selected }) => selected ? "bg-orange-600 text-white px-4 py-2 rounded-lg" : "bg-gray-200 px-4 py-2 rounded-lg"}>List Items</Tab>
          <Tab className={({ selected }) => selected ? "bg-orange-600 text-white px-4 py-2 rounded-lg" : "bg-gray-200 px-4 py-2 rounded-lg"}>Add Items</Tab>
          <Tab className={({ selected }) => selected ? "bg-orange-600 text-white px-4 py-2 rounded-lg" : "bg-gray-200 px-4 py-2 rounded-lg"}>Manage Orders</Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            {/* List Items Code */}
            {loading ? (
              <Skeleton count={5} height={50} className="my-3" />
            ) : (
              <ul className="mt-5">
                {menus.map((menu) => (
                  <li key={menu._id} className="border p-3 flex justify-between items-center my-3 rounded-lg shadow-sm">
                    <span>{menu.name} - ₦{menu.price}</span>
                    <div>
                      <button
                        onClick={() => {
                          setCurrentMenu(menu);
                          setShowEditModal(true);
                        }}
                        className="bg-yellow-700 rounded-full text-white px-2 py-2 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentMenu(menu);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-700 text-white px-2 rounded-full py-2"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Tab.Panel>

          <Tab.Panel>
            {/* Add Items Code */}
            <form onSubmit={handleAdd} className="flex flex-col gap-3 mt-5">
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2" />
              <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border p-2" />
              <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="border p-2" />
              <input type="text" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="border p-2" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2" disabled={loading}>{loading ? "Adding..." : "Add Menu"}</button>
            </form>
          </Tab.Panel>

          <Tab.Panel>
            {/* Manage Orders Code */}
            {loading ? (
              <Skeleton count={3} height={100} className="my-3" />
            ) : (
              <ul className="mt-5">
                {Object.keys(groupedOrders).map((date) => (
                  <div key={date} className="mb-6">
                    <h2 className="text-lg font-bold mb-2">{date}</h2>
                    {groupedOrders[date].map((order) => (
                      <li key={order._id} className="border my-3 rounded-lg shadow-sm p-3 flex flex-col gap-2">
                        <span><strong>Name:</strong> {order.customerName}</span>
                        <span><strong>Status:</strong> {order.status}</span>
                        <span><strong>Order:</strong> {order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}</span>
                        <span><strong>Price:</strong> ₦{order.totalAmount}</span>
                        <span><strong>Phone:</strong> {order.phone}</span>
                        <span><strong>Address:</strong> {order.address}</span>
                        <div>
                          {order.status !== "Delivered" ? (
                            <button
                              onClick={() => updateOrderStatus(order._id, order.status === "Processing" ? "In-Transit" : "Delivered")}
                              className={`px-4 py-2 text-white rounded ${
                                order.status === "Processing" ? "bg-yellow-500" : "bg-green-500"
                              }`}
                            >
                              {order.status === "Processing" ? "Mark as In-Transit" : "Mark as Delivered"}
                            </button>
                          ) : (
                            <button
                              disabled
                              className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                            >
                              Delivered
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-md">
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  handleDelete(currentMenu._id);
                  setShowDeleteModal(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit Menu Item</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit(currentMenu._id);
                setShowEditModal(false);
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Name"
                value={currentMenu.name}
                onChange={(e) => setCurrentMenu({ ...currentMenu, name: e.target.value })}
                className="border p-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={currentMenu.description}
                onChange={(e) => setCurrentMenu({ ...currentMenu, description: e.target.value })}
                className="border p-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={currentMenu.price}
                onChange={(e) => setCurrentMenu({ ...currentMenu, price: e.target.value })}
                className="border p-2"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={currentMenu.image}
                onChange={(e) => setCurrentMenu({ ...currentMenu, image: e.target.value })}
                className="border p-2"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
