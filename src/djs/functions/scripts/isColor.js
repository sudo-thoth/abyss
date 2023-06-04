module.exports = function isColor(color) {
    if (typeof color !== 'string') {
      return false;
    }
  
    // Check if the color is a valid hexadecimal number.
    const regex = /^[0-9A-Fa-f]{8}$/;
    return regex.test(color);
  }
  