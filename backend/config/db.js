import mongoose from 'mongoose'

export const connectDB = async () => {

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,    
  }

  try {
    const connection = await mongoose.connect(process.env.DB_URI, options)

    console.log(`Mongoose connected with ${await connection.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}