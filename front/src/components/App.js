import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddCardPopup from './AddCardPopup.js'
import PopupWithImage from './PopupWithImage';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {

  // set states for Profile/Current User
  const [currentUser, setCurrentUser] = React.useState({});

  // Call server for Profile/User Content
  React.useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res);
    })
    .catch(err => console.log(err));
  }, []);
  
  // set state for Cards
  const [cards, setCards] = React.useState([]);
  
  React.useEffect(() => {
    // Call server to get initial cards
    api.getCardList().then(res => {
      setCards(res.map((card) =>({
        link: card.link,
        name: card.name,
        likes: card.likes,
        _id: card._id,
        owner: card.owner
      })))
    })
    .catch(err => console.log(err));
  }, []);

  
  // set states for Popups
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  
  // handler functions for Popups
  function handleEditAvatarClick(evt) {
    setIsEditAvatarOpen(true);
  }
  function handleEditProfileClick(evt) {
    setIsEditProfileOpen(true);
  }
  function handleAddCardClick(evt) {
    setIsAddCardOpen(true);
  }
  // function handleDeleteCardClick(evt) {
  //   setIsDeletePopupOpen(true);
  // }
  
  //close popups
  function handleClosePopups(evt) {
    // if(evt.target !== evt.currentTarget) return
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddCardOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  // set image popup state
  const [selectedLink, setSelectedLink] = React.useState('');
  const [selectedName, setSelectedName] = React.useState('');
  
  // handler function for image popup
  function handleCardClick(link, name) {
    setSelectedLink(link);
    setSelectedName(name);
    setIsImagePopupOpen(true);
  }
  
  //control likes and unlikes
  function handleCardLikeStatus(card) {
    // Check one more time if this card was already liked
    
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    let res;

    if (isLiked === false) {
      res = api.cardLikeAdd(card._id)
      } else {
      res = api.cardLikeRemove(card._id)
    }
    res.then((newCard) => {
      // Create a new array based on the existing one and putting a new card into it
      const newCards = cards.map((c) => c._id === card._id ? newCard : c)
      // Update the state
      setCards(newCards);
    })
    .catch(err => console.log(err));
  }

  function handleDeleteCard(card) {
    api.removeCard(card._id).then(() => {
     const cardListCopy = cards.filter(c => c._id !== card._id);
          setCards(cardListCopy);
        })
        .catch( err => console.log(err))
      }

  // update and set Profile
  function handleUpdateProfile(userInfo) {
    api.setUserInfo(userInfo).then (res => {setCurrentUser({...setCurrentUser, name:res.name, about:res.about, avatar:res.avatar})
    })
    .then(() => {handleClosePopups()})
    .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar({ avatar }).then (res => {setCurrentUser({...setCurrentUser, avatar:res.avatar, name:res.name, about:res.about})
    })
    .then(() => {handleClosePopups()})
    .catch(err => console.log(err));
  }

  function handleAddNewCard(cardInfo) {
    api.addCard(cardInfo).then (newCard => 
      setCards([...cards, newCard]))
    .then(() => {handleClosePopups()})
    .catch(err => console.log(err));
  }

  // app JSX
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main 
// Prop values passed to Main.js
        handleEditAvatarClick={handleEditAvatarClick}
        handleEditProfileClick={handleEditProfileClick}
        handleAddCardClick={handleAddCardClick}
        // handleDeleteCardClick={handleDeleteCardClick}
        handleDeleteCard={(card) => {handleDeleteCard(card)}}
        handleCardClick={(link, name)=>{handleCardClick(link, name)}}
        cards={cards}
        handleCardLikeStatus={(card) => handleCardLikeStatus(card)}
      />

  {/* Avatar Popup JSX */}
  <EditAvatarPopup isOpen={isEditAvatarOpen} onClose={handleClosePopups} handleUpdateAvatar={handleUpdateAvatar}/>

  <EditProfilePopup isOpen={isEditProfileOpen} onClose={handleClosePopups} handleUpdateProfile={handleUpdateProfile}/>

  {/* AddCard Popup JSX */}
  <AddCardPopup isOpen={isAddCardOpen} onClose={handleClosePopups} handleAddNewCard={handleAddNewCard} />

  {/* Delete Popup JSX */}
      <PopupWithForm name="delete" title="Are you sure?" buttonText="Yes" isOpen={isDeletePopupOpen} onClose={handleClosePopups} onClick={handleDeleteCard}/>

{/* Image Popup JSX */}
      <PopupWithImage link={selectedLink} name={selectedName} isOpen={isImagePopupOpen} onClose={handleClosePopups}/>

      <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;