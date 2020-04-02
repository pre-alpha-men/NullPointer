<template functional>
    <div :class="['side-pane', ctx.props.pane]">
        <div class="header">
            <h4 class="title">{{ ctx.props.label }}</h4>
            <div class="headerContent">
                <slot name="header"></slot>
            </div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "mt-side-pane",
    props: ["label", "icon", "pane"]
}
</script>

<style lang="less">
.side-pane {
    background-color: var(--c-left);
    .header {
        margin: 8px 10px;
        display: flex;
        .title {
            font-weight: inherit;
            font-size: 14px;
            color: var(--c-header);
            line-height: 36px;
            margin: 0;
        }
        .headerContent {
            display: flex;
            align-items: center;
            margin-left: auto;
        }
    }
    .content {
        width: 100%;
        height: calc(100% - 52px);
    }
}
</style>