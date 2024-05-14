import { fetchUserProfile, updateUserProfile } from "@/services/user.service";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingScreen from "../loading-animation/LoadingScreen";
import Swal from "sweetalert2";

export default function Profile() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");

  const [error, setError] = useState("");
  const { push } = useRouter();

  useEffect(() => {
    const getUserProfile = async () => {
      if (!token) {
        push("/auth/login");
      }
      setLoading(true);
      try {
        const res = await fetchUserProfile(token);
        const data = res.data.data;
        setImage(data.photoProfileUrl);
        setName(data.name);
        setCountry(data.country);
        setCity(data.city);
        setEmail(data.Auth?.email);
        setPhone(data.Auth.phoneNumber);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const phonePattern = /^[+]*[(]{0,1}[0-9]{0,4}[)]{0,1}[-\s\./0-9]*$/;
    if (phonePattern.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateUserProfile(
        token,
        {
          name,
          country,
          city,
          phoneNumber: phone,
        },
        imageFile
      );
      if (res.data.status === "Success") {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Berhasil memperbarui data profil",
          confirmButtonText: "Ok",
          confirmButtonColor: "#00CCF4",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal memperbarui profil",
          text: res.data.message,
          confirmButtonText: "Ok",
          confirmButtonColor: "#00CCF4",
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <form className="w-full px-2" encType="multipart/form-data">
          <div className="flex justify-center">
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image-upload"
              className="hover:cursor-pointer relative"
            >
              <Image
                src={image || ""}
                alt="Uploaded"
                className="uploaded-image rounded-full  border-primary-01 border-2 p-1.5 w-[70px] h-[70px] object-cover"
                width={70}
                height={70}
              />
              <div className="bg-white absolute z-10 -right-1  -bottom-1 p-1 rounded-md">
                <Image
                  src={
                    "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/Icons/gallery.png?updatedAt=1714223717099"
                  }
                  width={18}
                  height={16}
                ></Image>
              </div>
            </label>
          </div>
          <div className="flex flex-col mt-4 text-sm">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              className="mt-1 border border-neutral-03 outline-none p-2 rounded-xl "
              id="email"
              value={email || ""}
              disabled
              placeholder="Masukkan email anda"
            />
            <p className="text-red-500 text-xs mt-0.5">
              Catatan: email tidak dapat diubah
            </p>
            <label htmlFor="name" className="font-semibold mt-2">
              Nama
            </label>
            <input
              type="text"
              className="mt-1 border border-neutral-03 outline-none p-2 rounded-xl"
              id="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama anda"
            />
            <label htmlFor="phoneNumber" className="font-semibold mt-2">
              Nomor Telepon
            </label>
            <input
              type="text"
              className="mt-1 border border-neutral-03 outline-none p-2 rounded-xl"
              id="phoneNumber"
              value={phone || ""}
              onChange={(e) => handlePhoneNumberChange(e)}
              placeholder="Masukkan nomor telepon anda"
            />
            <label htmlFor="country" className="font-semibold mt-2">
              Negara
            </label>
            <input
              type="text"
              className="mt-1 border border-neutral-03 outline-none p-2 rounded-xl"
              id="country"
              value={country || ""}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Masukkan negara tempat tinggal"
            />
            <label htmlFor="city" className="font-semibold mt-2">
              Kota
            </label>
            <input
              type="text"
              className="mt-1 border border-neutral-03 outline-none p-2 rounded-xl"
              id="city"
              value={city || ""}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Masukkan kota tempat tinggal"
            />
            <button
              className="bg-primary-01 text-white mt-6 font-bold p-2 rounded-xl"
              onClick={(e) => handleSubmit(e)}
            >
              Simpan Profil Saya
            </button>
          </div>
        </form>
      )}
    </>
  );
}
