<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
<!--      <el-form-item label="平台属性">-->
<!--        <el-form :inline="true" ref="form" label-width="80px">-->
<!--          <el-form-item :label="attr.attrName" v-for="(attr,index) in attrInfoList" :key="attr.id">-->
<!--            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">-->
<!--              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </el-form-item>-->
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            prop=""
            width="80">
          </el-table-column>
          <el-table-column
            prop=""
            label="图片"
            width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" style="width: 100px;height: 100px">
            </template>
          </el-table-column>
          <el-table-column
            prop="imgName"
            label="名称"
            width="width">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {reqAddSku} from "@/api/product/spu";

export default {
  name: '',
  data() {
    return {
      //存储图片的信息
      spuImageList: [],
      //存储销售属性
      spuSaleAttrList: [],
      //存储平台属性
      attrInfoList: [],
      //收集sku数据
      skuInfo: {
        //第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类收集的数据：需要v-model双向绑定收集
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        //第三类收集的数据：需要自己书写代码
        //默认图片
        skuDefaultImg: '',
        //收集图片的字段
        skuImageList: [
          // {
          //   id:0,
          //   imgName:'',
          //   imgUrl:'',
          //   isDefault:'',
          //   skuId:0,
          //   spuImgId:0
          // }
        ],
        // //平台属性
        // skuAttrValueList: [
        //   // {
        //   //   attrId: 0,
        //   //   valueId: 0,
        //   // }
        // ],
        //销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName:'',
          //   saleAttrValueId:0,
          //   saleAttrValueName:'',
          //   skuId: 0,
          //   spuId: 0
          // }
        ],
      },
      spu: {},
      //收集图片数据的字段
      imageList:[]
    }
  },
  methods: {
    //获取skuForm数据
    async getData(category1Id, category2Id, spu) {
      //收集父组件给的数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
      //获取图片的数据
      let result1 = await this.$API.spu.reqSpuImageLIst(spu.id)
      if (result1.code == 200) {
        let list = result1.data
        list.forEach(item=>{
          item.isDefault = 0
        })
        this.spuImageList = list
      }
      //获取销售属性数据
      let result2 = await this.$API.spu.reqSpuSaleAttrInfoList(spu.id)
      if (result2.code == 200) {
        this.spuSaleAttrList = result2.data
      }
      //获取平台属性
      // let result3 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
      // if (result3.code == 200) {
      //   this.attrInfoList = result3.data
      // }
    },
    //复选框按钮的事件
    handleSelectionChange(selection) {
      //获取到用户选中的图片的数据，但是缺少isDefault字段
      this.imageList = selection
    },
    //排他操作
    changeDefault(row) {
      //将列表所有的isDefault字段设置为0
      this.spuImageList.forEach(item=>{
        item.isDefault = 0
      })
      //选中的isDefault字段设置为1
      row.isDefault = 1
      //收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    cancel() {
      //自定义事件，通知父组件改变场景为0
      this.$emit('changeScenes',0)
      //清除数据
      Object.assign(this._data,this.$options.data())
    },
    //保存按钮的事件
    async save() {
      //整理参数
      //整理平台属性：5.25此接口坏了
      const {attrInfoList,skuInfo,spuSaleAttrList,imageList} = this
      // //整理平台属性数据的方式一
      // //新建数组
      // let arr = []
      // attrInfoList.forEach(item=>{
      //   //当前平台属性用户进行选择
      //   if(item.attrIdAndValueId) {
      //     const [attrId,valueId] = item.attrIdAndValueId.split(':')
      //     //携带给服务器的参数应该是一个对象
      //     let obj = {attrId,valueId}
      //     arr.push(obj)
      //   }
      // })
      // //将整理好的参数赋值给skuInfo下的skuAttrValueList
      // skuInfo.skuAttrValueList = arr

      //整理平台属性数据的方式二
      // skuInfo.skuAttrValueList = attrInfoList.reduce((prev,item)=>{
      //   if(item.attrIdAndValueId) {
      //     const [attrId,valueId] = item.attrIdAndValueId.split(':')
      //     prev.push({attrId,valueId})
      //   }
      //   return prev
      // },[])
      //整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item)=>{
        if(item.attrIdAndValueId) {
          const [saleAttrId,saleAttrValueId] = item.attrIdAndValueId.split(':')
          prev.push({saleAttrId,saleAttrValueId})
        }
        return prev
      },[])
      //整理图片数据
      skuInfo.skuImageList = imageList.map(item=>{
        return {
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id
        }
      })
      //发请求
      let result = await this.$API.spu.reqAddSku(skuInfo)
      if(result.code==200) {
        this.$message({type:'success',message:'添加sku成功'})
        this.$emit('changeScenes',0)
        Object.assign(this._data,this.$options.data())
      }
    }
  }
}

</script>
