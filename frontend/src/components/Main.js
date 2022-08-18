import React from "react";

import editButton from "../images/edit-button.svg";
import addButton from "../images/add-button.svg";
import editAvatar from "../images/edit-avatar.svg";

import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Footer from "./Footer";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main>
        <section className="profile">
          <img className="profile__overlay" src={editAvatar} alt="Карандаш" />
          <img
            onClick={props.onEditAvatar}
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                onClick={props.onEditProfile}
                type="button"
                className="profile__edit-button"
              >
                <img src={editButton} alt="Кнопка редактирования" />
              </button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            onClick={props.onAddPlace}
            type="button"
            className="profile__add-button"
          >
            <img src={addButton} alt="Кнопка добавления" />
          </button>
        </section>
        <section className="elements">
          {props.cards.map((card) => (
            <Card
              {...card}
              key={card._id}
              card={card}
              onImagePopup={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
