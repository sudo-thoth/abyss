module.exports = function argName(arg) {
    for (const [key, value] of Object.entries(global)) {
      if (value === arg) {
        return key;
      }
    }
    return "unknown";
  }
  