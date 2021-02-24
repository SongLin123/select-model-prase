/*
 * @LastEditors  : BillySong
 */
// src/main.js
import { setProperty, putInGroup, } from "./module/utils";
import { setable } from "./module/decorate";
import { obj } from './Iobj';
import filterRule from "./module/filterRule";

import { cloneDeep, isEmpty } from "lodash";

export default class SelectModelPrase {
    [x: string]: any;


    private featrueG: Map<obj, Map<string[], any[]>> = new Map()
    private models: obj[] = []

    private selectModel: obj | undefined // 选中的车型
    private effectRule: string[] = [] // 生效的约束规则


    constructor(json: any[]) {

        this.models = json.map((m: obj) => {

            this.featrueG.set(m, putInGroup(m.veFaimlyList))
            return m
        })
    }

    private filterRelationShip(base: obj[], relationShipSym: string) {
        return base.filter(i => i.relationShip === relationShipSym)
    }
    // 获取相关特征组
    private getBasefeatrue(faimlyCode?: string) {
        if (faimlyCode) {
            let k = [...this.featrueG.get(this.selectModel!)!.keys()].find((i) => i.includes(faimlyCode))
            return this.featrueG.get(this.selectModel!)!.get(k!) || []
        }
        else {


            return [...this.featrueG.get(this.selectModel!)!.values()]
        }
    }
    // 获取相关特征组,过滤选配信息
    private getfeatrue(faimlyCode?: string): never[] | any[] {
        if (!this.selectModel) return []

        let base = this.getBasefeatrue(faimlyCode)

        this[faimlyCode + 'OptDisable'] = this.filterRelationShip(base, '-').map(i => i.featureCode)
        // 返回 选配 + 不可选
        return [...this.filterRelationShip(base, 'O'), ...this.filterRelationShip(base, '-')]
    }
    private cleanDisable() {
        for (const key in this) {

            if (key.match(new RegExp('OptDisable'))) {
                this[key as string] = [] as string[]
            }
        }
    }

    public getModels() {
        return cloneDeep(this.models)
    }

    public setModel(carTypeId: string) {
        if (this.selectModel) this.cleanDisable()
        this.selectModel = this.models.find((i) => i.carTypeId === carTypeId)
        if (!this.selectModel) {
            this.cleanALL()
            return
        }
        // 当前车型的特征约束、特征
        this.effectRule = filterRule(this.selectModel!);

        // 后加的狗屎规则不知道对哦i不
        // 选配字段
        ['BAC', 'ITR', 'WWA', 'CRT'].forEach((faimlyCode: string) => {
            let base = this.getBasefeatrue(faimlyCode),
                defaultSelect = this.filterRelationShip(base, 'S');
            this[faimlyCode] = isEmpty(defaultSelect) ? undefined : defaultSelect[0].featureCode
        });
        // pkg 选配字段还有特殊规则，S标配默认选中且不能取消选择

        let pkgStandard = this.filterRelationShip(this.getBasefeatrue('PKG'), 'S')
        this['PKG' + 'OptDisable'] = this['PKG'] = pkgStandard.map(i => i.featureCode)

        return cloneDeep(this.selectModel)
    }

    public cleanALL() {
        this.BAC = undefined
        this.ITR = undefined
        this.WWA = undefined
        this.CRT = undefined
        this.PKG = []

        this.cleanDisable()


    }

    @setable
    public BAC: string | undefined;

    @setable
    public ITR: string | undefined;

    @setable
    public WWA: string | undefined;

    @setable
    public CRT: string | undefined;

    @setable
    public PKG: string[] | undefined;

}



