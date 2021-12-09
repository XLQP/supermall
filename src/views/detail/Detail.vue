<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" 
    :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-params-info ref="params" :param-info="itemParams"></detail-params-info>
    <detaill-comment-info ref="comment" :comment-info="commentInfo"></detaill-comment-info>
    <goods-list ref="recommend" :goods="recommends">
    </goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamsInfo from "./childComps/DetailParamsInfo.vue"
import DetaillCommentInfo from "./childComps/DetaillCommentInfo.vue"
import DetailBottomBar from "./childComps/DetailBottomBar.vue"

import Scroll from "components/common/scroll/Scroll.vue"
import GoodsList from "components/content/goods/GoodsList.vue"

import { getDetail, Goods, Shop, getRecommend} from "network/detail.js";
import {imgListenerMixin, backTopMixin} from "common/mixin.js"
import {debounce} from "common/utils.js"

import { mapActions } from "vuex"
// import Toast from "components/common/toast/Toast"

export default {
  name:"Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetaillCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  mixins:[imgListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods:{},
      shop:{},
      detailInfo:{},
      itemParams:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      // message:'',
      // show:false
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data=res.data.result
      // console.log(data);
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 3.创建店铺信息的对象
      this.shop=new Shop(data.shopInfo)
      // 4.保存商品的详情数据
      this.detailInfo=data.detailInfo;
      // console.log(this.detailInfo);
      // 5.取出参数的信息
      this.itemParams=data.itemParams
      // 6.取出评论的信息
      if(data.rate.cRate!==0){
      this.commentInfo=data.rate.list[0]
      // 7.给getThemeTopY赋值(对getThemeTopY赋值的操作进行防抖)
      this.getThemeTopY=debounce(()=>{
         this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },100)
      }
      /*
     //  1.第一次获取，值不对
     // 值不对的原因：this.$refs.params.$el还没有渲染
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);

       this.$netTick(()=>{
        //  2.第二次获取，值不对
        // 值不对的原因：图片还没有计算在内
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完（目前获取到offsetTop不半酣其中的图片），
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      })
      */
    });
    // 3.请求推荐数据
    getRecommend().then(res=>{
      // console.log(res);
      this.recommends=res.data.data.list
      // console.log(this.recommends);
    }) 
  },
  mounted(){
  
  },
  destroyed(){
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods:{
    ...mapActions(["addCart"]),
    imageLoad(){
  this.refresh()
  this.getThemeTopY()
    },
    titleClick(index){
      // this.crruntType=this.$refs.
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position){
      // 1.获取y值
      const positionY=-position.y

    // 2.position.y和主题中值进行对比
    // [0, 5482, 6159, 6513,Number.MAX_VALUE]
  //  positionY在0和5482之间，index=0
    //  positionY在5482和6159之间，index=1
      //  positionY在6159和6513之间，index=2
        //  positionY超过6513值，index=3
        let length=this.themeTopYs.length
   for(let i = 0;i<length-1;i++){
// if(positionY>this.themeTopYs[i]&&this.themeTopYs[i+1]){
  // console.log(i);  //str i+1
  // }
  // 方法一：
//   if(this.currentIndex !==i &&(i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
//    (i === length-1 && positionY >= this.themeTopYs[i])){
//      this.currentIndex=i;
// this.$refs.nav.currentIndex=this.currentIndex
//   }
 // 方法二：
 if(this.currentIndex !==i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
this.currentIndex=i;
this.$refs.nav.currentIndex=this.currentIndex
 }
   }
  // 3.是否显示回到顶部
  this.listenBackTop(position)  
    },
    addToCart(){
    // 1.获取购物车需要展示的信息
    const product={}
    product.image=this.topImages[0]
    product.title=this.goods.title
    product.desc=this.goods.desc
    product.price=this.goods.realPrice
    product.iid=this.iid
    // console.log(this.goods);

    // 2.将商品添加到购物车里面(1.Promise 2.mapActions)
    // this.$store.cartList.push(product)
    // this.$store.commit('addCart',product)
  this.addCart(product).then(res=>{
  // this.show=true
  // this.message=res
  // setTimeout(()=>{
  //   this.show=false
  //   this.message=''
  // },1500)
    // console.log(res);
    this.$toast.show(res,2000)
})


// this.$store.dispatch('addCart',product).then(res=>{
//     console.log(res);
// })
    }
  }
};
</script>

<style scoped>
#detail{
  position: relative;
  /* z-index: 9; */
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
/* 方法一：上面的导航条会跟着滚动 */
/* .content{
  height: calc(100% - 44px);
} */
/* 方法二：上面的导航条不会跟着滚动，正确的方法 */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>