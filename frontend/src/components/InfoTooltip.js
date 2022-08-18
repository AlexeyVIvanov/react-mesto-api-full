import React from "react";

import success from "../images/success-icon.svg";
import fail from "../images/fail-icon.svg";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_type_infotooltip ${
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
        <img
          className="popup__emoji"
          src={props.isAnswer ? success : fail}
          alt="Смайлик"
        />
        <h2 className="popup__title-answer">{props.isAnswerMessage}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
