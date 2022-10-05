<!-- 导航项-->
<template>
    <div class="flex fix" @click="get">
        <slot>

        </slot>
    </div>
</template>

<script>
import IconSvgVue from './IconSvg.vue';
export default {
    name: "NavItem",
    comments: { IconSvgVue },
    props: {
        index: {
            default: '/',
            type: String
        },
        back: {
            default: false,
            type: Boolean
        },
        enableGet: {
            default: false,
            type: Boolean
        },
        handleClick: {
            type: Function
        }
    },
    data() {
        return {};
    },
    created() {

    },
    methods: {
        get() {
            if (!this.enableGet) {
                if (this.back) {
                    this.$router.back();
                } else {
                    this.$router.push(this.index);
                }
            } else {
                this.handleClick();
            }
        }
    },
}
</script>

<style scoped>
.flex {
    display: flex;
}

.fix {
    padding: 5px;
    border-radius: 30px;
    transition: all .2s ease-in-out;
    align-items: center;
    justify-content: center;
    color: #6f6f6f;
}

.fix:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, .15);
}
</style>
