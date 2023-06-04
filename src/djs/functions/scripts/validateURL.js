module.exports = function validateUrl(url) {
  // Regular expression pattern to validate URLs
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  return urlPattern.test(url);
}
