import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseOverlay={props.onCloseOverlay}
      onSubmit={handleSubmit}
      name="edit-profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      children={
        <>
          <fieldset className="popup__input-container popup__input-container_theme_light">
            <input
              className="popup__input popup__input_theme_light"
              id="popup__input-name"
              type="text"
              name="name"
              /*defaultValue=""*/ value={name || ""}
              onChange={handleNameChange}
              minLength="2"
              maxLength="40"
              placeholder="Имя"
              required
            />
            <span className="popup__input-error popup__input-name-error"></span>
            <input
              className="popup__input popup__input_theme_light"
              id="popup__input-profession"
              type="text"
              name="profession"
              /*defaultValue=""*/ value={description || ""}
              onChange={handleDescriptionChange}
              minLength="2"
              maxLength="200"
              placeholder="Профессия"
              required
            />
            <span className="popup__input-error popup__input-profession-error"></span>
          </fieldset>
        </>
      }
    />
  );
}

export default EditProfilePopup;
