<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row type="flex">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表 -->
      <el-table :data="orderList" style="width: 100%" border>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" align="center"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款" align="center">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" v-if="scope.row.order_pay === '1'">已付款</el-tag>
            <el-tag type="warning" size="mini" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" align="center"></el-table-column>
        <el-table-column prop="create_time" label="下单时间" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.create_time | dateFormat }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editOrder"></el-button>
            <el-button type="success" icon="el-icon-s-tools" size="mini" @click="showProgress"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!--修改订单信息的对话框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="editOrderDialogVisible"
      width="50%"
      @close="editOrderDialogClosed"
    >
      <span>
        <el-form
          :model="editOrderForm"
          :rules="editOrderFormRules"
          ref="editOrderFormRef"
          label-width="100px"
        >
          <el-form-item label="省市区/县" prop="city">
            <el-cascader
              v-model="editOrderForm.editOrderList"
              :options="cityData"
              :props="editOrderProps"
              @change="editOrderChange"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="editOrderForm.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrderDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 物流信息对话框 -->
    <el-dialog title="物流信息" :visible.sync="showProgreseDialogVisible">
      <span>
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in progressInfo"
            :key="index"
            :timestamp="item.ftime"
          >{{item.context}}</el-timeline-item>
        </el-timeline>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import citys from './citydata'
export default {
  data() {
    return {
      // 请求订单列表
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5,
      },
      total: 0,
      orderList: [],
      editOrderDialogVisible: false,
      //   编辑表单的验证规则
      editOrderFormRules: {
        city: [{ required: true, message: '请输入省市区县', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
      },
      // 修改订单的信息
      editOrderForm: {
        address: '',
        editOrderList: [],
      },
      cityData: citys,
      //   配置项
      editOrderProps: {
        expandTrigger: 'hover',
      },
      //   物流信息对话框控制
      showProgreseDialogVisible: false,
      //   物流信息
      progressInfo: [],
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    //   获取订单列表
    async getOrderList() {
      const { data: res } = await this.$http.get(`orders`, {
        params: this.queryInfo,
      })

      if (res.meta.status !== 200) {
        return this.$message.error('订单列表获取失败')
      }
      this.orderList = res.data.goods
      this.queryInfo.pagenum = parseInt(res.data.pagenum)
      this.total = res.data.total
    },
    // 页面显示条数发生变化时触发
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    // 当前页面发生变化时触发
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    // 点击修改按钮弹出对话框
    editOrder() {
      this.editOrderDialogVisible = true
    },
    // 修改省市区县editOrderChange
    editOrderChange() {},
    // 关闭对话框的操作
    editOrderDialogClosed() {
      this.editOrderForm.editOrderList = []
      this.editOrderForm.address = ''
    },
    // 显示物流信息按钮showProgress
    async showProgress() {
      const { data: res } = await this.$http.get(`/kuaidi/1106975712662`)
      if (res.meta.status !== 200) {
        return this.$message.error('获取物流信息失败')
      }
      this.progressInfo = res.data
      this.showProgreseDialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>