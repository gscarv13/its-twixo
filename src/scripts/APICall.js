import 'regenerator-runtime';

async function getScore(url, opt, callback) {
  opt.method = 'GET';
  delete opt.body;

  const res = await fetch(url, opt);
  const data = await res.json();
  return (callback.bind(this))(data);
}

async function setScore(url, opt, userData, callback) {
  opt.method = 'POST';
  opt.body = JSON.stringify(userData);
  const res = await fetch(url, opt);
  const data = await res.json();
  return (callback.bind(this))(data);
}

export { getScore, setScore };