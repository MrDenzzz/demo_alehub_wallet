<template>
    <div class="offers">
        <navbar title="Contract Overview"
                :isNavigate="true"
                :isBalance="true"
                :rightMenu="rightMenu"/>

        <div class="info-header">
            <div class="info-wrap">
                <div class="project">
                    <div class="circle"></div>
                    <div class="project-info">
                        <div class="title">{{ project.name }}</div>
                        <div class="subtitle">{{ project.company }}</div>
                    </div>
                </div>
                <div>
                    <div class="title">
                        Global limit
                    </div>
                    <div class="subtitle">
                        ${{ project.limit }}
                    </div>
                </div>
                <div>
                    <div class="title">
                        Contract period
                    </div>
                    <div class="subtitle">
                        {{ project.startDate }} - {{ project.finalDate }}
                    </div>
                </div>
                <div>
                    <div class="title">
                        Status
                    </div>
                    <div class="subtitle">
                        {{ project.status }}
                    </div>
                </div>
            </div>
            <div class="options" @click="showMenu = !showMenu">
                <img src="../../static/img/menu.svg" alt="">
            </div>
            <div class="dropdown-list" v-if="showMenu">
                <div class="dropdown-item">Add document</div>
                <div class="dropdown-item">Add contractor</div>
                 <div class="dropdown-item delete">Edit contract</div>
                 <div class="dropdown-item delete">Make a copy</div>
            </div>
        </div>

        <!--rename to normal name classes-->
        <div class="my-row-flex">
            <div class="mycol"
                 style="display: flex; flex-direction: column; align-items: center; flex-grow: 1; padding: 16px; width: 20%; min-width: 20%;"
                 v-for="(contractor, i) in contractors">

                <div class="project-progress-block" style="height: 4px; width: 100%;">
                    <div class="progress" style="height: 100%;"
                         :style="{width: 100 * contractor.ready + '%' }"
                         :class="initProgressBar(i)">
                        <!--{{ initProgressBar(contractor.ready) }}-->
                    </div>
                </div>

                <div class="contractor-info">
                    <h3 style="font-weight: 500;">
                        {{ contractor.name }}
                    </h3>

                    <h4 style="font-weight: 500;">
                        {{ '$' + contractor.balance }}
                    </h4>
                </div>

                <div class="task-list">
                    <div class="task-block">

                    </div>
                </div>

                <div class="att-list">
                    <div class="att-block"
                         :class="initColColor(i)"
                         v-for="(att, index) in contractor.attachments" @click="toggleAttMenu(index, contractor)">

                        <div class="dropdown-list" v-if="att.isActive">
                            <div class="dropdown-item">Download file</div>
                            <div class="dropdown-item">Make a copy</div>
                            <div class="dropdown-item delete">Delete</div>
                        </div>

                         <div class="circle small-circle" :class="'circle-' + att.status">
                             <img :src="getStatusIcon(att.status)" alt="">
                         </div>

                        <img :src="att.icon" alt="document type">

                        <div class="att-info">
                            <p style="margin: 0; font-size: 10px; color: #34343e; opacity: 0.7;">
                                {{ toFormatDate(att.date) }}
                            </p>
                            <p style="margin: 0;">
                                {{ att.title }}
                            </p>
                        </div>

                        <img src="../../static/img/avatar@3x.png" alt="author avatar"
                             style="width: 28px; height: 28px;">

                    </div>
                </div>

            </div>
        </div>

        <div class="timeline-block">
            <canvas id="timeline">Update your browser</canvas>
            <div class="marker-calendar start">
                <div class="block">
                    <img src="../../static/img/calendar-ic_black.svg" alt="" width="16px" height="16px">
                    <div class="triangle"></div>
                </div>
            </div>
            <div class="marker-calendar final">
                <div class="block">
                    <img src="../../static/img/calendar-ic_black.svg" alt="" width="16px" height="16px">
                    <div class="triangle"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Navbar from './layouts/Navbar'

    export default {
        name: 'NewOffers',
        components: {
            Navbar
        },
        data() {
            return {
                showMenu: false,
                project: {
                    name: 'Alehub',
                    company: 'Effective Energy',
                    limit: '53388',
                    startDate: '10 May, 2018',
                    finalDate: '23 Dec, 2019',
                    status: 'On track'
                },
                contractors: [
                    {   
                        name: 'Thorsten & Co',
                        balance: 12335,
                        ready: 1,  //1 = 100% готовности
                        tasks: [
                            {
                                title: 'Title 1 1',
                                description: '',
                                priority: 1,
                                attachments: '',
                                author: 'user 1 1'
                            },
                            {
                                title: 'Title 1 2',
                                description: '',
                                priority: 0.2,
                                attachments: '',
                                author: 'user 1 2'
                            },
                            {
                                title: 'Title 1 3',
                                description: '',
                                priority: 0.4,
                                attachments: '',
                                author: 'user 1 3'
                            },
                            {
                                title: 'Title 1 4',
                                description: '',
                                priority: 0.6,
                                attachments: '',
                                author: 'user 1 4'
                            },
                            {
                                title: 'Title 1 5',
                                description: '',
                                priority: 0.6,
                                attachments: '',
                                author: 'user 1 5'
                            }
                        ],
                        attachments: [
                            {
                                icon: '../../static/img/word-ic.svg',
                                date: 1524318238518,
                                title: 'demands.doc',
                                author: 'user 1 3',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/excel-ic.svg',
                                date: 1524318238518,
                                title: 'price.xls',
                                author: 'user 1 2',
                                status: 'error',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/powerpoint-ic.svg',
                                date: 1524318238518,
                                title: 'conditions.pptx',
                                author: 'user 1 1',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/word-ic.svg',
                                date: 1524318238518,
                                title: 'description.doc',
                                author: 'user 1 5',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/word-ic.svg',
                                date: 1524318238518,
                                title: 'specifications.doc',
                                author: 'user 1 4',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/pdf-ic.svg',
                                date: 1524318238518,
                                title: 'wannacry.exe',
                                author: 'user 1 4',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/powerpoint-ic.svg',
                                date: 1524318238518,
                                title: 'conditions2.pptx',
                                author: 'user 1 1',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/word-ic.svg',
                                date: 1524318238518,
                                title: 'description2.doc',
                                author: 'user 1 5',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/word-ic.svg',
                                date: 1524318238518,
                                title: 'specifications2.doc',
                                author: 'user 1 4',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/pdf-ic.svg',
                                date: 1524318238518,
                                title: 'wannacry2.exe',
                                author: 'user 1 4',
                                status: 'ok',
                                isActive: false
                            },
                        ],
                        messages: [
                            {
                                from: 'user 1 1',
                                to: 'user 1 5',
                                message: 'Hello, im user 1 1',
                                date: 1524318238518
                            },
                            {
                                from: 'user 1 3',
                                to: 'user 1 4',
                                message: 'Hello, im user 1 3',
                                date: 1524318238518
                            },
                            {
                                from: 'user 1 4',
                                to: 'user 1 2',
                                message: 'Hello, im user 1 4',
                                date: 1524318238518
                            },
                            {
                                from: 'user 1 5',
                                to: 'user 1 1',
                                message: 'Hello, im user 1 5',
                                date: 1524318238518
                            }
                        ]
                    },
                    {
                        name: 'Alc & Co',
                        balance: 32348,
                        ready: 0.45,  //1 = 100% готовности
                        tasks: [
                            {
                                title: 'Title 2 1',
                                description: '',
                                priority: 1,
                                attachments: '',
                                author: 'user 2 1'
                            },
                            {
                                title: 'Title 2 2',
                                description: '',
                                priority: 1,
                                attachments: '',
                                author: 'user 2 1'
                            },
                            {
                                title: 'Title 2 3',
                                description: '',
                                priority: 0,
                                attachments: '',
                                author: 'user 2 2'
                            },
                            {
                                title: 'Title 2 4',
                                description: '',
                                priority: 0.6,
                                attachments: '',
                                author: 'user 2 3'
                            },
                            {
                                title: 'Title 2 5',
                                description: '',
                                priority: 0.6,
                                attachments: '',
                                author: 'user 2 3'
                            }
                        ],
                        attachments: [
                            {
                                icon: '../../static/img/excel-ic.svg',
                                date: 1524318238518,
                                title: 'price.xls',
                                author: 'user 2 1',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/pdf-ic.svg',
                                date: 1524318238518,
                                title: 'document.pdf',
                                author: 'user 2 1',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/pdf-ic.svg',
                                date: 1524318238518,
                                title: 'document-2.pdf',
                                author: 'user 2 2',
                                status: 'unknown',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/powerpoint-ic.svg',
                                date: 1524318238518,
                                title: 'strategy.pptx',
                                author: 'user 2 3',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/word-ic.svg',
                                date: 1524318238518,
                                title: 'users.doc',
                                author: 'user 2 3',
                                status: 'ok',
                                isActive: false
                            }
                        ],
                        messages: [
                            {
                                from: 'user 2 3',
                                to: 'user 2 1',
                                message: 'Hello, im user 2 3',
                                date: 1524318238518
                            }
                        ]
                    },
                    {
                        name: 'Rabinovich Ltd',
                        isActive: false,
                        balance: 2005,
                        ready: 0.3,  //1 = 100% готовности
                        tasks: [
                            {
                                title: 'Title 3 1',
                                description: '',
                                priority: 1,
                                attachments: '',
                                author: 'user 3 1'
                            },
                            {
                                title: 'Title 3 2',
                                description: '',
                                priority: 0.6,
                                attachments: '',
                                author: 'user 3 2'
                            }
                        ],
                        attachments: [
                            {
                                icon: '../../static/img/word-ic.svg',
                                date: 1524318238518,
                                title: 'hovered-file.doc',
                                author: 'user 3 1',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/pdf-ic.svg',
                                date: 1524318238518,
                                title: 'document.pdf',
                                author: 'user 3 1',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/excel-ic.svg',
                                date: 1524318238518,
                                title: 'price.xls',
                                author: 'user 3 2',
                                status: 'ok',
                                isActive: false
                            }
                        ],
                        messages: [
                            {
                                from: 'user 3 1',
                                to: 'user 3 2',
                                message: 'Hello, im user 3 1',
                                date: 1524318238518
                            },
                            {
                                from: 'user 3 2',
                                to: 'user 3 1',
                                message: 'Hello, im user 3 2',
                                date: 1524318238518
                            },
                        ]
                    },
                    {
                        name: 'Tim Colleg',
                        isActive: false,
                        balance: 7000,
                        ready: 0.2,  //1 = 100% готовности
                        tasks: [
                            {
                                title: 'Title 4 1',
                                description: '',
                                priority: 0.4,
                                attachments: '',
                                author: 'user 4 1'
                            },
                            {
                                title: 'Title 4 2',
                                description: '',
                                priority: 0.6,
                                attachments: '',
                                author: 'user 4 2'
                            },
                        ],
                        attachments: [
                            {
                                icon: '../../static/img/powerpoint-ic.svg',
                                date: 1524318238518,
                                title: 'about.pptx',
                                author: 'user 4 1',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/excel-ic.svg',
                                date: 1524318238518,
                                title: 'price.xls',
                                author: 'user 4 2',
                                status: 'ok',
                                isActive: false
                            }
                        ],
                        messages: [
                            {
                                from: 'user 4 1',
                                to: 'user 4 2',
                                message: 'Hello, im user 4 1',
                                date: 1524318238518
                            }
                        ]
                    },
                    {
                        name: 'Last Assurance',
                        isActive: false,
                        balance: 200,
                        ready: 0.2,  //1 = 100% готовности
                        tasks: [
                            {
                                title: 'Title 4 1',
                                description: '',
                                priority: 0.4,
                                attachments: '',
                                author: 'user 4 1'
                            },
                            {
                                title: 'Title 4 2',
                                description: '',
                                priority: 0.6,
                                attachments: '',
                                author: 'user 4 2'
                            },
                        ],
                        attachments: [
                            {
                                icon: '../../static/img/powerpoint-ic.svg',
                                date: 1524318238518,
                                title: 'about.pptx',
                                author: 'user 4 1',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/excel-ic.svg',
                                date: 1524318238518,
                                title: 'price.xls',
                                author: 'user 4 2',
                                status: 'ok',
                                isActive: false
                            }
                        ]
                    },
                    {
                        name: 'Last Assurance',
                        isActive: false,
                        balance: 200,
                        ready: 0.2,  //1 = 100% готовности
                        tasks: [
                            {
                                title: 'Title 4 1',
                                description: '',
                                priority: 0.4,
                                attachments: '',
                                author: 'user 4 1'
                            },
                            {
                                title: 'Title 4 2',
                                description: '',
                                priority: 0.6,
                                attachments: '',
                                author: 'user 4 2'
                            },
                        ],
                        attachments: [
                            {
                                icon: '../../static/img/powerpoint-ic.svg',
                                date: 1524318238518,
                                title: 'about.pptx',
                                author: 'user 4 1',
                                status: 'ok',
                                isActive: false
                            },
                            {
                                icon: '../../static/img/excel-ic.svg',
                                date: 1524318238518,
                                title: 'price.xls',
                                author: 'user 4 2',
                                status: 'ok',
                                isActive: false
                            }
                        ]
                    }
                ],
                rightMenu: {
                    horizontal: false,
                    list: [
                        {
                            type: 'link',
                            name: this.$t('pages.jobOffers.rightMenu.savedOffers'),
                            link: '/offers/saved'
                        },
                        {
                            type: 'link',
                            name: this.$t('pages.jobOffers.rightMenu.createOffer'),
                            link: '/offers/new'
                        }
                    ]
                },
                colColors: [
                    '#',
                    '#',
                    '#',
                    '#'
                ]
            }
        },
        computed: {},
        methods: {
            initProgressBar: function (i) {
                switch (i) {
                    case 0:
                        return 'first-progress-bar';
                    case 1:
                        return 'second-progress-bar';
                    case 2:
                        return 'third-progress-bar';
                    case 3:
                        return 'fourth-progress-bar';
                    case 4:
                        return 'fifth-progress-bar';
                    default:
                        return '';
                }
            },
            initColColor: function (i) {
                switch (i) {
                    case 0:
                        return 'first-team__border';
                    case 1:
                        return 'second-team__border';
                    case 2:
                        return 'third-team__border';
                    case 3:
                        return 'fourth-team__border';
                    case 4:
                        return 'fifth-team__border';
                    default:
                        return '';
                }
            },
            getStatusIcon: function (status) {
                switch (status) {
                    case 'ok':
                        return '../../static/img/icons-for-circle/checkmark.svg';
                    case 'error':
                        return '../../static/img/icons-for-circle/exclamationmark.svg';
                    case 'unknown':
                        return '../../static/img/icons-for-circle/questionmark.svg';
                }
            },
            toggleAttMenu: function (index, contractor) {
                contractor.attachments[index].isActive = !contractor.attachments[index].isActive;
            },
            toFormatDate: function (date) {
                let dateFormat = new Date(date);
                return dateFormat.toDateString();
            },
            initTimeline: function () {
                let timeline = document.getElementById('timeline'),
                    //мб попробовать разобраться с 3d и сделать в 3d?
                    ctx = timeline.getContext('2d');

                let countHorInt = 10;
                let topX = 1000,
                    botX = 1200;

                let fromY = 0,
                    toY = 125;

                let diffInt = 200 / countHorInt; //1000 - 800
                let offset = topX / countHorInt;

                let countYInt = 4;
                let offsetY = 125 / 4;

                let cells = [];

                for (let i = 1; i < 11; i++) {
                    for (let j = 0; j < 4; j++) {
                        cells.push(
                            {
                                lT: {
                                    x: i * offset - (0.96 - 0.16 * i) * j * offsetY,
                                    y: j * offsetY,
                                },
                                rB: {
                                    x: (i + 1) * offset - (0.96 - 0.16 * (i + 1)) * (j + 1) * offsetY,
                                    y: (j + 1) * offsetY,
                                },
                            }
                        );
                    }
                }

                // console.log(cells, 'cells');

                timeline.width = 1200;
                timeline.height = 350;

                // ctx.fillStyle = '#dde3ea';
                // ctx.fillRect(0, 0, timeline.width, 200);

                ctx.beginPath();
                ctx.moveTo(100, 0);
                ctx.lineTo(0, 125);
                ctx.lineTo(1200, 125);
                ctx.lineTo(1100, 0);
                ctx.lineTo(100, 0);
                ctx.fillStyle = '#dde3ea';
                ctx.fill();
                ctx.closePath();


                //заполняем полоску первого подрядчика
                let start = 0,
                    end = 400;

                ctx.beginPath();
                ctx.moveTo(100, 0);
                ctx.lineTo(400, 0);
                ctx.lineTo(400 - 0.32 * offsetY, offsetY);
                ctx.lineTo((-4 / 5) * (offsetY) + 100, offsetY);
                ctx.lineTo(100, 0);
                ctx.fillStyle = '#06dcd5';
                ctx.fill();
                ctx.closePath();


                ctx.beginPath();
                ctx.moveTo(400 - 0.32 * offsetY, offsetY);
                ctx.lineTo(800 + 0.32 * offsetY, offsetY);
                ctx.lineTo(800 + 0.32 * 2 * offsetY, 2 * offsetY);
                ctx.lineTo(400 - 0.32 * 2 * offsetY, 2 * offsetY);
                ctx.lineTo(400 - 0.32 * offsetY, offsetY);
                ctx.fillStyle = '#ff3d31';
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.moveTo(600, 2 * offsetY);
                ctx.lineTo(900 + 0.48 * 2 * offsetY, 2 * offsetY);
                ctx.lineTo(900 + 0.48 * 3 * offsetY, 3 * offsetY);
                ctx.lineTo(600, 3 * offsetY);
                ctx.lineTo(600, 2 * offsetY);
                ctx.fillStyle = '#fab51d';
                ctx.fill();
                ctx.closePath();


                ctx.beginPath();
                ctx.moveTo(500 - 0.16 * 4 * offsetY, 3 * offsetY);
                ctx.lineTo(600, 3 * offsetY);
                ctx.lineTo(600, 4 * offsetY);
                ctx.lineTo(500 - 0.16 * 4 * offsetY, 4 * offsetY);
                ctx.lineTo(500 - 0.16 * 3 * offsetY, 3 * offsetY);
                ctx.fillStyle = '#8b37ff';
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.moveTo(800 + 0.32 * 3 * offsetY, 3 * offsetY);
                ctx.lineTo(1100 + 0.8 * 3 * offsetY, 3 * offsetY);
                ctx.lineTo(1100 + 0.8 * 4 * offsetY, 4 * offsetY);
                ctx.lineTo(800 + 0.32 * 4 * offsetY, 4 * offsetY);
                ctx.lineTo(800 + 0.32 * 3 * offsetY, 3 * offsetY);
                ctx.fillStyle = '#8b37ff';
                ctx.fill();
                ctx.closePath();


                ctx.beginPath();
                for (let i = 2; i < countHorInt + 1; i++) {
                    ctx.moveTo(i * offset, 0);
                    ctx.lineTo(i * offset - offset + i * diffInt - diffInt, 125);
                    ctx.strokeStyle = '#ffffff';
                    ctx.stroke();
                }
                ctx.closePath();

                ctx.beginPath();
                for (let i = 1; i < countYInt; i++) {
                    ctx.moveTo((-4 / 5) * (i * offsetY) + 100, i * offsetY);
                    ctx.lineTo((4 / 5) * (i * offsetY) + 1100, i * offsetY);
                    ctx.strokeStyle = '#ffffff';
                    ctx.stroke();
                }
                ctx.closePath();

                ctx.fillStyle = '#ced5dd';
                ctx.fillRect(0, 125, timeline.width, 50);

                ctx.beginPath();
                for (let i = 1; i < countHorInt; i++) {
                    ctx.moveTo(i * offset + i * diffInt, 125);
                    ctx.lineTo(i * offset + i * diffInt, 175);
                    ctx.strokeStyle = '#ffffff';
                    ctx.stroke();
                }
                ctx.closePath();
            }
        },
        created() {

        },
        mounted() {
            this.initTimeline();

            document.getElementById('timeline').addEventListener('mouseover', function (e) {
                // console.log(e.clientX, 'e.clientX');
                // console.log(e.clientY, 'e.clientY');
            });

            document.getElementsByTagName('body')[0].addEventListener('mouseover', function (e) {
                // console.log(e.clientX, 'e.clientX');
                // console.log(e.clientY, 'e.clientY');
            });
        }

    }
</script>

<style lang="stylus">
    .my-row-flex
        padding-top 24px
        margin-left 84px
        /*padding-left 360px*/
        display flex
        justify-content space-between
        font-family MuseoSansCyrl500
        overflow-x auto

    /*@media (max-width 1450px)*/
    /*padding-left 360px*/

    .project-progress-block
        background-color #bac4d0

        .first-progress-bar
            background-color #06dcd5
        .second-progress-bar
            background-color #ff3d31
        .third-progress-bar
            background-color #fab51d
        .fourth-progress-bar
            background-color #8b37ff
        .fifth-progress-bar
            background-color #2ba3f7

    .contractor-info
        display flex
        justify-content space-between
        width 100%

    .contractor-actions
        display flex
        justify-content flex-start
        width 100%
        margin-bottom 16px

        .action
            cursor pointer
            border none
            border-radius 50%
            width 25px
            height 25px
            display flex
            justify-content center
            align-self center
            margin-right 10px

        .action.action__task
            background-color #ff196f

        .action.action__chat
            background-color #0079ff

        .action.action__att
            background-color #2500b2

    .att-list
        width 100%
        height 400px
        overflow-y auto
        padding-right 6px

        .first-team__border
            border solid 2px #06dcd5

        .second-team__border
            border solid 2px #ff3d31

        .third-team__border
            border solid 2px #fab51d

        .fourth-team__border
            border solid 2px #8b37ff

        .fifth-team__border
            border solid 2px #2ba3f7

        .att-block
            display flex
            justify-content space-between
            padding 8px 16px
            align-items center
            margin-bottom 16px
            background-color #fff
            border-radius 4px
            position relative
            cursor pointer

            .dropdown-list
                height 68px
                width 81px
                min-width 81px
                top 38px
                left unset
                right 0
                padding 4px 0

                .dropdown-item
                    font-family MuseoSansCyrl500
                    font-size 10px
                    color #34343e
                    padding 4px 8px

                    &.delete
                        color #d14524

                    &:hover
                        background-color #ededed

            .small-circle
                position absolute
                top 6px
                left 6px
                display flex
                align-items center
                justify-content center
                background-image none

                &.circle-ok
                    background-color #00d983

                &.circle-error
                    background-color #ff196f

                &.circle-unknown
                    background-color #aebaca

    .timeline-block
        width 100%
        display flex
        justify-content center
        padding 20px 50px
        position relative

        .marker-calendar
            &.start
                top 215px
                left 340px
            
            &.final
                top 215px
                right 940px

    .circle
        width 48px
        height 48px
        background-image linear-gradient(to right, #525252, #222222)
        border-radius 50%

        &.small-circle
            width 12px
            height 12px

    .info-header
        padding 83px 32px 19px
        background-color #ececec
        display flex
        justify-content space-between
        align-items center
        position relative

        .options
            padding 4px 12px
            cursor pointer

        .info-wrap
            display flex
            align-items center
            justify-content space-between
            width 50%

            .title
                font-family MuseoSansCyrl500
                opacity 0.5
                font-size 12px
                line-height 1.5
                color #34343e

            .subtitle
                font-family MuseoSansCyrl500
                font-size 19px
                line-height 1.29
                color #34343e

        .dropdown-list
            width 148px
            min-width 148px
            height 126px
            top 127px
            padding 7px 0
            left unset
            right 26px

            .dropdown-item
                font-family MuseoSansCyrl500
                font-size 12px
                color #34343e
                padding 7px 24px

                &:hover
                    background-color #ededed

        .project
            display flex
            align-items center

            .circle
                margin-right 12px

            .project-info
                .title
                    font-family MuseoSansCyrl500
                    font-size 17px
                    line-height 1.29
                    color #34343e
                    opacity 1

                .subtitle
                    font-family MuseoSansCyrl500
                    font-size 12px
                    line-height 1.5
                    color #34343e
                    opacity 0.5

    .dropdown-list
        border-radius 2px
        background-color #ffffff
        box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.24)
        position absolute
        display flex
        flex-direction column
        justify-content space-between

    .marker-calendar
        position absolute

        .block
            width 32px
            height 32px
            background-image linear-gradient(to bottom, #ffe082, #ffd24f)
            position relative
            display flex
            justify-content space-around
            align-items center

            .triangle
                border 16px solid transparent
                border-bottom 8px solid #ffe082
                position absolute
                top -24px
                left 0

@media(max-width: 1024px)
    .my-row-flex
        flex-wrap wrap
        .mycol
            flex-basis 50%

@media(max-width: 520px)
    .my-row-flex
        .mycol
            flex-basis 100%

</style>
