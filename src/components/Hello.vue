<template>
  <div>
    <div id="input-id" ref="input">
      <div class="choose_left">
        <i>入住</i>
        <input id="input-left" type="text" readonly="readonly" ref="input1">
        <span id="day1" ref="day1"></span>
      </div>
      <div class="choose_right">
        <i>离店</i>
        <input id="input-right" type="text" readonly="readonly" ref="input2">
        <span id="day2" ref="day2"></span>
      </div>
      <div class="choose_bottom">
        <em>共<span id="night">1</span>晚</em>
        <img class="" src="../assets/arrow.png">
      </div>
    </div>
  </div>
</template>
<script>
  import fecha from  '../plugins/fec'
  import HotelDatepicker from '../plugins/pick'
  export default {
    data(){
      return{

      }
    },
    mounted(){
      var today = new Date();
      var end=new Date();
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      end.setDate(end.getDate()+90);
      this.$refs.day1.innerHTML=fecha.format(today,'ddd');
      this.$refs.day2.innerHTML=fecha.format(tomorrow,'ddd');
      this.$refs.input1.value = fecha.format(today, 'MM月DD日');
      this.$refs.input2.value=fecha.format(tomorrow, 'MM月DD日');
      var demo1 =new HotelDatepicker(this.$refs.input,{
        endDate:fecha.format(end,'YYYY-MM-DD')
        //endDate 指的就是就是最多展示到几号
      });
    },
  }
</script>
<style scoped>
@import "../plugins/css/data-pick.css";
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
</style>
