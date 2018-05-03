<template>
    <nav class="pagination">
        <ul class="links" id="pagination-links">
            <li id="prev-page" @click="prevPage">&lt;</li>
            <!-- переписать :class в computed свойство
            стрелки вправо - влево находятся не по центру
            -->
            <li v-for="(item, index) in listOfPages"
                :class="classItemList(item)"
                @click="changePage($event, item, index)">
                {{ item }}
            </li>
            <li id="next-page" @click="nextPage">></li>
        </ul>
    </nav>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        name: "pagination",
        data() {
            return {
                pseudoCurrentPage: 1
            }
        },
        props: {
            numOffers: [String, Number]
        },
        watch: {
            currentPage: function (val) {
                this.changePage(null, val, null);
            }
        },
        computed: {
            listOfPages: function () {
                let currentPage = this.currentPage;
                let list = [];
                let numberOfPage = Math.ceil(this.numOffers / this.countOfferPerPage);
                let maxPage = numberOfPage;

                //разбить на функции
                if (this.pseudoCurrentPage !== 1) {
                    if (this.pseudoCurrentPage <= 4) {

                        if (numberOfPage <= 8) {
                            for (let i = 0; i < numberOfPage; i++) {
                                list.push(i + 1);
                            }
                            return list;
                        } else {
                            for (let i = 0; i < 9; i++) {
                                if (i < 7) {
                                    list.push(i + 1);
                                } else if (i === 7) {
                                    list.push("...");
                                } else {
                                    list.push(maxPage);
                                }
                            }
                            return list;
                        }
                    } else if (this.pseudoCurrentPage >= maxPage - 3) {

                        if (numberOfPage <= 8) {
                            for (let i = 0; i < numberOfPage; i++) {
                                list.push(i + 1);
                            }
                            return list;
                        } else {
                            for (let i = 0; i < 9; i++) {
                                if (i === 0) {
                                    list.push(i + 1);
                                } else if (i === 1) {
                                    list.push('...');
                                } else
                                    list.push(maxPage - 8 + i);
                            }
                            return list;
                        }
                    }  else if (this.pseudoCurrentPage === 5) {
                        if (numberOfPage < 7) {
                            for (let i = 0; i < numberOfPage; i++) {
                                list.push(i + 1);
                            }
                            return list;
                        } else if (numberOfPage === 9) {
                            for (let i = 0; i < numberOfPage; i++) {
                                list.push(i + 1);
                            }
                            return list;
                        } else {
                            for (let i = 0; i < 10; i++) {
                                if (i < 8) {
                                    list.push(i + 1);
                                } else if (i === 8) {
                                    list.push("...");
                                } else {
                                    list.push(maxPage);
                                }
                            }
                            return list;
                        }
                    } else if (this.pseudoCurrentPage === maxPage - 4) {
                        for (let i = 0; i < 10; i++) {
                            if (i === 0) {
                                list.push(i + 1);
                            } else if (i === 1) {
                                list.push('...');
                            } else
                                list.push(maxPage - 9 + i);
                        }
                        return list;
                    } else {
                        for (let i = 0; i < 11; i++) {
                            if (i === 1 || i === 9) {
                                list.push('...');
                            } else if (i === 10) {
                                list.push(maxPage);
                                return list;
                            } else if (i === 0) {
                                list.push(i + 1);
                            } else
                                list.push(i + this.pseudoCurrentPage - 5);
                        }
                    }
                } else if (currentPage <= 4) {

                    if (numberOfPage <= 8) {
                        for (let i = 0; i < numberOfPage; i++) {
                            list.push(i + 1);
                        }
                        return list;
                    } else {
                        for (let i = 0; i < 9; i++) {
                            if (i < 7) {
                                list.push(i + 1);
                            } else if (i === 7) {
                                list.push("...");
                            } else {
                                list.push(maxPage);
                            }
                        }
                        return list;
                    }

                } else if (currentPage >= maxPage - 3) {

                    if (numberOfPage <= 8) {
                        for (let i = 0; i < numberOfPage; i++) {
                            list.push(i + 1);
                        }
                        return list;
                    } else {
                        for (let i = 0; i < 9; i++) {
                            if (i === 0) {
                                list.push(i + 1);
                            } else if (i === 1) {
                                list.push('...');
                            } else
                                list.push(maxPage - 8 + i);
                        }
                        return list;
                    }

                } else if (currentPage === 5) {
                    if (numberOfPage < 7) {
                        for (let i = 0; i < numberOfPage; i++) {
                            list.push(i + 1);
                        }
                        return list;
                    } else if (numberOfPage === 9) {
                        for (let i = 0; i < numberOfPage; i++) {
                            list.push(i + 1);
                        }
                        return list;
                    } else {
                        for (let i = 0; i < 10; i++) {
                            if (i < 8) {
                                list.push(i + 1);
                            } else if (i === 8) {
                                list.push("...");
                            } else {
                                list.push(maxPage);
                            }
                        }
                        return list;
                    }
                } else if (currentPage === maxPage - 4) {
                    for (let i = 0; i < 10; i++) {
                        if (i === 0) {
                            list.push(i + 1);
                        } else if (i === 1) {
                            list.push('...');
                        } else
                            list.push(maxPage - 9 + i);
                    }
                    return list;
                } else {
                    for (let i = 0; i < 11; i++) {
                        if (i === 1 || i === 9) {
                            list.push('...');
                        } else if (i === 10) {
                            list.push(maxPage);
                            return list;
                        } else if (i === 0) {
                            list.push(i + 1);
                        } else
                            list.push(i + currentPage - 5);
                    }
                }
            },
            currentPage: function () {
                console.log(this.$store.state.Offers.currentPage);
                return this.$store.state.Offers.currentPage;
            },
            countOfferPerPage: function () {
                return this.$store.state.Offers.countOfferPerPage;
            }
        },
        methods: {
            ...mapMutations({
                setCurrentPage: 'SET_CURRENT_PAGE'
            }),
            changePage: function (e, item, index) {
                if (item === '...') {
                    this.pseudoCurrentPage = this.currentPage;
                    let dots = document.getElementsByClassName('dots');

                    if (index === 1) {
                        let flag = +dots[0].nextElementSibling.innerHTML;
                        this.pseudoCurrentPage = flag - 1;
                    } else {
                        let flag = +dots[dots.length - 1].previousElementSibling.innerHTML;
                        this.pseudoCurrentPage = flag + 1;
                    }
                    let foundItem = this.listOfPages.find(el => {
                        return parseInt(el) === parseInt(this.currentPage);
                    });

                    if (foundItem === undefined) {
                        this.removeActionClass();
                    } else {
                        this.removeActionClass();
                        this.addActionClass(this.currentPage);
                    }
                } else {
                    if (this.pseudoCurrentPage !== 1) {
                        this.pseudoCurrentPage = 1;
                        this.addActionClass(item);
                        this.setCurrentPage(item);
                    } else {
                        this.removeActionClass();
                        this.addActionClass(item);
                        this.setCurrentPage(item);
                    }
                }
            },
            addActionClass: function (item) {
                setTimeout(function () {
                    let list = document.getElementsByClassName('inactive');
                    for (let i = 0; i < list.length; i++) {
                        if (+list[i].innerHTML === item) {
                            list[i].classList.add('active');
                            list[i].classList.remove('inactive');
                            break;
                        }
                    }
                }, 40);
            },
            removeActionClass: function () {
                let activeItems = document.getElementById('pagination-links').getElementsByClassName('active');
                for (let i = 0; i < activeItems.length; i++) {
                    activeItems[i].classList.add('inactive');
                    activeItems[i].classList.remove('active');
                }
            },

            prevPage: function () {
                if (this.currentPage !== 1)
                    this.changePage(null, this.currentPage - 1, null);
            },
            nextPage: function () {
                if (this.currentPage !== Math.ceil(this.numOffers / this.countOfferPerPage))
                    this.changePage(null, this.currentPage + 1, null);
            },
            classItemList: function (item) {
                if (item === 1)
                    return 'active';
                else if (item === '...')
                    return 'dots';
                else if (item !== 1 || item !== '...')
                    return 'inactive';
            }
        }
    }
</script>

<style lang="stylus" scoped>
    // .pagination
    //     .links
    //         padding-left 0
    //         li.active
    //             cursor default
    //         li.active:hover
    //             background-color #ffd24f
    //         li:hover
    //             background-color #ffdd78
</style>