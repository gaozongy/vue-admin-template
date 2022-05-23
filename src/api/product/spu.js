import request from "@/utils/request";
//获取spu列表数据的接口
// /admin/product/{page}/{limit} get  page limit category3Id
export const reqSpuList = (page,limit,category3Id)=>request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

//获取spu信息
// /admin/product/getSpuById/{spuId} get
export const reqSpu = (spuId)=>request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

//获取品牌的信息
// /admin/product/baseTrademark/getTrademarkList get
export const reqTradeMarkList = ()=>request({url:`/admin/product/baseTrademark/getTrademarkList`,method:'get'})

//获取spu图片
// /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

//获取平台全部的销售属性---整个平台每个销售属性最多有三个
// /admin/product/baseSaleAttrList get
export const reqBaseSaleAttrList = ()=>request({url:`/admin/product/baseSaleAttrList`,method:'get'})
