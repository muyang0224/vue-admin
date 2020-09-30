<template>
  <!-- <div>{{msg}}</div> -->
  
      <svg :class="svgClass" aria-hidden="true">
          <use :xlink:href="iconName"></use>
      </svg>
 
</template>

<script>
import {reactive,ref,onMounted,computed} from '@vue/composition-api'
export default {
    name:"SvgMap",
   // props:["iconClass","className"],
    props:{
        iconClass:{
            type:String,
            default:"",//默认值
            //default:()=>[],
            // required:true,//不能为空
            // validator:(value)=>{//校验规则
            //     return value >=0
            // }
        },
        className:{
            type:String,
            default:"",
        }
    },

    setup(props){
    const msg=ref("常伴吾身");
    console.log(props.iconClass,props.className)

    //计算属性，得出最终结果，并返回
    const iconName=computed(()=>`#icon-${props.iconClass}`)

    const svgClass=computed(()=>{
        if(props.className){
            return `svg-icon ${props.className}`
        }else{
            return `svg-icon`
        }
    })

    return{
        msg,
        iconName,
        svgClass
       
    }
    }

}
</script>

<style lang="scss" scoped>
.svg-icon{
    width:1em;
    height:1em;
   // fill:currentColor;
    //color: red;
    &.font12{
        font-size:12px;
    }
}
</style>