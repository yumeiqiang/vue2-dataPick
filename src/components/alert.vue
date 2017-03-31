<template>
  <div>
    <slot>
      <div v-on:click="close" class="alert1">{{alertText}}</div>
    </slot>
  </div>
</template>
<style scoped>
  .alert1{
    width: 200px;
    min-height: 3rem;
    background-color: rgba(0,0,0,.8);
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
    text-align: center;
  }
</style>
<script>
    export default{
        data(){
            return{

            }
        },
     props:{
       alertText:''
     },
      methods:{
         close(){
           this.$emit('close')
         }
      }
    }
</script>
