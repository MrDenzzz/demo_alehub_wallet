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
            name: 'Vasiliy Ivanov',
            rating: 5.5,
            sinceDate: 1524671843000,
            webAddress: 'v-ivanov.com',
            githubAddress: '@vasiliy.ivanov',
            countOfProject: 12,
            avgCostPerProject: 1000
        },
        {
            id: 2,
            positionId: 2,
            name: 'Ivan Kotov',
            rating: 6.9,
            sinceDate: 1514671843000,
            webAddress: 'i-kotov.com',
            githubAddress: '@ivan.kotov',
            countOfProject: 23,
            avgCostPerProject: 2000
        },
        {
            id: 3,
            positionId: 3,
            name: 'Andrey Sagal',
            rating: 8.2,
            sinceDate: 1504671843000,
            webAddress: 'a-sagal.com',
            githubAddress: '@andrey.sagal',
            countOfProject: 34,
            avgCostPerProject: 3000
        },
        {
            id: 4,
            positionId: 4,
            name: 'Nikita Govorunov',
            rating: 9.8,
            sinceDate: 1494671843000,
            webAddress: 'n-govorunov.com',
            githubAddress: '@nikita.govorunov',
            countOfProject: 45,
            avgCostPerProject: 4000
        },
        // {
        //     id: 5,
        //     positionId: 1,
        //     name: 'Denis Sergeev'
        // },
        // {
        //     id: 6,
        //     positionId: 2,
        //     name: 'Vsevolod Kuznetsov'
        // },
        // {
        //     id: 7,
        //     positionId: 3,
        //     name: 'Danila Bagrov'
        // },
        // {
        //     id: 8,
        //     positionId: 4,
        //     name: 'Egor Gloktev'
        // }
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
            title: 'ready'
        },
        {
            id: 2,
            title: 'progress'
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
            date: {
                from: 1524571843000,
                to: 1526213443000,
            },
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        },
                        {
                            id: 2,
                            href: '../../static/offer-documents/doc2.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        },
                        {
                            id: 2,
                            href: '../../static/offer-documents/doc2.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        },
                        {
                            id: 2,
                            href: '../../static/offer-documents/doc2.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
            date: {
                from: 1524571843000,
                to: 1525954243000,
            },
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        },
                        {
                            id: 2,
                            href: '../../static/offer-documents/doc2.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
            date: {
                from: 1524571843000,
                to: 1524744643000,
            },
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        },
                        {
                            id: 2,
                            href: '../../static/offer-documents/doc2.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
            date: {
                from: 1524571843000,
                to: 1526213443000,
            },
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        },
                        {
                            id: 2,
                            href: '../../static/offer-documents/doc2.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        },
                        {
                            id: 2,
                            href: '../../static/offer-documents/doc2.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        },
                        {
                            id: 2,
                            href: '../../static/offer-documents/doc2.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
            date: {
                from: 1524571843000,
                to: 1525954243000,
            },
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        },
                        {
                            id: 2,
                            href: '../../static/offer-documents/doc2.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
            date: {
                from: 1524571843000,
                to: 1524744643000,
            },
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
                    },
                    documents: [
                        {
                            id: 1,
                            href: '../../static/offer-documents/doc1.txt',
                            date: {
                                upload: 1
                            }
                        },
                        {
                            id: 2,
                            href: '../../static/offer-documents/doc2.txt',
                            date: {
                                upload: 1
                            }
                        }
                    ]
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
    ]
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
    },
    applyOffer: ({commit}, offerId) => {
        commit('SUCCESS_APPLY_OFFER', offerId)
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

function formatToOffersPositions(positions) {
    let i = 0;
    return positions.map(pos => {
        return {
            id: ++i,
            positionId: pos,
            contractor: {},
            documents: []
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
        let index = state.offers.findIndex(item => {
            return item.id === offerId;
        });
        state.offers[index].saved = !state.offers[index].saved;
    },
    SUCCESS_ADD_NEW_OFFER: (state, data) => {
        let id = state.offers[state.offers.length - 1].id + 1,
            end = Math.ceil((Date.parse(data.date.to) - Date.parse(new Date)) / 24 / 60 / 60 / 1000);

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
                date: {
                    from: data.date.from,
                    to: data.date.to,
                },
                end: end,
                positions: formatToOffersPositions(data.positions),
                contractors: []
            }
        );
    },
    SUCCESS_APPLY_OFFER: (state, offerId) => {
        let offerIndex = state.offers.findIndex(item => {
            return item.id === Number(offerId);
        });
        state.offers[offerIndex].positions.push(
            {
                id: state.offers[offerIndex].positions.length === 0 ? 1 : state.offers[offerIndex].positions[state.offers[offerIndex].positions.length - 1].id + 1,
                positionId: state.offers[offerIndex].positions.length === 0 ? 1 : state.offers[offerIndex].positions[state.offers[offerIndex].positions.length - 1].positionId + 1,
                contractor: {
                    contractorId: 4,
                    date: [
                        {
                            from: state.offers[offerIndex].date.from,
                            to: state.offers[offerIndex].date.to
                        }
                    ]
                },
                documents: []
            }
        );
        state.offers[offerIndex].contractors.push(
            {
                id: state.offers[offerIndex].contractors.length === 0 ? 1 : state.offers[offerIndex].contractors[state.offers[offerIndex].contractors.length - 1].id + 1,
                contractorId: 4,
                date: [
                    {
                        from: state.offers[offerIndex].date.from,
                        to: state.offers[offerIndex].date.to
                    }
                ]
            }
        )
    }
};

const getters = {
    offers: state => state.offers,
    savedOffers: state => state.offers.filter(item => {
        return item.saved === true;
    }),
    MyOffers: state => state.offers.filter(item => {
        return item.employerId === 4;
    }),
    PortfolioOffers: state => state.offers.filter(item => {
        return item.contractors.findIndex(contractor => {
            return contractor.id === 4;
        }) !== -1;
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