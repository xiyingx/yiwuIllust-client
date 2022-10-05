<template>
  <div class="compo-upload">
    <el-upload class="upload-box" ref="uploadImg" 
      :auto-upload="false" :multiple="false" 
      :limit="1" :headers="token1"
      action="http://localhost/illust/add" 
      list-type="picture-card" 
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove" 
      :on-success="uploadSuccess" 
      :before-upload="uploadBefore" 
      :on-change="changeUpload"
      :data="{illustName:illust.name,description:illust.description,picTags:tags}">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <transition name="fade">

      <div class="edit-box" v-show="isVisiableAtEdit" >
        <el-form :label-position="'top'" label-width="80px" :model="illust" :rules="rules" ref="form">
          <el-form-item label="插画名" prop="name">
            <el-input v-model="illust.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="illust.description"></el-input>
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
          <el-button type="primary" class="upload-but" @click="upload">上传</el-button>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'Upload',
  data() {
    return {
      token1: { token: window.localStorage.getItem("token") },
      dialogImageUrl: '',
      dialogVisible: false,
      isUploadBefore: true,
      isVisiableAtEdit: false,
      illust: {
        description:""
      },
      tags: [],
      inputVisible: false,
      inputValue: '',
      isVis: true,
      rules: {
        name: [{ type: 'string', required: true, message: '请输入插画名', trigger: ['blur'] }, { pattern: /^[\u4e00-\u9fa5\w-\s]{2,12}$/, message: '长度在2~12之间,支持数字、中文、下划线', trigger: ['change', 'blur'] }],
        description: [{ type: 'string', required: false, }, { pattern: /^[\u4e00-\u9fa5\w-]{0,128}$/, message: '描述最大128个字符', trigger: ['change', 'blur'] }],
      }

    }
  }, created() {

  },
  methods: {
    //动态标签相关
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    //上传相关
    changeUpload(file, fileList) {
      if (this.isUploadBefore) {
        this.$message('请输入图片信息');
        this.isVisiableAtEdit = true;
        this.isUploadBefore = false;
      }
    },
    handleRemove(file, fileList) {
      this.isVisiableAtEdit = false;
      this.isUploadBefore = true;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadSuccess(response, file, fileList) {
      //需要延迟执行
      setTimeout(() => {
            this.isUploadBefore = true;
            this.isVisiableAtEdit = false;
            this.$refs.uploadImg.clearFiles();
            this.illust={description:""};
            this.tags = [];
          }, 500);
      
    },
    //上传之前
    uploadBefore() {

    },
    upload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$refs.uploadImg.submit();
          
        } else {
          return false;
        }
      });
    }
  },
}
</script>

<style>
.upload-box {
  float: left;
  margin-right: 100px;

  width: 350px;
}

.edit-box {
  float: left;
  padding: 30px;
  width: 400px;
  height: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

/*标签相关 */
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

.upload-but {
  width: 100%;
}

/** */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>
