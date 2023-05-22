class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /*выносим общий кусок для методов*/
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
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
      body: JSON.stringify({
        country: movie.country, // страна создания фильма. Обязательное поле-строка.
        director: movie.director, // режиссёр фильма. Обязательное поле-строка.
        duration: movie.duration, // длительность фильма. Обязательное поле-число.
        year: movie.year, // год выпуска фильма. Обязательное поле-строка.
        description: movie.description, // описание фильма. Обязательное поле-строка.
        image: `https://api.nomoreparties.co/${movie.image.url}`, // ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
        trailerLink: movie.trailerLink, // ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
        thumbnail: `https://api.nomoreparties.co/${movie.thumbnail.url}`, // миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
        owner: movie.owner, // _id пользователя, который сохранил фильм. Обязательное поле.
        movieId: movie.movieId, // id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
        nameRU: movie.nameRU, // название фильма на русском языке. Обязательное поле-строка.
        nameEN: movie.nameEN,
      }),
      credentials: "include", // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  removeMovie(movieId) {
    return fetch(`${this._baseUrl}/cards/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include", // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: "include", // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include", // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.removeLike(cardId);
    } else {
      return this.addLike(cardId);
    }
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

  editUserAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar,
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
