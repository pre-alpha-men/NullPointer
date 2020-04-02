import Button from'./input/Button.vue';
import Search from'./input/Search.vue';
import Switch from'./input/Switch.vue';
import Table from'./input/Table.vue';

import Board from'./layout/Board.vue';
import Window from'./layout/Window.vue';

import Side from'./navigation/Side.vue';
import SidePane from'./navigation/SidePane.vue';
import Tabs from'./navigation/Tabs.vue';
import View from'./navigation/View.vue';

import Icon from'./others/Icon.vue';

import Contextmenu from './Contextmenu.vue';
import Notification from './notify/index.js';

const install = function(Vue) {
    [
        Button, Search, Switch, Table,
        Board, Window,
        Side, SidePane, Tabs, View,
        Icon,
        Contextmenu
    ].forEach((e) => Vue.components(e.name, e));

    Notification.install(Vue);
}

export default {
    install
}