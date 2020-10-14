<template>
  <div class="box">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型:</label>
          <div class="wrap-content">
            <el-select
              v-model="value"
              multiple
              placeholder="请选择"
              style="width:100px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="label-wrap date">
          <label for="">日期:</label>
          <div class="wrap-content">
            <el-date-picker
              v-model="value2"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="label-wrap keyword">
          <label for="">关键字:</label>
          <div>
            <el-select
              v-model="value3"
              placeholder="请选择"
              style="width:130px"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <el-input v-model="search" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" class="pull-right" @click="dialogFormVisible = true">新增</el-button>
      </el-col>
    </el-row>
    <div class="d1"></div>
    <el-table :data="tableData" border style="width: 100%">
       <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="date" label="日期" width="300" ></el-table-column>
      <el-table-column prop="title" label="标题" width="250"> </el-table-column>
      <el-table-column prop="user" label="管理员" width="250"></el-table-column>
      <el-table-column prop="category" label="类型" width="500"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template >
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="dialogFormVisible = true"
            >编辑</el-button
          >
          <el-button type="primary" icon="el-icon-delete" size="mini" @click="open">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row >
      <el-col :span="10">
         <el-button class="btn" type="primary" icon="el-icon-delete" size="mini" @click="deleteAll">批量删除</el-button>
      </el-col>
       <el-col :span="14">
          <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
      </el-col>
    </el-row>

<DialogInfo :flag.sync="dialogFormVisible" @close="close"/>

  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import DialogInfo from "./dialog/info.vue"
export default {
  components:{ DialogInfo},
  setup(props,{root}) {

    const value = ref("");
    const value2 = ref("");
    const value3 = ref("id");
    const search = ref("");
    const currentPage1=ref(5);
    const currentPage2=ref(5);
    const currentPage3=ref(5);
    const currentPage4=ref(4);
    // const dialogTableVisible=ref(false);
     const dialogFormVisible=ref(false);
    // const formLabelWidth=ref('120px');

    // const form=reactive({
    //       name: '',
    //       region: '',
        
    //     });

    const options = reactive([
      {
        value: "1",
        label: "国际信息"
      },
      {
        value: "2",
        label: "国内信息"
      },
      {
        value: "3",
        label: "行业信息"
      }
    ]);
    const options1 = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "titel",
        label: "标题"
      }
    ]);
   

    const tableData = reactive([
      {
        date: "2016-05-02",
        user: "王小虎",
        title: "上海",
        category: "上海市普陀区金沙江路 1518 弄",
      },
      {
        date: "2016-05-02",
        user: "王小虎",
        title: "上海",
        category: "上海市普陀区金沙江路 1518 弄",
      },
      {
       date: "2016-05-02",
        user: "王小虎",
        title: "上海",
        category: "上海市普陀区金沙江路 1518 弄",
      },
      {
       date: "2016-05-02",
        user: "王小虎",
        title: "上海",
        category: "上海市普陀区金沙江路 1518 弄",
      }
    ]);


    const handleClick = row => {
      console.log(row);
    };
    const handleSizeChange=(val)=> {
        console.log(`每页 ${val} 条`);
      };
    const handleCurrentChange=(val)=> {
        console.log(`当前页: ${val}`);
    }
    const close=()=>{
      dialogFormVisible.value=false
      console.log(9999999999)
    }

     const open=()=> {
        root.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          root.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          root.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

     }

    const deleteAll=()=>{
      root.$confirm('删除全部文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          root.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          root.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }



    return {
      options,
      value,
      value2,
      value3,
      options1,
      search,
      handleClick,
      tableData,
      handleSizeChange,
      handleCurrentChange,
      currentPage1,
      currentPage2,
      currentPage3,
      currentPage4,
      //dialogTableVisible,
      dialogFormVisible,
      // formLabelWidth,
      // form
      close,
      open,
      deleteAll
    };
  }
};
</script>
<style>
.el-table td, .el-table th.is-leaf{
  background:#ceebb3;
 
}
.el-table td, .el-table th{
    text-align: center;
    background:#ceebb3;
    
}
.el-table th, .el-table tr{
  background:transparent;
}
</style>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.box {
  padding: 50px;
}
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.keyword {
    @include labelDom(right, 100, 40);
  }
}

.d1 {
  width: 100%;
  height: 100px;
}
.el-table_1_column_1  .is-leaf{
  text-align: center;
}
.block{
  margin-top: 20px;
  float: right;
}
.btn{
  margin-top: 20px;
}
</style>