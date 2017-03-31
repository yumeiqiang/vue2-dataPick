<template>
      <div class="denglu" id='dl'>
        <div class="obtain">
          <div class="ph-lable">
            <!--<label><i class="icon1"></i></label>-->
            <input v-on:focus="del" id="ph" name="memberTel" placeholder="请输入手机号码" type="tel" v-model="phone">
          </div>
          <span v-bind:class="{'getCode':isA,'getCodes':isB}" v-on:click="getCode">
                <button class="ph_number" id="ph_number" type="tel">获取验证码</button>
            </span>
        </div>
        <div class="obtain">
          <div class="ph-lable phone">
            <!--<label><i class="icon2"></i></label>-->
            <input placeholder="请输入收到的验证码" id="validateCode" type="tel" v-model="validateCode">
          </div>
        </div>
        <div class="tip">温馨提示：未注册好生活帐号的手机号，登录时将自动注册。</div>
        <div class="login" id="login">
          <button id="button" v-on:click="userLogin">注册登录</button>
        </div>
        <alert :alertText="message" v-if="showAlert"></alert>
      </div>
</template>
<script>
  import alert from '../../components/alert.vue'
  import{mapState,mapMutations} from 'vuex'
  import {login,getCode} from '../../service/getData'
  export default{
        data(){
            return{
              showAlert:false,
              message:'',
              isA:true,
              isB:false,
              phone:'',
              validateCode:''

            }
        },
    computed:{
      ...mapState([
        'Auth'
      ])
    },
      components:{
        alert
      },
      methods:{
        ...mapMutations([
          'TOKEN'
        ]),
        del(){

        },
        async getCode(){
          if(!(/^1[3|4|5|7|8]\d{9}$/.test(this.phone))) {
            this.showAlert=true;
            this.message='请输入正确的手机号'
            setTimeout(()=>{
              this.showAlert=false
            },2000)
            return
          }
          let data={
            mobile:this.phone,
            type:12
          }
          let code=await getCode(data)
          if(code.data.code==0){

          }
        },
       async userLogin(){
          if(!(/^1[3|4|5|7|8]\d{9}$/.test(this.phone))) {
            this.showAlert=true;
            this.message='请输入正确的手机号'
            setTimeout(()=>{
              this.showAlert=false
            },2000)
            return
          }
          if(this.validateCode==null||this.validateCode==''){
            this.showAlert=true;
            this.message='请输入验证码'
            setTimeout(()=>{
              this.showAlert=false
            },2000)
             return
          }
          let data={
            mobile:this.phone,
            code:this.validateCode,
            openId:this.Auth.openid
          }
          let logins=await login(data)
         if(logins.code==0){
           this.TOKEN(logins.data)
           this.$router.push({path:'/'})
         }
        }
      }
    }
</script>
<style scoped>
  *{margin: 0;padding: 0}
  body{background: #fff}
  .obtain{margin:1.1875rem 0 .5rem 0;height: 2.5rem;width: 100%;background: #f5f5f5;position: relative}
  .obtain input{display: inline-block;border: 0 none;outline: medium;font-size: .9375rem;height: 2.5rem;color: #bbb;}
  .ph-lable{background: #f5f5f5;width: 13.625rem;float: left;height: 2.5rem}
  .phone{width: 21.2125rem}
  .phone input{display: inline-block;width: 18rem;padding-left: 0.9375rem;background: #f5f5f5}
  #ph{width: 11rem;padding-left: 0.9375rem;background: #f5f5f5}
  .ph_number{display: inline-block;
    font-size: 0.8125rem;color: #d2b18e;background: #f5f5f5;border: 0 none;width: 6.9375rem;text-align: center;}
  .login button{font-weight: 500;width: 21.25rem;display: inline-block;color: #666;background: #222;height: 2.75rem;border: none;margin-left: 1rem;font-size: 0.9375rem;}
  .alert1{ width: 16rem; background-color: rgba(0, 0, 0, .8); color: #fff; border-radius: 11px; font-size: 18px; cursor: pointer; z-index: 9999; text-align: center; position: fixed; _position: absolute; line-height: 3rem; top: 18rem; left: 50%; margin: -9.1rem; padding: 0 1rem 0 1rem; }
  .tip{color: #999;font-size:0.625rem;line-height: 2.5rem;padding-left: 0.8rem }
  .getCodes{top:.28125rem;position: absolute;right: .9375rem;border: 1px solid #666;width: 6.9375rem;text-align: center;height: 1.875rem;line-height: 1.875rem;display: inline-block;}
  .getCode{top:.28125rem;position: absolute;right: .9375rem;border: 1px solid #d2be8e;width: 6.9375rem;text-align: center;height: 1.875rem;line-height: 1.875rem;display: inline-block;}
  .getCodes .ph_number{
    color: #666;
  }
</style>
