<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>  
  </div>
</template>

<script> 

import CartListItem from "./CartListItem.vue"

import { mapGetters } from "vuex"



export default {
  components:{
    CartListItem
  },
  computed:{
  ...mapGetters(['cartList'])
},
 
}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px);
}

</style>