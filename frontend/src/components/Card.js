import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `elements__trash ${
    isOwn ? "elements__trash" : "elements__trash_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `elements__like ${
    isLiked ? "elements__like_active" : "elements__like"
  }`;

  function handleClick() {
    props.onImagePopup(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="elements__item">
      <button
        onClick={handleDeleteClick}
        type="button"
        className={cardDeleteButtonClassName}
      ></button>
      <img
        onClick={handleClick}
        className="elements__image"
        src={props.card.link}
        alt={props.card.link}
      />
      <div className="elements__caption">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like-container">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
          ></button>
          <span className="elements__like-count">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </article>
  );
}

export default Card;
