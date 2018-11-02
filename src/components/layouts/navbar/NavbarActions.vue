<template>
    <div class="actions">
        <router-link class="item"
                     active-class="active"
                     v-for="(link, indexLink) in navbarLinks"
                     :key="indexLink"
                     :to="{ path: link.path }"
                     exact>
            <img :src="getIcon(link.iconName)"
                 :width="link.iconWidth"
                 :height="link.iconHeight">
            <span class="badge"
                  v-if="notifBadge && link.isBadge === true">
            </span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'NavbarActions',
    props: {
        navbarLinks: {
            type: Array,
            required: true
        },
        notifBadge: {
            type: Boolean,
            required: false
        },
        selectedTheme: {
            type: String,
            required: true
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
        }
    }
}
</script>
