module.exports = {
  '/api': {
    target: `http://localhost:${process.env.GATEWAY_PORT || 3000}`,
    secure: false,
  }
}
