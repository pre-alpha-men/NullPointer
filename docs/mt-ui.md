# 组件库

## 概述

mt-ui是提供给编辑器界面的一套UI组件, 以此确保编辑器UI风格统一
在整体设计上, 参考vscode, 

## 颜色主题

mt-ui 内部所有的颜色定义均为css变量形式, 故修改编辑器主题文件即可简单修改组件配色

## input 输入组件

### MtBtn 按钮组件

vscode风格的按钮

属性:

mini: 使用mini尺寸的按钮

## layout 布局组件

### todo: MtContainer 容器组件

设计: 容器组件应当提供vscode风格的滚动条, 即, 当鼠标移入容器时, 滚动条浮现, 移出时消失, 滚动条带有透明效果

## navigation 导航组件

### MtTabs 标签栏组件

### MTSide 侧边栏组件

### MTList 列表组件

## notify 提示框

在右下角唤起的vscode风格的提示框, 在组件中可以直接使用this.$notify函数调用

```js
this.$notify('这是一个提示', {
    source: 'pre-alpha-men',
    time: 5000
})

this.$notify.error('出现错误', {
    buttons: [
        {
            text: "无视它",
            action: () => ignore()
        }
    ]
})
```

这个函数会返回一个guid, 凭借guid可以使用close函数关闭提示框

```js
const handle = this.$notify('');

this.$notify.close(handle);
```

## contextmenu 上下文菜单

上下文菜单虽然是使用组件方式引入, 但是目前只支持通过函数配置条目

```vue
<template>
    <context-menu ref="test"></context-menu>
</template>

<script>
export default {
    mounted() {
        this.$refs.test.inject({
            text: "测试",
            action: (e, h) => this.test();
        });
    }
}
</script>
```

可配置的字段:

`text` 在菜单中显示的项
`validate` 是否可用
`condition` 是否显示在菜单中
`action` 点击后的响应
``