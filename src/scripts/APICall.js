import 'regenerator-runtime';

const getScore = async (url, opt, callback) => {
  opt.method = 'GET';
  delete opt.body;

  try {
    const res = await fetch(url, opt);
    const data = await res.json();
    return callback(data);
  } catch (e) {
    throw new Error(e);
  }
};

const setScore = async (url, opt, userData, callback) => {
  opt.method = 'POST';
  opt.body = JSON.stringify(userData);

  try {
    const res = await fetch(url, opt);
    const data = await res.json();
    return callback(data);
  } catch (e) {
    throw new Error(e);
  }
};

export { getScore, setScore };