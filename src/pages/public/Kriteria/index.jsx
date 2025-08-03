import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCriteria, getCriterias } from "../../../services/criteria";
import { getTypes } from "../../../services/type";

export default function Criterias() {
  const [criterias, setCriterias] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchCriterias = async () => {
      const data = await getCriterias();
      setCriterias(data);
    };

    const fetchTypes = async () => {
      const data = await getTypes();
      setTypes(data);
    };

    fetchCriterias();
    fetchTypes();
  }, []);

  const getTypeName = (id) => {
    const type = types.find((g) => g.id === id);
    return type ? type.name : "Unknown Type";
  };

  const handleDelete = async (id) => {
    const confirmdelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );

    if (confirmdelete) {
      await deleteCriteria(id);
      setCriterias(criterias.filter((cri) => cri.id !== id));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Konten utama */}
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
        <div className="bg-white dark:bg-boxdark rounded-lg shadow-md p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Data Kriteria Bansos
            </h2>
            <Link
              to="/criterias/create"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Tambah Data
            </Link>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100 dark:bg-meta-4">
                <tr>
                  <th className="min-w-[150px] px-4 py-4 text-left font-medium text-black dark:text-white">
                    Jenis
                  </th>
                  <th className="min-w-[220px] px-4 py-4 text-left font-medium text-black dark:text-white">
                    Kriteria
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {criterias.length > 0 ? (
                  criterias.map((criteria) => (
                    <tr
                      key={criteria.id}
                      className="hover:bg-gray-50 dark:hover:bg-meta-3 border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="px-4 py-5">
                        <p className="text-black dark:text-white">
                          {getTypeName(criteria.type_id)}
                        </p>
                      </td>
                      <td className="px-4 py-5">
                        <span className="text-black dark:text-white">
                          {criteria.title}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center space-x-3.5 text-black dark:text-white">
                          <Link to={`/criterias/edit/${criteria.id}`} aria-label="Edit">
                            <i className="fa-solid fa-pen-to-square hover:text-blue-600"></i>
                          </Link>
                          <button onClick={() => handleDelete(criteria.id)}>
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
                      Tidak ada data kriteria.
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
