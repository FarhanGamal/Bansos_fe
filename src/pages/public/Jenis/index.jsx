import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteType, getTypes } from "../../../services/type";

export default function Types() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const data = await getTypes();
      setTypes(data);
    };
    fetchTypes();
  }, []);

  const handleDelete = async (id) => {
    const confirmdelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );

    if (confirmdelete) {
      await deleteType(id);
      setTypes((prev) => prev.filter((criteria) => criteria.id !== id));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Konten utama */}
      <main className="flex-1 px-4 py-6 max-w-screen-xl w-full mx-auto">
        <div className="bg-white dark:bg-boxdark rounded-lg shadow-md p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Data Jenis Bansos
            </h2>
            <Link
              to="/types/create"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Tambah Data
            </Link>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100 dark:bg-meta-4">
                <tr>
                  <th className="min-w-[150px] px-4 py-4 text-left font-medium text-black dark:text-white">
                    Name
                  </th>
                  <th className="min-w-[220px] px-4 py-4 text-left font-medium text-black dark:text-white">
                    Description
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {types.length > 0 ? (
                  types.map((type) => (
                    <tr
                      key={type.id}
                      className="hover:bg-gray-50 dark:hover:bg-meta-3 border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="px-4 py-5">
                        <span className="text-black dark:text-white">
                          {type.name}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <span className="text-black dark:text-white">
                          {type.description}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center space-x-3.5 text-black dark:text-white">
                          <Link to={`/types/edit/${type.id}`} aria-label="Edit">
                            <i className="fa-solid fa-pen-to-square hover:text-blue-600"></i>
                          </Link>
                          <button onClick={() => handleDelete(type.id)}>
                            <i className="fa-solid fa-trash hover:text-red-600"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-5 text-center text-gray-500 dark:text-gray-400"
                    >
                      Tidak ada data jenis.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
