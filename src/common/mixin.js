import {debounce} from "common/utils.js"
import BackTop from "components/content/backTop/BackTop.vue";
export const imgListenerMixin = {
  data(){
    return {
      itemImgListener:null,
      refresh:null
    }
  },
  mounted() {
    // 1.图片加载完成的监听事件
    this.refresh = debounce(this.$refs.scroll.refresh, 100);
    // 对监听的事件进行保存
    this.itemImgListener=()=>{
      this.refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  },
};
export const backTopMixin={
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop: false,
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0,0,300);
    },
    listenBackTop(position){ 
      this.isShowBackTop = -position.y > 1000;},
  }
}