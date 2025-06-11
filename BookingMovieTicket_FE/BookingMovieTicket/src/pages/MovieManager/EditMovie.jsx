import React, { useEffect, useRef, useState } from "react";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuListCollapse } from "react-icons/lu";
import { initFlowbite } from "flowbite";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import TomSelect from "tom-select";
import countries from "../../assets/data/countries.json";
import SuccessToast from "../../components/toasts/SuccessToast";
import { FaPray } from "react-icons/fa";

const MOVIE_STATUS = {
  STOPPED: -1,
  UPCOMING: 0,
  SHOWING: 1,
};
const MediaType = {
  MOVIE_IMAGE: "MOVIE_IMAGE",
  DIRECTOR_IMAGE: "DIRECTOR_IMAGE",
  ACTOR_IMAGE: "ACTOR_IMAGE",
  TRAILER: "TRAILER",
};
function EditMovie() {
  const [image, setImage] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [ages, setAges] = useState([]);
  const [genres, setGenres] = useState([]);
  const selectRef = useRef(null);
  const tomSelectInstance = useRef(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const { id } = useParams();
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();
  const [oldImageUrl, setOldImageUrl] = useState(null);
  const [oldTrailerUrl, setOldTrailerUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    movieId: "",
    movieName: "",
    movieDuration: "",
    movieImage: "",
    trailer: "",
    ageId: "",
    movieStatus: "",
    country: "",
    movieGenres: [],
    startDate: "",
    status: true,
    directors: [],
    actors: [],
    description: "",
  });
  useEffect(() => {
    initFlowbite();
  }, []);
  //Tạo tham chiếu đến TomSelect để sử dụng trong useEffect
  useEffect(() => {
    // Khởi tạo TomSelect 1 lần duy nhất
    if (selectRef.current && !tomSelectInstance.current) {
      tomSelectInstance.current = new TomSelect(selectRef.current, {
        maxItems: null,
        plugins: ["remove_button"],
        placeholder: "Chọn thể loại phim",
        onChange: (values) => {
          setForm((prevForm) => ({
            ...prevForm,
            movieGenres: values,
          }));
        },
      });

      // Tùy chỉnh css nếu cần
      const container = tomSelectInstance.current.wrapper;
      container.classList.add("w-[404px]", "transition", "h-[50px]");
      const control = container.querySelector(".ts-control");
      control.classList.add("h-full");
    }

    return () => {
      if (tomSelectInstance.current) {
        tomSelectInstance.current.destroy();
        tomSelectInstance.current = null;
      }
    };
  }, []);

  // Lấy danh sách thể loại phim từ server
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:8080/genres/list");
        const fetchedGenres = response.data;
        setGenres(fetchedGenres);
        if (tomSelectInstance.current) {
          tomSelectInstance.current.clearOptions(); // xóa dữ liệu cũ nếu có

          fetchedGenres.forEach((genre) => {
            tomSelectInstance.current.addOption({
              value: genre.id,
              text: genre.genreName,
            });
          });
          tomSelectInstance.current.refreshOptions(false);
        }
      } catch (error) {
        console.error("There was an error fetching genres!", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const countryArray = Object.entries(countries).map(([code, name]) => ({
      code,
      name,
    }));
    setCountriesList(countryArray);
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
    try {
      axios
        .get(`http://localhost:8080/movies/${id}`)
        .then((response) => {
          const data = response.data;
          const ageId = ages.find((a) => a.ageType === data.detail.ageName)?.id;
          const genreNames = data.movie.genres.map(
            (genre) => genres.find((g) => g.genreName === genre)?.id
          );
          const updatedForm = {
            movieName: data.movie.movieName || "",
            movieDuration: data.movie.movieDuration || "",
            movieImage: data.movie.movieImage || "",
            trailer: data.detail.trailer || "",
            ageId: ageId,
            movieStatus: data.movie.movieStatus ?? "",
            country: data.detail.country || "",
            movieGenres: genreNames || [],
            startDate: data.detail.startDate || "",
            status: data.movie.status || "",
            description: data.detail.description || "",
            directors:
              data.detail.directors.map((director) => director.id) || [],
            actors: data.detail.actors.map((actor) => actor.id) || [],
          };

          setForm(updatedForm);
          setOldImageUrl(updatedForm.movieImage);
          setOldTrailerUrl(updatedForm.trailer);
          tomSelectInstance.current.setValue(updatedForm.movieGenres);
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }, [id, ages, countriesList, genres]);
  const uploadToCloudinary = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type); // 'IMAGE' or 'VIDEO'

    const response = await axios.post(
      "http://localhost:8080/uploads",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.url;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    console.log(form);
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview ảnh
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload lên Cloudinary
    try {
      setLoadingImage(true);
      const url = await uploadToCloudinary(file, MediaType.MOVIE_IMAGE);
      setForm((prev) => ({
        ...prev,
        movieImage: url,
      }));
    } catch (err) {
      console.error("Lỗi khi upload ảnh:", err);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleTrailerChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoadingTrailer(true);
      const url = await uploadToCloudinary(file, MediaType.TRAILER);
      setForm((prev) => ({
        ...prev,
        trailer: url,
      }));
    } catch (err) {
      console.error("Lỗi khi upload trailer:", err);
    } finally {
      setLoadingTrailer(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (form.movieImage !== oldImageUrl) {
      try {
        await axios.delete(`http://localhost:8080/uploads/delete`, {
          params: { type: MediaType.MOVIE_IMAGE },
          data: { url: oldImageUrl },
        });
      } catch (error) {
        console.error("Lỗi khi xóa ảnh phim:", error);
      }
    }
    console.log(form.movieImage !== oldImageUrl, oldImageUrl, form.movieImage);
    if (form.trailer !== oldTrailerUrl) {
      try {
        await axios.delete(`http://localhost:8080/uploads/delete`, {
          params: { type: MediaType.TRAILER },
          data: { url: oldTrailerUrl },
        });
      } catch (error) {
        console.error("Lỗi khi xóa trailer:", error);
      }
    }
    console.log(form.trailer !== oldTrailerUrl, oldTrailerUrl, form.trailer);
    try {
      const { actors, directors, ...payload } = form;
      console.log(actors, directors);
      const transformedPayload = {
        ...payload,
        movieId: id,
        movieGenres: payload.movieGenres.map(Number),
      };
      console.log("Transformed Payload:", transformedPayload);
      const response = await axios.put(
        `http://localhost:8080/movies/details/${id}`,
        transformedPayload
      );
      console.log("Cập nhật thành công:", response.data);
      setToast({ message: "Sửa phim thành công!" });
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(`/movieManager`); // Chuyển hướng về trang quản lý phim
      }, 1500);
    } catch (error) {
      console.error("Lỗi khi cập nhật phim:", error);
      alert("Cập nhật phim thất bại!");
    } finally {
      setIsSubmitting(false);
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
      <div className="bg-white col-span-10 h-[100vh] p-[30px]">
        <HeaderAdmin />
        <p className="font-bold text-[28px]">SỬA PHIM</p>
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
                    onChange={handleChange}
                    placeholder="Tên phim"
                    className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
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
                    onChange={handleChange}
                    placeholder="Thời lượng (phút)"
                    className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
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
                    onChange={handleChange}
                    placeholder="dd/MM/yyyy"
                    className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ageId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Độ tuổi giới hạn
                  </label>
                  <select
                    type="text"
                    id="ageId"
                    value={form.ageId}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  >
                    {ages.length > 0 ? (
                      ages.map((age) => (
                        <option key={age.id} value={age.id}>
                          {age.ageType}
                        </option>
                      ))
                    ) : (
                      <option>N/A</option>
                    )}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Trạng thái
                  </label>
                  <select
                    type="text"
                    id="movieStatus"
                    value={form.movieStatus}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  >
                    <option value={MOVIE_STATUS.STOPPED}>Ngừng chiếu</option>
                    <option value={MOVIE_STATUS.UPCOMING}>Sắp chiếu</option>
                    <option value={MOVIE_STATUS.SHOWING}>Đang chiếu</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mô tả <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Tên phim"
                    className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
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
                    disabled={loadingTrailer || isSubmitting || loadingImage}
                    className={`bg-black text-white font-bold w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer
    ${isSubmitting || loadingTrailer || loadingImage
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-800"
                      }`}
                  >
                    Lưu
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
                  <input
                    type="file"
                    id="trailer"
                    onChange={handleTrailerChange}
                    placeholder="Mô tả phim"
                    className="bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition w-[404px]"
                  />
                  {loadingTrailer && (
                    <p className="text-blue-500 mt-2">
                      Đang tải trailer, vui lòng chờ...
                    </p>
                  )}
                  {form.trailer && !loadingTrailer && (
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
                  <select ref={selectRef} id="movieGenres" multiple></select>
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quốc gia
                  </label>
                  <select
                    type="text"
                    id="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  >
                    {countriesList.length > 0 ? (
                      countriesList.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))
                    ) : (
                      <option>Không có quốc gia</option>
                    )}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="movieImage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ảnh phim
                  </label>
                  <input
                    type="file"
                    id="movieImage"
                    placeholder="image"
                    className="bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition w-[404px]"
                    onChange={handleImageChange}
                  />
                  {image ? (
                    <div className="flex items-center justify-center mt-2 w-[404px]">
                      <img
                        src={image}
                        alt="Preview"
                        className="mt-2 w-40 h-40 object-cover rounded-md border"
                      />
                    </div>
                  ) : form.movieImage ? (
                    <div className="flex items-center justify-center mt-2 w-[404px]">
                      <img
                        src={form.movieImage}
                        alt="Preview"
                        className="mt-2 w-40 h-40 object-cover rounded-md border"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-between mt-8 border-t-4 border-gray-400 shadow-md p-2">
          <p className="font-bold text-xl">Đạo diễn</p>
          <button
            data-collapse-toggle="collapseDirector"
            type="button"
            className="font-medium items-start cursor-pointer flex"
          >
            <LuListCollapse />
          </button>
        </div>
        <div id="collapseDirector" className="hidden">
          <div className="font-medium  dark:text-gray-200">
            <div className="flex items-center w-full">
              <table className="table-auto w-full text-left text-sm">
                <thead>
                  <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                    <th className="px-4 py-2">Tên đạo diễn</th>
                    <th className="px-4 py-2 flex items-end justify-end">
                      <button
                        data-modal-target="crud-modal"
                        data-modal-toggle="crud-modal"
                      >
                        <IoMdAddCircle className="w-8 h-8 cursor-pointer text-blue-600 hover:text-blue-800" />
                      </button>
                      <div
                        id="crud-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                      >
                        <div className="relative p-4 w-full max-w-md max-h-full">
                          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Thêm đạo diễn
                              </h3>
                              <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                              >
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                                <span className="sr-only">Close modal</span>
                              </button>
                            </div>
                            <form className="p-4 md:p-5">
                              <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                  <label
                                    htmlFor="director_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Tên đạo diễn
                                  </label>
                                  <select
                                    type="text"
                                    id="director_name"
                                    className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    required
                                  >
                                    <option>-- Chọn đạo diễn --</option>
                                    <option>Trấn Thành</option>
                                    <option>Trấn Thành 1</option>
                                    <option>Trấn Thành 2</option>
                                  </select>
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                <svg
                                  className="me-1 -ms-1 w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                Thêm
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#EEEEEE]">
                    <td className="px-4 py-2">Biệt đội sấm sét</td>

                    <td className="px-4 py-2 flex space-x-4">
                      <button
                        className="text-red-600 hover:text-red-800 text-[20px] cursor-pointer"
                        onClick={() => alert("Xóa thành công")}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-8 border-t-4 border-gray-400 shadow-md p-2">
          <p className="font-bold text-xl">Diễn viên</p>
          <button
            data-collapse-toggle="collapseActor"
            type="button"
            className="font-medium items-start cursor-pointer flex"
          >
            <LuListCollapse />
          </button>
        </div>
        <div id="collapseActor" className="hidden">
          <div className="font-medium  dark:text-gray-200">
            <div className="flex items-center w-full">
              <table className="table-auto w-full text-left text-sm">
                <thead>
                  <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                    <th className="px-4 py-2">Tên diễn viên</th>
                    <th className="px-4 py-2 flex items-end justify-end">
                      <button
                        data-modal-target="crud-modal"
                        data-modal-toggle="crud-modal"
                      >
                        <IoMdAddCircle className="w-8 h-8 cursor-pointer text-blue-600 hover:text-blue-800" />
                      </button>
                      <div
                        id="crud-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                      >
                        <div className="relative p-4 w-full max-w-md max-h-full">
                          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Thêm diễn viên
                              </h3>
                              <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                              >
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                                <span className="sr-only">Close modal</span>
                              </button>
                            </div>
                            <form className="p-4 md:p-5">
                              <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                  <label
                                    htmlFor="actor_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Tên diễn viên
                                  </label>
                                  <select
                                    type="text"
                                    id="actor_name"
                                    className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    required
                                  >
                                    <option>-- Chọn diễn viên --</option>
                                    <option>Trấn Thành</option>
                                    <option>Trấn Thành 1</option>
                                    <option>Trấn Thành 2</option>
                                  </select>
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                <svg
                                  className="me-1 -ms-1 w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                Thêm
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#EEEEEE]">
                    <td className="px-4 py-2">Biệt đội sấm sét</td>

                    <td className="px-4 py-2 flex space-x-4">
                      <button
                        className="text-red-600 hover:text-red-800 text-[20px] cursor-pointer"
                        onClick={() => alert("Xóa thành công")}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMovie;
