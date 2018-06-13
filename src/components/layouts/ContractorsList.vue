<template>
    <!--rename to normal name classes-->
    <div class="my-row-flex">
        <div class="mycol"
                v-for="(contractor, i) in contractors">

            <div class="project-progress-block" style="height: 4px; width: 90%; margin-bottom: 24px;">
                <div class="progress" style="height: 100%;"
                        :style="{width: 100 * contractor.ready + '%' }"
                        :class="initProgressBar(i)">
                    <!--{{ initProgressBar(contractor.ready) }}-->
                </div>
            </div>

            <div class="task-list">
                <div class="task-block">

                </div>
            </div>

            <div style="display: flex; width: 100%; margin-bottom: 24px;">
                <div class="divider" style="margin-right: 15px; margin-left: 6px;"></div>
                <div style="width: 100%;">
                    <div class="contractor-info">
                        <h3 style="font-weight: 500;">
                            {{ contractor.name }}
                        </h3>

                        <h4 style="font-weight: 500; margin-right: 12px;">
                            {{ '$' + contractor.balance }}
                        </h4>
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
                                <p style="margin: 0; font-size: 10px;" class="date">
                                    {{ toFormatDate(att.date) }}
                                </p>
                                <p style="margin: 0;">
                                    {{ att.title }}
                                </p>
                            </div>

                            <img src="../../../static/img/avatar@3x.png" alt="author avatar"
                                style="width: 28px; height: 28px;">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContractorsList',
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
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'demands.doc',
                            author: 'user 1 3',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/excel-ic.svg',
                            date: 1524318238518,
                            title: 'price.xls',
                            author: 'user 1 2',
                            status: 'error',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'conditions.pptx',
                            author: 'user 1 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'description.doc',
                            author: 'user 1 5',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'specifications.doc',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'wannacry.exe',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'conditions2.pptx',
                            author: 'user 1 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'description2.doc',
                            author: 'user 1 5',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'specifications2.doc',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
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
                            icon: '../../../static/img/excel-ic.svg',
                            date: 1524318238518,
                            title: 'price.xls',
                            author: 'user 2 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'document.pdf',
                            author: 'user 2 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'document-2.pdf',
                            author: 'user 2 2',
                            status: 'unknown',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'strategy.pptx',
                            author: 'user 2 3',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'users.doc',
                            author: 'user 2 3',
                            status: 'ok',
                            isActive: false
                        },
                                                    {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'demands.doc',
                            author: 'user 1 3',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/excel-ic.svg',
                            date: 1524318238518,
                            title: 'price.xls',
                            author: 'user 1 2',
                            status: 'error',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'conditions.pptx',
                            author: 'user 1 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'description.doc',
                            author: 'user 1 5',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'specifications.doc',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'wannacry.exe',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'conditions2.pptx',
                            author: 'user 1 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'description2.doc',
                            author: 'user 1 5',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'specifications2.doc',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'wannacry2.exe',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
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
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'hovered-file.doc',
                            author: 'user 3 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'document.pdf',
                            author: 'user 3 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/excel-ic.svg',
                            date: 1524318238518,
                            title: 'price.xls',
                            author: 'user 3 2',
                            status: 'ok',
                            isActive: false
                        },
                                                    {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'demands.doc',
                            author: 'user 1 3',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/excel-ic.svg',
                            date: 1524318238518,
                            title: 'price.xls',
                            author: 'user 1 2',
                            status: 'error',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'conditions.pptx',
                            author: 'user 1 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'description.doc',
                            author: 'user 1 5',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'specifications.doc',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'wannacry.exe',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'conditions2.pptx',
                            author: 'user 1 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'description2.doc',
                            author: 'user 1 5',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'specifications2.doc',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'wannacry2.exe',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
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
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'about.pptx',
                            author: 'user 4 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/excel-ic.svg',
                            date: 1524318238518,
                            title: 'price.xls',
                            author: 'user 4 2',
                            status: 'ok',
                            isActive: false
                        },
                                                    {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'demands.doc',
                            author: 'user 1 3',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/excel-ic.svg',
                            date: 1524318238518,
                            title: 'price.xls',
                            author: 'user 1 2',
                            status: 'error',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'conditions.pptx',
                            author: 'user 1 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'description.doc',
                            author: 'user 1 5',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'specifications.doc',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'wannacry.exe',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'conditions2.pptx',
                            author: 'user 1 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'description2.doc',
                            author: 'user 1 5',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'specifications2.doc',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'wannacry2.exe',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
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
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'about.pptx',
                            author: 'user 4 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/excel-ic.svg',
                            date: 1524318238518,
                            title: 'price.xls',
                            author: 'user 4 2',
                            status: 'ok',
                            isActive: false
                        },
                                                    {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'demands.doc',
                            author: 'user 1 3',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/excel-ic.svg',
                            date: 1524318238518,
                            title: 'price.xls',
                            author: 'user 1 2',
                            status: 'error',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'conditions.pptx',
                            author: 'user 1 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'description.doc',
                            author: 'user 1 5',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'specifications.doc',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'wannacry.exe',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'conditions2.pptx',
                            author: 'user 1 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'description2.doc',
                            author: 'user 1 5',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/word-ic.svg',
                            date: 1524318238518,
                            title: 'specifications2.doc',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/pdf-ic.svg',
                            date: 1524318238518,
                            title: 'wannacry2.exe',
                            author: 'user 1 4',
                            status: 'ok',
                            isActive: false
                        },
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
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'about.pptx',
                            author: 'user 4 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/excel-ic.svg',
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
                            icon: '../../../static/img/powerpoint-ic.svg',
                            date: 1524318238518,
                            title: 'about.pptx',
                            author: 'user 4 1',
                            status: 'ok',
                            isActive: false
                        },
                        {
                            icon: '../../../static/img/excel-ic.svg',
                            date: 1524318238518,
                            title: 'price.xls',
                            author: 'user 4 2',
                            status: 'ok',
                            isActive: false
                        }
                    ]
                }
            ],
            colColors: [
                '#',
                '#',
                '#',
                '#'
            ]
        }
    },
    methods: {
        toggleAttMenu: function (index, contractor) {
            contractor.attachments[index].isActive = !contractor.attachments[index].isActive;
        },
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
        toFormatDate: function (date) {
            let dateFormat = new Date(date);
            return dateFormat.toDateString();
        },
    }
}
</script>

<style lang="stylus" scoped>
    .my-row-flex
        padding-top 24px
        margin-left 84px
        /*padding-left 360px*/
        display flex
        justify-content space-between
        font-family MuseoSansCyrl500
        overflow-x auto

        &::-webkit-scrollbar
            height 8px

        &::-webkit-scrollbar-thumb
            background-color #bdbdbd
            border-radius 4px

        @media(max-width 660px)
            margin-left 42px

        @media(max-width 660px)
            margin-left 22px

        .mycol
            display flex 
            flex-direction column
            align-items center
            flex-grow 1
            width 20%
            min-width 20%

            @media(max-width 1440px)
                min-width 270px

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
        margin-bottom 12px

        h3, h4
            margin 0

    .att-list
        width 100%
        height 400px
        overflow-y auto

        @media(max-width 375px)
            height 380px

        @media(max-width 320px)
            height 350px

        &::-webkit-scrollbar-thumb
            background-color #bdbdbd !important
            border-radius 4px !important

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
            margin-right 5px
            background-color #fff
            border-radius 4px
            position relative
            cursor pointer

            .att-info
                color #34343e

                .date
                    opacity 0.7

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

    .divider
        min-width 2px
        border-radius 1px
        background-image linear-gradient(to top, #f0f4fa, #b6bec9)

    .circle
        width 48px
        height 48px
        background-image linear-gradient(to right, #525252, #222222)
        border-radius 50%

        &.small-circle
            min-width unset
            width 12px
            height 12px

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

    .dropdown-list
        border-radius 2px
        background-color #ffffff
        box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.24)
        position absolute
        display flex
        flex-direction column
        justify-content space-between

        .dropdown-item
            &:hover
                background-color #ededed

// Dark Theme
    .dark
        .my-row-flex
            &::-webkit-scrollbar
                background-color #3a3a4b

            &::-webkit-scrollbar-thumb
                background-color #272730

        .att-list
            &::-webkit-scrollbar-thumb
                background-color #272730 !important
                width 4px

            .att-block
                background-color #3a3a4b

                .dropdown-list
                    .dropdown-item
                        color #fcfcfc

                        &.delete
                            color #d14524

                .att-info
                    color #ffffff

                    .date
                        opacity 0.5

        .project-progress-block
            background-color #30303d

            .first-progress-bar
                background-color #05a8a3
            .second-progress-bar
                background-color #cc2f27
            .third-progress-bar
                background-color #c7a020
            .fourth-progress-bar
                background-color #6f2dcc
            .fifth-progress-bar
                background-color #2ba3f7

        .contractor-info
            color #fcfcfc

            h4
                opacity 0.7

        .divider
            background-image linear-gradient(to top, #4a4e65, #3a3a4b)

        .dropdown-list
            background-color #4a4e65

            .dropdown-item
                color #fcfcfc
                
                &:hover
                    background-color #3f435e


</style>


