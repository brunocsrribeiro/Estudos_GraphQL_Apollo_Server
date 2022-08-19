module.exports = async ({ req }) => {
  // Apenas em desenvolvimento
  await require('./userLoginSimulator')(req)

  const auth = req.headers.authorization
}
