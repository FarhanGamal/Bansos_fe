import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error"; // Pastikan file ini ada
import { createType } from "../../../services/type";

export default function TypeCreate() {
  const [typeData, setTypeData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTypeData({ ...typeData, [name]: value });
  };

  // Handle submit
  const storeType = async (e) => {
    e.preventDefault();

    try {
      await createType(typeData);
      navigate("/types");
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
        alert("Terjadi kesalahan, coba lagi.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Konten Utama */}
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
        <div className="bg-white dark:bg-boxdark rounded-lg shadow-md p-6 w-full">
          {/* Header Card */}
          <div className="flex justify-between items-center mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Tambah Jenis Bansos
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={storeType} className="flex flex-col gap-6">
            {/* Name Input */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Nama
              </label>
              {errors.name && <Error res={errors.name[0]} />}
              <input
                type="text"
                name="name"
                value={typeData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama jenis bansos"
                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 dark:bg-form-input dark:text-white"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Deskripsi
              </label>
              {errors.description && <Error res={errors.description[0]} />}
              <textarea
                rows="6"
                name="description"
                value={typeData.description}
                onChange={handleInputChange}
                placeholder="Masukkan deskripsi jenis bansos"
                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 dark:bg-form-input dark:text-white"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded bg-indigo-600 p-3 font-medium text-white hover:bg-indigo-700 transition"
            >
              Simpan
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
