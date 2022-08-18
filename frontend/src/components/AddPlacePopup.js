import React from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handlePlaceChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseOverlay={props.onCloseOverlay}
      onSubmit={handleSubmit}
      name="add-card"
      title="Новое место"
      buttonTitle="Создать"
      children={
        <>
          <fieldset className="popup__input-container popup__input-container_theme_light">
            <input
              value={name || ""}
              onChange={handlePlaceChange}
              className="popup__input popup__input_theme_light"
              id="popup__input-place"
              type="text"
              name="place"
              minLength="2"
              maxLength="30"
              placeholder="Название"
              required
            />
            <span className="popup__input-error popup__input-place-error"></span>
            <input
              value={link || ""}
              onChange={handleLinkChange}
              className="popup__input popup__input_theme_light"
              id="popup__input-link"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__input-error popup__input-link-error"></span>
          </fieldset>
        </>
      }
    />
  );
}

export default AddPlacePopup;
