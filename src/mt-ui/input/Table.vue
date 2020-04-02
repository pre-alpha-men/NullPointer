<template>
    <table cellspacing="0" cellpadding="0" border="0">
        <tbody v-if="Array.isArray(comment._items)">
            <tr v-for="(items, key) of value" :key="key">
                <td v-if="comment._parse == 'object'">{{ key }}</td>
                <td v-for="(item, i) of items" :key="i">{{ item }}</td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr v-for="(item, key) of value" :key="key">
                <td v-if="comment._parse == 'object'">{{ key }}</td>
                <td>{{ item }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "mt-table",
    props: ["comment", "value"],
    model: {
        prop: 'value',
        event: 'change'
    },
}
</script>

<style>

</style>