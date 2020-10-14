import { initStore } from './store';

const configureJobsStore = () => {
	const actions = {
		GET_JOBS: (currentState, payload) => {}
	};

	initStore(actions, {
		jobs: []
	});
};

export default configureJobsStore;

// const configureArticleStore = () => {
// 	const actions = {
// 		SET_ARTICLE: (currentState, newArticles) => {
// 			const newArticlesArr = [];
// 			for (const key in newArticles) {
// 				newArticlesArr.push({
// 					id: key,
// 					title: newArticles[key].title,
// 					brief: newArticles[key].brief,
// 					article: newArticles[key].article
// 				});
// 			}
// 			return {
// 				...currentState,
// 				articles: newArticlesArr
// 			};
// 		},
// 		DELETE_ARTICLE: (currentState, articleId) => {
// 			const updatedArticles = currentState.articles.filter(art => art.id !== articleId);
// 			return {
// 				...currentState,
// 				articles: updatedArticles
// 			};
// 		}
// 	};

// 	initStore(actions, {
// 		articles: []
// 	});
// };
