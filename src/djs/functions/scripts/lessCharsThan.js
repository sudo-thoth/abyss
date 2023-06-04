let lessCharsThan = (str, num) => {
    let arr = [];
    for (let i = 0; i < str.length; i++) {
      arr.push(str.charAt(i));
    }
    if (arr.length <= num) {
      return true;
    } else {
      return false;
    }
  };
module.exports = lessCharsThan;