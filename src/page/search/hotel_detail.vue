<template>
    <div>
      <div id="hotel-detail" v-cloak>
        <div class="banner">
          <img style="display: none" src="../../assets/pic.png" alt=""/>
          <div class="swiper-container swiper-container1">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in list.shopInfo.image">
                <img @click="enlarge" :src="item"/>
              </div>
            </div>
            <div class="swiper-pagination swiper-pagination1"></div>
          </div>
        </div>
        <div class="describe-public describe">
        <span>
            {{list.shopInfo.name}}
            <img @click="call(true)" src="../../assets/phone2.png" alt=""/>
        </span>
          <p>{{list.shopInfo.descript}}</p>
        </div>
        <div class="describe-public location" v-on:click="map">
          <img src="../../assets/location.png" alt="">
          <span>{{list.shopInfo.address}}</span>
          <img class="arrow-icon" src="../../assets/arrow.png" alt=""/>
          <em style="top:0.19rem">到这去</em>
        </div>
        <div class="describe-public comment-result" v-on:click="comment">
          <div class="comment-left" ref="mystar">
            <img src="../../assets/star.png" alt=""/>
            <img src="../../assets/star.png" alt=""/>
            <img src="../../assets/star.png" alt=""/>
            <img src="../../assets/star.png" alt=""/>
            <img src="../../assets/star.png" alt=""/>
          </div>
          <i>({{list.shopInfo.judgeInfo.average}}分)</i>
          <img class="arrow-icon" src="../../assets/arrow.png" style="margin-top: 1.2rem" alt=""/>
          <em>{{list.shopInfo.judgeInfo.count}}条评论</em>
        </div>
        <div class="room">
          <ul>
            <li class="room-detail" v-for="item in list.roomInfo">
              <img :src="item.info.img" alt=""/>
              <div class="room-right">
                <p class="mold">
                  <span>{{item.info.name}}</span>
                  <span>¥{{item.lowPrice/100}}</span>
                </p>
                <p class="supplement room-size">{{item.info.bedType}}&nbsp;&nbsp;{{item.info.bedSize}}
                  <span class="room-origin-price" v-if="item.lowPrice!=item.costPrice">原价 ¥{{item.costPrice/100}}</span>
                </p>
                <span class="supplement">{{item.info.roomSize}}</span>
                <span class="reserve" @click="reserve(item.type,item.priceList,item.info.name)">预订</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="pop-carousel" v-show="open.enlarge">
          <div class="swiper-container swiper-container2">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in list.shopInfo.image">
                <a href='#'>
                  <img :src="item" width="100%"/>
                  <span class="sheets">{{$index+1}}/{{list.shopInfo.image.length}}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="light" class="white_content" v-if='open.light'></div>
      <div id="light1" class="white_content" v-if='open.light1' @click="up" style="opacity: 1"></div>
      <div class="show-phone" v-if="open.phone" v-cloak>
        <div class="phone-top">
          <p>确认拨打酒店电话</p>
          <span>{{list.shopInfo.mobile}}</span>
        </div>
        <div class="text">
          <em v-on:click="call(false)">取消</em>
          <a href="tel:list.shopInfo.mobile">
            <em>拨打</em>
          </a>
        </div>
      </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
              list:""
            }
        },
        components:{

        },
      methods:{
        call(){

        },
        comment(){

        },
        map(){

        }
      }
    }
</script>
<style scoped>
  body{
    background-color:#ff0000;
  }
</style>
