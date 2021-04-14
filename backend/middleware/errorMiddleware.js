const handleDuplicateKeyError = (error, res) => {
  const field = Object.keys(error.keyValue)[0]
  const formatedError = { message: `User ${field} already exist`, field }
  console.log(formatedError)
  res.status(409).send({ error: formatedError })
}

const formatError = (error) => {
 
  const formatedError = {
    message: error.message, 
    field: null,
    status: 401
  }
  if(error.status) {
    formatedError.status = error.status
  } else if (error.message === "No user found") {
    formatedError.status = 404
  } else if (error.message === "Invalid password") {
    formatedError.status = 403
  } else if (error.message === "Internal server error!") {
    formatedError.status = 500
  } else if (error.message === "Access denied, token missing!") {
    formatedError.status = 401
  } else if (error.message === "Token Expired!") {
    formatedError.status = 401
  } else if (error.message === "Session timed out, please login again") {
    formatedError.status = 401
  } else if (error.message === "Invalid token, please login again") {
    formatedError.status = 401
  }
  return formatedError
}

export const errorMiddleware = (error, req, res, next) => {
  if (error.code === 11000) {
    return handleDuplicateKeyError(error, res)
  }
  console.log(error.message)
  const errorInformation = formatError(error)
  res.status(errorInformation.status).json({ error: errorInformation })
}
