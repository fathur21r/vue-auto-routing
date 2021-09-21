<route>
{
  "name": "store",
  "meta": {
    "requiresAuth": false
  }
}
</route>
<template>
  <div>
    <h1>Storezzzz</h1>
    <btn class="w-100" v-on:click.native="name()"/>
    <router-view></router-view>
  </div>    
</template>
<script>
import btn from '@/views/layout/button.vue'

export default {
  // You can specify layout component name here (default value is 'default')
  layout: 'auth',
  components: {
    btn,
  },
  methods: {
    name() {
      alert('TRIGGERR!!!!')
    }
  },
}
</script>