<template>
    <div id="window">
        <header>
            <mt-tabs id="topnav" :tabs="mainPanels" init="mapPanel" @switch="switchMainPanel">
                <li><a href="https://h5mota.com/games/template/_docs/" target="_blank">帮助</a></li>
            </mt-tabs>
            <p id="title">{{ projectName }} - {{ }}</p>
        </header>
        <keep-alive>
            <router-view class="mainPanel"></router-view>
        </keep-alive>
        <footer id="statusBar">
            <ul ref="left" id="statusLeft">
                <status-item left :class="messageType">{{ message }}</status-item>
            </ul>
            <ul ref="right" id="statusRight"></ul>
        </footer>
    </div>
</template>

<script>
import Vue from "vue"
import game from "./editor_game.js"
import { insertSortElm } from "./editor_ui.js"
import "./thirdparty/elementUI/elementui.umd.min.js"

import "./mt-ui/index.js"

import blocklyEditor from "./editor_blockly.js"
import "./editor_multi.js"

import Configs from "./config.js"
const { ipcRenderer } = require('electron');

export default {
    data() {
        return {
            mainPanelActive: "",
            mainPanels: [],
            projectName: '', // 与标题相绑定
            statusLeft: [],
            messageType: 'normal',
            message: '',
            statusRight: [],
            isMax: false,
        }
    },
    provide() {
        return {
            openBlockly: this.openBlockly,
        }
    },
    created() {
        Vue.prototype.$print = this.print.bind(this);
        Vue.prototype.$clear = this.clear.bind(this);
        Vue.prototype.$injectStatusItem = this.injectStatusItem.bind(this);
        this.mainPanelTags = mainPanelInfo.map(([id, { label, start }]) => ({ id, label, start }));
        console.log(this.mainPanelTags)
        this.mainPanels = this.mainPanels.concat(this.mainPanelTags.filter(e => e.start));
        ipcRenderer.on('window-maxed', (event, maxed) => this.isMax = maxed);
    },
    methods: {
        print(str = "", type = "") {
            this.message = str;
            this.messageType = type;
            if (type !== "") {
                setTimeout(() => {
                    if (this.message == str) this.print("", "");
                }, 5000);
            }
        },
        clear(value) {
            var tips = [
                '表格的文本域可以双击进行编辑',
                '双击地图可以选中素材，右键可以弹出菜单',
                '双击事件编辑器的图块可以进行长文本编辑/脚本编辑/地图选点/UI绘制预览等操作',
                'ESC或点击空白处可以自动保存当前修改',
                'H键可以打开操作帮助哦',
                'tileset贴图模式可以在地图上拖动来一次绘制一个区域；右键额外素材也可以绑定宽高',
                '可以拖动地图上的图块和事件，或按Ctrl+C, Ctrl+X和Ctrl+V进行复制，剪切和粘贴，Delete删除',
                'Alt+数字键保存图块，数字键读取保存的图块',
            ];
            if (value == null) value = Math.floor(Math.random() * tips.length);
            this.print('tips: ' + tips[value])
        },
        switchMainPanel(panel) {
            this.mainPanelActive = panel.id;
            //this.$refs[panel.pane].active();
        },
        injectStatusItem(align, item) {
            insertSortElm(this.$refs[align], item.$el);
        },
        openBlockly(node, type) {
            return this.$refs.blockly.import(node, type);
        },
        importProject() {
            this.projectName = game.data.getProjectName();
            this.mainPanels.splice(0, this.mainPanels.length, this.mainPanelTags);
        },
        maximize() {
            ipcRenderer.send('window-max');
        },
        minimize() {
            ipcRenderer.send('window-min');
        },
        close() {
            ipcRenderer.send('window-close');
        }
    },
    components: {
        ...mainPanels, blocklyEditor
    },
    watch: {
        projectName(value) {
            document.title = value + " - HTML5 魔塔编辑器";
        }
    }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
