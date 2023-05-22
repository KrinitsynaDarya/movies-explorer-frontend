class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /*выносим общий кусок для методов*/
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      /*получаем текст ошибки с сервера*/
      return res.json().then((err) => Promise.reject(err));
    }
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: "include", // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(movie),
      credentials: "include", // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  removeMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include", // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: "include", // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  editUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
      }),
      credentials: "include", // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }
}

const mainApi = new Api({
  baseUrl: "https://api.movies.krinitsyna.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
