import React, { useEffect, useRef, useState } from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link, useNavigate } from "react-router-dom";
import countries from "../../assets/data/countries.json";
import axios from "axios";
import TomSelect from "tom-select";
import SuccessToast from "../../components/toasts/SuccessToast";

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
function AddMovie() {
  const [image, setImage] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [ages, setAges] = useState([]);
  const selectRef = useRef(null);
  const tomSelectInstance = useRef(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [form, setForm] = useState({
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
  });
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

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:8080/genres/list");
        const fetchedGenres = response.data;

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
      const url = await uploadToCloudinary(file, MediaType.MOVIE_IMAGE);
      setForm((prev) => ({
        ...prev,
        movieImage: url,
      }));
    } catch (err) {
      console.error("Lỗi khi upload ảnh:", err);
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
  // const [form, setForm] = useState({
  //   movieName: "",
  //   movieDuration: "",
  //   movieImage: "",
  //   trailer: "",
  //   ageId: "",
  //   movieStatus: "",
  //   country: "",
  //   movieGenres: [],
  //   startDate: "",
  //   status: true,
  // });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // 1. Kiểm tra đầu vào
    if (!form.movieName.trim()) {
      newErrors.movieName = "Tên phim không được để trống";
    }
    if (!form.movieDuration.trim()) {
      newErrors.movieDuration = "Thời lượng phim không được để trống";
    }
    if (!form.ageId.trim()) {
      newErrors.ageId = "Độ tuổi giới hạn không được để trống";
    }
    if (!form.movieStatus.trim()) {
      newErrors.movieStatus = "Trạng thái phim không được để trống";
    }
    if (!form.country.trim()) {
      newErrors.country = "Quốc gia không được để trống";
    }
    if (!form.movieGenres || form.movieGenres.length === 0) {
      newErrors.movieGenres = "Thể loại phim không được để trống";
    }
    if (!form.startDate.trim()) {
      newErrors.startDate = "Ngày khởi chiếu không được để trống";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }

    setErrors({});
    let movieId;

    // 2. Gửi API Movie
    try {
      // const moviePayload = {
      //   movieName: form.movieName,
      //   movieDuration: parseInt(form.movieDuration),
      //   movieImage: form.movieImage,
      //   movieStatus: parseInt(form.movieStatus),
      //   status: form.status,
      //   genres: form.movieGenres,
      // };

      const resData = await axios.post("http://localhost:8080/movies", form);
      movieId = resData.data.id; // Lấy ID của phim mới tạo
      console.log(resData.data);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        Object.assign(newErrors, err.response.data);
        console.log(newErrors);
      } else {
        console.error("Lỗi khi thêm phim:", err);
      }
    }

    // 4. Nếu có lỗi từ 1 trong 2 API
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Trả về UI toàn bộ lỗi từ cả 2 API
      return;
    }

    // 5. Thành công
    setErrors({});
    setToast({ message: "Thêm phim thành công!" });
    setTimeout(() => {
      navigate(`/movieManager/editMovie/${movieId}`);
    }, 1500);
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
          <p className="font-bold text-[28px]">THÊM PHIM</p>
          <div className="mt-[30px] pl-[30px]">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-5 ">
                <div className="col-span-6 gap-y-4 flex flex-col">
                  <div>
                    <label
                      htmlFor="movieName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tên phim <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="movieName"
                      value={form.movieName}
                      onChange={handleChange}
                      placeholder="Tên phim"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                    {errors.movieName && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.movieName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="movieDuration"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Thời lượng (phút) <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="movieDuration"
                      value={form.movieDuration}
                      onChange={handleChange}
                      placeholder="Thời lượng (phút)"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                    {errors.movieDuration && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.movieDuration}
                      </p>
                    )}
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
                    {errors.startDate && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.startDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="ageId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Độ tuổi giới hạn<span className="text-red-600">*</span>
                    </label>
                    <select
                      type="text"
                      id="ageId"
                      value={form.ageId}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    >
                      <option value="">Chọn độ tuổi giới hạn</option>
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
                    {errors.ageId && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.ageId}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Trạng thái<span className="text-red-600">*</span>
                    </label>
                    <select
                      type="text"
                      id="movieStatus"
                      value={form.movieStatus}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    >
                      <option value="">Chọn trạng thái phim</option>
                      <option value={MOVIE_STATUS.STOPPED}>Ngừng chiếu</option>
                      <option value={MOVIE_STATUS.UPCOMING}>Sắp chiếu</option>
                      <option value={MOVIE_STATUS.SHOWING}>Đang chiếu</option>
                    </select>
                    {errors.movieStatus && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.movieStatus}
                      </p>
                    )}
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
                      disabled={loadingTrailer}
                      className="bg-black px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer"
                    >
                      Tạo
                    </button>
                  </div>
                </div>
                <div className="col-span-6 flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="trailer"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Trailer <span className="text-red-600">*</span>
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
                      Thể loại <span className="text-red-600">*</span>
                    </label>
                    <select ref={selectRef} id="movieGenres" multiple></select>
                    {errors.movieGenres && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.movieGenres}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quốc gia <span className="text-red-600">*</span>
                    </label>
                    <select
                      type="text"
                      id="country"
                      value={form.country}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    >
                      <option value="">Chọn quốc gia</option>
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
                    {errors.country && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="movieImage"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ảnh phim <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      id="movieImage"
                      placeholder="image"
                      className="bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition w-[404px]"
                      onChange={handleImageChange}
                    />
                    {image && (
                      <div className="flex items-center justify-center mt-2 w-[404px]">
                        <img
                          src={image}
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

export default AddMovie;
