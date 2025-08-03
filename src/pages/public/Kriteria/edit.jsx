import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTypes } from "../../../services/type";
import { getCriterias, updateCriteria } from "../../../services/criteria";

export default function CriteriaEdit() {
  const [types, setTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [typeId, setTypeId] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch data criteria berdasarkan ID
  const fetchCriteriasDetails = async () => {
    try {
      const data = await getCriterias(); // Ambil semua data
      const criteria = data.find((criteria) => criteria.id === parseInt(id));

      if (criteria) {
        setTitle(criteria.title);
        setTypeId(criteria.type_id);
      }
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  const fetchTypes = async () => {
    const data = await getTypes();
    setTypes(data);
  };

  useEffect(() => {
    fetchCriteriasDetails();
    fetchTypes();
  }, []);

  // Update data type
  const updateCriteriaDetail = async (e) => {
    e.preventDefault();

    const criteriaData = new FormData();
    criteriaData.append("title", title);
    criteriaData.append('type_id', typeId)
    criteriaData.append("_method", "PUT");

    try {
      await updateCriteria(id, criteriaData);
      navigate("/criterias");
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
          <form onSubmit={updateCriteriaDetail} className="flex flex-col gap-5">
            {/* Input Name */}
            <div>
              <label className="mb-2 block text-base font-medium text-black dark:text-white">
                Nama
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
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded border border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>

            {/* Input Description */}
            <div className="mb-4.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
              >
                Jenis
              </label>
              {errors.type_id && (
                <div className="p-2 my-2 text-red-800 rounded-lg bg-red-50" role="alert">
                  <span className="font-medium">{errors.type_id[0]}</span>
                </div>
              )}
              <div
                className="relative z-20 bg-transparent dark:bg-form-input"
              >
                <select
                  name="type_id"
                  value={typeId}
                  onChange={(e) => setTypeId(e.target.value)}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-indigo-600 active:border-indigo-600 dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
                >
                  <option value="" className="text-body">
                    --select type--
                  </option>
                  {types.map((type) => ( 
                    <option key={type.id} value={type.id} className="text-body">{type.name}</option>
                  ))}
                </select>
                <span
                  className="absolute right-4 top-1/2 z-30 -translate-y-1/2"
                >
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
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
