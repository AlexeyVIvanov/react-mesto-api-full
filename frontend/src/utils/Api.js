
class Api {
  constructor({ baseUrl }) {    
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {    
      authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
  },  
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {    
      authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
  },  
    }).then(this._checkResponse);
  }

  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {    
      authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
  },  
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {    
      authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
  },  
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteConfirmCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {    
      authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
  },  
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {    
      authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
  },  
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {    
      authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
  },  
      }).then(this._checkResponse);
    }
  }

  updateAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {    
      authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
  },  
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://api.1970ivanov.nomoredomains.sbs',  
});
