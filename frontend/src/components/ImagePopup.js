import React from "react";

function ImagePopup(props) {
  return (
    <section
      onClick={props.onCloseOverlay}
      className={`popup popup_type_picture ${
        props.card.isOpen ? "popup_opened" : ""
      } popup_theme_dark`}
    >
      <div className="popup__container-picture">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close popup__close-popup-picture"
        ></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.link}
        />
        <h2 className="popup__caption">{props.card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
