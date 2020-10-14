<template>
  <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="580px">
  <el-form :model="form">
      <el-form-item label="标题" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="类型" :label-width="formLabelWidth">
      <el-input v-model="form.name" placeholder="请选择类型" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="概况" :label-width="formLabelWidth" >
      <el-input type="textarea" v-model="form.name" autocomplete="off" placeholder="请填写概况"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog_info_flag = false">取 消</el-button>
    <el-button type="danger" @click="dialog_info_flag = false">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
export default {
    data(){
        return{
     dialog_info_flag:false,
   
     formLabelWidth:'50px',
        form: {
          name: '',
          region: '',
        },
        }
    },
    //单向数据流，父级=>子集，不能反向修改
    props:{
        flag:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        flag:{
           handler(newValue,oldValue){
               this.dialog_info_flag=newValue
               console.log(111)
               console.log(newValue)
           } 
        },
 
    },
      methods:{
            close(){//弹窗关闭自动触发
            this.dialog_info_flag=false,
            console.log(1111)
            this.$emit("update:flag",false)
           // this.$emit('close',false)//修改父组件的值
            }
        }
}
</script>

<style lang="scss">
.el-dialog__footer{
    text-align: center;
    .el-button {
    width:150px !important;
    margin: 0 11px;
}
}


</style>