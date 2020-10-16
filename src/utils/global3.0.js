import {MessageBox} from 'element-ui';
import {ref} from '@vue/composition-api';
export function global(){
    const str=ref('');
    const confirm=(params)=>{
        //console.log(111111)
         MessageBox.confirm(params.centent, params.title||"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center:true
              }).then(() => {
                  str.value="删除》删除"
                params.fn&&params.fn(params.id)//如果params为true则调用fn方法
                  //if(params.fn){params.fn()}
              
              }).catch(() => {
                    
              });
        
    }
    return{
        str,
        confirm
    }
}