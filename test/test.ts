/*
 * @LastEditors  : BillySong
 */

 
import SelectModelPrase from "../src/main";
import json from '../test.json';
let p = new SelectModelPrase(json)
// console.log('model',p.getModels())
// p.setModel('1358388880135143426') //创始版6座
// p.setModel('1358388887659724801') //标准版
// p.setModel('1358388882576228353')//创始版4座
// p.setModel('1358388889974980609')//精英版
// p.setModel('1358388892260876290')//性能版
// p.setModel('1358388894425137153')//豪华版
// p.setModel('1358388876922306561')//旗舰版6座

p.setModel('')//旗舰版4座
p.PKG=[]
// console.log('BAC',p.BAC)
// console.log('CRT',p.CRT)
// console.log('ITR', p.ITR)
console.log('Opt', p.ITR)
console.log('ITROptDisable', p.ITROptDisable)
console.log('OptDisable',p.PKGOptDisable)

// p.setModel('1358388892260876290')

// console.log('Opt', p.PKG)
// console.log('OptDisable', p.PKGOptDisable)

// console.log('PKG',p.PKG)
// console.log('OptDisable',p.PKGOptDisable)




// console.log('BACdisable',p.BACOptDisable)
// console.log('CRT',p.CRTOpt)
// console.log('ITR',p.ITROpt)
// console.log('WWA',p.WWAOpt)
// p.PKG=['PKG301']
// console.log({pkg:p.PKG,opt:p.PKGOpt,enable:p.PKGOptDisable})
// // p.CRT='12'
// // console.log(p.PKG)
// p.PKG=['PKG201','PKG301']
// console.log({pkg:p.PKG,opt:p.PKGOpt,enable:p.PKGOptDisable})
// // p.CRT='12'
// // console.log(p.PKG)
// p.PKG=['PKG101']
// // // p.CRT='12'
// console.log({pkg:p.PKG,opt:p.PKGOpt,enable:p.PKGOptDisable})

// console.log(p.CRT)

// console.log(p.getITRs())
// console.log(praseRule())
// console.log(p.getWWAs())
// console.log(p.getCRTs())
// console.log(p.getPKGs())
