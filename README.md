<!--
 * @LastEditors  : BillySong
-->
# select-model-prase （车型选配逻辑解析）

解析车型json和约束规则，生成一个包含5种选择框的选项、选中值、不可选项的实例对象
# Installation

1. 复制包到工程目录内
2. 引入工程
## npm
``` js
// package.json 中 dependencies 字段添加 "select-model-prase": "file:select-model-prase",

... 
 "dependencies": {
        "select-model-prase": "file:select-model-prase",
 }
...
```

执行命令
``` shell
npm i
```

``` js
import SelectModelPrase from "select-model-prase";
```
## cdn
``` html
<script src="./select-model-prase/dist/bundle.js"></script>
<script>
let p = new SelectModelPrase(json)

</script>
```
# Quick start

``` js
let p = new SelectModelPrase(json)

p.setModel('1358388885147336705')//旗舰版4座

console.log('BAC',p.BAC)
console.log('CRT',p.CRT)
console.log('ITR', p.ITR)
console.log('Opt', p.ITROpt)
console.log('OptDisable', p.ITROptDisable)
console.log('OptDisable',p.PKGOptDisable)
```
# API

## Interfaces
```typescript
type featrueCode = string // 特征编码

// 特征
type featrue = {
    faimlyId: string;
    faimlyCode: string;
    faimlyName: string;
    faimlyNameEn: string;
    featureId: string;
    featureCode: string;
    featureName: string;
    featureNameEn: string;
    relationShip: string;
    price: string;
    discountPrice: string;
    featureType: string;
  }
// 车型
  type model ={
    "carTypeId": string;
	"carTypeCode": string;
	"carTypeCn": string;
	"carTypeEn": string;
	"orderNo": string;
        ...
  }

```
## 属性
```typescript
interface SelectModelPrase {
    BAC: featrueCode;// 选中的外色
    BACOpt: featrue[]; // 外色选项
    BACOptDisable: featrueCode[];// 外色不可选中选项的featrueCode

    ITR: featrueCode;// 选中的内饰
    ITROpt: featrue[];// 内饰选项
    ITROptDisable: featrueCode[];// 内饰不可选中选项的featrueCode

    WWA: featrueCode;// 选中的车轮或轮毂
    WWAOpt: featrue[];// 车轮选项
    WWAOptDisable: featrueCode[];// 车轮不可选中选项的featrueCode

    CRT: featrueCode;// 选中的冰箱
    CRTOpt: featrue[];// 冰箱选项
    CRTOptDisable: featrueCode[];// 冰箱不可选中选项的featrueCode


    PKG: featrueCode[];// 选中的选装包
    PKGOpt: featrue[];// 选装包选项
    PKGOptDisable: featrueCode[];// 选装包不可选中选项的featrueCode
    
}
```

### constructor
``` js
new SelectModelPrase(json) // json 车型列表json
```
### getModels()
``` js
function getModels(): model[] 
```
返回可选车型数组

### setModel()
``` js
function setModel(carTypeId: string): model
```
设置选中车型,传入车型的 carTypeId

carTypeId 传空字符串或者不存在数组中的值，会清空 属性值、选项、不可选中的选项
如：
``` js

p.setModel('')

console.log('BAC',p.BAC) // undefined
console.log('CRT',p.CRT) // undefined
console.log('ITR', p.ITR) // undefined
console.log('Opt', p.ITROpt) // []
console.log('OptDisable', p.ITROptDisable) // []
console.log('OptDisable',p.PKGOptDisable) // []

```




