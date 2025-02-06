"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Toaster, toast } from 'sonner'


const AdminPage = () => {
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [activeTab, setActiveTab] = useState("add");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    toast.success("Menu Added successfully")
    fetchMenus();
  };

  const handleDelete = async (id) => {
    await axios.delete("/api/menu", { data: { id } });
    toast.success("Menu Deleted successfully")
    fetchMenus();
  };

  const handleEdit = async (id) => {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;
    await axios.put("/api/menu", { id, name: updatedName });
    toast.success("Menu Updated successfully")
    fetchMenus();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/your_cloudinary_name/image/upload",
      formData
    );
    setFormData((prev) => ({ ...prev, image: res.data.secure_url }));
  };

  return (
    <div className="flex">
      <Toaster position="top-right" richColors />
      {/* Sidebar */}
      <div className={`fixed h-full bg-gray-900 text-white w-60 p-5 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-60"}`}>
        <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-white text-2xl">
          <IoClose />
        </button>
        <h2 className="text-lg font-bold mb-4">Admin Menu</h2>
        <ul>
          <li className={`p-2 cursor-pointer ${activeTab === "add" && "bg-gray-700"}`} onClick={() => setActiveTab("add")}>Add New</li>
          <li className={`p-2 cursor-pointer ${activeTab === "items" && "bg-gray-700"}`} onClick={() => setActiveTab("items")}>All Items</li>
          <li className={`p-2 cursor-pointer ${activeTab === "orders" && "bg-gray-700"}`} onClick={() => setActiveTab("orders")}>Orders</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/6 mx-auto flex-1 p-5">
        <button onClick={() => setSidebarOpen(true)} className="text-2xl mb-4">
          <FiMenu />
        </button>

        {activeTab === "add" && (
          <form onSubmit={handleAdd} className="flex flex-col gap-3">
            <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2" />
            <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border p-2" />
            <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="border p-2" />
            <input type="file" onChange={handleImageUpload} className="border p-2" />
            {formData.image && <img src={formData.image} alt="Preview" className="w-20 h-20 mt-2" />}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Menu</button>
          </form>
        )}

        {activeTab === "items" && (
          <ul className="mt-5">
            {menus.map((menu) => (
              <li key={menu._id} className="border p-3 flex justify-between items-center">
                <span>{menu.name} - ₦{menu.price}</span>
                {menu.image && <img src={menu.image} alt={menu.name} className="w-12 h-12" />}
                <div>
                  <button onClick={() => handleEdit(menu._id)} className="bg-yellow-700 text-white px-2 py-1 mr-2"><FaEdit /></button>
                  <button onClick={() => handleDelete(menu._id)} className="bg-red-700 text-white px-2 py-1"><MdDeleteOutline /></button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "orders" && <p>Orders Section Coming Soon...</p>}
      </div>
    </div>
  );
};

export default AdminPage;
