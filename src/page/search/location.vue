<template>
  <div class="reserved" v-cloak>
    <div class="loader" v-if="loader">
      <div class="loader-inner ball-spin-fade-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="hotel">
        <span class="span_1" v-on:click="dialog">
            <i class="def">默认城市</i>
           <i class="city" v-model="code">{{city}}</i>
            <img class="arrow" src="../../assets/arrow.png"/>
        </span>
      <span class="span_2" v-on:click="showCityInfo(1)">
            <img class="location_img" src="../../assets/location1.png"/>
            <em class="wz">定位到当前位置</em>
        </span>
    </div>
    <calendar>

    </calendar>
    <div class="hotel_name">
      <input type="text" placeholder="请输入酒店名称" v-model="hotel">
      <img src="../../assets/delte.png" v-show="open.del" v-on:click="cut"/>
    </div>
    <div class="query">
      <span v-on:click="query">查询</span>
      <i v-on:click="observe">查看我的预订单</i>
    </div>
    <div class="hotel_confirm" style="display: none" id="hotel" >
      <ul>
        <li v-on:click="choose($event)" class="choose_first" data-id="杭州市">
          <span class="current_city">当前城市</span>
          <span class="location_city">{{city}}</span>
          <img v-on:click="close" src="../../assets/close.png"/>
        </li>
        <li  v-on:click="choose($event)" v-for="(item,index) in list" v-bind:class="{'first_city':index!=0}">
          <span class="current_city" v-if="index==0">可选城市</span>
          <span class="select_city">{{item}}市</span>
        </li>
      </ul>
    </div>
    <div class="black" id="black" style="display: none"></div>
    <div class="alert1" id="alert1" style="display: none"></div>
  </div>
</template>
<script>
  import calendar from '../../components/Hello.vue'
  import {getInfo,search} from '../../service/getData'
  export default{
    components:{
      calendar
    },
    data(){
      return{
        city:'金华市',
        code:'',
        city_def:'',
        loader:false,
        hotel:'', //hotel name
        open:{
          del:false, //delte img
        },
        arr:0,//start_day
        dep:0, //end_day
        lng:'', //jingdu
        lat:'', //weidu
        list:[],
      }
    },
    mounted:function () {
      this.info()
    },
  methods:{
//    获取首页数据
     async info(){
      let exits=await getInfo();
      if(exits.code==0){
        console.log(exits.data)
      }
    },
    dialog(){

    },
     cut(){

     },
    showCityInfo(){

    },
    async query(){
      let data={
        city:'JHZJ',
        arr:'1489633678',
        dep:'1489720078'
      };
        let k=await search(data)
      if(k.code==0){

      }
    },
    observe(){

    },
    close(){

    }
    }
  }
</script>
<style scoped>
  body, table, tr, th, td, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, select, fieldset, input, textarea, p, span, img, a, em, i {
    margin: 0;
    padding: 0;
    outline: 0; }

  body {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    color: #000; }

  [v-cloak] {
    display: none; }

  em, i {
    font-style: normal; }

  input, select {
    -webkit-appearance: none;
    appearance: none;
    border: 0 none;
    outline: none;
    tap-highlight-color:rgba(0,0,0,0);
    -webkit-tap-highlight-color:rgba(0,0,0,0);
  }

  select::-ms-expand {
    display: none; }

  .arrow {
    position: absolute;
    right: 0;
    bottom: .9rem;
    width: .475rem; }

  .span_1 {
    position: relative;
    display: block;
    float: left;
    width: 11.875rem;
    border-bottom: 1px solid #eee; }

  .def {
    color: #999;
    font-size: .6125rem;
    display: block;
    margin-top: .9375rem; }

  .city {
    display: block;
    font-style: normal;
    font-size: .9375rem;
    color: #000;
    border: 0 none;
    margin: .3rem 0 .625rem 0;
    background: #fff; }

  .hotel {
    margin-left: .9375rem;
    position: relative;
    overflow: hidden; }

  .span_2 {
    position: absolute;
    bottom: .6125rem;
    right: .9375rem; }

  .location_img {
    width: .75rem;
    margin-right: .3125rem; }

  .wz {
    font-size: .9375rem;
    color: #d2b18e; }
  #input-id {
    border-bottom: 1px solid #eee;
    margin-left: .9375rem;
    overflow: hidden;
    padding-bottom: .6125rem; }

  #input-id i {
    display: block;
    color: #999;
    font-size: .6125rem; }

  #input-id > div {
    float: left;
    margin-top: .9375rem;
    width: 7rem;
    position: relative; }

  .choose_left span {
    position: absolute;
    font-size: .6125rem;
    right: 1rem;
    bottom: 0;
    color: #999; }

  .choose_right span {
    position: absolute;
    font-size: .6125rem;
    right: 1rem;
    bottom: 0;
    color: #999; }

  #input-id input {
    color: #000;
    font-size: .9375rem;
    margin-top: .3rem; }

  .choose_bottom em {
    color: #999;
    font-size: .6125rem;
    position: relative;
    top: -.1rem; }

  .choose_bottom {
    float: right !important;
    margin-right: .9375rem;
    text-align: right;
    margin-top: 2rem !important;
    width: 4rem !important; }

  .choose_bottom img {
    width: .475rem;
    margin-left: .625rem; }

  .choose_right {
    margin-left: 2rem; }

  .hotel_name {
    height: 3.5rem;
    border-bottom: 1px solid #eee;
    margin-left: .9375rem;
    position: relative; }
  .hotel_name img {
    width: .9375rem;
    position: absolute;
    right: .9375rem;
    top: 1.25rem; }

  .hotel_name input {
    width: 18rem;
    font-size: .9375rem;
    line-height: 3.5rem;
    height: 3.5rem; }

  .query {
    width: 100%;
    text-align: center; }
  .query span {
    margin-top: 5rem;
    border-radius: 8px;
    width: 9.375rem;
    display: inline-block;
    height: 2.1875rem;
    font-size: .9375rem;
    color: #d2b18e;
    line-height: 2.1875rem;
    text-align: center;
    background: #222; }
  .query i {
    display: block;
    font-size: 0.8125rem;
    color: #999;
    margin-top: 1.25rem;
    text-decoration: underline; }
</style>
