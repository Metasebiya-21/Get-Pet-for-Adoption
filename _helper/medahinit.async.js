//wait for some seconds
const resolveAfterXSeconds  = (x) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, x * 10 ** 3);
  });
}

module.exports = { resolveAfterXSeconds }