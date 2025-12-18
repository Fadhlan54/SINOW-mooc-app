'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const process = require('process')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/database.js')[env]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  )
}

db.Auth = require('./auth')(sequelize, Sequelize.DataTypes)
db.Benefit = require('./benefit')(sequelize, Sequelize.DataTypes)
db.Category = require('./category')(sequelize, Sequelize.DataTypes)
db.Chapter = require('./chapter')(sequelize, Sequelize.DataTypes)
db.Course = require('./course')(sequelize, Sequelize.DataTypes)
db.Module = require('./module')(sequelize, Sequelize.DataTypes)
db.Notification = require('./notification')(sequelize, Sequelize.DataTypes)
db.Otp = require('./otp')(sequelize, Sequelize.DataTypes)
db.Transaction = require('./transaction')(sequelize, Sequelize.DataTypes)
db.User = require('./user')(sequelize, Sequelize.DataTypes)
db.UserCourse = require('./usercourse')(sequelize, Sequelize.DataTypes)
db.UserModule = require('./usermodule')(sequelize, Sequelize.DataTypes)

// =================================================================

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
