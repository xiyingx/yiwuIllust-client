<template>

  <div class="core2">
    
    <div>
      <span class="text">创建收藏夹：</span>
      <el-button type="primary" icon="el-icon-edit" circle @click="createStars">
      </el-button>
    </div>
    <el-dialog title="创建收藏夹" :visible.sync="createStarsDialogVisible" width="30%" center>
      <el-form :label-position="labelPosition" label-width="80px" :model="formDate">
        <el-form-item label="名称">
          <el-input v-model="formDate.name"></el-input>
        </el-form-item>
        <el-form-item label="访客是否可见">
          <el-switch v-model="formDate.isShow"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createStarsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </span>
    </el-dialog>

    <el-collapse v-model="activeNames" @change="handleChange" class="b2" v-if="isRouterAlive">

      <el-collapse-item :name="k" v-for="(v,k) in star" v-bind:key="k">

        <div slot="title">
          <el-dropdown class="float" @command="handleCommand">
            <svg-icon icon-name="more" class="more-icon"></svg-icon>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-delete" :command="{op:1,fov:v,key:k}">删除 </el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit" :command="{op:2,fov:v,key:k}">修改</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="t1">{{v.name}}</span>
        </div>

        <print-pic :illustList="v.starIllustList" :enableWaterFall="false">
          <template #header="scope">
            <i class="el-icon-circle-close ic" @click="deleImg(v,scope,k)"></i>
          </template>
        </print-pic>

      </el-collapse-item>
    </el-collapse>
    <el-dialog title="编辑收藏夹" :visible.sync="editDialogVisible" width="30%" center>
      <el-form :label-position="labelPosition" label-width="80px" :model="formDate">
        <el-form-item label="名称">
          <el-input v-model="currentStar.name"></el-input>
        </el-form-item>
        <el-form-item label="访客是否可见">
          <el-switch v-model="currentStar.isShow"></el-switch>
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
import {getStars,createStar,removeStar,removeIllustFromStar,editStar} from '@/api/userApi'

export default {
  name: 'Star',
  data() {
    return {
      currentStar: {
          isShow: true
      },
      currentStarKey:null,
      editDialogVisible: false,
      isRouterAlive: true,
      activeNames: ['1'],
      star: [{}], //全部的收藏夹数组
      createStarsDialogVisible: false,
      labelPosition: 'top',
      formDate: {
        isShow: true
      }
    }
  },
  created() {
    this.getStars();
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    handleChange(val) {
    },
    async getStars() {
      const {data:res} = await getStars();
      this.star = res.data;
    },
    createStars() {
      this.createStarsDialogVisible = true;
    },
    async create() {
      const {data:res} = await createStar(this.formDate);
      if (!this.star) {
        let tem =[];
        tem.push(res.data);
        this.star = tem;
      }else{
        this.star.push(res.data);
      }
      this.reload();
      this.createStarsDialogVisible = false;
    },
    //删除
    async delStar(star, key) {
      this.$confirm('此操作将永久删除该收藏夹, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data:res} = await removeStar(star);
        if (res.data) {
            //从当前数组中删除
            this.star.splice(key, 1);
            this.reload();
            this.$message.success(res.code.msg);
          } else {
            this.$message.error(res.code.msg);
          }
      })
    },

    deleImg(star, scope, starKey) {
      this.$confirm('此操作会将图片从收藏夹中移除，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data:res} = await removeIllustFromStar(star,scope.illust.id);
        if (res.data) {
          //从当前数组中删除 找到是那个收藏夹 那个收藏夹的图片列表从里面删除
          this.star[starKey].starIllustList.splice(scope.index, 1);
          this.$message.success(res.code.msg);
        } else {
          this.$message.error(res.code.msg);
        }
      })
    },
    handleCommand(command) {
      if (command.op == 1) {
        this.delStar(command.fov, command.key)
      } else if (command.op == 2) {
        this.editDialogVisible = true;
        this.currentStar = JSON.parse(JSON.stringify(command.fov));
        this.currentStarKey = command.key;
      }

    },
    async edit() {
      const {data:res} = await editStar(this.currentStar);
      if (res.data) {
        this.star[this.currentStarKey].name = this.currentStar.name;
        this.editDialogVisible = false;
        this.$message.success(res.code.msg);
      }else{
        this.$message.error(res.code.msg);
      }
    
    }
  }
}
</script>

<style scoped>
.float {
  float: left;
  line-height: 0px;
}

.more-icon {
  font-size: 35px;
  margin-top: 5px;
}

.t1 {
  margin-left: 10px;
}

.text {
  color: #767C82;
}

.b2 {
  margin-top: 30px;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  text-align: right;
  border-radius: 4px;
  min-height: 36px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 10px;
}

.row-bg {
  padding: 10px 0;

}

.ic {
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 25px;
}
</style>