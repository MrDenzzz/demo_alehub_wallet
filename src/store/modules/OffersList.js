// import axios from 'axios';
//
// const state = {
//
//     types: [
//         {
//             id: 1,
//             name: 'TS',
//             type: 'ts',
//             priority: 1
//         },
//         {
//             id: 2,
//             name: 'TS execution',
//             type: 'ts-ex',
//             priority: 2
//         },
//         {
//             id: 3,
//             name: 'Check',
//             type: 'ch',
//             priority: 3
//         },
//         {
//             id: 4,
//             name: 'Quality Assurance',
//             type: 'qa',
//             priority: 4
//         }
//     ],
//
//     //for remove
//     currentFilter: {},
//     filters: [
//         {
//             id: 1,
//             typeId: 1,
//             name: '',
//             ratingFrom: '',
//             ratingTo: '',
//             priceFrom: '',
//             priceTo: '',
//             countries: [],
//             certification: [],
//             verified: [],
//             condition: {}
//         },
//         {
//             id: 2,
//             typeId: 2,
//             name: '',
//             ratingFrom: '',
//             ratingTo: '',
//             priceFrom: '',
//             priceTo: '',
//             countries: [],
//             certification: [],
//             verified: [],
//             condition: {}
//         },
//         {
//             id: 3,
//             typeId: 3,
//             name: '',
//             ratingFrom: '',
//             ratingTo: '',
//             priceFrom: '',
//             priceTo: '',
//             countries: [],
//             certification: [],
//             verified: [],
//             condition: {}
//         },
//         {
//             id: 4,
//             typeId: 4,
//             name: '',
//             ratingFrom: '',
//             ratingTo: '',
//             priceFrom: '',
//             priceTo: '',
//             countries: [],
//             certification: [],
//             verified: [],
//             condition: {}
//         },
//     ],
//
//     filter: {
//         typeId: null,
//         name: '',
//         ratingFrom: '',
//         ratingTo: '',
//         priceFrom: '',
//         priceTo: '',
//         countries: [],
//         certification: [],
//         verified: [],
//         condition: {},
//         opened: false
//     },
//
//     filtersCondition: [
//         {
//             id: 1,
//             title: 'TS'
//         },
//         {
//             id: 2,
//             title: 'EX'
//         },
//         {
//             id: 3,
//             title: 'CH'
//         },
//         {
//             id: 4,
//             title: 'QA'
//         }
//     ],
//
//     status: [
//         {
//             id: 1,
//             class: 'continues',
//             title: 'infinity',
//             src: '../../../static/img/icons-for-circle/infinity.svg',
//             active: false,
//         },
//         {
//             id: 2,
//             class: 'check',
//             title: 'check',
//             src: '../../../static/img/icons-for-circle/check-light.svg',
//             active: false,
//         },
//         {
//             id: 3,
//             class: 'stop',
//             title: 'hourglass',
//             src: '../../../static/img/icons-for-circle/hourglass.svg',
//             active: false,
//         },
//         {
//             id: 4,
//             class: 'cancel',
//             title: 'line',
//             src: '../../../static/img/icons-for-circle/line.svg',
//             active: false,
//         }
//     ],
//
//     filteredContractorsTypes: [],
//
//     certificates: [
//         {
//             id: 1,
//             name: 'ГОСТ'
//         },
//         {
//             id: 2,
//             name: 'DIN'
//         }
//     ],
//
//     contractors: [
//         {
//             id: 1,
//             typeId: 1,
//             initials: 'VD',
//             name: 'Vova Dmitrov',
//             src: '../../static/img/logo/telegram.png',
//             rating: 8.1,
//             sinceDate: 1487967146000,
//             webAddress: 'https://vova-dmitrov.ru',
//             githubAddress: '/vova-dmitrov',
//             countOfProject: 1328,
//             avgCostPerProject: 7500,
//             certificatesId: [1],
//             verified: true,
//             keys: [
//                 '../../static/img/keys/ts-key.svg'
//             ]
//         },
//         {
//             id: 2,
//             typeId: 2,
//             initials: 'DV',
//             name: 'Deus Virus',
//             src: '../../static/img/logo/ubuntu.png',
//             rating: 9.2,
//             sinceDate: 1487927146000,
//             webAddress: 'https://deus-virus.com',
//             githubAddress: '/deus-virus',
//             countOfProject: 321,
//             avgCostPerProject: 1000,
//             certificatesId: [2],
//             verified: false,
//             keys: [
//                 '../../static/img/keys/ts-ex-key.svg'
//             ]
//         },
//         {
//             id: 3,
//             typeId: 3,
//             initials: 'NG',
//             name: 'Nicola Glumac',
//             src: false,
//             rating: 9.9,
//             sinceDate: 1487927146000,
//             webAddress: '',
//             githubAddress: '/glumac',
//             countOfProject: 3,
//             avgCostPerProject: 350,
//             certificatesId: [2],
//             verified: true,
//             keys: [
//                 '../../static/img/keys/ch-key.svg',
//                 '../../static/img/keys/ch-key.svg'
//             ]
//         },
//         {
//             id: 4,
//             typeId: 4,
//             initials: 'RC',
//             name: 'Rift & Co',
//             src: '../../static/img/logo/ubuntu.png',
//             rating: 7.5,
//             sinceDate: 1487927146000,
//             webAddress: 'https://rift.io',
//             githubAddress: '/rift',
//             countOfProject: 230,
//             avgCostPerProject: 1010,
//             certificatesId: [1, 2],
//             verified: false,
//             keys: [
//                 '../../static/img/keys/qa-key.svg',
//                 '../../static/img/keys/qa-key.svg'
//             ]
//         },
//         {
//             id: 5,
//             typeId: 1,
//             initials: 'QB',
//             name: 'Quality Boy',
//             src: '../../static/img/logo/ubuntu.png',
//             rating: 6,
//             sinceDate: 1487927146000,
//             webAddress: '',
//             githubAddress: '',
//             countOfProject: 203,
//             avgCostPerProject: 506,
//             certificatesId: [1, 2],
//             verified: true,
//             keys: [
//                 '../../static/img/keys/ts-key.svg'
//             ]
//         },
//         {
//             id: 6,
//             typeId: 2,
//             initials: 'GA',
//             name: 'Galvadon',
//             src: '../../static/img/logo/ubuntu.png',
//             rating: 6.2,
//             sinceDate: 1487927146000,
//             webAddress: 'https://galvadon.su',
//             githubAddress: '/galvadon',
//             countOfProject: 130204,
//             avgCostPerProject: 1300,
//             certificatesId: [],
//             verified: false,
//             keys: [
//                 '../../static/img/keys/ts-ex-key.svg'
//             ]
//         },
//     ],
//     filteredOffers: [
//         {
//             id: 1,
//             contractorsId: [1, 2, 3, 4],
//             statusId: 2,
//             title: 'CryptoStore',
//             company: 'Serokell',
//             logoSrc: '../../static/img/logo/react.png',
//             to: '/offer',
//             keys: [
//                 {
//                     id: 1,
//                     start: 1525046400000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-key.svg'
//                 },
//                 {
//                     id: 2,
//                     start: 1529884800000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-ex-key.svg'
//                 },
//                 {
//                     id: 3,
//                     start: 1531180800000,
//                     end: 1536537600000,
//                     src: '../../static/img/keys/ch-key.svg'
//                 },
//                 {
//                     id: 4,
//                     start: 1535587200000,
//                     end: 1538697600000,
//                     src: '../../static/img/keys/qa-key.svg'
//                 }
//             ],
//             startDate: 1517495409000,
//             finalDate: 1543588209000,
//             steps: 10,
//             openedOptions: false
//         },
//         {
//             id: 2,
//             contractorsId: [5, 6, 4],
//             statusId: 1,
//             title: 'Alehub',
//             company: 'Effective Energy',
//             logoSrc: '../../static/img/logo/angular.png',
//             to: '/offer',
//             keys: [
//                 {
//                     id: 1,
//                     start: 1526774400,
//                     end: 0,
//                     src: '../../static/img/keys/ts-key.svg'
//                 },
//                 {
//                     id: 2,
//                     start: 1529280000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-ex-key.svg'
//                 },
//                 {
//                     id: 3,
//                     start: 1531958400,
//                     end: 0,
//                     src: '../../static/img/keys/qa-key.svg'
//                 }
//             ],
//             startDate: 1523370609000,
//             finalDate: 1543588209000,
//             steps: 8,
//             openedOptions: false
//         },
//         {
//             id: 3,
//             contractorsId: [4],
//             statusId: 4,
//             title: 'Virtual reality pluggin',
//             company: 'Nike',
//             logoSrc: '../../static/img/logo/telegram.png',
//             to: '/offer',
//             keys: [],
//             startDate: 1525185009000,
//             finalDate: 1525703409000,
//             steps: 1,
//             openedOptions: false
//         },
//         {
//             id: 4,
//             contractorsId: [4],
//             statusId: 3,
//             title: 'Virtual reality pluggin',
//             company: 'Nike',
//             logoSrc: '../../static/img/logo/angular.png',
//             to: '/offer',
//             keys: [],
//             startDate: 1525185009000,
//             finalDate: 1525703409000,
//             steps: 1,
//             openedOptions: false
//         },
//         {
//             id: 5,
//             contractorsId: [1, 2, 3, 4],
//             statusId: 2,
//             title: 'CryptoStore',
//             company: 'Serokell',
//             logoSrc: '../../static/img/logo/twitter.jpg',
//             to: '/offer',
//             keys: [
//                 {
//                     id: 1,
//                     start: 1525046400000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-key.svg'
//                 },
//                 {
//                     id: 2,
//                     start: 1529884800000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-ex-key.svg'
//                 },
//                 {
//                     id: 3,
//                     start: 1531180800000,
//                     end: 1536537600000,
//                     src: '../../static/img/keys/ch-key.svg'
//                 },
//                 {
//                     id: 4,
//                     start: 1535587200000,
//                     end: 1538697600000,
//                     src: '../../static/img/keys/qa-key.svg'
//                 }
//             ],
//             startDate: 1517495409000,
//             finalDate: 1543588209000,
//             steps: 10,
//             openedOptions: false
//         },
//         {
//             id: 6,
//             contractorsId: [5, 6, 4],
//             statusId: 1,
//             title: 'Alehub',
//             company: 'Effective Energy',
//             logoSrc: '../../static/img/logo/ubuntu.png',
//             to: '/offer',
//             keys: [
//                 {
//                     id: 1,
//                     start: 1526774400,
//                     end: 0,
//                     src: '../../static/img/keys/ts-key.svg'
//                 },
//                 {
//                     id: 2,
//                     start: 1529280000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-ex-key.svg'
//                 },
//                 {
//                     id: 3,
//                     start: 1531958400,
//                     end: 0,
//                     src: '../../static/img/keys/qa-key.svg'
//                 }
//             ],
//             startDate: 1523370609000,
//             finalDate: 1543588209000,
//             steps: 8,
//             openedOptions: false
//         },
//         {
//             id: 7,
//             contractorsId: [4],
//             statusId: 4,
//             title: 'Virtual reality pluggin',
//             company: 'Nike',
//             logoSrc: '../../static/img/logo/react.png',
//             to: '/offer',
//             keys: [],
//             startDate: 1525185009000,
//             finalDate: 1525703409000,
//             projectLogo: '../../static/img/ale-logo.svg',
//             steps: 1,
//             openedOptions: false
//         }
//     ],
//     offers: [
//         {
//             id: 1,
//             contractorsId: [1, 2, 3, 4],
//             statusId: 2,
//             title: 'CryptoStore',
//             company: 'Serokell',
//             logoSrc: '../../static/img/logo/react.png',
//             to: '/offer',
//             keys: [
//                 {
//                     id: 1,
//                     start: 1525046400000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-key.svg'
//                 },
//                 {
//                     id: 2,
//                     start: 1529884800000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-ex-key.svg'
//                 },
//                 {
//                     id: 3,
//                     start: 1531180800000,
//                     end: 1536537600000,
//                     src: '../../static/img/keys/ch-key.svg'
//                 },
//                 {
//                     id: 4,
//                     start: 1535587200000,
//                     end: 1538697600000,
//                     src: '../../static/img/keys/qa-key.svg'
//                 }
//             ],
//             startDate: 1517495409000,
//             finalDate: 1543588209000,
//             steps: 10,
//             openedOptions: false
//         },
//         {
//             id: 2,
//             contractorsId: [5, 6, 4],
//             statusId: 1,
//             title: 'Alehub',
//             company: 'Effective Energy',
//             logoSrc: '../../static/img/logo/angular.png',
//             to: '/offer',
//             keys: [
//                 {
//                     id: 1,
//                     start: 1526774400,
//                     end: 0,
//                     src: '../../static/img/keys/ts-key.svg'
//                 },
//                 {
//                     id: 2,
//                     start: 1529280000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-ex-key.svg'
//                 },
//                 {
//                     id: 3,
//                     start: 1531958400,
//                     end: 0,
//                     src: '../../static/img/keys/qa-key.svg'
//                 }
//             ],
//             startDate: 1523370609000,
//             finalDate: 1543588209000,
//             steps: 8,
//             openedOptions: false
//         },
//         {
//             id: 3,
//             contractorsId: [4],
//             statusId: 4,
//             title: 'Virtual reality pluggin',
//             company: 'Nike',
//             logoSrc: '../../static/img/logo/telegram.png',
//             to: '/offer',
//             keys: [],
//             startDate: 1525185009000,
//             finalDate: 1525703409000,
//             steps: 1,
//             openedOptions: false
//         },
//         {
//             id: 4,
//             contractorsId: [4],
//             statusId: 3,
//             title: 'Virtual reality pluggin',
//             company: 'Nike',
//             logoSrc: '../../static/img/logo/angular.png',
//             to: '/offer',
//             keys: [],
//             startDate: 1525185009000,
//             finalDate: 1525703409000,
//             steps: 1,
//             openedOptions: false
//         },
//         {
//             id: 5,
//             contractorsId: [1, 2, 3, 4],
//             statusId: 2,
//             title: 'CryptoStore',
//             company: 'Serokell',
//             logoSrc: '../../static/img/logo/twitter.jpg',
//             to: '/offer',
//             keys: [
//                 {
//                     id: 1,
//                     start: 1525046400000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-key.svg'
//                 },
//                 {
//                     id: 2,
//                     start: 1529884800000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-ex-key.svg'
//                 },
//                 {
//                     id: 3,
//                     start: 1531180800000,
//                     end: 1536537600000,
//                     src: '../../static/img/keys/ch-key.svg'
//                 },
//                 {
//                     id: 4,
//                     start: 1535587200000,
//                     end: 1538697600000,
//                     src: '../../static/img/keys/qa-key.svg'
//                 }
//             ],
//             startDate: 1517495409000,
//             finalDate: 1543588209000,
//             steps: 10,
//             openedOptions: false
//         },
//         {
//             id: 6,
//             contractorsId: [5, 6, 4],
//             statusId: 1,
//             title: 'Alehub',
//             company: 'Effective Energy',
//             logoSrc: '../../static/img/logo/ubuntu.png',
//             to: '/offer',
//             keys: [
//                 {
//                     id: 1,
//                     start: 1526774400,
//                     end: 0,
//                     src: '../../static/img/keys/ts-key.svg'
//                 },
//                 {
//                     id: 2,
//                     start: 1529280000,
//                     end: 0,
//                     src: '../../static/img/keys/ts-ex-key.svg'
//                 },
//                 {
//                     id: 3,
//                     start: 1531958400,
//                     end: 0,
//                     src: '../../static/img/keys/qa-key.svg'
//                 }
//             ],
//             startDate: 1523370609000,
//             finalDate: 1543588209000,
//             steps: 8,
//             openedOptions: false
//         },
//         {
//             id: 7,
//             contractorsId: [4],
//             statusId: 4,
//             title: 'Virtual reality plugin',
//             company: 'Nike',
//             logoSrc: '../../static/img/logo/react.png',
//             to: '/offer',
//             keys: [],
//             startDate: 1525185009000,
//             finalDate: 1525703409000,
//             projectLogo: '../../static/img/ale-logo.svg',
//             steps: 1,
//             openedOptions: false
//         }
//     ],
//
//     selectedContractor: {
//         initials: 'JD',
//         name: 'John Doe',
//         src: false,
//         position: false,
//         rating: false,
//         sinceDate: false,
//         webAddress: false,
//         githubAddress: false,
//         countOfProject: 0,
//         avgCostPerProject: 0,
//         type: false,
//         keys: []
//     },
//     openedContractorDialog: false,
//     contractorDialogCoordinates: {
//         top: 0,
//         left: 0
//     },
//
//     manage: {
//         create: {
//             id: 1,
//             title: 'c',
//         },
//         favorites: {
//             id: 2,
//             title: 'f'
//         },
//         search: {
//             id: 3,
//             title: 't'
//         }
//     },
//
//     openedGroupFilterButtons: false,
//     openedGroupStatusButtons: false,
//     openedGroupManageButtons: false,
//     openedOfferOptions: false,
//     hiddenAreaOfferOptions: false
// };
//
// const actions = {
//     selectContractor: ({commit}, contractorData) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_SELECT_CONTRACTOR', contractorData);
//             resolve('success select contractor');
//         });
//     },
//     hideOfferContractorDialog: ({commit}) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_HIDE_OFFER_CONTRACTOR_DIALOG');
//             resolve('success hide offer contractor dialog');
//         });
//     },
//     changeFiltersCondition: ({commit}, filters) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_CHANGE_FILTERS_CONDITION', filters);
//             resolve('success change filters condition');
//         });
//     },
//     makeFilterOfContractorType: ({commit}, typeId) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_MAKE_FILTER_OF_CONTRACTOR_TYPE', typeId);
//             resolve('success make filter of contractor type');
//         });
//     },
//     makeFilterOffers: ({commit}, filter) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_MAKE_FILTER_OFFERS', filter);
//             resolve('success make filter of contractor type');
//         });
//     },
//     cancelResetOfContractorType: ({commit}, typeId) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_RESET_FILTER_OF_CONTRACTOR_TYPE', typeId);
//             resolve('success cancel filter of contractor type');
//         });
//     },
//     makeFilterOfStatusOffer: ({commit}, id) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_MAKE_FILTER_OF_STATUS_OFFER', id);
//             resolve('success make filter of status offer');
//         });
//     },
//     makeFilterByFields: ({commit, dispatch}, options) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_MAKE_FILTER_BY_FIELDS', options);
//             resolve('success make filter by fields');
//         });
//     },
//     closeFilterDialog: ({commit}, id) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_CLOSE_FILTER_DIALOG', id);
//             resolve('success close filter dialog');
//         });
//     },
//     clearFilterOffers: ({commit}, id) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_CLEAR_FILTER_OFFERS');
//             resolve('success clear filter offers');
//         });
//     },
//
//     changeOpeningFilter: ({commit}, id) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_CHANGE_OPENING_FILTER', id);
//             resolve('success change opening filter');
//         });
//     },
//
//     toggleGroupFilterButtons: ({commit}) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_TOGGLE_GROUP_FILTER_BUTTONS');
//             resolve('success toggle group filter buttons');
//         });
//     },
//     toggleGroupStatusButtons: ({commit}) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_TOGGLE_GROUP_STATUS_BUTTONS');
//             resolve('success toggle group status buttons');
//         });
//     },
//     toggleGroupManageButtons: ({commit}) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_TOGGLE_GROUP_MANAGE_BUTTONS');
//             resolve('success toggle group status buttons');
//         });
//     },
//     toggleOfferOptions: ({commit}, id) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_TOGGLE_OFFER_OPTIONS', id);
//             resolve('success toggle offer options');
//         })
//     },
//     hideAreaOfferOptions: ({commit}) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_HIDE_AREA_OFFER_OPTIONS');
//             resolve('success hide area offer options');
//         });
//     },
//     hideOfferOptions: ({commit}) => {
//         return new Promise(resolve => {
//             commit('SUCCESS_HIDE_OFFER_OPTIONS');
//             resolve('success hide offer options');
//         });
//     }
// };
//
// function checkEntranceArr(arr1, arr2) {
//     if (arr2.length > arr1.length)
//         return false;
//
//     if (arr2.length === 0)
//         return true;
//
//     if (arr1.length === arr2.length) {
//         for (let i = 0; i < arr1.length; i++) {
//             for (let j = 0; j < arr2.length; j++) {
//                 if (arr1[i] === arr2[j]) {
//                     break;
//                 }
//                 if (j === arr2.length - 1) {
//                     return false;
//                 }
//             }
//         }
//         return true;
//     }
//
//     if (arr2.length < arr1.length) {
//         for (let i = 0; i < arr2.length; i++) {
//             for (let j = 0; j < arr1.length; j++) {
//                 if (arr2[i] === arr1[j]) {
//                     break;
//                 }
//                 if (j === arr1.length - 1) {
//                     return false;
//                 }
//             }
//         }
//         return true;
//     }
// }
//
// const mutations = {
//     /**
//      *
//      *
//      * @param state
//      * @param contractorData
//      * @constructor
//      */
//     SUCCESS_SELECT_CONTRACTOR: (state, contractorData) => {
//         state.selectedContractor = contractorData.contractor;
//         state.openedContractorDialog = contractorData.opened;
//         state.contractorDialogCoordinates = contractorData.coordinates;
//     },
//     /**
//      *
//      *
//      * @param state
//      * @constructor
//      */
//     SUCCESS_HIDE_OFFER_CONTRACTOR_DIALOG: (state) => {
//         state.openedContractorDialog = false;
//     },
//     /**
//      *
//      *
//      * @param state
//      * @param filters
//      * @constructor
//      */
//     SUCCESS_CHANGE_FILTERS_CONDITION: (state, filters) => {
//         state.filtersCondition = filters;
//     },
//     /**
//      * mutation that changes the current filter
//      *
//      * @param state
//      * @param filter
//      * @constructor
//      */
//     SUCCESS_MAKE_FILTER_OFFERS: (state, filter) => {
//         let selectedContractors = state.contractors.filter(contractor => contractor.typeId === filter.typeId);
//
//         state.filteredOffers = state.offers.filter(offer => {
//             return offer.contractorsId.find(id => {
//                 return selectedContractors.find(selectedContractor => {
//                     return selectedContractor.id === id &&
//                         selectedContractor.name.split(' ').find(item => item.indexOf(filter.name) === 0) &&
//                         selectedContractor.rating >= filter.ratingFrom &&
//                         (filter.ratingTo && selectedContractor.rating <= filter.ratingTo || true) &&
//                         selectedContractor.avgCostPerProject >= filter.priceFrom &&
//                         (filter.priceTo && selectedContractor.avgCostPerProject <= filter.priceTo || true) &&
//                         checkEntranceArr(selectedContractor.certificatesId, filter.certificatesId)
//                 });
//             });
//         });
//
//         state.filter.typeId = filter.typeId;
//         state.filter.name = filter.name;
//         state.filter.ratingFrom = filter.ratingFrom;
//         state.filter.ratingTo = filter.ratingTo;
//         state.filter.priceFrom = filter.priceFrom;
//         state.filter.priceTo = filter.priceTo;
//         state.filter.certificatesId = filter.certificatesId;
//         state.filter.verified = filter.verified;
//     },
//     /**
//      *
//      *
//      * @param state
//      * @param typeId
//      * @constructor
//      */
//     SUCCESS_MAKE_FILTER_OF_CONTRACTOR_TYPE: (state, typeId) => {
//         let selectedContractors = state.contractors.filter(contractor => contractor.typeId === typeId);
//
//         if (!state.filteredContractorsTypes.find(type => type === typeId))
//             state.filteredContractorsTypes.push(typeId);
//
//         state.filteredOffers = state.filteredOffers.filter((offer, i, arr) => {
//             return offer.contractorsId.find(id => {
//                 return selectedContractors.find(selectedContractor => {
//                     return selectedContractor.id === id;
//                 });
//             });
//         });
//     },
//     /**
//      *
//      * @param state
//      * @param typeId
//      * @constructor
//      */
//     SUCCESS_RESET_FILTER_OF_CONTRACTOR_TYPE: (state, typeId) => {
//         let selectedTypeIndex = state.filteredContractorsTypes.findIndex(type => type === typeId),
//             selectedContractors = 0;
//
//         if (selectedTypeIndex || selectedTypeIndex === 0)
//             state.filteredContractorsTypes.splice(selectedTypeIndex, 1);
//
//         if (state.filteredContractorsTypes.length === 0) {
//             state.filteredOffers = state.offers;
//         } else {
//             selectedContractors = state.contractors.filter(contractor => {
//                 return state.filteredContractorsTypes.find(filteredContractorType => {
//                     return filteredContractorType === contractor.typeId;
//                 });
//             });
//
//             state.filteredOffers = state.offers.filter(offer => {
//                 return offer.contractorsId.find(id => {
//                     return selectedContractors.find(selectedContractor => {
//                         return selectedContractor.id === id;
//                     });
//                 });
//             });
//         }
//     },
//     /**
//      *
//      * @param state
//      * @param id
//      * @constructor
//      */
//     SUCCESS_MAKE_FILTER_OF_STATUS_OFFER: (state, id) => {
//         state.status.find(item => item.id === id).active = !state.status.find(item => item.id === id).active;
//
//         let activeStatuses = state.status.filter(status => {
//             return status.active;
//         });
//
//         if (activeStatuses.length === 0) {
//             state.filteredOffers = state.offers;
//         } else {
//             state.filteredOffers = state.offers.filter(offer => {
//                 return activeStatuses.find(status => {
//                     return status.id === offer.statusId;
//                 });
//             });
//         }
//
//         console.log(state.filteredOffers, 'state.filteredOffers');
//     },
//
//     /**
//      *
//      * @param state
//      * @param options
//      * @constructor
//      */
//     SUCCESS_MAKE_FILTER_BY_FIELDS: (state, options) => {
//         let currentFilter = state.filters.find(filter => {
//             return filter.id === options.id;
//         });
//
//         currentFilter.name = options.name;
//         currentFilter.ratingFrom = options.ratingFrom;
//         currentFilter.ratingTo = options.ratingTo;
//         currentFilter.priceFrom = options.priceFrom;
//         currentFilter.priceTo = options.priceTo;
//         currentFilter.certification = options.certification;
//
//         console.log(currentFilter, 'currentFilter');
//
//         state.currentFilter = currentFilter;
//     },
//     /**
//      *
//      *
//      * @param state
//      * @constructor
//      */
//     SUCCESS_CLEAR_FILTER_OFFERS: (state) => {
//         state.filteredOffers = state.offers;
//     },
//     /**
//      * change prop name in state filters by id
//      *
//      * @param state
//      * @param options id + name
//      * @constructor
//      */
//     SUCCESS_MAKE_FILTER_BY_NAME: (state, options) => {
//         console.log(options.id, 'options id');
//         console.log(options.name, 'options name');
//
//         state.filters.find(filter => {
//             return filter.id === options.id;
//         }).name = options.name;
//     },
//     /**
//      * change prop ratingFrom in state filters by id
//      *
//      * @param state
//      * @param options id + ratingFrom
//      * @constructor
//      */
//     SUCCESS_MAKE_FILTER_BY_RATING_FROM: (state, options) => {
//         state.filters.find(filter => {
//             return filter.id === options.id;
//         }).ratingFrom = parseFloat(options.ratingFrom);
//         console.log(state.filters, 'filters rating from');
//     },
//     /**
//      * change prop ratingTo in state filters by id
//      *
//      * @param state
//      * @param options
//      * @constructor
//      */
//     SUCCESS_MAKE_FILTER_BY_RATING_TO: (state, options) => {
//         state.filters.find(filter => {
//             return filter.id === options.id;
//         }).ratingTo = parseFloat(options.ratingTo);
//
//         state.contractors.filter(contractor => {
//             return contractor.rating < options.ratingTo;
//         });
//
//         console.log(state.contractors, 'state.contractors');
//     },
//     /**
//      * change prop priceFrom in state filters by id
//      *
//      * @param state
//      * @param options
//      * @constructor
//      */
//     SUCCESS_MAKE_FILTER_BY_PRICE_TO: (state, options) => {
//         state.filters.find(filter => {
//             return filter.id === options.id;
//         }).priceFrom = parseFloat(options.priceFrom);
//     },
//     /**
//      * change prop priceTo in state filters by id
//      *
//      * @param state
//      * @param options
//      * @constructor
//      */
//     SUCCESS_MAKE_FILTER_BY_PRICE_FROM: (state, options) => {
//         state.filters.find(filter => {
//             return filter.id === options.id;
//         }).priceTo = parseFloat(options.priceTo);
//     },
//     /**
//      * change prop certification in state filters by id
//      *
//      * @param state
//      * @param options
//      * @constructor
//      */
//     SUCCESS_MAKE_FILTER_BY_CERTIFICATION: (state, options) => {
//         console.log(options, 'certification');
//         // state.filters.find(filter => {
//         //     return filter.id === options.id;
//         // }).priceTo = parseFloat(options.priceTo);
//     },
//     /**
//      * change prop verified in state filters by id
//      *
//      * @param state
//      * @param options
//      * @constructor
//      */
//     SUCCESS_MAKE_FILTER_BY_VERIFIED: (state, options) => {
//         // state.filters.find(filter => {
//         //     return filter.id === options.id;
//         // }).priceTo = parseFloat(options.priceTo);
//     },
//     /**
//      * change state filtersCondition.opened to false
//      *
//      * @param state
//      * @param id
//      * @constructor
//      */
//     SUCCESS_CLOSE_FILTER_DIALOG: (state, id) => {
//         // state.filtersCondition.find(filter => filter.id === id).opened = false;
//         state.filter.opened = false;
//     },
//     SUCCESS_TOGGLE_OFFER_OPTIONS: (state, id) => {
//         if (state.filteredOffers.find(offer => offer.openedOptions) &&
//             id !== state.filteredOffers.find(offer => offer.openedOptions).id)
//             state.filteredOffers.find(offer => offer.openedOptions).openedOptions = false;
//
//         state.filteredOffers.find(offer => offer.id === id).openedOptions =
//             !state.filteredOffers.find(offer => offer.id === id).openedOptions;
//
//         // state.openedOfferOptions = !state.openedOfferOptions;
//         // state.hiddenAreaOfferOptions = false;
//     },
//     SUCCESS_HIDE_AREA_OFFER_OPTIONS: (state) => {
//         state.hiddenAreaOfferOptions = true;
//     },
//     SUCCESS_HIDE_OFFER_OPTIONS: (state) => {
//         if (state.filteredOffers.find(offer => offer.openedOptions))
//             state.filteredOffers.find(offer => offer.openedOptions).openedOptions = false;
//     },
//     SUCCESS_CHANGE_OPENING_FILTER: (state, id) => {
//         if (state.filter.typeId === id && state.filter.opened) {
//             state.filter.opened = false;
//         } else {
//             state.filter.opened = true;
//             state.filter.typeId = id;
//             state.filter.name = '';
//             state.filter.ratingFrom = '';
//             state.filter.ratingTo = '';
//             state.filter.priceFrom = '';
//             state.filter.priceTo = '';
//             state.filter.countries = [];
//             state.filter.certification = [];
//             state.filter.verified = [];
//             state.filter.condition = {};
//         }
//
//
//         console.log(state.filter, 'state.filter');
//     },
//
//     SUCCESS_TOGGLE_GROUP_FILTER_BUTTONS: (state) => {
//         state.openedGroupFilterButtons = !state.openedGroupFilterButtons;
//     },
//     SUCCESS_TOGGLE_GROUP_STATUS_BUTTONS: (state) => {
//         state.openedGroupStatusButtons = !state.openedGroupStatusButtons;
//     },
//     SUCCESS_TOGGLE_GROUP_MANAGE_BUTTONS: (state) => {
//         state.openedGroupManageButtons = !state.openedGroupManageButtons;
//     }
// };
//
// const getters = {
//     types: state => state.types,
//     status: state => state.status,
//     certificates: state => state.certificates,
//     selectedContractor: state => state.selectedContractor,
//     openedContractorDialog: state => state.openedContractorDialog,
//     contractorDialogCoordinates: state => state.contractorDialogCoordinates,
//     offers: state => state.offers,
//     contractors: state => state.contractors,
//     /**
//      * return sort array of contractors
//      *
//      * @param state
//      * @returns {Array} array sorted contractors
//      */
//     offerContractors: state => {
//         let contractors = [];
//
//         state.offers.forEach((offer, i) => {
//             contractors.push([]);
//
//             offer.contractorsId.sort((a, b) => {
//                 let first = state.contractors.find(item => item.id === a),
//                     sec = state.contractors.find(item => item.id === b);
//
//                 let firstType = state.types.find(type => {
//                         return type.id === first.typeId;
//                     }),
//                     secType = state.types.find(type => {
//                         return type.id === sec.typeId;
//                     });
//
//                 if (firstType.priority > secType.priority)
//                     return 1;
//                 if (firstType.priority < secType.priority)
//                     return -1;
//             });
//
//             offer.contractorsId.forEach(contractorId => {
//                 contractors[i].push(state.contractors.find(contractor => contractor.id === contractorId));
//             });
//         });
//
//         return contractors;
//     },
//     filteredOffers: state => state.filteredOffers,
//     /**
//      * return sort array of contractors from filtered offers list
//      *
//      * @param state
//      * @returns {Array} array sorted contractors
//      */
//     filteredOfferContractors: state => {
//         let contractors = [];
//
//         state.filteredOffers.forEach((offer, i) => {
//             contractors.push([]);
//
//             offer.contractorsId.sort((a, b) => {
//                 let first = state.contractors.find(item => item.id === a),
//                     sec = state.contractors.find(item => item.id === b);
//
//                 let firstType = state.types.find(type => {
//                         return type.id === first.typeId;
//                     }),
//                     secType = state.types.find(type => {
//                         return type.id === sec.typeId;
//                     });
//
//                 if (firstType.priority > secType.priority)
//                     return 1;
//                 if (firstType.priority < secType.priority)
//                     return -1;
//             });
//
//             offer.contractorsId.forEach(contractorId => {
//                 contractors[i].push(state.contractors.find(contractor => contractor.id === contractorId));
//             });
//         });
//
//         return contractors;
//     },
//     filters: state => state.filters,
//     filtersCondition: state => state.filtersCondition,
//     filteredContractorsTypes: state => state.filteredContractorsTypes,
//     currentFilter: state => state.currentFilter,
//
//     filter: state => state.filter,
//     manage: state => state.manage,
//
//     openedGroupFilterButtons: state => state.openedGroupFilterButtons,
//     openedGroupStatusButtons: state => state.openedGroupStatusButtons,
//     openedGroupManageButtons: state => state.openedGroupManageButtons,
//     openedOfferOptions: state => state.openedOfferOptions,
//     hiddenAreaOfferOptions: state => state.hiddenAreaOfferOptions
// };
//
// export default {
//     state,
//     mutations,
//     getters,
//     actions
// }