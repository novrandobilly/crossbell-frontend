import * as actionTypes from '../actions/actions';

const initialState = {



	applicants: [
		{
			applicantId: 'AAA',
			firstName: 'Mikasa',
			lastName: 'Ackerman',
			password: 'dabesto',
			headline: 'FullStack Dev Ops',
			address: 'Central Plaza, Crossbell State, West Zemuria',
			city: 'Wall Maria',
			state: 'Paradis',
			zip: '19889',
			email: 'mikasa@surveycorps.com',
			phone: '08172839319',
			websites: 'www.theackerman.com',
			details:
				"The department was founded by Sergei Lou and Guy Bannings in early S.1204 prior to the events of Zero no Kiseki. After Guy's death, Sergei runs as the section's chief. Unlike other departments or bureaus, operations handled in the section consists of listening to every citizen's query to monster hunts.",
			dateOfBirth: '14-14-1990',

			education: [
				{
					school: 'Survey Corps Military College',
					degree: 'Bachelor',
					major: 'Biological Defense',
					location: 'Paradis island',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: 'Studying about survey corps routine, goals, missions, and so on'
				},
				{
					school: 'Survey Corps Military high school',
					degree: 'other',
					major: 'Science',
					location: 'Paradis island',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: 'studying about paradis island history, corps, area, titans fundamental and many other thing'
				}
			],

			experience: [
				{
					prevTitle: 'Wall Maria Chief Officer',
					prevCompany: 'Survey Corps',
					prevLocation: 'Wall Rose',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: 'In charge of wall maria safety issue with titans attack'
				}
			],

			certification: [
				{
					title: '3D maneuver expert',
					organization: 'Institute of Rock Bandung',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: 'Keep flying around titans for 3 hour stright'
				}
			],
			skills: [
				'Communication',
				'Marketing',
				'React',
				'Redux',
				'node js',
				'monggoDB',
				'Go Lang',
				'Javascript Fundamental',
				'cooking',
				'Fishing',
				'Javascript Fundamental',
				'Javascript Fundamental',
				'Javascript Fundamental'
			]
		},

		{
			applicantId: 'BBB',
			flirstName: 'Armin',
			lastName: 'Arlet',
			password: 'zawardo',
			headline: 'FullStack Dev Ops',
			address: 'Central Plaza, Crossbell State, West Zemuria',
			city: 'Wall Maria',
			state: 'Paradis',
			zip: '19889',
			email: 'mikasa@surveycorps.com',
			phone: '08172839319',
			websites: 'www.theackerman.com',
			details:
				"The department was founded by Sergei Lou and Guy Bannings in early S.1204 prior to the events of Zero no Kiseki. After Guy's death, Sergei runs as the section's chief. Unlike other departments or bureaus, operations handled in the section consists of listening to every citizen's query to monster hunts.",
			dateOfBirth: '14-14-1990',

			education: [
				{
					school: 'Survey Corps Military School',
					degree: 'Bachelor',
					major: 'Biological Defense',
					location: 'Paradis island',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: "To regain the citizens' trust for the government's mismanagement of the spreading crime spree"
				},
				{
					school: 'Survey Corps Military School',
					degree: 'Bachelor',
					major: 'Biological Defense',
					location: 'Paradis island',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: "To regain the citizens' trust for the government's mismanagement of the spreading crime spree"
				}
			],

			experience: [
				{
					prevTitle: 'Wall Maria Chief Officer',
					prevCompany: 'Survey Corps',
					prevLocation: 'Wall Rose',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: "To regain the citizens' trust for the government's mismanagement of the spreading crime spree"
				}
			],

			certification: [
				{
					title: 'Survey Corps Military School',
					organization: 'Bachelor',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: "To regain the citizens' trust for the government's mismanagement of the spreading crime spree"
				}
			],

			skills: [ 'Communication', 'Marketing', 'React' ]
		},

		{
			applicantId: 'CCC',
			firstName: 'Eren',
			lastName: 'Yaeger',
			password: 'yaegerist',
			headline: 'FullStack Dev Ops',
			address: 'Central Plaza, Crossbell State, West Zemuria',
			city: 'Wall Maria',
			state: 'Paradis',
			zip: '19889',
			email: 'mikasa@surveycorps.com',
			phone: '08172839319',
			websites: 'www.theackerman.com',
			details:
				"The department was founded by Sergei Lou and Guy Bannings in early S.1204 prior to the events of Zero no Kiseki. After Guy's death, Sergei runs as the section's chief. Unlike other departments or bureaus, operations handled in the section consists of listening to every citizen's query to monster hunts.",
			dateOfBirth: '14-14-1990',

			education: [
				{
					educationId: 1,
					school: 'Survey Corps Military School',
					degree: 'Bachelor',
					major: 'Biological Defense',
					location: 'Paradis island',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: "To regain the citizens' trust for the government's mismanagement of the spreading crime spree"
				},
				{
					educationId: 2,
					school: 'Survey Corps Military School',
					degree: 'Bachelor',
					major: 'Biological Defense',
					location: 'Paradis island',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: "To regain the citizens' trust for the government's mismanagement of the spreading crime spree"
				}
			],

			experience: [
				{
					prevTitle: 'Wall Maria Chief Officer',
					prevCompany: 'Survey Corps',
					prevLocation: 'Wall Rose',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: "To regain the citizens' trust for the government's mismanagement of the spreading crime spree"
				}
			],

			certification: [
				{
					title: 'Survey Corps Military School',
					organization: 'Bachelor',
					startDate: '08/09/2004',
					endDate: '08/092020',
					description: "To regain the citizens' trust for the government's mismanagement of the spreading crime spree"
				}
			],
			skills: [ 'Communication', 'Marketing', 'React' ]
		}
	]
};

const applicantReducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CREATEAPPLICANT: {
			const newApplicant = {
				applicantId: action.payload.firstName.slice(0, 3).toUpperCase(),
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				email: action.payload.email,
				password: action.payload.password,
				headline: '',
				address: '',
				city: '',
				state: '',
				zip: '',
				phone: '',
				websites: '',
				details: '',
				education: [],
				experience: [],
				certification: [],
				skills: []
			};
			return {
				...state,
				applicants: state.applicants.concat(newApplicant)
			};
		}

		case actionTypes.EDITAPPLICANTINTRO: {
			const applicantArray = [ ...state.applicants ];
			const applicantIndex = applicantArray.findIndex(app => app.applicantId === action.payload.updatedAppIntro.applicantId);

			const EditAppIntro = {
				...applicantArray[applicantIndex],
				firstName: action.payload.updatedAppIntro.firstName,
				lastName: action.payload.updatedAppIntro.lastName,
				email: action.payload.updatedAppIntro.email,
				headline: action.payload.updatedAppIntro.headline,
				address: action.payload.updatedAppIntro.address,
				city: action.payload.updatedAppIntro.city,
				state: action.payload.updatedAppIntro.state,
				zip: action.payload.updatedAppIntro.zip,
				phone: action.payload.updatedAppIntro.phone,
				websites: action.payload.updatedAppIntro.websites
			};

			applicantArray[applicantIndex] = EditAppIntro;

			return {
				...state,
				applicants: applicantArray
			};
		}

		case actionTypes.CREATEAPPLICANTEDUCATION: {
			const applicantArray = [ ...state.applicants ];
			const applicantIndex = applicantArray.findIndex(app => app.applicantId === action.payload.updatedEducation.applicantId);

			const newEducation = {
				school: action.payload.updatedEducation.school,
				degree: action.payload.updatedEducation.degree,
				major: action.payload.updatedEducation.major,
				location: action.payload.updatedEducation.location,
				startDate: action.payload.updatedEducation.startDate,
				endDate: action.payload.updatedEducation.endDate,
				description: action.payload.updatedEducation.description
			};

			applicantArray[applicantIndex].education = applicantArray[applicantIndex].education.concat(newEducation);

			return {
				...state,
				applicants: applicantArray
			};
		}

		case actionTypes.CREATEAPPLICANTEXPERIENCE: {
			const applicantArray = [ ...state.applicants ];
			const applicantIndex = applicantArray.findIndex(app => app.applicantId === action.payload.updatedExperience.applicantId);

			const newExperience = {
				prevTitle: action.payload.updatedExperience.prevTitle,
				prevCompany: action.payload.updatedExperience.prevCompany,
				prevLocation: action.payload.updatedExperience.prevLocation,
				startDate: action.payload.updatedExperience.startDate,
				endDate: action.payload.updatedExperience.endDate,
				description: action.payload.updatedExperience.description
			};

			applicantArray[applicantIndex].experience = applicantArray[applicantIndex].experience.concat(newExperience);

			return {
				...state,
				applicants: applicantArray
			};
		}

		case actionTypes.CREATEAPPLICANTCERTIFICATION: {
			const applicantArray = [ ...state.applicants ];
			const applicantIndex = applicantArray.findIndex(app => app.applicantId === action.payload.updatedCertification.applicantId);

			const newCertification = {
				title: action.payload.updatedCertification.title,
				organization: action.payload.updatedCertification.organization,
				startDate: action.payload.updatedCertification.startDate,
				endDate: action.payload.updatedCertification.endDate,
				description: action.payload.updatedCertification.description
			};

			applicantArray[applicantIndex].certification = applicantArray[applicantIndex].certification.concat(newCertification);

			return {
				...state,
				applicants: applicantArray
			};
		}

		case actionTypes.EDITAPPLICANTSUMMARY: {
			const applicantArray = [ ...state.applicants ];
			const applicantIndex = applicantArray.findIndex(app => app.applicantId === action.payload.updatedAppSummary.applicantId);

			const EditAppSummary = {
				...applicantArray[applicantIndex],
				details: action.payload.updatedAppSummary.details,
				dateOfBirth: action.payload.updatedAppSummary.dateOfBirth
			};

			applicantArray[applicantIndex] = EditAppSummary;

			return {
				...state,
				applicants: applicantArray
			};
		}

		case actionTypes.EDITAPPLICANTEDUCATION: {
			const applicantArray = [ ...state.applicants ];
			const applicantIndex = applicantArray.findIndex(app => app.applicantId === action.payload.updatedEducation.applicantId);

			applicantArray[applicantIndex].education[action.payload.updatedEducation.educationindex] = {
				...applicantArray[applicantIndex].education[action.payload.updatedEducation.educationindex],
				school: action.payload.updatedEducation.school,
				degree: action.payload.updatedEducation.degree,
				major: action.payload.updatedEducation.major,
				location: action.payload.updatedEducation.location,
				startDate: action.payload.updatedEducation.startDate,
				endDate: action.payload.updatedEducation.endDate,
				description: action.payload.updatedEducation.description
			};

			return {
				...state,
				applicants: applicantArray
			};
		}

		case actionTypes.EDITAPPLICANTEXPERIENCE: {
			const applicantArray = [ ...state.applicants ];
			const applicantIndex = applicantArray.findIndex(app => app.applicantId === action.payload.updatedExperience.applicantId);

			applicantArray[applicantIndex].experience[action.payload.updatedExperience.experienceindex] = {
				...applicantArray[applicantIndex].experience[action.payload.updatedExperience.experienceindex],
				prevTitle: action.payload.updatedExperience.prevTitle,
				prevCompany: action.payload.updatedExperience.prevCompany,
				prevLocation: action.payload.updatedExperience.prevLocation,
				startDate: action.payload.updatedExperience.startDate,
				endDate: action.payload.updatedExperience.endDate,
				description: action.payload.updatedExperience.description
			};
			return {
				...state,
				applicants: applicantArray
			};
		}

		case actionTypes.EDITAPPLICANTCERTIFICATION: {
			const applicantArray = [ ...state.applicants ];
			const applicantIndex = applicantArray.findIndex(app => app.applicantId === action.payload.updatedCertification.applicantId);
			applicantArray[applicantIndex].certification[action.payload.updatedCertification.certificationindex] = {
				...applicantArray[applicantIndex].certification[action.payload.updatedCertification.certificationindex],
				title: action.payload.updatedCertification.title,
				organization: action.payload.updatedCertification.organization,
				startDate: action.payload.updatedCertification.startDate,
				endDate: action.payload.updatedCertification.endDate,
				description: action.payload.updatedCertification.description
			};
			return {
				...state,
				applicants: applicantArray
			};
		}

		case actionTypes.EDITAPPLICANTSKILL: {
			const applicantArray = [ ...state.applicants ];
			const applicantIndex = applicantArray.findIndex(app => app.applicantId === action.payload.applicantId);
			applicantArray[applicantIndex].skills = applicantArray[applicantIndex].skills.concat(action.payload.skillsData);

			return {
				...state,
				applicants: applicantArray
			};
		}

		default:
			return state;
	}



};

export default applicantReducers;
