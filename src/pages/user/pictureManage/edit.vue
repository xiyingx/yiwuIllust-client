<template>
  <div class="artBox">
    <div class="box3">

      <print-pic :illustList="userIllust" :enableScale="true">
        <!-- 插槽进header 并访问里面的插槽作用域-->
        <template #header="scope">
          <el-dropdown @command="handleCommand">
            <svg-icon icon-name="more" class="more-icon"></svg-icon>
            <el-dropdown-menu slot="dropdown" class="dropdown-1">
              <el-dropdown-item icon="el-icon-delete" :command="{op:1,v:scope}">删除 </el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit" :command="{op:2,v:scope}">修改</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>

      </print-pic>


      <el-dialog title="修改图片信息" :visible.sync="imgInfoDialogVisible" width="30%" center>
        <el-form :label-position="'right'" label-width="80px"  :model="currentIllust" :rules="rules" ref="form">
          <el-form-item label="图片名" prop="name">
            <el-input v-model="currentIllust.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="currentIllust.description"></el-input>
          </el-form-item>

          <el-form-item label="标签">
            <el-tag :key="tag" v-for="tag in tags" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
              @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
          </el-form-item>

          <el-form-item label="缩略图">
            <img :src="'http://localhost/'+currentIllust.src" class="miniImg" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="imgInfoDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getIllustByUser,updateIllust,delIllust} from '@/api/illustApi'
export default {

  name: 'Edit',
  data() {
    return {
      reload: true,
      userIllust: [],
      currentIllust: { tags: [] },//当前被选中编辑的图片
      imgInfoDialogVisible: false,
      tags: [],
      inputVisible: false,
      inputValue: '',
      rules: {
        name: [{ type: 'string', required: true, message: '请输入插画名', trigger: ['blur'] }, { pattern: /^[\u4e00-\u9fa5\w-]{2,12}$/, message: '长度在2~12之间,支持数字、中文、下划线', trigger: ['change', 'blur'] }],
        description: [{ type: 'string', required: false, }, { pattern: /^[\u4e00-\u9fa5\w-]{0,128}$/, message: '描述最大128个字符', trigger: ['change', 'blur'] }],
      }

    }
  }, created() {
    this.getArts();

  },
  methods: {
    handleCommand(op) {
      console.log(op);
      if (op.op == 1) {
        this.deleteUserImg(op.v.illust.id, op.v.index);
      } else {
        this.currentIllust = op.v.illust;
        if(this.currentIllust.tags!=null){
          this.tags = this.currentIllust.tags;
        }
        this.imgInfoDialogVisible = true;
      }
    },

    //获取用户作品
    async getArts() {
      const {data:res} = await getIllustByUser(localStorage.getItem("UID"));
      this.userIllust = res.data;
    },
    //局部重载函数
    reloadMyPicture() {
      this.reload = false;
      this.$nextTick(function () {
        this.reload = true;
      });
    },
    //删除用户上传的图片
    deleteUserImg(id, key) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const {data:res} = await delIllust(id);
        if (res.data) {
          this.userIllust.splice(key, 1);
          this.$message.success(res.code.msg);
        }else{
          this.$message.error(res.code.msg);
        }
      })
    },
    //更新编辑的图片
     edit() {
      console.log(this.currentIllust);
      this.$refs["form"].validate(async(valid) => {
        if (valid) {
          this.currentIllust.tags = this.tags;
          const {data:res}= await updateIllust(this.currentIllust);
          if (res.data) {
            this.imgInfoDialogVisible = false;
            this.$message.success(res.code.msg);
          }else{
            this.$message.error(res.code.msg);
          }
        } else {
          return false;
        }
      });

    },
    //动态标签 引用自elementUI
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        console.log(this.tags);
        this.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }

  },
}
</script>

<style scoped>
.miniImg {
  width: 330px;
  height: 30%;
}

.artbox {
  width: 1500px;
}

.more-icon {
  font-size: 35px;
}

.item {
  margin: 11px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  text-align: right;
}

.image {
  display: block;
  width: 330px;

}

/** */
.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>