<template>
    <div class="contextmenu" v-if="active" :style="{left: pos.x + 'px', top: pos.y + 'px'}">
        <ul>
            <li
                v-for="(item, index) of menuitems" :key="index"
                :class="{ disable: !item.validate }"
                @click="execAction(item)"
            >{{ item.text }}</li>
        </ul>
    </div>
</template>

<script>
import { Pos, exec } from "../utils.js";

let __currentContextMenu__ = null;

document.body.addEventListener("click", function(e) {
    if (__currentContextMenu__ && 
        !e.composedPath().includes(__currentContextMenu__.$el)) {
        __currentContextMenu__.close();
    }
}, true);

export default {
    name: "context-menu",
    props: ["bindTo", "addinParam"],
    data() {
        return {
            active: false,
            pos: new Pos(),
            items: []
        }
    },
    created() {
        this.itemcnt = 0;
        this.event = null;
        this.addin = null;
    },
    mounted() {
        this.bindElm = this.$parent.$el.querySelector(this.bindTo) || this.$parent.$el;
        this.bindElm.addEventListener("contextmenu", this.open.bind(this));
    },
    computed: {
        menuitems() {
            const args = [this.event, this.$parent, this.addin];
            return this.items.filter((item) => exec(item.condition, ...args) != false)
                .map((item) => ({
                    text: exec(item.text, ...args) || item.text,
                    validate: exec(item.validate, ...args) != false,
                    action: item.action,
                }));
        }
    },
    methods: {
        /**
         * @param {MouseEvent} e 
         */
        open(e) {
            if (__currentContextMenu__) {
                __currentContextMenu__.close();
            }
            __currentContextMenu__ = this;
            this.pos.set(e.clientX, e.clientY);
            this.event = e;
            this.addin = this.addinParam(e, this.pos);
            if (!this.$emit("beforeOpen", e)) return;
            this.active = true;
            e.preventDefault();
        },
        close() {
            __currentContextMenu__ = null;
            this.active = false;
        },
        inject(item, props) {
            if (item instanceof Array) {
                for (let _item of item) {
                    this.inject(Object.assign({}, props, _item));
                }
            } else {
                item.id = this.itemcnt;
                this.items.push(item);
            }
        },
        execAction(item) {
            if (item.validate) {
                item.action(event, this.$parent, this.addin);
                this.close();
            }
        }
    }
}
</script>

<style lang="less">
.contextmenu {
    user-select: none;
    z-index: 1000;
    position: fixed;
    padding: 5px 0px;
    background-color: var(--c-bg-pop);
    box-shadow: 0px 3px 3px #111;
    white-space: nowrap;
    animation: fadeIn 83ms linear;
    li {
        padding: 5px 25px;
        color: var(--c-text);
        &:hover:not(.disable) {
            background-color: var(--c-item-focus);
            color: white;
        }
        &.disable {
            color: var(--c-text-dis);
        }
    }
    hr {
        padding: 0px;
        border-color: darkgrey;
        margin: 4px 6px;
    }
}
</style>