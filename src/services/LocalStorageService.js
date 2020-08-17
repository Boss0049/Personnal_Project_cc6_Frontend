const ACCESS_TOKEN = "ACCESS_TOKEN";

const _setToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

const _getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

const _removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

const _checkToken = () => {
  const token = _getToken();

  if (token) {
    return "user";
  }
  return "guest";
};

export default {
  setToken: _setToken,
  getToken: _getToken,
  removeToken: _removeToken,
  checkToken: _checkToken,
};
