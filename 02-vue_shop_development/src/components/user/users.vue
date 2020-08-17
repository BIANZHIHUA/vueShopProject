<template id="temp">
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <div style="margin-top: 15px;">
        <el-row :gutter="20">
          <el-col :span="15">
            <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <!-- 用户列表区域 -->
    <el-table :data="users" style="width: 100%" border stripe>
      <el-table-column type="index" label="索引"></el-table-column>
      <el-table-column prop="username" label="用户"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scopeVal">
          <!-- 修改 -->
          <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scopeVal.row.id)"></el-button>
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" @click="removeUserByID(scopeVal.row.id)"></el-button>
          <!-- 分配权限 -->
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" @click="setRole(scopeVal.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="addDialogClose">
      <!-- 内容主体 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="validEditForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1,3,5,7]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <div>
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.role_name}}</p>
        <p>
          分配新角色:
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的邮箱'))
    }
    // 验证手机号
    var checkMobile = (rule, value, callback) => {
      var regMobile = /^0?(13|14|15|18|17)[0-9]{9}/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('输入的手机号码有误'))
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      users: [],
      total: 0,
      // 控制添加用户对话框的显示和隐藏
      dialogVisible: false,
      // 控制修改用户对话框的显示和隐藏
      editDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      // 表单的验证规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3-10个字符之间',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码的长度在6-15个字符之间',
            trigger: 'blur',
          },
        ],
        mobile: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          {
            required: true,
            validator: checkMobile,
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          {
            required: true,
            validator: checkEmail,
            trigger: 'blur',
          },
        ],
      },
      // 查询到的用户信息
      editForm: {},
      // 修改用户的表单验证规则
      editFormRules: {
        mobile: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          {
            required: true,
            validator: checkMobile,
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          {
            required: true,
            validator: checkEmail,
            trigger: 'blur',
          },
        ],
      },
      // 控制分配角色对话框的显示与否
      setRoleDialogVisible: false,
      // 需要被被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      roleList: [],
      selectedRoleId: '',
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: rest } = await this.$http.get('/users', {
        params: this.queryInfo,
      })
      if (rest.meta.status !== 200) {
        return this.$message.error('用户列表数据获取失败')
      }
      this.users = rest.data.users
      this.total = rest.data.total
    },
    handleSizeChange(val) {
      console.log(val)
      this.queryInfo.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getUserList()
    },
    // 用户状态改变
    async userStateChange(userInfo) {
      const { status } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      if (status !== 200) {
        this.userInfo.mg_state = !this.userInfo.mg_state
        this.$messsage.error('用户状态修改失败')
        return
      }
      this.$message.success('用户状态修改成功')
    },
    // 用户对话框关闭事件的处理函数
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加用户之前的预校验
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: rest } = await this.$http.post('/users', this.addForm)
        if (rest.meta.status !== 201) {
          this.$message.error('添加用户失败')
          this.dialogVisible = false
          return
        }
        this.$message.sunccess('添加成功')
      })
    },
    // 展示修改用户对话框
    async showEditDialog(id) {
      this.editDialogVisible = true
      const { data: rest } = await this.$http.get(`users/${id}`)
      if (rest.meta.status !== 200) {
        this.$message.error('用户查询失败')
        return
      }
      this.editForm = rest.data
    },
    // 重置修改用户对话框
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    // 验证用户提交信息并进行提交
    validEditForm() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: rest } = await this.$http.put(
          `users/${this.editForm.id}`,
          { email: this.editForm.email, mobile: this.editForm.mobile }
        )
        if (rest.meta.status !== 200) {
          this.$message.error('用户信息修改失败')
          return
        }
        this.editDialogVisible = false
        this.getUserList()
        this.$message.success('更新用户信息成功')
      })
    },
    // 删除用户信息
    async removeUserByID(id) {
      // 弹出对话框，确认删除数据
      const rest = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => {
        return err
      })
      if (rest !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      const { data: res } = await this.$http.delete(`users/${id}`)
      if (res.meta.status !== 200) {
        this.$message.error('用户删除失败')
        return
      }
      this.getUserList()
      this.$message.success('用户删除成功')
    },
    // 展示分配角色的对话框
    async setRole(userInfo) {
      // 在展示对话框之前获取角色列表
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        this.$message.error('获取角色列表失败')
        return
      }
      this.roleList = res.data
      this.userInfo = userInfo
      this.setRoleDialogVisible = true
    },
    // 点击按钮分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        this.$message.error('请选择要分配的用户角色')
        return
      }

      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectedRoleId,
        }
      )

      if (res.meta.status !== 200) {
        this.$message.error('更新角色失败')
      }

      this.$message.success('更新角色成功')

      this.getUserList()

      this.setRoleDialogVisible = false
    },
    setRoleDialogClosed() {
      this.selectedRoleId = ''
      this.userInfo = ''
    },
  },
}
</script>

<style lang="less" scoped>
</style>
