"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", image: "" });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const { data } = await axios.get("/api/menu");
    setMenus(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("/api/menu", formData);
    setFormData({ name: "", description: "", price: "", image: "" });
    fetchMenus();
  };

  const handleDelete = async (id) => {
    await axios.delete("/api/menu", { data: { id } });
    fetchMenus();
  };

  const handleEdit = async (id) => {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;
    await axios.put("/api/menu", { id, name: updatedName });
    fetchMenus();
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <form onSubmit={handleAdd} className="flex flex-col gap-3 mt-5">
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border p-2" />
        <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="border p-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Menu</button>
      </form>

      <ul className="mt-5">
        {menus.map((menu) => (
          <li key={menu._id} className="border p-3 flex justify-between items-center">
            <span>{menu.name} - ${menu.price}</span>
            <div>
              <button onClick={() => handleEdit(menu._id)} className="bg-yellow-500 text-white px-3 py-1 mr-2">Edit</button>
              <button onClick={() => handleDelete(menu._id)} className="bg-red-500 text-white px-3 py-1">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
