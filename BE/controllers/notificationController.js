const { Notification, User } = require("../models");
const { Op } = require("sequelize");
const ApiError = require("../utils/ApiError");

const createNotificationForAllUsers = async (req, res, next) => {
  try {
    const { type, title, content } = req.body;
    const users = await User.findAll({
      where: {
        role: "user",
      },
    });

    const notificationsData = users.map((user) => ({
      type,
      title,
      content,
      userId: user.id,
      isRead: false,
    }));

    await Notification.bulkCreate(notificationsData);

    res.status(201).json({
      status: "success",
      message: "Notifications created successfully",
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getAllNotifications = async (req, res, next) => {
  try {
    const { limit = 50, userId } = req.query;

    if (isNaN(limit) || limit <= 0 || limit > 100) {
      return next(new ApiError("Batas jumlah notifikasi tidak valid", 400));
    }

    if (userId && (isNaN(userId) || userId <= 0)) {
      return next(new ApiError("ID pengguna tidak valid", 400));
    }

    const queryOptions = {
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
    };

    if (userId) {
      queryOptions.where = {
        userId,
      };
    }

    const notifications = await Notification.findAll(queryOptions);

    if (!notifications || notifications.length === 0) {
      return next(new ApiError("Tidak ada notifikasi", 404));
    }

    res.status(200).json({
      status: "success",
      data: notifications,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getUserNotification = async (req, res, next) => {
  try {
    const userNotifications = await Notification.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    if (userNotifications.length === 0 || !userNotifications) {
      return next(new ApiError("Tidak ada notifikasi", 404));
    }

    res.status(200).json({
      status: "success",
      data: notifications,
    });
  } catch (err) {
    return next(new ApiError(err.message, 500));
  }
};

const openNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      return next(new ApiError("Notifikasi tidak ditemukan", 404));
    }

    if (notification.userId !== userId) {
      return next(new ApiError("Akses ditolak", 403));
    }

    await Notification.update(
      {
        isRead: true,
      },
      {
        where: {
          id,
          userId,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Berhasil membuka notifikasi",
      data: notification,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const updateNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, title, content, isRead } = req.body;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      return next(new ApiError("Notifikasi tidak ditemukan", 404));
    }

    const updateData = {};

    if (type) {
      updateData.type = type;
    }

    if (title) {
      updateData.title = title;
    }

    if (content) {
      updateData.content = content;
    }

    if (isRead) {
      updateData.isRead = isRead;
    }

    const [rowCount, [updatedNotification]] = await Notification.update(
      updateData,
      {
        where: {
          id,
        },
      }
    );

    if (rowCount === 0 || !updatedNotification) {
      return next(new ApiError("Notifikasi tidak ditemukan", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Notifikasi diperbarui",
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedNotification = await notification.destroy({
      where: {
        id,
      },
    });

    if (!deletedNotification) {
      return next(new ApiError("Notifikasi tidak ditemukan", 404));
    }

    res.status(200).json({
      status: "success",
      message: `Berhasil menghapus notifikasi dengan id: ${id}`,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createNotificationForAllUsers,
  getAllNotifications,
  getUserNotification,
  openNotification,
  updateNotification,
  deleteNotification,
};