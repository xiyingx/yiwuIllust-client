<template>
  <div>

    <div class="box">

      <div class="box4">
        <div class="img-box">
          <img :src="profile" class="img">
        </div>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="text3">个人中心</span>
          </div>
          <div class="text item">
            <el-descriptions :column="column">
              <el-descriptions-item label="UID"><span class="uid">{{userInfo.id}}</span></el-descriptions-item>
              <el-descriptions-item label="昵称"><span>{{userInfo.name}}</span></el-descriptions-item>
              <el-descriptions-item label="创建日期"><span>{{userInfo.createdDate}}</span></el-descriptions-item>
              <el-descriptions-item label="用户类型"><span>{{userInfo.userType}}</span></el-descriptions-item>
              <el-descriptions-item label="绑定邮箱"><span>{{userInfo.email}}</span></el-descriptions-item>
            </el-descriptions>
          </div>
          <div class="text4">
            {{userInfo.description}}
          </div>


          <el-dropdown class="dropdown1" @command="handleCommand" :hide-timeout="300">

            <span class="el-dropdown-link">
              <svg-icon icon-name="edit" class="more-icon"></svg-icon>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-upload2" command="1">上传头像</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus" command="2">编辑个人信息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-card>
      </div>


    </div>

    <el-dialog title="上传头像" :visible.sync="uploadDialogVisible" width="30%" center>
      <!-- 注意这不是axios请求！不会带你的token 你的请求会被忽略！ -->
      <el-upload action="http://localhost/user/uploadProFilePicture" :headers="token1" :data="{oldSrc:profileSrc}"
        list-type="picture-card" :auto-upload="false" :multiple="false" :limit="1" :on-success="show" ref="uploadPro">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
              <i class="el-icon-download"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload">上 传</el-button>
      </span>
    </el-dialog>


    <el-dialog title="编辑个人资料" :visible.sync="editDialogVisible" width="30%" center>

      <el-form :label-position="'left'" label-width="80px" :model="editUser" ref="form" :rules="rules">
        <el-form-item label="昵称" prop="account">
          <el-input v-model="editUser.name"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="description">
          <el-input v-model="editUser.description"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUser.email"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>



  </div>

</template>
  
<script>
  
  import {getUserInfo,updateUser} from "@/api/userApi"
  import { mapMutations } from "vuex";
export default {
  name: 'personal',
  components: {
  },
  data() {
    return {
      token1: { token: window.localStorage.getItem("token") },
      disabled: false,
      column: 2,
      userInfo: {},
      editUser: {},
      profile: "http://localhost/",
      profileSrc:'',
      uploadDialogVisible: false,
      editDialogVisible: false,
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      rules: {
        name: [{ type: 'string', required: true, message: '请输入用户名', trigger: ['blur'] }, { pattern: /^[\u4e00-\u9fa5\w-]{2,12}$/, message: '长度在2~12之间,支持数字、中文、下划线', trigger: ['change', 'blur'] }],
        email: [{ type: 'string', required: true, message: '请输入邮箱', trigger: ['blur'] }, { pattern: /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/, message: '邮箱不合法', trigger: ['change', 'blur'] }],
        description: [{ type: 'string', required: false, }, { pattern: /^[\u4e00-\u9fa5\w-]{0,64}$/, message: '描述最大64个字符', trigger: ['change', 'blur'] }],
      }
    }
  }, created() {
    this.getUserInfo();
    this.$parent.isPerson();
  },
  methods: {
    ...mapMutations("user", ["setProfile"]),
    async getUserInfo() {
      const {data:res} = await getUserInfo();
      this.userInfo = res.data;
      this.editUser = JSON.parse(JSON.stringify(this.userInfo));
      this.editUser.profile = null;
      if (this.userInfo.profile) {
        this.profile += this.userInfo.profile;
        this.profileSrc = this.userInfo.profile;
      }
    },
    handleCommand(command) {
      if (command === '1') {
        this.uploadDialogVisible = true;
      } else if (command === '2') {
        this.editDialogVisible = true;
      }
    },
    handleRemove(file) {
      this.$refs.uploadPro.clearFiles();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
    },
    //上传文件
    upload() {
      console.log("上传.....");
      this.$refs.uploadPro.submit();

    },
    //显示头像
    show(response, file, fileLis) {
      let profile = "http://localhost/" + response.data;
      this.setProfile(profile)
      this.profile = profile;
      this.$message.success(response.code.msg + "，刷新即可改变");
      this.uploadDialogVisible = false;
      this.$refs.uploadPro.clearFiles();
    },
    //编辑个人资料
    edit() {
      this.$refs["form"].validate(async(valid) => {
        if (valid) {
          console.log(this.editUser);
          const {data:res} =await updateUser(this.editUser)
          if (res.data.isSuccess) {
            window.localStorage.setItem("token", res.data.token);
            this.userInfo.name = this.editUser.name;
            this.userInfo.description = this.editUser.description;
            this.userInfo.email = this.editUser.email;
            this.editDialogVisible = false;
            this.$message.success(res.code.msg);
          } else {
            this.$message.error(res.code.msg);
          }
        }
      });
    }
  },
}
</script>
  
<style scoped>
.more-icon {
  font-size: 35px;
}

.textBox2 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 10px;
  margin-right: 20px;
  display: flex;
  width: 430px;
  height: 25%;
  float: left;
}

* {
  line-height: 1.8;
}

.uid {
  color: #409EFF;
}

.dropdown1 {
  margin-top: 20px;
  width: 100px;
  height: 50px;
  float: right;
  font-size: 15px;
}

.img-box {
  width: fit-content;
  margin: 0 auto;
}

.img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.box-card {

  margin-top: 100px;
  height: fit-content;

}

.clearfix {
  font-size: 30px;
  color: #303133;
  height: 50px;
  text-align: center;

}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 20px;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 15px;
  margin-bottom: 20px;
}

.text4 {
  color: #8064a9;
  font-style: oblique;
}

/* 占位 */
</style>
  