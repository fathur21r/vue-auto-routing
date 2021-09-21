<template>
    <h1>{{param}}</h1>
</template>
<script>
export default {
    layout: 'default',
    data() {
        return {
            param: this.$route.params.id
        }
    },
}
</script>