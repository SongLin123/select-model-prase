interface IValue {
    equal(c: string): boolean
}

interface IToken {
    isMetaCharacter(c: string): boolean
    isCharacter(c: string): boolean
    isMatch(c: string): boolean
}

class Value implements IValue {
    private value_: string

    constructor(value: string) {
        this.value_ = value
    }

    equal(c: string): boolean {
        return this.value_.indexOf(c) > -1
    }
}

class Token implements IToken {
    private meta_: boolean
    private value_: IValue

    constructor(value: string, meta: boolean) {
        this.meta_ = meta
        this.value_ = new Value(value)
    }

    isMetaCharacter(c: string): boolean {
        return this.meta_ && this.value_.equal(c)
    }

    isCharacter(c: string): boolean {
        return !this.meta_ && this.value_.equal(c)
    }

    isMatch(c: string): boolean {

        return this.isCharacter(c)

    }
}

class Matcher {
    private tokens_: IToken[]
    private target_: string

    constructor(tokens: IToken[], target: string) {
        this.tokens_ = tokens
        this.target_ = target
    }

    private matchQuestion_(i: number, j: number): boolean {
        const token = this.tokens_[i]
        const input = this.target_[j]

        if (token.isMatch(input) && this.match_(i + 2, j + 1)) {
            return true
        } else {
            // 否则跳出x?的匹配过程
            return this.match_(i + 2, j)
        }
    }

    private matchStar_(i: number, j: number): boolean {
        const token = this.tokens_[i]
        const input = this.target_[j]

        if (token.isMatch(input) && this.matchStar_(i, j + 1)) {
            return true
        } else {
            // 否则跳出x*的匹配过程
            return this.match_(i + 2, j)
        }
    }

    private matchPlus_(i: number, j: number): boolean {
        const token = this.tokens_[i]
        const input = this.target_[j]

        if (token.isMatch(input) && this.matchStar_(i, j + 1)) {
            return true
        } else {
            // x+必须匹配至少一次
            return false
        }
    }

    private match_(i: number, j: number): boolean {
        const token = this.tokens_[i]
        const tokenNext = this.tokens_[i + 1]
        const input = this.target_[j]

        if (i >= this.tokens_.length) {
            // 如果已经到正则的末尾，证明已经匹配成功
            return true
        } else if (tokenNext && tokenNext.isMetaCharacter('?')) {
            // 如果正则中包含x?，则需要进行特殊处理
            return this.matchQuestion_(i, j)
        } else if (tokenNext && tokenNext.isMetaCharacter('*')) {
            // 如果正则中包含x*，则需要进行特殊处理
            return this.matchStar_(i, j)
        } else if (tokenNext && tokenNext.isMetaCharacter('+')) {
            // 如果正则中包含x+，则需要进行特殊处理
            return this.matchPlus_(i, j)
        } else if (token.isMatch(input)) {
            // 如果正则中的字符与字符串中对应位置的字符相等，则匹配下一位
            return this.match_(i + 1, j + 1)
        }

        return false
    }

    // 支持的元字符包括
    match(): boolean {
        const tokens = this.tokens_
        const target = this.target_

        if (tokens.length === 0) {
            // 如果正则的长度为0，则应该能匹配所有的字符串
            return true
        } else {
            // 从字符串的起始位置开始尝试匹配，如果不行，就后移一位
            for (let i = 0; i < target.length; i++) {
                if (this.match_(0, i)) {
                    return true
                }
            }
        }

        return false
    }
}

export class Pattern {
    private regexp_: string
    private tokens_: IToken[] | null = null

    constructor(regexp: string) {
        this.regexp_ = regexp
    }

    private compile_(): void {
        const regexp = this.regexp_
        const tokens = []

        let i = 0

        while (i < regexp.length) {
            let value = regexp[i]
            let meta = false

            if ('[' === value) {
                const start = i + 1
                const end = regexp.indexOf(']', start)

                value = regexp.slice(start, end)
                i = end
            }
            else if ('(' === value) {
                const start = i + 1
                const end = regexp.indexOf(')', start)

                value = regexp.slice(start, end)
                i = end
            }
            else if ('!&|'.indexOf(value) > -1) {
                meta = true
            }

            tokens.push(new Token(value, meta))

            i++
        }

        this.tokens_ = tokens
    }

    match(target: string): boolean {
        // 惰性计算
        if (this.tokens_ === null) {
            this.compile_()
        }

        return (new Matcher(this.tokens_ as IToken[], target)).match()
    }
}