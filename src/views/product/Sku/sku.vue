<template>
  <div>
    <el-table style="width: 100%" border :data="records">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        width="width">
      </el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width">
      </el-table-column>
      <el-table-column
        prop=""
        label="默认图片"
        width="110">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" style="width: 80px;height: 80px">
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(千克)"
        width="80">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格(元)"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        width="width">
        <template slot-scope="{row,$index}">
          <el-button type="success" icon="el-icon-bottom" size="mini" v-if="row.isSale==0"
                     @click="sale(row)"></el-button>
          <el-button type="success" icon="el-icon-top" size="mini" v-else @click="cancel(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3,5,10]"
      :page-size="limit"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="prev,pager,next,jumper,->,sizes,total"
      :total="total">
    </el-pagination>
    <!--抽屉效果-->
    <el-drawer
      :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag type="success" style="margin-right: 10px" v-for="(attr,index) in skuInfo.skuAttrValueList" :key="attr.id">{{attr.attrId}}-{{attr.valueId}}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,//当前第几页
      limit: 10,//当前页面有多少条数据
      records: [],//存储sku列表的数据
      total: 0,//分页器一共展示的数据
      skuInfo:{},//存储sku详情
      drawer:false,//抽屉效果默认关闭
    }
  },
  mounted() {
    //获取sku列表数据的方法
    this.getSkuList()
  },
  methods: {
    //点击分页器第几页的按钮的回调
    handleCurrentChange(page) {
      this.page = page
      this.getSkuList()
    },
    //当分页器的某一页展示的数据发生变化时的回调
    handleSizeChange(limit) {
      //修改参数
      this.limit = limit
      //再次发请求
      this.getSkuList()
    },
    //获取sku列表数据的方法
    async getSkuList() {
      //解构出数据
      const {page, limit} = this
      let result = await this.$API.sku.reqSkuList(page, limit)
      if (result.code == 200) {
        this.total = result.data.total
        this.records = result.data.records
      }
    },
    //上架
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id)
      if (result.code == 200) {
        row.isSale = 1
        this.$message({type: 'success', message: '上架成功'})
      }
    },
    //下架
    async cancel(row) {
      let result = await this.$API.sku.reqCancel(row.id)
      if (result.code == 200) {
        row.isSale = 0
        this.$message({type:'success',message:'下架成功'})
      }
    },
    edit() {
      this.$message('正在开发中...')
    },
    //获取sku详情按钮的事件
    async getSkuInfo(sku) {
      //展示数据
      this.drawer = true
      let result = await this.$API.sku.reqSkuById(sku.id)
      if (result.code == 200) {
        this.skuInfo = result.data
      }
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/*.el-carousel__button{*/
/*  width: 10px;*/
/*  height: 10px;*/
/*  background: red;*/
/*  border-radius: 50%;*/
/*}*/
  .el-row .el-col-5{
    font-size:18px;
    text-align: right;
  }
  .el-col{
    margin: 10px 10px;
  }
</style>

<style scoped>
.el-row .el-col-5{
  font-size:18px;
  text-align: right;
}
.el-col{
  margin: 10px 10px;
}
>>>.el-carousel__button{
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>
