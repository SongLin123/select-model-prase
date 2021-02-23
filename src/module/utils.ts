/*
 * @LastEditors  : BillySong
 */
import { obj } from "../Iobj";
export function setProperty(origin: obj, hasKey: string[]) {
    let tar: obj = {}
    hasKey.forEach(key => {
        if (key in origin) {
            tar[key] = origin[key]
        }
    })
    return tar
}

export function putInGroup(list: { [k: string]: string }[]) {
    let groupMap: Map<string[], any[]> = new Map([
        [['BAC'], []],// 外色
        [['ITR'], []], // 内饰
        [['WWA', 'WWT'], []],//车轮
        [['CRT'], []],//冰箱
        [['PKG', 'PKG1', 'PKG2', 'PKG3', 'PKG4'], []],// 选装包

    ])
    for (const item of list) {

        Array.from(groupMap.keys()).forEach(key => key.includes(item.faimlyCode)
            &&
            groupMap.get(key)!.push(item))
    }
    return groupMap
}


