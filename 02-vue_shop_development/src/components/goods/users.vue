<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert title="添加商品信息" center type="info" show-icon></el-alert>
      <!-- 步骤条 -->
      <el-steps :active="activeIndex" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 商品添加tab栏 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-position="top">
        <el-tabs
          v-model="activeName"
          @tab-click="handleTabClick"
          tab-position="left"
          :before-leave="beforeLeave"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" autocomplete="off" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" autocomplete="off" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" autocomplete="off" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="props"
                @change="handleChange"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="(item,i) in manyData" :key="i">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="items" v-for="(items,i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="(item,i) in onlyData" :key="i">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              class="upload-demo"
              :action="upLoadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headerObj"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑框 -->
            <quill-editor ref="myQuillEditor" v-model="addForm.goods_introduce"></quill-editor>
            <el-button type="primary" class="addBtn" @click="addBtn">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 预览图片的对话框 -->
    <el-dialog title="图片预览" :visible.sync="previewDialogVisible" width="50%">
      <div class="pre">
        <img :src="this.previewPath" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      // 控制步骤条的进行情况
      activeIndex: 0,
      // 控制显示的tab栏
      activeName: '',
      // 表单的数据对象
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 级联选择框选择的数据
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: [],
      },
      // 表单的验证对象
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' },
        ],
      },
      // 获取到的分类数据
      cateList: [],
      // 级联选择框
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover',
      },
      // 获取到的动态请求参数
      manyData: [],
      // 获取到的静态属性
      onlyData: [],
      upLoadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 设置请求头
      headerObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      // 预览图片在本地的路径
      previewPath: '',
      // 预览图片是否进行显示
      previewDialogVisible: false,
    }
  },
  created() {
    this.getCateList()
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length !== 3) return
      return this.addForm.goods_cat[2]
    },
  },
  methods: {
    // tab栏切换时触发这个函数
    async handleTabClick() {
      this.activeIndex = parseInt(this.activeName)
      // 获取动态参数
      if (this.activeName === '1') {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: 'many' },
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('获取动态参数失败')
        }
        this.manyData = res.data

        // 将manyData中的attr_vals属性转化为数组
        this.manyData.forEach((item, index) => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
      }
      // 获取静态参数
      if (this.activeName === '2') {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: 'only' },
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('获取动态参数失败')
        }
        this.onlyData = res.data
      }
    },
    // 获取商品分类的数据
    async getCateList() {
      const { data: res } = await this.$http.get(`categories`)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      this.cateList = res.data
    },
    // 当级联选择器切换时触发这个函数
    handleChange() {
      // 未选中三级商品分类不允许添加
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat.length = []
      }
    },
    // 当离开当前页面时候触发这个函数，函数是一个钩子，需要返回值，返回False时阻止tab栏切换
    beforeLeave(newActiveName, oldActiveName) {
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请输入商品分类')
        return false
      }
    },
    // 点击图片进行预览
    handlePreview(file) {
      console.log(file)
      const previewPath = file.response.data.url
      this.previewPath = previewPath
      this.previewDialogVisible = true
    },
    // 移除图片
    handleRemove(file) {
      const i = this.addForm.pics.findIndex((item) => {
        return item.pic === file.response.data.tmp_path
      })
      this.addForm.pics.splice(i, 1)
    },
    // 图片上传成功获取图片路径
    handleSuccess(res) {
      const picInfo = { pic: res.data.tmp_path }
      this.addForm.pics.push(picInfo)
    },
    addBtn() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请填写必要的表单数据')
        }
        // 将goods_cate转化为字符串
        const addFormParam = _.cloneDeep(this.addForm)
        addFormParam.goods_cat = addFormParam.goods_cat.join(',')

        // 将manydata和onlydata转换成符合要求的参数
        this.manyData.forEach((item) => {
          this.addForm.attrs.push({
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' '),
          })
        })

        this.manyData.forEach((item) => {
          this.addForm.attrs.push({
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' '),
          })
        })

        addFormParam.attrs = this.addForm.attrs
        console.log(addFormParam)
        const { data: res } = await this.$http.post(`goods`, addFormParam)
        console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error('添加商品失败')
        }
        this.$message.success('添加商品成功')
        this.$router.push('/goods')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.addBtn {
  margin-top: 20px;
}
.img {
  width: 100px;
}
.pre {
  border: 1px solid #eee;
}
</style>