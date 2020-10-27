const initialState = {
	companies: [
		{
			id: 'SSS',
			logo:
				'https://vignette.wikia.nocookie.net/legendofheroes/images/b/b9/Special_Support_Section_Badge.png/revision/latest/scale-to-width-down/340?cb=20170721084057',
			name: 'Special Support Section',
			size: '8',
			industry: 'Police Department',
			address: 'Central Plaza, Crossbell State, West Zemuria',
			websites: 'www.specialsupportsection.com',
			detail:
				"The department was founded by Sergei Lou and Guy Bannings in early S.1204 prior to the events of Zero no Kiseki. After Guy's death, Sergei runs as the section's chief. Unlike other departments or bureaus, operations handled in the section consists of listening to every citizen's query to monster hunts.",
			mission: "To regain the citizens' trust for the government's mismanagement of the spreading crime spree"
		},
		{
			id: 'RCN',
			logo:
				'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/b460938b-d443-4b2a-baad-afce23c05d19/d6mq0v4-be5ffe1e-a569-45b3-b3b9-fe9deda15f73.png',
			name: 'Recon Corps',
			size: '200-500',
			industry: 'Civil Defence',
			address: 'Shiganshina, Wall Maria',
			websites: 'www.reconcorps.com',
			detail:
				'The Survey Corps is the branch of the Military most actively involved in direct Titan combat, Titan study, human expansion, and outside exploration. They have the best soldiers who are the most skilled in using vertical maneuvering equipment. Despite having little success, they still symbolize the "hope of mankind" with their insignia being known as the "Wings of Freedom." They hope that someday, their efforts will change the world and they will be able to recover what has been taken away from humanity.',
			mission:
				'This Military division is in charge of the exploration and the eventual reclamation of human territory from Titan-infested lands through the act of setting up small bases, camps, resupply stations, and extra fortifications in available areas outside the Walls.'
		},
		{
			id: 'IDN',
			logo: 'https://pngimg.com/uploads/lamborghini/lamborghini_PNG10709.png',
			name: 'Inti Dinamis',
			size: '3',
			industry: 'Coaching & Consultancy',
			address: 'Cibubur, Bekasi, West Java',
			websites: 'www.intidinamis.com',
			detail:
				'Inti Dinamis bergerak dalam bidang jasa konsultan organisasi dan pengembangan sumber daya manusia. Didirikan tahun 2005 dengan dilandasi intensi untuk menjadi mitra terbaik bagi rekan bisnisnya dalam mengelola dan mengembangkan Human Capital untuk menjamin pencapaian visi yang dicanangkan.',
			mission: 'Menjadi Mitra Usaha Terbaik Bagi Klien Dalam Mengelola dan Mengembangkan Human Capital.'
		}
	]
};

const companyReducers = (state = initialState, action) => {
	return state;
};

export default companyReducers;
