import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      } popup_theme_light`}
      onClick={props.onCloseOverlay}
    >
      <div className="popup__container popup__container_theme_light">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close popup__close-popup-edit-form"
        ></button>
        <form
          onSubmit={props.onSubmit}
          name={`${props.name}`}
          className="popup__form popup__form-edit-profile"
        >
          <h2 className="popup__title popup__title_theme_light">
            {props.title}
          </h2>
          {props.children}
          <button
            type="submit"
            className="popup__submit popup__submit-edit-profile popup__submit_theme_light"
          >
            {props.buttonTitle}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
