<template>
  <div class="bottom-bar">
  <div class="check-content">
    <check-button :is-checked="isSelectAll"
     class="check-buttom"
     @click.native="checkClick"
      ></check-button>
    <span>全选</span>
  </div>
  <div class="price">
    合计：{{totalPrice}}
  </div>
  <div class="calculate" @click="calcClick">
    去计算{{checkLength}}
  </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
     CheckButton,
     },
     computed:{
       ...mapGetters(['cartList']),
       totalPrice(){
         return '￥'+ this.cartList.filter(item=>{
           return item.checked
         }).reduce((preValue, item)=>{
         return preValue +item.price * item.count
         },0).toFixed(2)
       },
      //  parseInt(item.price.substring(1)) 
       checkLength(){
         return this.cartList.filter(item=>item.checked).length
       },
       isSelectAll(){
        //  方法一：用filter()过滤
        // if(this.cartList.length===0){return false }
        //  else{return !(this.cartList.filter(item=>!item.checked).length)}

         //  方法二：用find()查找(性能高点)
        // if(this.cartList.length===0){return false }      
      //  else{ return !this.cartList.find(item=>!item.checked)}

       //  方法三：普通遍历
       if(this.cartList.length===0){return false }
       for(let item of this.cartList){
         if(!item.checked){
           return false
         }}     
           return true
       }      
     },
     methods:{
       checkClick(){
         if(this.isSelectAll){
          //  全部选中
          this.cartList.forEach(item=>item.checked=false)
         }else{
          //  部分或全部都不选
          this.cartList.forEach(item=>item.checked=true)
         }
        //  此方法有缺陷
        //  this.cartList.forEach(item=>{item.checked=!this.isSelectAll)
       },
       calcClick(){
         if(!this.isSelectAll){
           this.$toast.show('请选择购买的商品',2000)
         }
       }
     }
   

}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color:#eee;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 49px;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-buttom{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price{
  margin-left: 20px;
  flex: 1;
}
.calculate{
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>