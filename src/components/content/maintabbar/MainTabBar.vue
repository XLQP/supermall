<template>
  <tar-bar>
    <tar-bar-item path="/home" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tarbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tarbar/home_active.svg"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tar-bar-item>
    <tar-bar-item path="/category" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tarbar/category.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tarbar/category_active.svg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tar-bar-item>
    <tar-bar-item path="/cart" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tarbar/shopcart.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tarbar/shopcart_active.svg"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tar-bar-item>
    <tar-bar-item path="/profile" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tarbar/profile.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tarbar/profile_active.svg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tar-bar-item>
  </tar-bar>
</template>

<script>
import TarBar from "components/common/tarbar/TarBar.vue";
import TarBarItem from "components/common/tarbar/TarBarItem.vue";

export default {
  components: {
    TarBar,
    TarBarItem,
  },
};
</script>

<style>
</style>