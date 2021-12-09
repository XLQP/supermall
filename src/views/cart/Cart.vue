<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <scroll class="content" ref="scroll">
    <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>

    <!-- 底部汇总 -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"
import Scroll from "components/common/scroll/Scroll.vue"

import CartList from "./childComps/CartList.vue"
import CartBottomBar from './childComps/CartBottomBar.vue'


import { mapGetters } from "vuex"

export default {
components:{
  NavBar,
  CartList,
  Scroll,
CartBottomBar, 
},
computed:{
  // mapGetters是一种辅助函数，仅仅是将store中的getter映射到局部计算属性，其有两种语法:
  // 方法一：
  // ...mapGetters(['cartLength'])

   // 方法二：
  ...mapGetters({
    length:'cartLength'
  })
},
activated(){
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>
.nav-bar{
  background-color:var(--color-tint);
  color: #fff;

}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>