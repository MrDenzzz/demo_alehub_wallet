<template>
    <div class="offers">
        <navbar :title="$t('pages.jobOffers.navbarTitle')"
                :isNavigate="true"
                :isBalance="true"
                :rightMenu="rightMenu"/>

        <!--rename to normal name classes-->
        <div class="my-row-flex"
             style="padding-top: 64px; display: flex; justify-content: space-between; font-family: MuseoSansCyrl500;">
            <div class="mycol"
                 style="display: flex; flex-direction: column; align-items: center; flex-grow: 1; padding: 16px;"
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

                <div class="contractor-actions">
                    <div class="action action__task">
                        <img src="../../static/img/calendar-ic.svg">
                    </div>
                    <div class="action action__chat">
                        <img src="../../static/img/chat-ic.svg">
                    </div>
                    <div class="action action__att">
                    <img src="../../static/img/attachments-ic.svg">
                </div>
                </div>

                <div class="task-list">
                    <div class="task-block">

                    </div>
                </div>

                <div class="att-list">
                    <div class="att-block"
                         :class="initColColor(i)"
                         v-for="att in contractor.attachments">

                        <img :src="att.icon" alt="document type">

                        <div class="att-info">
                            <p style="margin: 0;">
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
                                author: 'user 1 3'
                            },
                            {
                                icon: '../../static/img/excel-ic.svg',
                                date: 1524318238518,
                                title: 'price.xls',
                                author: 'user 1 2'
                            },
                            {
                                icon: '../../static/img/powerpoint-ic.svg',
                                date: 1524318238518,
                                title: 'conditions.pptx',
                                author: 'user 1 1'
                            },
                            {
                                icon: '../../static/img/word-ic.svg',
                                date: 1524318238518,
                                title: 'description.doc',
                                author: 'user 1 5'
                            },
                            {
                                icon: '../../static/img/word-ic.svg',
                                date: 1524318238518,
                                title: 'specifications.doc',
                                author: 'user 1 4'
                            },
                            {
                                icon: '../../static/img/pdf-ic.svg',
                                date: 1524318238518,
                                title: 'wannacry.exe',
                                author: 'user 1 4'
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
                                author: 'user 2 1'
                            },
                            {
                                icon: '../../static/img/pdf-ic.svg',
                                date: 1524318238518,
                                title: 'document.pdf',
                                author: 'user 2 1'
                            },
                            {
                                icon: '../../static/img/pdf-ic.svg',
                                date: 1524318238518,
                                title: 'document-2.pdf',
                                author: 'user 2 2'
                            },
                            {
                                icon: '../../static/img/powerpoint-ic.svg',
                                date: 1524318238518,
                                title: 'strategy.pptx',
                                author: 'user 2 3'
                            },
                            {
                                icon: '../../static/img/word-ic.svg',
                                date: 1524318238518,
                                title: 'users.doc',
                                author: 'user 2 3'
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
                                author: 'user 3 1'
                            },
                            {
                                icon: '../../static/img/pdf-ic.svg',
                                date: 1524318238518,
                                title: 'document.pdf',
                                author: 'user 3 1'
                            },
                            {
                                icon: '../../static/img/excel-ic.svg',
                                date: 1524318238518,
                                title: 'price.xls',
                                author: 'user 3 2'
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
                                author: 'user 4 1'
                            },
                            {
                                icon: '../../static/img/excel-ic.svg',
                                date: 1524318238518,
                                title: 'price.xls',
                                author: 'user 4 2'
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
        computed: {

        },
        methods: {
            initProgressBar: function (i) {
                switch (i) {
                    case 0: return 'first-progress-bar';
                    case 1: return 'second-progress-bar';
                    case 2: return 'third-progress-bar';
                    case 3: return 'fourth-progress-bar';
                    default: return '';
                }
            },
            initColColor: function (i) {
                switch (i) {
                    case 0: return 'first-team__border';
                    case 1: return 'second-team__border';
                    case 2: return 'third-team__border';
                    case 3: return 'fourth-team__border';
                    default: return '';
                }
            },
            toFormatDate: function (date) {
                let dateFormat = new Date(date);
                return dateFormat.toDateString();
            },
            initTimeline: function () {
                let timeline = document.getElementById('timeline'),
                    //мб попробовать разобраться с 3d и сделать в 3d?
                    ctx = timeline.getContext('2d');

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


                ctx.beginPath();

                let countHorInt = 10;
                let topInt = 1000;
                let botInt = 1200;

                let diffInt = 200 / countHorInt; //1000 - 800
                let offset = topInt / countHorInt;


                for (let i = 2; i < countHorInt + 1; i++) {
                    //писать сюда линии

                    ctx.moveTo(i * offset, 0);
                    ctx.lineTo(i * offset - offset + i * diffInt - diffInt, 125);
                    ctx.strokeStyle = '#ffffff';
                    ctx.stroke();
                }
                ctx.closePath();

                ctx.beginPath();
                let countVertInt = 4;
                let offsetVert = 125 / 4;

                for (let i = 1; i < countVertInt; i++) {
                    ctx.moveTo((-4 / 5) * (i * offsetVert) + 100, i * offsetVert);
                    ctx.lineTo((4 / 5) * (i * offsetVert) + 1100, i * offsetVert);
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
        }

    }
</script>

<style lang="stylus">
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

        .first-team__border
            border solid 1px #06dcd5

        .second-team__border
            border solid 1px #ff3d31

        .third-team__border
            border solid 1px #fab51d

        .fourth-team__border
            border solid 1px #8b37ff

        .att-block
            display flex
            justify-content space-between
            padding 8px 16px
            align-items center
            margin-bottom 16px
            background-color #fff
            border-radius 4px

    .timeline-block
        width 100%
        display flex
        justify-content center
        padding 20px 50px

</style>
