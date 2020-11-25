import * as actionTypes from "../actions/actions";

const initialState = {

  isLoading: false,
  error: false,
};

const applicantReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATEAPPLICANTSTART:
    case actionTypes.UPDATEAPPLICANTSTART: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }

    case actionTypes.CREATEAPPLICANTSUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    }

    case actionTypes.CREATEAPPLICANTFAIL:
    case actionTypes.UPDATEAPPLICANTFAIL: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }

    case actionTypes.DELETESEGMENT: {
      let applicantArray = [...state.applicants];

      const applicantIndex = applicantArray.findIndex(
        (app) => app.applicantId === action.payload.applicantId
      );

      let segmentArray = [
        ...applicantArray[applicantIndex][action.payload.stateName],
      ];

      segmentArray = segmentArray.filter(
        (segment, segmentIndex) => segmentIndex !== action.payload.index
      );

      applicantArray[applicantIndex][action.payload.stateName] = segmentArray;

      return {
        ...state,
        applicants: applicantArray,
      };
    }

    default:
      return state;
  }

};

export default applicantReducers;

// {
//   applicantId: "AAA",
//   firstName: "Mikasa",
//   lastName: "Ackerman",
//   password: "dabesto",
//   headline: "FullStack Dev Ops",
//   address: "Central Plaza, Crossbell State, West Zemuria",
//   city: "Wall Maria",
//   state: "Paradis",
//   zip: "19889",
//   email: "mikasa@surveycorps.com",
//   phone: "08172839319",
//   websites: "www.theackerman.com",
//   details:
//     "The department was founded by Sergei Lou and Guy Bannings in early S.1204 prior to the events of Zero no Kiseki. After Guy's death, Sergei runs as the section's chief. Unlike other departments or bureaus, operations handled in the section consists of listening to every citizen's query to monster hunts.",
//   dateOfBirth: "14-14-1990",
//   status: "Blocked",

//   education: [
//     {
//       school: "Survey Corps Military College",
//       degree: "Bachelor",
//       major: "Biological Defense",
//       location: "Paradis island",
//       startDate: "08/09/2004",
//       endDate: "08/092020",
//       description:
//         "Studying about survey corps routine, goals, missions, and so on",
//     },
//     {
//       school: "Survey Corps Military high school",
//       degree: "other",
//       major: "Science",
//       location: "Paradis island",
//       startDate: "08/09/2004",
//       endDate: "08/092020",
//       description:
//         "studying about paradis island history, corps, area, titans fundamental and many other thing",
//     },
//   ],

//   experience: [
//     {
//       prevTitle: "Chef",
//       prevCompany: "Survey Corps",
//       prevLocation: "Wall Rose",
//       startDate: "08/09/2004",
//       endDate: "08/092020",
//       description:
//         "In charge of wall maria safety issue with titans attack",
//     },
//   ],

//   certification: [
//     {
//       title: "3D maneuver expert",
//       organization: "Institute of Rock Bandung",
//       startDate: "08/09/2004",
//       endDate: "08/092020",
//       description: "Keep flying around titans for 3 hour stright",
//     },
//   ],
//   skills: [
//     "Communication",
//     "Marketing",
//     "React",
//     "Redux",
//     "node js",
//     "monggoDB",
//     "Go Lang",
//     "Javascript Fundamental",
//     "cooking",
//     "Fishing",
//     "Javascript Fundamental",
//     "Javascript Fundamental",
//     "Javascript Fundamental",
//   ],
//   jobApplied: ["IDN001", "RCN001", "SSS001"],
// },

// {
//   applicantId: "BBB",
//   firstName: "Armin",
//   lastName: "Arlet",
//   password: "zawardo",
//   headline: "Jungle Fighter",
//   address: "jl. Kampung Melayu no.100B",
//   city: "Wall Maria",
//   state: "Paradis",
//   zip: "19889",
//   email: "Armin@surveycorps.com",
//   phone: "08172839319",
//   websites: "www.theackerman.com",
//   details:
//     "The department was founded by Sergei Lou and Guy Bannings in early S.1204 prior to the events of Zero no Kiseki. After Guy's death, Sergei runs as the section's chief. Unlike other departments or bureaus, operations handled in the section consists of listening to every citizen's query to monster hunts.",
//   dateOfBirth: "14-14-1990",
//   status: "Regular",

//   education: [
//     {
//       school: "Survey Corps Military School",
//       degree: "Bachelor",
//       major: "Biological Defense",
//       location: "Paradis island",
//       startDate: "08/09/2004",
//       endDate: "08/092020",
//       description:
//         "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
//     },
//     {
//       school: "Survey Corps Military School",
//       degree: "Bachelor",
//       major: "Biological Defense",
//       location: "Paradis island",
//       startDate: "08/09/2004",
//       endDate: "08/092020",
//       description:
//         "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
//     },
//   ],

//   experience: [
//     {
//       prevTitle: "Wall Maria Chief Officer",
//       prevCompany: "Survey Corps",
//       prevLocation: "Wall Rose",
//       startDate: "08/09/2004",
//       endDate: "08/092020",
//       description:
//         "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
//     },
//   ],

//   certification: [
//     {
//       title: "Survey Corps Military School",
//       organization: "Bachelor",
//       startDate: "08/09/2004",
//       endDate: "08/092020",
//       description:
//         "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
//     },
//   ],

//   skills: ["Communication", "Marketing", "React"],
//   jobApplied: ["IDN001", "RCN001", "SSS001"],
// },
