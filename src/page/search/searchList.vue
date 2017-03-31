<template>
    <div v-cloak>
      <calendar :startWeek="startWeek" :endWeek="endWeek" :start="start" :end="end" ref="day"></calendar>
      <div class="sort" id="sort">
        <a v-on:click="getItem($event,'price')" class="current">价格<span></span></a>
        <a v-on:click="getItem($event,'distance')" class="jl">距离<span></span></a>
      </div>
      <div class="hotel_list" v-for="item in list.shopList" v-on:click="choose(item.info.hotelId)">
        <div class="hotel_item_left">
          <span>{{item.info.name}}</span>
          <i>距离约{{item.distance/1000}}公里</i>
        </div>
        <div class="hotel_item_right">
          ¥{{item.lowPrice/100}}起
        </div>
      </div>
    </div>
</template>

<script>
  import fecha from  '../../plugins/fec'
  import HotelDatepicker from '../../plugins/pick'
  import{mapState,mapMutations} from 'vuex'
  import calendar from '../../components/calendar.vue'
    export default{
      data(){
        return {
          list: "",
          start:0,
          end:0,
          startWeek:'',
          endWeek:'',
//          night:''
        }
      },
      computed: {
        ...mapState([
          'infor', 'Auth'
        ])
      },
      mounted(){
        this.list = this.infor
        var today = new Date();
        var end=new Date();
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        end.setDate(end.getDate()+90);
        this.startWeek=fecha.format(this.list.arr*1000,'ddd');
        this.endWeek=fecha.format(this.list.dep*1000,'ddd');
        this.start = fecha.format(this.list.arr*1000, 'MM月DD日');
        this.end=fecha.format(this.list.dep*1000, 'MM月DD日');
        var demo1 =new HotelDatepicker(this.$refs.day.$el.firstChild,{
          endDate:fecha.format(end,'YYYY-MM-DD')
          //endDate 指的就是就是最多展示到几号
        });
      },
      components: {
        calendar
      },
      methods: {
        getItem($event, type){

        },
        choose(hotelId) {

        },
      }
    }
</script>
<style scoped>
  em,i{font-style: normal}
  .sort {
    width: 100%;
    margin-top: .9375rem;
    white-space: nowrap;
    font-size: 0; }
  .sort a {
    font-size: .9375rem;
    width: 50%;
    display: inline-block;
    text-align: center;
    height: 2.1875rem;
    line-height: 2.1875rem;
    position: relative; }
  .sort img {
    width: 0.5625rem; }
  .sort .current {
    background: #d2b18e;
    color: #fff; }
  .sort .current span {
    position: absolute;
    left: 50%;
    margin-left: 12%;
    top: 40%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0.4375rem;
    border-color: #fff transparent transparent transparent;
  }
  .sort .current .GG {
    border-color: transparent transparent #fff transparent;top: 25%;
  }
  .sort .jl {
    background: #f5f5f5; }
  .sort .jl span {
    position: absolute;
    left: 50%;
    margin-left: 12%;
    top: 40%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0.4375rem;
    border-color: #000 transparent transparent transparent; }
  .sort .jl .GG {
    border-color: #000 transparent transparent transparent;
    top: 40%; }

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
</style>
