import { useEffect, useState } from "react";
import { getCriterias } from "../../../services/criteria";
import { getTypes } from "../../../services/type";
import { createPeople } from "../../../services/people";
import { useNavigate } from "react-router-dom";

export default function Analisis() {
  const [peopleData, setPeopleData] = useState({
    name: "",
    adrees: "",
  });
  const navigate = useNavigate();

  const [criterias, setCriterias] = useState([]);
  const [types, setTypes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const criteriaData = await getCriterias();
      const typeData = await getTypes();
      setCriterias(criteriaData || []);
      setTypes(typeData || []);
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPeopleData({ ...peopleData, [name]: value });
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDiagnosa = async (e) => {
    e.preventDefault();

    if (!peopleData.name || !peopleData.adrees) {
      setModalMessage("Nama dan alamat wajib diisi!");
      setIsModalOpen(true);
      return;
    }

    if (selected.length === 0) {
      setModalMessage("Silakan pilih minimal satu gejala terlebih dahulu!");
      setIsModalOpen(true);
      return;
    }

    const selectedCriterias = criterias.filter((c) => selected.includes(c.id));
    const typeIds = selectedCriterias.map((c) => c.type_id);
    const firstTypeId = typeIds[0];
    const allSame = typeIds.every((id) => id === firstTypeId);

    if (allSame) {
      const typeObj = types.find((t) => t.id === firstTypeId);
      const typeName = typeObj ? typeObj.name : `Jenis Bansos ${firstTypeId}`;

      try {
        await createPeople({
          name: peopleData.name,
          adrees: peopleData.adrees,
          type_id: firstTypeId,
        });

        setModalMessage(
          `Nama: ${peopleData.name}\nAlamat: ${peopleData.adrees}\nMenerima: ${typeName}`
        );
      } catch (error) {
        console.error(error);
        setModalMessage("Terjadi kesalahan saat menyimpan data.");
      }
    } else {
      setModalMessage("Data yang anda masukan salah");
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/report"); // otomatis pindah ke halaman laporan
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Form Penerima Bansos
        </h2>

        <form onSubmit={handleDiagnosa} className="flex flex-col gap-6">
          {/* Name Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Nama
            </label>
            <input
              type="text"
              name="name"
              value={peopleData.name}
              onChange={handleInputChange}
              placeholder="Masukkan nama penerima"
              className="w-full rounded border border-gray-300 dark:border-gray-600 bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Address Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Alamat
            </label>
            <textarea
              rows="3"
              name="adrees"
              value={peopleData.adrees}
              onChange={handleInputChange}
              placeholder="Masukkan alamat penerima"
              className="w-full rounded border border-gray-300 dark:border-gray-600 bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 dark:bg-form-input dark:text-white"
            ></textarea>
          </div>

          <h2 className="text-lg font-bold mt-4 text-gray-800">Pilih Kriteria</h2>

          {/* Criteria Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-full w-full mx-auto">
            {criterias.length > 0 ? (
              criterias.map((criteria) => (
                <button
                  type="button"
                  key={criteria.id}
                  onClick={() => toggleSelect(criteria.id)}
                  className={`border rounded-md py-3 px-4 text-center font-medium transition
                    ${
                      selected.includes(criteria.id)
                        ? "bg-yellow-300 border-yellow-400"
                        : "bg-white hover:bg-gray-100"
                    }`}
                >
                  {criteria.title}
                </button>
              ))
            ) : (
              <p className="col-span-6 text-center text-gray-700">
                Memuat data kriteria...
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white font-semibold mt-8 py-3 px-6 rounded-md w-full"
          >
            Simpan
          </button>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center whitespace-pre-line">
            <p className="text-gray-800 text-lg font-medium mb-4">{modalMessage}</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
