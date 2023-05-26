export const BASE_URL = "https://api.movies.krinitsyna.nomoredomains.monster";

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include", // теперь куки посылаются вместе с запросом
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((err) => Promise.reject(err));
    }
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
    credentials: "include", // теперь куки посылаются вместе с запросом
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((err) => Promise.reject(err));
    }
  });
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include", // теперь куки посылаются вместе с запросом
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((err) => Promise.reject(err));
    }
  });
};

export const getContent = () => {
  return fetch(`${BASE_URL}/check`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((err) => Promise.reject(err));
    }
  });
};
