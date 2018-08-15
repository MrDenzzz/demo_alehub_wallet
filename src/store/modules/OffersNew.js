import axios from 'axios';

const state = {
    employers: [
        {
            id: 1,
            name: 'Effective Energy LTD',
            rating: 9.2
        },
        {
            id: 2,
            name: 'Bug Busters LLC',
            rating: 6.4
        },
        {
            id: 3,
            name: 'SpecPropMounted VUE',
            rating: 7.9
        }
    ],
    positions: [
        {
            id: 1,
            title: 'ch',
            label: 'check'
        },
        {
            id: 2,
            title: 'ts',
            label: 'technical support'
        },
        {
            id: 3,
            title: 'ex',
            label: 'executor'
        },
        {
            id: 4,
            title: 'qa',
            label: 'quality assurance'
        }
    ],
    contractors: [
        {
            id: 1,
            positionId: 1,
            name: 'Vasiliy Ivanov'
        },
        {
            id: 2,
            positionId: 2,
            name: 'Ivan Kotov'
        },
        {
            id: 3,
            positionId: 3,
            name: 'Andrey Sagal'
        },
        {
            id: 4,
            positionId: 4,
            name: 'Nikita Govorunov'
        },
        {
            id: 5,
            positionId: 1,
            name: 'Denis Sergeev'
        },
        {
            id: 6,
            positionId: 2,
            name: 'Vsevolod Kuznetsov'
        },
        {
            id: 7,
            positionId: 3,
            name: 'Danila Bagrov'
        },
        {
            id: 8,
            positionId: 4,
            name: 'Egor Gloktev'
        }
    ],
    requirements: [
        {
            id: 1,
            label: 'JavaScript',
            title: 'JavaScript'
        },
        {
            id: 2,
            label: 'Java',
            title: 'Java'
        },
        {
            id: 3,
            label: 'C++',
            title: 'C++'
        },
        {
            id: 4,
            label: 'NodeJS',
            title: 'NodeJS'
        },
        {
            id: 5,
            label: 'VueJS',
            title: 'VueJS'
        },
        {
            id: 6,
            label: 'React',
            title: 'React'
        },
        {
            id: 7,
            label: 'Network',
            title: 'Network'
        },
        {
            id: 8,
            label: 'Blockchain',
            title: 'Blockchain'
        }
    ],
    conditions: [
        {
            id: 1,
            title: 'progress'
        },
        {
            id: 2,
            title: 'ready'
        },
        {
            id: 3,
            title: 'pause'
        },
        {
            id: 4,
            title: 'stop'
        }
    ],
    offers: [
        {
            id: 1,
            conditionId: 1,
            employerId: 1,
            name: 'NodeJS telegram bot',
            description: 'It is required to develop a telegram for a crypto-currency start-up. It must be done ' +
            'quickly, beautifully and inexpensively. With us you will receive many invaluable experiences and ' +
            'pleasant memories.',
            price: 3200,
            saved: false,
            requirements: [
                {
                    id: 1,
                    requirementId: 1,
                },
                {
                    id: 2,
                    requirementId: 2,
                },
                {
                    id: 3,
                    requirementId: 3,
                },
                {
                    id: 4,
                    requirementId: 4,
                },
                {
                    id: 5,
                    requirementId: 5,
                }
            ],
            end: 18,
            positions: [
                {
                    id: 1,
                    positionId: 1,
                    contractor: {
                        contractorId: 1,
                        date: [
                            {
                                from: 1524571843000,
                                to: 1524744643000
                            },
                            {
                                from: 1525003843000,
                                to: 1525654243000
                            }
                        ]
                    }
                },
                {
                    id: 2,
                    positionId: 2,
                    contractor: {
                        contractorId: 2,
                        date: [
                            {
                                from: 1524644643000,
                                to: 1525119843000
                            }
                        ]
                    }
                },
                {
                    id: 3,
                    positionId: 3,
                    contractor: {
                        contractorId: 3,
                        date: [
                            {
                                from: 1525003843000,
                                to: 1525954243000
                            }
                        ]
                    }
                },
                {
                    id: 4,
                    positionId: 1,
                    contractor: {
                        contractorId: 4,
                        date: [
                            {
                                from: 1524671843000,
                                to: 1524844643000
                            },
                            {
                                from: 1524971843000,
                                to: 1525044643000
                            },
                            {
                                from: 1525522243000,
                                to: 1526213443000
                            }
                        ]
                    }
                }
            ],
            contractors: [
                {
                    id: 1,
                    contractorId: 1,
                    date: [
                        {
                            from: 1524571843000,
                            to: 1524744643000
                        },
                        {
                            from: 1525003843000,
                            to: 1525654243000
                        }
                    ]
                },
                {
                    id: 2,
                    contractorId: 2,
                    date: [
                        {
                            from: 1524644643000,
                            to: 1525119843000
                        }
                    ]
                },
                {
                    id: 3,
                    contractorId: 3,
                    date: [
                        {
                            from: 1525003843000,
                            to: 1525954243000
                        }
                    ]
                },
                {
                    id: 4,
                    contractorId: 4,
                    date: [
                        {
                            from: 1524671843000,
                            to: 1524844643000
                        },
                        {
                            from: 1524971843000,
                            to: 1525044643000
                        },
                        {
                            from: 1525522243000,
                            to: 1526213443000
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            conditionId: 2,
            employerId: 2,
            name: 'Web shop',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
            'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
            'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum ' +
            'dolore eu fugiat nulla pariatur.',
            employer: 'Effective Energy LTD',
            price: 4500,
            saved: true,
            requirements: [
                {
                    id: 1,
                    requirementId: 5,
                },
                {
                    id: 2,
                    requirementId: 6,
                },
                {
                    id: 3,
                    requirementId: 7,
                }
            ],
            end: 18,
            positions: [
                {
                    id: 1,
                    positionId: 1,
                    contractor: {
                        contractorId: 1,
                        date: [
                            {
                                from: 1524571843000,
                                to: 1524744643000
                            }
                        ]
                    }
                },
                {
                    id: 2,
                    positionId: 2,
                    contractor: {
                        contractorId: 2,
                        date: [
                            {
                                from: 1524644643000,
                                to: 1525119843000
                            }
                        ]
                    }
                },
                {
                    id: 3,
                    positionId: 3,
                    contractor: {
                        contractorId: 3,
                        date: [
                            {
                                from: 1525003843000,
                                to: 1525954243000
                            }
                        ]
                    }
                }
            ],
            contractors: [
                {
                    id: 1,
                    contractorId: 1,
                    date: [
                        {
                            from: 1524571843000,
                            to: 1524744643000
                        }
                    ]
                },
                {
                    id: 2,
                    contractorId: 2,
                    date: [
                        {
                            from: 1524644643000,
                            to: 1525119843000
                        }
                    ]
                },
                {
                    id: 3,
                    contractorId: 3,
                    date: [
                        {
                            from: 1525003843000,
                            to: 1525954243000
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            conditionId: 3,
            employerId: 3,
            name: 'Compressing algorithm',
            description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain ' +
            'was born and I will give you a complete account of the system, and expound the actual teachings of ' +
            'the great explorer of the truth, the master-builder of human happiness.',
            price: 11600,
            saved: false,
            requirements: [
                {
                    id: 1,
                    requirementId: 1,
                },
                {
                    id: 2,
                    requirementId: 3,
                },
                {
                    id: 3,
                    requirementId: 5,
                },
                {
                    id: 4,
                    requirementId: 8,
                }
            ],
            end: 18,
            positions: [
                {
                    id: 1,
                    positionId: 1,
                    contractor: {
                        contractorId: 1,
                        date: [
                            {
                                from: 1524571843000,
                                to: 1524744643000
                            }
                        ]
                    }
                }
            ],
            contractors: [
                {
                    id: 1,
                    contractorId: 1,
                    date: [
                        {
                            from: 1524571843000,
                            to: 1524744643000
                        }
                    ]
                }
            ]
        }
    ],
    filteredOffers: [
        {
            id: 1,
            conditionId: 1,
            employerId: 1,
            name: 'NodeJS telegram bot',
            description: 'It is required to develop a telegram for a crypto-currency start-up. It must be done ' +
            'quickly, beautifully and inexpensively. With us you will receive many invaluable experiences and ' +
            'pleasant memories.',
            price: 3200,
            requirements: [
                {
                    id: 1,
                    requirementId: 1,
                },
                {
                    id: 2,
                    requirementId: 2,
                },
                {
                    id: 3,
                    requirementId: 3,
                },
                {
                    id: 4,
                    requirementId: 4,
                },
                {
                    id: 5,
                    requirementId: 5,
                }
            ],
            end: 18,
            contractors: [
                {
                    id: 1,
                    contractorId: 1,
                    date: [
                        {
                            from: 1524571843000,
                            to: 1524744643000
                        },
                        {
                            from: 1525003843000,
                            to: 1525654243000
                        }
                    ]
                },
                {
                    id: 2,
                    contractorId: 2,
                    date: [
                        {
                            from: 1524644643000,
                            to: 1525119843000
                        }
                    ]
                },
                {
                    id: 3,
                    contractorId: 3,
                    date: [
                        {
                            from: 1525003843000,
                            to: 1525954243000
                        }
                    ]
                },
                {
                    id: 4,
                    contractorId: 4,
                    date: [
                        {
                            from: 1524671843000,
                            to: 1524844643000
                        },
                        {
                            from: 1524971843000,
                            to: 1525044643000
                        },
                        {
                            from: 1525522243000,
                            to: 1526213443000
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            conditionId: 2,
            employerId: 2,
            name: 'Web shop',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
            'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
            'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum ' +
            'dolore eu fugiat nulla pariatur.',
            employer: 'Effective Energy LTD',
            price: 4500,
            requirements: [
                {
                    id: 1,
                    requirementId: 5,
                },
                {
                    id: 2,
                    requirementId: 6,
                },
                {
                    id: 3,
                    requirementId: 7,
                }
            ],
            end: 18,
            contractors: [
                {
                    id: 1,
                    contractorId: 1,
                    date: [
                        {
                            from: 1524571843000,
                            to: 1524744643000
                        }
                    ]
                },
                {
                    id: 2,
                    contractorId: 2,
                    date: [
                        {
                            from: 1524644643000,
                            to: 1525119843000
                        }
                    ]
                },
                {
                    id: 3,
                    contractorId: 3,
                    date: [
                        {
                            from: 1525003843000,
                            to: 1525954243000
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            conditionId: 3,
            employerId: 3,
            name: 'Compressing algorithm',
            description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain ' +
            'was born and I will give you a complete account of the system, and expound the actual teachings of ' +
            'the great explorer of the truth, the master-builder of human happiness.',
            price: 11600,
            requirements: [
                {
                    id: 1,
                    requirementId: 1,
                },
                {
                    id: 2,
                    requirementId: 3,
                },
                {
                    id: 3,
                    requirementId: 5,
                },
                {
                    id: 4,
                    requirementId: 8,
                }
            ],
            end: 18,
            contractors: [
                {
                    id: 1,
                    contractorId: 1,
                    date: [
                        {
                            from: 1524571843000,
                            to: 1524744643000
                        }
                    ]
                }
            ]
        }
    ],
};

const actions = {
    filterOffersRequest: ({commit}, filterData) => {
        return new Promise((resolve, reject) => {
            commit('SUCCESS_FILTER_OFFER', filterData);
            resolve('success filter offer');
        });
    },
    resetOffersRequest: ({commit}) => {
        return new Promise((resolve, reject) => {
            commit('SUCCESS_RESET_OFFER');
            resolve('success reset offer');
        });
    },
    addNewOffer: ({commit}, offerData) => {
        return new Promise((resolve, reject) => {
            commit('SUCCESS_ADD_NEW_OFFER', offerData);
            resolve('success add new offer');
        });
    }
};

function checkFilterRatingFrom(offerRating, filterRatingFrom) {
    if (!filterRatingFrom)
        return true;

    return offerRating > filterRatingFrom;
}

function checkFilterRatingTo(offerRating, filterRatingTo) {
    if (!filterRatingTo)
        return true;

    return offerRating < filterRatingTo;
}

function checkFilterPriceFrom(offerPrice, filterPriceFrom) {
    if (!filterPriceFrom)
        return true;

    return offerPrice > filterPriceFrom;
}

function checkFilterPriceTo(offerPrice, filterPriceTo) {
    if (!filterPriceTo)
        return true;

    return offerPrice < filterPriceTo;
}

function autoIncrement() {

}

function formatToOffersRequirements(requirements) {
    let i = 0;
    return requirements.map(req => {
        return {
            id: ++i,
            requirementId: req.id
        };
    });
}

const mutations = {
    SUCCESS_FILTER_OFFER: (state, filterData) => {
        state.filteredOffers = state.offers.filter(offer => {
            return offer.name.toLowerCase().includes(filterData.name.toLowerCase()) &&
                checkFilterRatingFrom(Number(state.employers.find(e => e.id === offer.employerId).rating), Number(filterData.ratingFrom)) &&
                checkFilterRatingTo(Number(state.employers.find(e => e.id === offer.employerId).rating), Number(filterData.ratingTo)) &&
                checkFilterPriceFrom(Number(offer.price), Number(filterData.priceFrom)) &&
                checkFilterPriceTo(Number(offer.price), Number(filterData.priceTo));
            // (filterData.ratingTo) ? Number(offer.price) < Number(filterData.ratingTo) : true &&
            // (filterData.priceFrom) ? Number(offer.price) > Number(filterData.priceFrom) : true &&
            // (filterData.priceTo) ? Number(offer.price) < Number(filterData.priceTo) : true;
        });
    },
    SUCCESS_RESET_OFFER: (state) => {
        state.filteredOffers = state.offers;
    },
    SAVE_OFFER: (state, offerId) => {
        console.log(offerId);
        let index = state.offers.findIndex(item => {
            return item.id === offerId;
        });
        state.offers[index].saved = !state.offers[index].saved;
    },
    SUCCESS_ADD_NEW_OFFER: (state, data) => {
        let id = state.offers[state.offers.length - 1].id + 1,
            end = Math.ceil((Date.parse(data.finalDate) - Date.parse(new Date)) / 24 / 60 / 60 / 1000);

        state.offers.push(
            {
                id: id,
                conditionId: 1,
                employerId: 1,
                name: data.name,
                saved: false,
                description: data.description,
                price: Number(data.price),
                requirements: formatToOffersRequirements(data.requirements),
                end: end,
                contractors: []
            }
        )
    }
};

const getters = {
    offers: state => state.offers,
    savedOffers: state => state.offers.filter(item => {
        return item.saved === true;
    }),
    filteredOffers: state => state.filteredOffers,
    employers: state => state.employers,
    positions: state => state.positions,
    positionsOfferContractors: state => state.positions,
    contractors: state => {
        // let contractors = [];
        // state.contractors.forEach(contractor => {
        //     contractors.push(
        //         {
        //             id: contractor.id,
        //             position: state.positions.find(position => position.id === contractor.positionId).title,
        //             name: contractor.name
        //         }
        //     );
        // });


        return state.contractors;
    },
    requirements: state => state.requirements,
    requirementsList: state => state.requirements,
    conditions: state => state.conditions,
};

export default {
    state,
    mutations,
    getters,
    actions
}