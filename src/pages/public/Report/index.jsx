import { useEffect, useState } from "react";
import { getPeoples, deletePeople } from "../../../services/people"; // pastikan ada deletePeople di service
import { getTypes } from "../../../services/type";

export default function Reports() {
  const [laporan, setLaporan] = useState([]);

  // Ambil data
  const fetchData = async () => {
    try {
      const [peopleData, typesData] = await Promise.all([
        getPeoples(),
        getTypes(),
      ]);

      const laporanWithType = (peopleData || []).map((item) => {
        const typeObj = typesData.find((t) => t.id === item.type_id);
        return {
          ...item,
          typeName: typeObj ? typeObj.name : "-",
        };
      });

      setLaporan(laporanWithType);
    } catch (error) {
      console.error("Gagal memuat laporan:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi hapus data
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      await deletePeople(id); // panggil API untuk hapus data
      setLaporan((prev) => prev.filter((item) => item.id !== id)); // update state lokal
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus data. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-6xl mx-auto w-full bg-white dark:bg-boxdark rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-black dark:text-white mb-6">
          Laporan Penerima Bansos
        </h2>

        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 dark:bg-meta-4">
            <tr>
              <th className="px-4 py-4 text-left font-medium text-black dark:text-white">No</th>
              <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Nama</th>
              <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Alamat</th>
              <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Bansos</th>
              <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporan.length > 0 ? (
              laporan.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-meta-3 border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-5 text-black dark:text-white">{index + 1}</td>
                  <td className="px-4 py-5 text-black dark:text-white">{item.name}</td>
                  <td className="px-4 py-5 text-black dark:text-white">{item.adrees}</td>
                  <td className="px-4 py-5 text-black dark:text-white">{item.typeName}</td>
                  <td className="px-4 py-5">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="fa-solid fa-trash hover:text-red-600"
                      aria-label="Hapus"
                    >
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-5 text-center text-gray-500 dark:text-gray-400"
                >
                  Tidak ada data laporan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
