<template>
    <div class="mobile-menu" :class="{ 'is-collapsed': collapsed }">
        <div class="menus">
            <router-link class="item"
                        active-class="active"
                        v-for="(link, indexLink) in navbarLinks"
                        :key="indexLink"
                        :to="{ path: link.path }"
                        exact>
                <img :src="getIcon(link.iconName)"
                    :width="link.iconWidth"
                    :height="link.iconHeight">
                <span class="linkName">{{$t('navbar.'+link.name)}}</span>
            </router-link>
        </div>
        <hr v-if="rightMenu">
        <div class="scMobileMenu"
                v-if="rightMenu">
            <div class="item"
                    v-for="(item, index) in rightMenu.list"
                    :key="index">
                <router-link v-if="item.type === 'link' && !item.isHide && !item.mail"
                                :to="{ path: item.link }"
                                active-class="active">
                    <span>{{ item.name }}</span>
                </router-link>
                <a v-if="item.mail"
                    :href="'mailto:'+item.mail">
                    <span>{{ item.name }}</span>
                </a>
                <a v-if="item.type === 'event'"
                    @click="startEvent(item.function)">
                    <span>{{ item.name }}</span>
                </a>
                <span v-if="item.type === 'modal' && !item.isHide"
                        @click="openModal(item.target)">
                    {{ item.name }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavbarMobileMenu',
    props: {
        collapsed: {
            type: Boolean,
            required: true,
        },
        navbarLinks: {
            type: Array,
            required: true,
        },
        rightMenu: {
            type: Object,
            required: false,
        }
    },
    methods: {
        getIcon: function (name) {
            switch (this.selectedTheme) {
                case 'dark':
                    return require(`../../../assets/img/${name}.svg`);
                case 'white':
                    return require(`../../../assets/img/${name}_white.svg`);
                default:
                    return require(`../../../assets/img/${name}.svg`);
            }
        },
        startEvent: function (item) {
            this.$parent.$emit('startEvent', item);
        },
        openModal: function (target) {
            this.$parent.$emit('openModal', target);
        }
    }
}
</script>
