const initialState = {
  gyms: [
    { id: 1,
      name: "WorldClass",
      address: "Street name",
      description: `Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
      facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
      referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
      electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei
      ex natum rebum iisque.`,
      image: "https://www.worldclass.ro/wp-content/uploads/worldclass-romania-story-homepage.jpg",
      tags: ["#hardWork", "#styluus"],
      rating: 4,
      reviews: ["cool gym", "great", "wow"] },
    { id: 2,
      name: "FitClass",
      address: "Street name2",
      description: `Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine
      definitiones. Quot wisi nulla ex duo. Vis sint solet expetenda ne, his te
      phaedrum referrentur consectetuer. Id vix fabulas oporteat, ei quo vide
      phaedrum, vim vivendum maiestatis in.`,
      image: "https://fitclass.ro/fitness-bucuresti/wp-content/uploads/2017/01/poza_fitclass_club_40-1030x685.jpg",
      tags: ["#fitLife", "#absss"],
      rating: 5,
      reviews: ["amazing atmosphere", "cool trainers"] },
    { id: 3,
      name: "SanGym",
      address: "Street name3",
      description: `Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut
      facer dolores adolescens, no illum aperiri quo, usu odio brute at. Qui te
      porro electram, ea dico facete utroque quo. Populo quodsi te eam, wisi
      everti eos ex, eum elitr altera utamur at. Quodsi convenire mnesarchum eu
      per, quas minimum postulant per id.`,
      image: "https://www.salabucuresti.ro/images/pages/SAN_GYM_KQ4.jpg",
      tags: ["#makingYourDaysSannier", "#gymLife"],
      rating: 3,
      reviews: ["more variety needed"] }
  ]
}

export default function addGym(state = initialState, action) {
  console.log(state)
  switch (action.type) {
    case 'ADD_GYM':
      return { ...state, gyms: [...state.gyms, {...action.gym, id: state.gyms.length + 1}] }
    case 'SET_GYMS':
      return { ...state, gyms: action.gyms }
    case 'EDIT_GYM': 
      return {...state, gyms: state.gyms.map((gym) => gym.id === action.gym.id ? action.gym : gym)}
    default:
      return state
  }
}