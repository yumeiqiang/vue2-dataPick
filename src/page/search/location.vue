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
    <div class="hotel_confirm" ref="hotel" id="hotel" style="display: none;">
      <ul>
        <li v-on:click="choose($event)" class="choose_first" data-id="杭州市">
          <span class="current_city">当前城市</span>
          <span class="location_city">{{city}}</span>
          <img v-on:click="close" src="../../assets/close.png"/>
        </li>
        <li :data-code="item.code" :data-id="item.city"  v-on:click="choose($event)" v-for="(item,index) in list" v-bind:class="{'first_city':index!=0}">
          <span class="current_city" v-if="index==0">可选城市</span>
          <span class="select_city">{{item.city}}市</span>
        </li>
      </ul>
    </div>
    <div class="black" id="black" ref="black" style="display: none"></div>
    <div class="alert1" id="alert1" ref="alert1" style="display: none"></div>
  </div>
</template>
<script>
  import{mapState,mapMutations} from 'vuex'
  import calendar from '../../components/calendar.vue'
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
  computed:{
    ...mapState([
      ''
    ])
  },
    mounted () {
      this.info();
    },
  methods:{
    ...mapMutations([
       'CITY'
    ]),

//    获取首页数据
     async info(){
      let exits=await getInfo();
      if(exits.code==0){
       this.list=exits.data;
        this.code=this.list[0].code;
      }
    },
    dialog(){
      this.$refs.hotel.style.display='block';
      this.$refs.black.style.display='block';
      this.$refs.hotel.classList.add('bounceInDown')
    },
     cut(){

     },
    choose(){
      var that=this;
      this.$refs.hotel.classList.remove('bounceInDown');
      this.$refs.hotel.classList.add('bounceOutUp');
      setTimeout(function(){
        that.$refs.hotel.style.display='none';
        that.$refs.black.style.display='none';
      },1000)
      this.city=event.currentTarget.dataset.id
      this.code=event.currentTarget.dataset.code
    },
    showCityInfo(){

    },
    async query(){
      this.loader=true;
      let today=parseInt(new Date().getTime()/1000)
      let tomorrow=new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      let end_time=parseInt(tomorrow.getTime()/1000)
      let start=document.getElementsByClassName('datepicker__month-day--selected')[0]
      let end=document.getElementsByClassName('datepicker__month-day--last-day-selected')[0]
      if(start!=undefined){
        this.arr=parseInt(start.getAttribute('time')/1000)
        this.dep=parseInt(end.getAttribute('time')/1000)
      }else {
        this.arr=today;
        this.dep=end_time
      }
      let data={};
      data.city=this.code;
      data.arr=this.arr;
      data.dep=this.dep;
        let k=await search(data)
      if(k.code==0){
        this.CITY(k.data)
      }
    },
    observe(){

    },
    close(){
    var that=this;
      this.$refs.hotel.classList.add('bounceOutUp')
      this.$refs.hotel.classList.remove('bounceInDown')
      setTimeout(function(){
        that.$refs.hotel.style.display='none';
        that.$refs.black.style.display='none';
      },1000)
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
  .hotel_list {
    margin-top: 0.9375rem;
    padding: 0rem 0.9375rem 0 0.9375rem;
    height: 4.0625rem;
    border-bottom: 1px solid #eee; }

  .hotel_item_left {
    float: left; }
  .hotel_item_left span {
    display: block;
    font-size: 0.9375rem; }
  .hotel_item_left i {
    font-size: 0.75rem;
    color: #999;
    display: block;
    margin-top: 0.625rem; }

  .hotel_item_right {
    float: right;
    line-height: 4.0625rem;
    font-size: 0.9375rem;
    color: #ff0000; }

  .hotel_confirm {
    position: absolute;
    left: 3.90625rem;
    top: 9.125rem;
    width: 15.625rem;
    height: 15.625rem;
    border-radius: 0.25rem;
    background: #fff;
    z-index: 2;
    overflow: auto; }
  .hotel_confirm li {
    height: 3.3125rem;
    list-style: none;
    padding-left: 0.625rem;
    border-bottom: 1px solid #eee; }
  .hotel_confirm img {
    position: absolute;
    right: 0.625rem;
    top: 0.625rem;
    width: 0.8125rem; }
  .hotel_confirm span {
    display: block; }
  .hotel_confirm .current_city {
    font-size: 0.75rem;
    color: #999;
    margin: 0.625rem 0 0.5rem 0; }
  .hotel_confirm .location_city {
    font-size: 0.9375rem;
    font-weight: 500;
    color: #000; }
  .hotel_confirm .select_city {
    font-size: 0.9375rem;
    color: #000; }
  .hotel_confirm .first_city {
    line-height: 3.3125rem; }
  .alert1 {
    width: 200px;
    min-height: 3rem;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 11px;
    font-size: .75rem;
    cursor: pointer;
    z-index: 11111;
    position: fixed;
    line-height: 3rem;
    top: 12rem;
    left: 3.5rem;
    padding: 0 1rem;
    color: #fff;
    text-align: center; }
  .black {
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1; }
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
  @keyframes bounceInDown {
    from, 60%, 75%, 90%, to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0); }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0); }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0); }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0); }
    to {
      -webkit-transform: none;
      transform: none; } }
  .bounceInDown {
    -webkit-animation-name: bounceInDown;
    animation-name: bounceInDown; }

  @keyframes bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0); }
    40%, 45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0); }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -2000px, 0);
      transform: translate3d(0, -2000px, 0); } }
  .bounceOutUp {
    animation: bounceOutUp 2s; }

  .bounceInDown {
    animation: bounceInDown 1s; }
  /*loading*/
  @-webkit-keyframes ball-spin-fade-loader {
    50% {
      opacity: 0.3;
      -webkit-transform: scale(0.4);
      transform: scale(0.4); }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1); } }

  @keyframes ball-spin-fade-loader {
    50% {
      opacity: 0.3;
      -webkit-transform: scale(0.4);
      transform: scale(0.4); }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1); } }

  .ball-spin-fade-loader {
    position: relative; }
  .ball-spin-fade-loader > div:nth-child(1) {
    top: 25px;
    left: 0;
    -webkit-animation: ball-spin-fade-loader 1s 0s infinite linear;
    animation: ball-spin-fade-loader 1s 0s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(2) {
    top: 17.04545px;
    left: 17.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.12s infinite linear;
    animation: ball-spin-fade-loader 1s 0.12s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(3) {
    top: 0;
    left: 25px;
    -webkit-animation: ball-spin-fade-loader 1s 0.24s infinite linear;
    animation: ball-spin-fade-loader 1s 0.24s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(4) {
    top: -17.04545px;
    left: 17.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.36s infinite linear;
    animation: ball-spin-fade-loader 1s 0.36s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(5) {
    top: -25px;
    left: 0;
    -webkit-animation: ball-spin-fade-loader 1s 0.48s infinite linear;
    animation: ball-spin-fade-loader 1s 0.48s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(6) {
    top: -17.04545px;
    left: -17.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.6s infinite linear;
    animation: ball-spin-fade-loader 1s 0.6s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(7) {
    top: 0;
    left: -25px;
    -webkit-animation: ball-spin-fade-loader 1s 0.72s infinite linear;
    animation: ball-spin-fade-loader 1s 0.72s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(8) {
    top: 17.04545px;
    left: -17.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.84s infinite linear;
    animation: ball-spin-fade-loader 1s 0.84s infinite linear; }
  .ball-spin-fade-loader > div {
    background-color: #222;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute; }
  .loader {
    position: fixed;
    left: 11rem;
    top:5rem;
    box-sizing: border-box;
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 25%;
    max-width: 25%;
    height: 200px;
    align-items: center;
    justify-content: center;
    z-index: 22;
  }
</style>
