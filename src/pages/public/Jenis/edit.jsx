import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTypes, updateType } from "../../../services/type";

export default function TypeEdit() {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch data type berdasarkan ID
  const fetchTypesDetails = async () => {
    try {
      const data = await getTypes(); // Ambil semua data
      const type = data.find((type) => type.id === parseInt(id));

      if (type) {
        setName(type.name);
        setDescription(type.description);
      }
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  useEffect(() => {
    fetchTypesDetails();
  }, []);

  // Update data type
  const updateTypeDetail = async (e) => {
    e.preventDefault();

    const typeData = new FormData();
    typeData.append("name", name);
    typeData.append("description", description);
    typeData.append("_method", "PUT");

    try {
      await updateType(id, typeData);
      navigate("/types");
    } catch (err) {
      console.error(err);
      setErrors(err.response?.data?.errors || {});
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Konten Utama */}
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
        <div className="bg-white dark:bg-boxdark rounded-lg shadow-md p-6 w-full">
          {/* Header Card */}
          <div className="border-b border-stroke pb-4 mb-4 dark:border-strokedark">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Edit Data Jenis
            </h3>
          </div>

          {/* Form */}
          <form onSubmit={updateTypeDetail} className="flex flex-col gap-5">
            {/* Input Name */}
            <div>
              <label className="mb-2 block text-base font-medium text-black dark:text-white">
                Name
              </label>
              {errors.name && (
                <div
                  className="p-2 mb-2 text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.name[0]}</span>
                </div>
              )}
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>

            {/* Input Description */}
            <div>
              <label className="mb-2 block text-base font-medium text-black dark:text-white">
                Description
              </label>
              {errors.description && (
                <div
                  className="p-2 mb-2 text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.description[0]}</span>
                </div>
              )}
              <textarea
                rows="6"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded border border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 dark:border-form-strokedark dark:bg-form-input dark:text-white"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-indigo-600 p-3 font-medium text-white hover:bg-opacity-90"
            >
              Save
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
