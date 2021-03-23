const handleDuplicateKeyError = (error, res) => {
  const field = Object.keys(error.keyValue)[0]   
  const formatedError = {message: `User ${field} already exist`, field}
  console.log(formatedError)  
  res.status(409).send({ error: formatedError })
}

export const errorMiddleware = (error, req, res, next) => {    
  if(error.code === 11000) {     
    return handleDuplicateKeyError(error, res)
  }
  console.log(error.message)  
  const formatedError = { message: error.message, field: null }
  res.status(401).json({ error: formatedError })
}