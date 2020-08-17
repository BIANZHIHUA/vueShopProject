<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row type="flex">
        <el-col :span="8">
          <div>
            <el-input
              v-model="queryInfo.query"
              placeholder="请输入内容"
              @input="onInput"
              clearable
              @clear="clearTable"
            >
              <el-button slot="append" icon="el-icon-search" @click="getSearchResult"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button class="searchBtn" type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 商品列表 -->
    <el-table :data="goods" style="width: 100%" border>
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="95px" align="center"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="70px" align="center"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="140px" align="center">
        <template slot-scope="scope">{{ scope.row.add_time | dateFormat }}</template>
      </el-table-column>
      <el-table-column width="130px" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeById(scope.row.goods_id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  获取商品列表时发送的参数
      queryInfo: {
        // query用来查询的字段，可以做搜索功能
        query: '',
        // 当前的页面
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10,
      },
      //   商品列表的总页数
      total: 0,
      //   获取到的所有的商品信息
      goods: [],
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    //   获取商品的列表
    async getGoodsList() {
      const { data: res } = await this.$http.get(`goods`, {
        params: this.queryInfo,
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败')
      }
      this.total = res.data.total
      this.pagenum = res.data.pagenum
      this.goods = res.data.goods
    },
    // 当页面现实的数据条数发生变化的时候触发这个函数
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    // 当页码发生跳转的时候就会触发这个函数
    handleCurrentChange(newPagenum) {
      this.queryInfo.pagenum = newPagenum
      this.getGoodsList()
    },
    // 当点击搜索按钮的时候，会触发这个函数
    getSearchResult() {
      this.getGoodsList()
    },
    // 监听input事件，解决输入框无法响应的问题，v是输入框输入的最新的值。
    onInput(v) {},
    // 当清空搜索框的时候，调用这个函数
    clearTable() {
      this.getGoodsList()
    },
    // 点击删除按钮触发这个函数
    async removeById(id) {
      const rest = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (rest !== 'confirm') {
        return this.$message.error('已取消删除操作')
      }
      const { data: res } = await this.$http.delete(`goods/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除商品失败')
      }
      this.$message.success('已成功删除商品')
      this.getGoodsList()
    },
    // 点击添加商品按钮调用这个函数跳转到商品添加的页面
    goAddPage() {
      this.$router.push('/path')
    },
  },
}
</script>

<style lang="less" scoped>
.searchBtn {
  margin-left: 15px;
}
.el-pagination {
  margin-top: 10px;
  color: rgb(75, 196, 75);
  font-size: 15px;
}
</style>