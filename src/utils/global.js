import {MessageBox} from 'element-ui'
export default{
    install(Vue,option){
        Vue.prototype.confirm=(params)=>{
            console.log('plugin Test')
           MessageBox.confirm(params.centent, params.title||"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                params.fn&&params.fn()//如果params为true则调用fn方法
                  if(params.fn){params.fn()}
                // root.$message({
                //   type: 'success',
                //   message: '删除成功!'
                // });
              }).catch(() => {
                // root.$message({
                //   type: 'info',
                //   message: '已取消删除'
                // });          
              });
        }
    }
}

//vue插件