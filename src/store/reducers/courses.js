const initialState = {
  courses: [],
  currentCourse: null
  // [
  //   {
  //     id: 1,
  //     name: "HIIT",
  //     description: `Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
  //     facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
  //     referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
  //     electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei
  //     ex natum rebum iisque.`,
  //     image: "https://media1.popsugar-assets.com/files/thumbor/pI3P7teOIHTRTzwSIKHjpsgPzU8/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/04/20/829/n/1922398/87bdfb837bde543b_LO4A4394.jpg",
  //     tags: ["#high intensity"],
  //     rating: 4,
  //     reviews: ["really hard", "sos i'm dying"],
  //     gymId: 1,
  //     trainersId: [1],
  //     price: 20,
  //     color: "#fdb44d",
  //     duration: 50
  //   },
  //   {
  //     id: 2,
  //     name: "Strength training",
  //     description: `Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine
  //     definitiones. Quot wisi nulla ex duo. Vis sint solet expetenda ne, his te
  //     phaedrum referrentur consectetuer. Id vix fabulas oporteat, ei quo vide
  //     phaedrum, vim vivendum maiestatis in.`,
  //     image: "https://media1.popsugar-assets.com/files/thumbor/_VWbT-dquBzJKjM4wk-ydIMTYPc/0x0:3332x3332/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/07/02/645/n/1922729/50b6e7bc5d1b6a41402835.59426600_/i/What-Strength-Training-Exercises-Best-Weight-Loss.jpg",
  //     tags: ["#building strength", "#increase muscles"],
  //     rating: 5,
  //     reviews: ["i could barely walk after", "ouch", "amazing"],
  //     gymId: 2,
  //     trainersId: [1],
  //     price: 30,
  //     color: "#fa607e",
  //     duration: 50
  //   },
  //   {
  //     id: 3,
  //     name: "Pilates",
  //     description: `Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut
  //     facer dolores adolescens, no illum aperiri quo, usu odio brute at. Qui te
  //     porro electram, ea dico facete utroque quo. Populo quodsi te eam, wisi
  //     everti eos ex, eum elitr altera utamur at. Quodsi convenire mnesarchum eu
  //     per, quas minimum postulant per id.`,
  //     image: "https://mymotric.ro/wp-content/uploads/2020/06/pilates-beneficii_ok.jpg",
  //     tags: ["#relaxing"],
  //     rating: 3,
  //     reviews: ["The slow pace is so relaxing", "somehow challenging sometimes"],
  //     gymId: 2,
  //     trainersId: [1, 2],
  //     price: 50,
  //     color: "#4786ff",
  //     duration: 50
  //   },
  //   {
  //     id: 4,
  //     name: "Tabata",
  //     description: `Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut
  //     facer dolores adolescens, no illum aperiri quo, usu odio brute at. Qui te
  //     porro electram, ea dico facete utroque quo. Populo quodsi te eam, wisi
  //     everti eos ex, eum elitr altera utamur at. Quodsi convenire mnesarchum eu
  //     per, quas minimum postulant per id.`,
  //     image: "https://mymotric.ro/wp-content/uploads/2020/06/pilates-beneficii_ok.jpg",
  //     tags: ["#relaxing"],
  //     rating: 3,
  //     reviews: ["The slow pace is so relaxing", "somehow challenging sometimes"],
  //     gymId: 3,
  //     trainersId: [1, 2],
  //     price: 50,
  //     color: "#34eb64",
  //     duration: 50
  //   }
  // ]
}

export default function addCourse(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COURSE':
      return { ...state, courses: [...state.courses, { ...action.course }] }
    case 'SET_COURSES':
      return { ...state, courses: action.courses }
    case 'SET_COURSE':
      return { ...state, currentCourse: action.course }
    case 'EDIT_COURSE':
      return { ...state, courses: state.courses.map((course) => course._id === action.course._id ? action.course : course)}
    default:
      return state
  }
}