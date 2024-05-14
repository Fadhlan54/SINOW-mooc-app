import { fetchChangePassword } from "@/services/user.service";
import Cookies from "js-cookie";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import LoadingScreen from "../loading-animation/LoadingScreen";

export default function ChangePassword() {
  const token = Cookies.get("token");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Semua kolom harus diisi");
      return;
    }

    if (oldPassword.length < 8) {
      setErrorMessage("Kata sandi lama tidak cocok");
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Konfirmasi kata sandi harus sama dengan kata sandi");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetchChangePassword(token, {
        oldPassword,
        newPassword,
      });

      console.log(res);
      if (res.statusCode === 200) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Berhasil memperbarui kata sandi",
          confirmButtonText: "Ok",
          confirmButtonColor: "#00CCF4",
        });
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full px-2">
      {isLoading && <LoadingScreen />}
      {errorMessage && (
        <div className="absolute bottom-10 right-10 bg-alert-danger rounded-lg ps-4 pe-2 py-2 text-white justify-self-end self-end flex opacity-80">
          <p>{errorMessage}</p>
          <button
            className="ml-2"
            onClick={(e) => {
              e.preventDefault();
              setErrorMessage("");
            }}
          >
            <IoMdClose />
          </button>
        </div>
      )}
      <h1 className="text-center font-bold text-xl">Ubah Kata Sandi</h1>
      <div className="text-sm mt-4">
        <label htmlFor="oldPassword">Kata sandi lama</label>
        <div className="flex items-end w-full">
          <input
            type={showOldPassword ? "text" : "password"}
            id="oldPassword"
            placeholder="Masukkan kata sandi lama"
            className="block border border-r-0 border-neutral-03 rounded-l-2xl py-3 px-4 w-full text-sm mt-1 focus:outline-none"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <div
            className="border border-l-0  border-neutral-03 rounded-r-2xl py-3 px-4 text-xl cursor-pointer"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? (
              <FiEyeOff className="hover:text-primary-01" />
            ) : (
              <FiEye className="hover:text-primary-01" />
            )}
          </div>
        </div>

        <label htmlFor="newPassword" className="mt-2 block">
          Kata sandi baru
        </label>
        <div className="flex items-end ">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            placeholder="Masukkan kata sandi baru"
            className="block border border-r-0 border-neutral-03 rounded-l-2xl py-3 px-4 w-full text-sm mt-1 focus:outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div
            className="border border-l-0  border-neutral-03 rounded-r-2xl py-3 px-4 text-xl cursor-pointer"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <FiEyeOff className="hover:text-primary-01" />
            ) : (
              <FiEye className="hover:text-primary-01" />
            )}
          </div>
        </div>

        <label htmlFor="confirmPassword" className="mt-2 block">
          Konfirmasi kata sandi baru
        </label>
        <div className="flex items-end ">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Masukkan ulang kata sandi baru"
            className="block border border-r-0 border-neutral-03 rounded-l-2xl py-3 px-4 w-full text-sm mt-1 focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            className="border border-l-0  border-neutral-03 rounded-r-2xl py-3 px-4 text-xl cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FiEyeOff className="hover:text-primary-01" />
            ) : (
              <FiEye className="hover:text-primary-01" />
            )}
          </div>
        </div>
        <button
          className="bg-primary-01 hover:bg-primary-03 text-white font-bold text-sm w-full text-center rounded-2xl py-3 mt-6"
          onClick={(e) => handleSubmit(e)}
        >
          Ubah password
        </button>
      </div>
    </div>
  );
}
