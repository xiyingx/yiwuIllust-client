<!-- 导航栏 -->
<template>
    <div :class="mode" class="nav-box">
        <slot>

        </slot>
    </div>
</template>

<script>

export default {
    name: "NavMy",
    props: {
        mode: {
            default: "fixed",
            type: String
        }

    },
    data() {
        return {};
    },
    created() {
    },
    methods: {

    },
}
</script>

<style scoped>
.fixed {
    position: fixed;
}

.abs {
    position: absolute;
}

.rel {
    position: relative;
}

.nav-box {
    padding: 10px;
    z-index: 100;
    background: #fff;
    transition: hover .2s ease-in-out;
    box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
    border-radius: 2rem;
    font-size: 1em;
}
</style>
