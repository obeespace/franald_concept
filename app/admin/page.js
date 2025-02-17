"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Toaster, toast } from 'sonner'


const AdminPage = () => {
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", image: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu");
      setMenus(data);
    } catch (err) {
      toast.error("Failed to load menu items. Check your connection.");
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

  return (
    <div className="container mx-auto p-5">
            <Toaster position="top-right" richColors />
      
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      
      <form onSubmit={handleAdd} className="flex flex-col gap-3 mt-5">
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border p-2" />
        <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="border p-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2" disabled={loading}>{loading ? "Adding..." : "Add Menu"}</button>
      </form>

      <ul className="mt-5">
        {menus.map((menu) => (
          <li key={menu._id} className="border p-3 flex justify-between items-center">
            <span>{menu.name} - ₦{menu.price}</span>
            <div>
              <button onClick={() => handleEdit(menu._id)} className="bg-yellow-700 rounded-full text-white px-2 py-2 mr-2"><FaEdit /></button>
              <button onClick={() => handleDelete(menu._id)} className="bg-red-700 text-white px-2 rounded-full py-2"><MdDeleteOutline /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
