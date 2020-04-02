<template>
    <div class="mt-board" :class="{ folded: fold }">
        <h4 class="__title" @click="toggle()">{{ label }}</h4>
        <transition name="slide-fade">
            <ul v-show="!fold" class="__content">
                <slot></slot>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
    name: "mt-board",
    props: ["label"],
    data() {
        return {
            fold: false
        }
    },
    methods: {
        toggle(code = !this.fold) {
            this.fold = code;
        }
    }
}
</script>

<style>

</style>