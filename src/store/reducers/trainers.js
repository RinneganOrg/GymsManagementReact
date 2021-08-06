const initialState = {
  trainers: [],
    // [
    //   {
    //     id: 1,
    //     name: "Ben Chilwell",
    //     description: `Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
    //   facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
    //   referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
    //   electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei
    //   ex natum rebum iisque.Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
    //   facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
    //   referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
    //   electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei
    //   ex natum rebum iisque.`,
    //     image: "https://i2-prod.football.london//article20557091.ece/ALTERNATES/s1200c/0_Chilwell.jpg",
    //     tags: ["#hiit", "#abs"],
    //     rating: 4,
    //     reviews: ["cool guy", "amazing", "wow"],
    //     gymId: 2
    //   },
    //   {
    //     id: 2,
    //     name: "Reece James",
    //     description: `Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine
    //   definitiones. Quot wisi nulla ex duo. Vis sint solet expetenda ne, his te
    //   phaedrum referrentur consectetuer. Id vix fabulas oporteat, ei quo vide
    //   phaedrum, vim vivendum maiestatis in. Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
    //   facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
    //   referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
    //   electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei
    //   ex natum rebum iisque.`,
    //     image: "https://bet-bet.net/wp-content/uploads/2020/12/Reece-James.png",
    //     tags: ["#strength", "#muscles"],
    //     rating: 5,
    //     reviews: ["amazing trainer", "funny trainer"],
    //     gymId: 2
    //   }]
  currentTrainer: null
}

export default function addTrainer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TRAINERS':
      return {
        ...state, trainers: action.trainers
      }
    case 'SET_TRAINER':
      return { ...state, currentTrainer: action.trainer }
    case 'ADD_TRAINER':
      return { ...state, trainers: [...state.trainers, { ...action.trainer }] }
    case 'EDIT_TRAINER':
      return { ...state, trainers: state.trainers.map((trainer) => trainer._id === action.trainer._id ? action.trainer : trainer) }
    default:
      return state
  }
}