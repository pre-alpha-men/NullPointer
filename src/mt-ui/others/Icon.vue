<template functional>
    <i 
        class="mt-icon codicon"
        :class="['codicon-'+ctx.props.icon, ctx.data.staticClass, ctx.data.class]"
        v-bind="data.attrs"
        v-on="listeners"
        :style="[{
            width: size + 'px', 
            height: size + 'px',
            fontSize: size + 'px'
        }, ctx.data.style]"
    ></i>
</template>

<script>
export default {
    name: "mt-icon",
    props: {
        "icon": String, 
        "size": {
            default: 16,
            type: Number
        }
    }
}
</script>

<style>

</style>