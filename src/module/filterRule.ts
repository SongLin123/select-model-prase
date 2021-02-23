/*
 * @LastEditors  : BillySong
 */
export function splitToken(el: string, addSymbol?: boolean) {
  el = el.replace(/[\(|\)]/g, '')

  let splites = []
  switch (true) {
    case (splites = el.split('&')).length > 1:
      splites.push('&')
      break
    case (splites = el.split('|')).length > 1:
      splites.push('|')
      break

    case (splites = el.split('!')).length > 1:
      splites.push('!')
      break
    default:
      splites = [el,'']
      break

  }

  !addSymbol && splites.pop()


  return splites
}
export function splitExpr(rule: string, addSymbol?: boolean) {
  let splites: string[] = [], tar: string[] = []
  switch (true) {
    case (splites = rule.split('<=>')).length > 1:
      splites.push('<=>')
    case (splites = rule.split('=>')).length > 1:
      splites.push('=>')
    case (splites = rule.split('<|>')).length > 1:
      splites.push('<|>')
    case true:
      tar = splites
  }
  let tem = [tar[0], tar[1]].map((t) => splitToken(t, addSymbol))
  return addSymbol ? [...tem, tar[2]] : tem

}
export default function (model: { [k: string]: any }) {


  let rules = model.constraintRuleList,
    ves = model.veFaimlyList
  let tar = []
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i].constraintRuleCode


    //切成二维数组，【左边的tokens，右边的tokens】

    let tokens = splitExpr(rule) as string[][]

    //   分开判断是否有一个token存在与约束规则里
    let result = tokens.map((tsi) => {
      return tsi.some((t: any) => {
        return ves.some((ve: { featureCode: any }) => {
          return ve.featureCode == t
        })
      })
    })
    // 左右都有至少一个存在与特征族中
    if (result.every((e: boolean) => e === true)) tar.push(rule)

  }

  return tar
}
