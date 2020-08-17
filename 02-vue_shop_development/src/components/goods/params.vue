<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 页面顶部的提示按钮 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" show-icon :closable="false"></el-alert>
      <!-- 选择商品分类 -->
      <el-row type="flex">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            v-model="selectedCateKeys"
            :options="cateList"
            :props="cateProps"
            @change="parentCateChange"
            clearable
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab标签栏 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加参数</el-button>
          <!-- 动态属性的表格 -->
          <el-table :data="manyTabData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染Tag标签 -->
                <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable>{{item}}</el-tag>
                <!-- 输入文本框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称"></el-table-column>
            <!-- 操作行 -->
            <el-table-column prop="attr_name" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteParams(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="onlyTabData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染Tag标签 -->
                <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable>{{item}}</el-tag>
                <!-- 输入文本框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称"></el-table-column>
            <el-table-column prop="attr_name" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteParams(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数的对话框 -->
    <el-dialog :title="'添加'+titleText" :visible.sync="addDialogVisible" @close="addDialogClose">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item :label="titleText" prop="attr_name" label-width="100px">
          <el-input v-model="addForm.attr_name "></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改参数的对话框 -->
    <el-dialog :title="'修改'+titleText" :visible.sync="editDialogVisible" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
        <el-form-item :label="titleText" prop="attr_name" label-width="100px">
          <el-input v-model="editForm.attr_name "></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品分类列表数据
      cateList: [],
      //   级联选择框的配置属性
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover',
      },
      //   级联选择器选中的数据
      selectedCateKeys: [],
      // 选中的tab栏
      activeName: 'many',
      manyTabData: [],
      onlyTabData: [],
      // 控制添加参数对话框的显示和隐藏
      addDialogVisible: false,
      // 添加参数的表单数据对象
      addForm: {},
      // 添加表单的验证规则
      addFormRules: {
        attr_name: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
      // 控制修改参数对话框显示与否
      editDialogVisible: false,
      // 修改的表单的数据
      editForm: {},
      // 修改表单的验证规则
      editFormRules: {
        attr_name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getCateList()
  },

  computed: {
    // 如果三级级联选择框被禁用，则返回true，否则返回false
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    },
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    },
    titleText() {
      return this.activeName === 'many' ? '动态参数' : '静态属性'
    },
  },

  methods: {
    //   获取所有商品数据列表
    async getCateList() {
      const { data: rest } = await this.$http.get(`categories`)
      if (rest.meta.status !== 200) {
        return this.$message.error('获取商品列表信息失败')
      }
      this.cateList = rest.data
    },
    // 级联选择框选中时触发这个函数
    parentCateChange() {
      this.getParamsData()
    },
    // 点击tab页签的处理逻辑
    handleTabClick() {
      this.getParamsData()
    },
    // 获取商品参数
    async getParamsData() {
      // 未选中三级菜单不进行显示
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.manyTabData = []
        this.onlyTabData = []
        return
      }
      // 根据所选分类的ID获取请求参数
      const { data: rest } = await this.$http.get(
        `categories/${this.cateId}/attributes`,
        {
          params: { sel: this.activeName },
        }
      )
      if (rest.meta.status !== 200) {
        return this.message.error('分类列表获取失败')
      }
      // 将返回的数据中的attr_vals进行分割，重新进行保存
      rest.data.forEach((item) => {
        if (item.attr_vals === '') {
          item.attr_vals = []
        } else {
          item.attr_vals = item.attr_vals.split(' ')
        }
        // 控制tag切换框的输入和隐藏
        item.inputVisible = false
        // tag切换时文本框输入的值
        item.inputValue = ''
      })
      if (this.activeName === 'many') {
        this.manyTabData = rest.data
      } else {
        this.onlyTabData = rest.data
      }
    },
    // 添加对话款的关闭事件
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    // 向服务器发起请求添加参数
    addParams() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请输入添加参数')
        const { data: rest } = await this.$http.post(
          `categories/${this.cateId}/attributes`,
          {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName,
          }
        )
        if (rest.meta.status !== 201) {
          return this.$message.error('添加参数失败')
        }
        this.$message.success('添加请求参数成功')
        this.addDialogVisible = false
        this.getParamsData()
      })
    },
    // 修改属性对话框关闭时的处理逻辑
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击编辑按钮的处理过程
    async showEditDialog(attrId) {
      const { data: rest } = await this.$http.get(
        `categories/${this.cateId}/attributes/${attrId}`,
        {
          params: {
            attr_sel: this.activeName,
          },
        }
      )
      if (rest.meta.status !== 200) {
        return this.$message.error('获取参数数据失败')
      }
      this.editForm = rest.data
      this.editForm.attrId = attrId
      this.editDialogVisible = true
    },
    // 点击确定修改参数
    editParams() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请输入请求参数')
        const { data: rest } = await this.$http.put(
          `categories/${this.cateId}/attributes/${this.editForm.attrId}`,
          {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName,
          }
        )
        if (rest.meta.status !== 200) {
          return this.$message.error('修改参数失败')
        }
        this.$message.success('修改参数成功')
        this.getParamsData()
        this.editDialogVisible = false
      })
    },
    // 点击删除参数
    async deleteParams(id) {
      const res = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (res !== 'confirm') return
      const { data: rest } = await this.$http.delete(
        `categories/${this.cateId}/attributes/${id}`
      )
      if (rest.meta.status !== 200) {
        return this.$message.error('删除参数失败')
      }
      this.$message.success('删除参数成功')
      this.getParamsData()
    },
    // 文本框失去焦点或者点击enter键触发
    async handleInputConfirm(row) {
      console.log('handleInputConfirm')
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      // 输入的内容正确
      // row.inputValue = row.inputValue
      row.attr_vals.push(row.inputValue)
      row.inputValue = ''
      row.inputVisible = false
      // 发起请求提交参数
      console.log(row)
      const { data: rest } = await this.$http.put(
        `categories/${row.cat_id}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: this.activeName,
          attr_vals: row.attr_vals.join(' '),
        }
      )
      console.log(rest)
      if (rest.meta.status !== 200) {
        return this.$message.error('添加参数失败')
      }
      this.$message.success('添加参数成功')
    },
    // 点击显示输入框
    showInput(row) {
      row.inputVisible = true
      // 让输入框自动获得焦点
      // nextTick：当页面上元素被重新渲染之后才会执行回调函数中的代码。当点击button按钮的时候，input输入框还没有立即渲染出来，如果这个时候调用focus函数的话，就会报错。因此需要使用nextTick包裹focus。
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 0 10px;
}
.input-new-tag {
  width: 120px;
}
</style>