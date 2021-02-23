/*
 * @LastEditors  : BillySong
 */
import { splitExpr } from "./filterRule";
import { isEqual ,isEqualWith} from "lodash";

// 装饰器
export function setable(target: any, propertyKey: string) {
    let key = Symbol(propertyKey)
    let optKey = Symbol(propertyKey + 'Opt')

    let DisableKey = Symbol(propertyKey + 'OptDisable')

    Object.defineProperty(target, propertyKey, {
        enumerable:true,
        get: function () {
            return this[key]
        },
        set: function (arg: string[] | string) {
            this[key] = arg

            if(!arg) return
            this.effectRule
                .map((r: string) => splitExpr(r, true))
                .forEach((ruleItem: (string | string[])[]) => {
                    // 公式左边的
                    let left = ruleItem[0] as string[],
                        right = ruleItem[1] as string[],
                        concat = ruleItem[2] as string,
                        sym = left.pop(),
                        meta = false

                    let isMatch = (token: any) => {

                        return ['BAC', 'ITR', 'WWA', 'CRT', 'PKG'].some(it => {
                            if (it == 'PKG') return arg.includes(token)
                            return token === this[it]
                        })
                    }
                    switch (sym) {
                        case '&':
                            if (
                                left.every(isMatch)
                            ) {
                                meta = true
                            }
                            break;
                        case '|':
                            if (left.some(isMatch)) {
                                meta = true
                            }
                            break;
                        case '':
                            meta = isMatch(left[0])
                            break;
                    }
                    // 左边的规则匹配了
                    if (meta) {
                        if (concat == '=>') {
                            right.forEach(r => {
                                if (r.startsWith('PKG') && !this.PKG.includes(r)) {
                                    this.PKG.push(r)
                                    this.PKGOptDisable = [r]
                                }
                                else {
                                    if (r.startsWith('BAC') && !this.BACOptDisable.includes(r)) {

                                        this.BACOptDisable.push(r)
                                    }
                                    if (r.startsWith('WW') && !this.WWAOptDisable.includes(r)) {

                                        this.WWAOptDisable.push(r)
                                    }
                                    if (r.startsWith('CRT') && !this.CRTOptDisable.includes(r)) {

                                        this.CRTOptDisable.push(r)
                                    }
                                }
                            })
                        } else if (concat === '<=>') {
                            //TODO
                        } else if (concat === '<|>') {
                            //TODO
                        }
                    }

                });
            if (isEqualWith(this[DisableKey], this[propertyKey],
                (val, oth) => {
                    if (typeof val === typeof oth) {
                        return isEqual(val, oth)
                    } else if (Array.isArray(val) && typeof oth === 'string') {
                        return val.length === 1 && val[0] === oth
                    } else {
                        return false
                    }
                }
            )) {
                this[DisableKey] = []
            }
            return arg

        }
    })

    Object.defineProperty(target, propertyKey + 'Opt', {
        enumerable:true,
        get: function () {
            return this.getfeatrue(propertyKey)
        }
    })

    Object.defineProperty(target, propertyKey + 'OptDisable', {
        enumerable:true,
        get: function () {
            return this[DisableKey]||[]
        },
        set: function (arg) {
            this[DisableKey] = arg
        }
    })

}