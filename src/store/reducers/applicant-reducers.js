const initialState = {
  applicants: [
    {
      id: "AAA",
      name: "Mikasa Ackerman",

      headline: "FullStack Dev Ops",
      address: "Central Plaza, Crossbell State, West Zemuria",
      city: "Wall Maria",
      state: "Paradis",
      zip: "19889",
      email: "mikasa@surveycorps.com",
      phone: "08172839319",
      websites: "www.theackerman.com",
      details:
        "The department was founded by Sergei Lou and Guy Bannings in early S.1204 prior to the events of Zero no Kiseki. After Guy's death, Sergei runs as the section's chief. Unlike other departments or bureaus, operations handled in the section consists of listening to every citizen's query to monster hunts.",
      dateOfBirth: "14-14-1990",

      education: {
        school: "Survey Corps Military School",
        degree: "Bachelor",
        major: "Biological Defense",
        location: "Paradis island",
        startDate: "08/09/2004",
        endDate: "08/092020",
        description:
          "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
      },

      experience: {
        prevTitle: "Wall Maria Chief Officer",
        prevCompany: "Survey Corps",
        prevLocation: "Wall Rose",
        startDate: "08/09/2004",
        endDate: "08/092020",
        prevDescription:
          "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
      },

      certification: {
        title: "Survey Corps Military School",
        organization: "Bachelor",
        startDate: "08/09/2004",
        endDate: "08/092020",
        certDescription:
          "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
      },
    },

    {
      id: "BBB",
      name: "Armin Arlert",
      address: "Wall Street no.29",
      city: "Wall Sina",
      state: "Paradis",
      zip: "19889",
      email: "armin@surveycorps.com",
      phone: "08172839319",
      websites: "www.thearlert.com",
      details:
        "The department was founded by Sergei Lou and Guy Bannings in early S.1204 prior to the events of Zero no Kiseki. After Guy's death, Sergei runs as the section's chief. Unlike other departments or bureaus, operations handled in the section consists of listening to every citizen's query to monster hunts.",
      dob: "14-14-1990",

      education: {
        school: "Survey Corps Military School",
        degree: "Bachelor",
        major: "Biological Defense",
        location: "Paradis island",
        startDate: "08/09/2004",
        endDate: "08/092020",
        description:
          "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
      },

      experience: {
        prevTitle: "Wall Maria Chief Officer",
        prevCompany: "Survey Corps",
        prevLocation: "Wall Rose",
        startDate: "08/09/2004",
        endDate: "08/092020",
        prevDescription:
          "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
      },

      certification: {
        title: "Survey Corps Military School",
        organization: "Bachelor",
        startDate: "08/09/2004",
        endDate: "08/092020",
        description:
          "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
      },
    },

    {
      id: "CCC",
      name: "Eren Yaeger",
      address: "Rose street on.12",
      city: "Wall Rose",
      state: "Paradis",
      zip: "19889",
      email: "eren@surveycorps.com",
      phone: "08172839319",
      websites: "www.theyaegerist.com",
      details:
        "The department was founded by Sergei Lou and Guy Bannings in early S.1204 prior to the events of Zero no Kiseki. After Guy's death, Sergei runs as the section's chief. Unlike other departments or bureaus, operations handled in the section consists of listening to every citizen's query to monster hunts.",
      dob: "14-14-1990",

      education: {
        school: "Survey Corps Military School",
        degree: "Bachelor",
        major: "Biological Defense",
        location: "Paradis island",
        startDate: "08/09/2004",
        endDate: "08/092020",
        description:
          "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
      },

      experience: {
        prevTitle: "Wall Maria Chief Officer",
        prevCompany: "Survey Corps",
        prevLocation: "Wall Rose",
        startDate: "08/09/2004",
        endDate: "08/092020",
        prevDescription:
          "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
      },

      certification: {
        title: "Survey Corps Military School",
        organization: "Bachelor",
        startDate: "08/09/2004",
        endDate: "08/092020",
        description:
          "To regain the citizens' trust for the government's mismanagement of the spreading crime spree",
      },
    },
  ],
};

const applicantReducers = (state = initialState, action) => {
  return state;
};

export default applicantReducers;
