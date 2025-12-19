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
  }, [push, token]);

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
        imageFile,
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
              className="relative hover:cursor-pointer"
            >
              <Image
                src={image || ""}
                alt="Uploaded"
                className="uploaded-image h-[70px]  w-[70px] rounded-full border-2 border-primary-01 object-cover p-1.5"
                width={70}
                height={70}
              />
              <div className="absolute -bottom-1 -right-1 z-10  rounded-md bg-white p-1">
                <Image
                  src={
                    "https://ik.imagekit.io/vsecvavlp/SINOW%20assets/Icons/gallery.png?updatedAt=1714223717099"
                  }
                  width={18}
                  height={16}
                  alt="upload icon"
                ></Image>
              </div>
            </label>
          </div>
          <div className="mt-4 flex flex-col text-sm">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              className="mt-1 rounded-xl border border-neutral-03 p-2 outline-none "
              id="email"
              value={email || ""}
              disabled
              placeholder="Masukkan email anda"
            />
            <p className="mt-0.5 text-xs text-red-500">
              Catatan: email tidak dapat diubah
            </p>
            <label htmlFor="name" className="mt-2 font-semibold">
              Nama
            </label>
            <input
              type="text"
              className="mt-1 rounded-xl border border-neutral-03 p-2 outline-none"
              id="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama anda"
            />
            <label htmlFor="phoneNumber" className="mt-2 font-semibold">
              Nomor Telepon
            </label>
            <input
              type="text"
              className="mt-1 rounded-xl border border-neutral-03 p-2 outline-none"
              id="phoneNumber"
              value={phone || ""}
              onChange={(e) => handlePhoneNumberChange(e)}
              placeholder="Masukkan nomor telepon anda"
            />
            <label htmlFor="country" className="mt-2 font-semibold">
              Negara
            </label>
            <input
              type="text"
              className="mt-1 rounded-xl border border-neutral-03 p-2 outline-none"
              id="country"
              value={country || ""}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Masukkan negara tempat tinggal"
            />
            <label htmlFor="city" className="mt-2 font-semibold">
              Kota
            </label>
            <input
              type="text"
              className="mt-1 rounded-xl border border-neutral-03 p-2 outline-none"
              id="city"
              value={city || ""}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Masukkan kota tempat tinggal"
            />
            <button
              className="mt-8 rounded-full bg-primary-01 p-2 font-bold text-white"
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
