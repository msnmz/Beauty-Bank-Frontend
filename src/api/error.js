export const handleError = (snackbar, closer, setter) => err => {
  if (setter) setter(false)
  let error = 'Unknown error occurred!'
  if (err?.response?.data) {
    const errors = Object.keys(err.response.data)
    if (errors.length) {
      error = `${errors[0]}: ${err.response.data[errors[0]]}`
    }
  }
  const key = snackbar(error, {variant: 'error', onClick: () => {
    closer(key)
  }})
  return error
}