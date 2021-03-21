import mongoose from 'mongoose'

const refreshTokenSchema = mongoose.Schema({
  refreshToken: { type: String },
})

export const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)