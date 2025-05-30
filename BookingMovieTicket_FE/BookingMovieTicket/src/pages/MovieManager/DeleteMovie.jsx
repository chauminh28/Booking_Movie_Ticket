import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SuccessToast from "../../components/toasts/SuccessToast";

const MOVIE_STATUS = {
  STOPPED: -1,
  UPCOMING: 0,
  SHOWING: 1,
};
function DeleteMovie() {
  const [ages, setAges] = useState([]);
  const [genres, setGenres] = useState([]);
  const { id } = useParams();
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    movieName: "",
    movieDuration: "",
    movieImage: "",
    trailer: "",
    ageName: "",
    movieStatus: "",
    country: "",
    movieGenres: [],
    startDate: "",
    status: true,
    directors: [],
    actors: [],
    description: "",
  });
  const getStatusLabel = (status) => {
    switch (status) {
      case MOVIE_STATUS.STOPPED:
        return "Ngừng chiếu";
      case MOVIE_STATUS.UPCOMING:
        return "Sắp chiếu";
      case MOVIE_STATUS.SHOWING:
        return "Đang chiếu";
      default:
        return "Không xác định";
    }
  };
  useEffect(() => {
    const fetchAges = async () => {
      await axios
        .get("http://localhost:8080/ages")
        .then((response) => {
          setAges(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching ages!", error);
        });
    };

    fetchAges();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:8080/genres/list");
        const fetchedGenres = response.data;
        setGenres(fetchedGenres);
      } catch (error) {
        console.error("There was an error fetching genres!", error);
      }
    };

    fetchGenres();
  }, []);
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/movies/${id}`)
        .then((response) => {
          const data = response.data;
          const updatedForm = {
            movieName: data.movie.movieName || "",
            movieDuration: data.movie.movieDuration || "",
            movieImage: data.movie.movieImage || "",
            trailer: data.detail.trailer || "",
            ageName: data.detail.ageName || "",
            movieStatus: getStatusLabel(data.movie.movieStatus) ?? "",
            country: data.detail.country || "",
            movieGenres: data.movie.genres || [],
            startDate: data.detail.startDate || "",
            status: data.movie.status || "",
            description: data.detail.description || "",
            directors:
              data.detail.directors.map((director) => director.id) || [],
            actors: data.detail.actors.map((actor) => actor.id) || [],
          };

          setForm(updatedForm);
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }, [id, ages, genres]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/movies/${id}`);
      setToast({ message: "Xóa phim thành công!" });
      setTimeout(() => {
        navigate("/movieManager"); // Redirect to movie manager after deletion
      }, 1500); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Xóa phim thất bại!");
    }
  };
  return (
    <div className="grid grid-cols-12">
      {toast && (
        <SuccessToast message={toast.message} onClose={() => setToast(null)} />
      )}
      <div className="col-span-2">
        <NavbarAdmin />
      </div>
      <div className="col-span-10">
        <div className="bg-white col-span-10 h-[100vh] p-[30px]">
          <HeaderAdmin />
          <p className="font-bold text-[28px]">XÓA PHIM</p>
          <div className="mt-[30px] pl-[30px]">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-5 ">
                <div className="col-span-6 gap-y-4 flex flex-col">
                  <div>
                    <label
                      htmlFor="movieName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tên phim
                    </label>
                    <input
                      type="text"
                      id="movieName"
                      value={form.movieName}
                      placeholder="Tên phim"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="movieDuration"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Thời lượng (phút)
                    </label>
                    <input
                      type="text"
                      id="movieDuration"
                      value={form.movieDuration}
                      placeholder="Thời lượng (phút)"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-bold text-gray-700"
                    >
                      Ngày khởi chiếu
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={form.startDate}
                      placeholder="dd/MM/yyyy"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ageId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Độ tuổi giới hạn
                    </label>
                    <input
                      type="text"
                      id="ageId"
                      value={form.ageName}
                      placeholder="your@email.com"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      readOnly
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Trạng thái
                    </label>
                    <input
                      type="text"
                      id="movieStatus"
                      value={form.movieStatus}
                      placeholder="your@email.com"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      readOnly
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mô tả
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      value={form.description}
                      placeholder="Tên phim"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      readOnly
                    />
                  </div>
                  {/* Button submit */}
                  <div className="mt-[56px]">
                    <Link to={"/movieManager"}>
                      <button className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer">
                        Huỷ
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className={`bg-red-500 text-white font-bold w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer hover:bg-gray-800`}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <div className="col-span-6 flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="trailer"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Trailer
                    </label>
                    {form.trailer && (
                      <video
                        src={form.trailer}
                        controls
                        className="mt-2 w-[404px] rounded-md border"
                      />
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="movieGenres"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Thể loại
                    </label>
                    <input
                      type="text"
                      id="genres"
                      value={form.movieGenres.join(", ")}
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      readOnly
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quốc gia
                    </label>
                    <input
                      type="text"
                      id="country"
                      value={form.country}
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      readOnly
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="movieImage"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ảnh phim
                    </label>
                    {form.movieImage && (
                      <div className="flex items-center justify-center mt-2 w-[404px]">
                        <img
                          src={form.movieImage}
                          alt="Preview"
                          className="mt-2 w-40 h-40 object-cover rounded-md border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteMovie;
