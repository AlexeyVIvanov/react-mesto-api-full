import React from "react";

import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
// Импортируем объект контекста
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

import * as Auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isLoginAnswerPopupOpen, setIsLoginAnswerPopupOpen] = React.useState({
    isOpen: false,
    isAnswer: false,
    isAnswerMessage: "",
  });
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [userData, setUserData] = React.useState();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();
  const location = useLocation();

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      // проверим токен
      Auth.getContent(token)
        .then((res) => {
          if (res) {
            // здесь можем получить данные пользователя!
            let userData = {
              email: res.data.email,
            };

            setLoggedIn(true);
            setUserData(userData);
          }
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  const handleRegister = ({ email, password }) => {
    return Auth.register(email, password)
      .then(() => {
        setIsLoginAnswerPopupOpen({
          isOpen: true,
          isAnswer: true,
          isAnswerMessage: "Вы успешно зарегистрировались!",
        });
        history.push("/sing-in");
      })
      .catch((err) => {
        console.log("err", err); // выведем ошибку в консоль
        setIsLoginAnswerPopupOpen({
          isOpen: true,
          isAnswer: false,
          isAnswerMessage: err,
        });
      });
  };

  const handleLogin = ({ email, password }) => {
    return Auth.authorize(email, password)

      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          tokenCheck();

          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoginAnswerPopupOpen({
          isOpen: true,
          isAnswer: false,
          isAnswerMessage: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  };

  function onLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserData(null);
    history.push("/sign-in");
  }

  function toLogin() {
    history.push("/sign-in");
  }
  function toRegister() {
    history.push("/sign-up");
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  const handleCardDelete = (card) => {
    api
      .deleteConfirmCard(card._id)

      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  };

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getProfile()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [loggedIn]);

  // Открытие ImagePopup
  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link,
    });
  }

  // Закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsLoginAnswerPopupOpen({
      isOpen: false,
      isAnswer: false,
      isAnswerMessage: "",
    });
    setSelectedCard({
      isOpen: false,
      name: "",
      link: "",
    });
  }

  // Закрытие на оверлей
  function closePopupOnOverley(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  // Открытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfile({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar({ avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  return (
    <div className="root common">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            userData={userData}
            text={
              location.pathname === "/sign-in"
                ? "Регистрация"
                : location.pathname === "/sign-up"
                ? "Войти"
                : "Выйти"
            }
            click={
              location.pathname === "/"
                ? onLogout
                : location.pathname === "/sign-in"
                ? toRegister
                : toLogin
            }
          />

          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-up">
              {" "}
              {/*для регистрации*/}
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              {" "}
              {/*для авторизации*/}
              <Login handleLogin={handleLogin} />
            </Route>

            <Route>
              {!loggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/" />}
            </Route>
          </Switch>

          <InfoTooltip
            isOpen={isLoginAnswerPopupOpen.isOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupOnOverley}
            isAnswer={isLoginAnswerPopupOpen.isAnswer}
            isAnswerMessage={isLoginAnswerPopupOpen.isAnswerMessage}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupOnOverley}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupOnOverley}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="delete-confirm"
            title="Вы уверены?"
            buttonTitle="Да"
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupOnOverley}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onCloseOverlay={closePopupOnOverley}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
