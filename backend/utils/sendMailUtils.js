const randomString = require('randomstring')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const ApiError = require('./ApiError')
const verificationEmailHTML = require('../lib/verificationEmailHTML')
const resetPasswordHTML = require('../lib/resetPasswordHTML')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
})

const generateOTP = () =>
  randomString.generate({ length: 4, charset: 'numeric' })

const sendMail = async (mailOptions) => {
  await transporter.sendMail(mailOptions)
  return true
}

const sendOTPVerificationEmail = async (email) => {
  const otpCode = generateOTP()

  const mailOptions = {
    from: { name: 'SINOW', address: process.env.APP_EMAIL },
    to: email,
    subject: 'SINOW - Verifikasi OTP',
    html: verificationEmailHTML(otpCode),
  }

  await sendMail(mailOptions)

  return otpCode
}

const sendResetPasswordEmail = async (auth) => {
  const generateToken = jwt.sign(
    { id: auth.id, email: auth.email },
    process.env.JWT_SECRET,
    { expiresIn: 1800 },
  )

  const mailOptions = {
    from: { name: process.env.APP_NAME, address: process.env.EMAIL },
    to: auth.email,
    subject: 'SINOW - Reset Password',
    html: resetPasswordHTML(generateToken),
  }

  await sendMail(mailOptions)
  return true
}

module.exports = { sendOTPVerificationEmail, sendResetPasswordEmail }
