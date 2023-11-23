const jwt = require("jsonwebtoken");
const { User, Auth } = require("../models");
const ApiError = require("../utils/ApiError");
const validator = require("validator");

const { uploadImage } = require("../lib/imagekitUploader");

const myDetails = async (req, res, next) => {
  try {
    const { id } = req.user;

    console.log(req.user);

    const user = await User.findByPk(id, {
      include: ["Auth"],
    });

    if (!user) {
      throw new ApiError("User tidak ditemukan", 404);
    }

    res.status(200).json({
      status: "success",
      data: req.user,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const updateMyDetails = async (req, res, next) => {
  try {
    const { name, country, city } = req.body;
    let { email, phoneNumber } = req.body;
    const { id } = req.user;

    const user = await User.findByPk(id, {
      include: ["Auth"],
    });

    if (!user) {
      return next(new ApiError("User tidak ditemukan", 404));
    }

    if (!name || !email || !phoneNumber) {
      return next(
        new ApiError("Nama, email, dan nomor telepon harus diisi", 400)
      );
    }

    const updateDataUser = {
      name,
    };

    if (country) {
      updateDataUser.country = country;
    }

    if (city) {
      updateDataUser.city = city;
    }

    if (req.file) {
      const { imageUrl } = await uploadImage(req.file);
      if (!imageUrl) {
        return next(new ApiError("Gagal upload image", 400));
      }
      updateDataUser.photoProfileUrl = imageUrl;
    }

    const updateDataAuth = {
      email,
      phoneNumber,
    };

    email = email.toLowerCase();
    if (!validator.isEmail(email)) {
      return next(new ApiError("Email tidak valid", 400));
    }
    if (email !== user.Auth.email) {
      const isEmailExist = await Auth.findOne({ where: { email } });
      if (isEmailExist) {
        return next(new ApiError("Email sudah terdaftar di lain akun", 400));
      }
    }
    updateDataAuth.email = email;

    if (`${phoneNumber}`.startsWith("0")) {
      phoneNumber = `${phoneNumber.slice(1)}`;
    }

    if (!validator.isMobilePhone(phoneNumber)) {
      return next(new ApiError("Nomor telepon tidak valid", 400));
    }

    if (phoneNumber !== user.Auth.phoneNumber) {
      const isPhoneNumberExist = await Auth.findOne({ where: { phoneNumber } });
      if (isPhoneNumberExist) {
        return next(
          new ApiError("Nomor telepon sudah terdaftar di lain akun", 400)
        );
      }
      updateDataAuth.phoneNumber = phoneNumber;
    }

    const [rowCountUser, [updatedUser]] = await User.update(updateDataUser, {
      where: {
        id,
      },
      returning: true,
    });

    if (rowCountUser === 0 && !updatedUser) {
      return next(new ApiError("Gagal update user", 500));
    }

    const [rowCountAuth, [updatedAuth]] = await Auth.update(
      {
        email,
        phoneNumber,
      },
      {
        where: {
          userId: id,
        },
        returning: true,
      }
    );

    if (rowCountAuth === 0 && !updatedAuth) {
      return next(new ApiError("Gagal update auth", 500));
    }

    res.status(200).json({
      status: "success",
      message: `Berhasil mengupdate data user id: ${id}`,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const changeMyPassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const user = await User.findByPk(id, {
      include: ["Auth"],
    });
    if (!user) {
      return next(new ApiError("User tidak ditemukan", 404));
    }
    if (oldPassword !== user.Auth.password) {
      return next(new ApiError("Password lama tidak sesuai", 400));
    }
    if (newPassword !== confirmNewPassword) {
      return next(new ApiError("Password baru tidak sesuai", 400));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [rowCountAuth, [updatedAuth]] = await Auth.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          userId: id,
        },
        returning: true,
      }
    );
    if (rowCountAuth === 0 && !updatedAuth) {
      return next(new ApiError("Gagal update auth", 500));
    }
    res.status(200).json({
      status: "success",
      message: `Berhasil mengupdate password user: ${user.name}`,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

module.exports = {
  myDetails,
  updateMyDetails,
  changeMyPassword,
};