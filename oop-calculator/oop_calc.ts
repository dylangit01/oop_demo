class OOB_Calc {
    result: string

    //下面黄色这句话啥意思？
    validateExpress(express: string): boolean {

        if (express === null || undefined) {
            return false
        }
        return true
    }

    CalculateExpress(express01: string): number {

        express01 = express01.replace(/--/g, '+')

        let calcWay3: number = express01.indexOf('*')
        let calcWay4: number = express01.indexOf('/')
        let calcWay1: number = express01.indexOf('+')
        let calcWay2: number = express01.indexOf('-')

        let exEnd = undefined //这句可以不要吗？

        if (calcWay3 >= 0) {
            exEnd = express01.indexOf('*', 0)
        } else if (calcWay4 >= 0) {
            exEnd = express01.indexOf('/', 0)
        } else if (calcWay1 >= 0) {
            exEnd = express01.indexOf('+', 0)
        } else if (calcWay2 >= 0) {
            exEnd = express01.indexOf('-', 0)
        }

        //string.substring 包含开始的第一位，到end的前一位：
        // let subE1: number = parseInt(express.substring(0, exEnd), 10) //->但是这种方式可以规避掉非数字，然后只取数字进行计算

        let subE1: number = Number(express01.substring(0, exEnd))

        // .replace('*', '')
        // .replace('/', ''))
        console.log(subE1)

        // let subE2: number = parseInt(express.substring(exEnd + 1, express.length), 10)
        let subE2: number = Number(express01.substring(exEnd + 1, express01.length))
        console.log(subE2)

        if (calcWay3 >= 0) {
            let aResult: number = subE1 * subE2
            // if (subE1 < 0 && subE2 >= 0) {
            //     subE1 = -subE1
            //     aResult = -(subE1 * subE2)
            // } else if (subE1 >= 0 && subE2 < 0) {
            //     subE2 = -subE2
            //     aResult = -(subE1 * subE2)
            // } else if (subE1 < 0 && subE2 < 0) {
            //     subE1 = -subE1
            //     subE2 = -subE2
            //     aResult = subE1 * subE2
            // } else {
            //     aResult = subE1 * subE2
            // }
            console.log(aResult)
            return aResult

        } else if (calcWay4 >= 0) {
            let aResult: number = subE1 / subE2
            console.log(aResult)
            return aResult

        } else if (calcWay1 >= 0) {
            let aResult: number = subE1 + subE2
            // if (subE1 < 0 && subE2 >= 0) {
            //     subE1 = -subE1
            //     if (subE1 < subE2) {
            //         aResult = subE2 - subE1
            //     } else if (subE1 > subE1) {
            //         aResult = -(subE1 - subE2)
            //     } else if (subE1 === subE2) {
            //         aResult = 0
            //     }
            // } else if (subE1 >= 0 && subE2 < 0) {
            //     subE2 = -subE2
            //     if (subE1 < subE2) {
            //         aResult = -(subE2 - subE1)
            //     } else if (subE1 > subE2) {
            //         aResult = subE1 - subE2
            //     } else if (subE1 === subE2) {
            //         aResult = 0
            //     }
            // } else if (subE1 < 0 && subE2 < 0) {
            //     subE1 = -subE1
            //     subE2 = -subE2
            //     aResult = -(subE1 + subE2)
            // }
            console.log(aResult)
            return aResult

        } else if (calcWay2 >= 0) {
            let aResult: number = subE1 - subE2
            // if (subE2 < 0 && subE1 < 0) {
            //     subE1 = -subE1
            //     subE2 = -subE2
            //     aResult = -(subE1 + subE2)
            // }
            console.log(aResult)
            return aResult

            // } else if (calcWay2 >= 0 && subE1 < 0 && subE2 >= 0) {
            //     subE1 = -subE1
            //     let aResult = -(subE1 + subE2)
            //     console.log(aResult)
            //     return aResult
            //
            // } else if (calcWay2 >= 0 && subE1 > 0 && subE2 < 0) {
            //     subE2 = -subE2
            //     let aResult = subE1 + subE2
            //     console.log(aResult)
            //     return aResult
            //
            // } else if (calcWay2 >= 0 && subE1 < 0 && subE2 < 0) {
            //     subE1 = -subE1
            //     subE2 = -subE2
            //     if (subE1 < subE2) {
            //         let aResult = subE2 - subE1
            //         console.log(aResult)
            //         return aResult
            //     } else if (subE1 > subE2) {
            //         let aResult = -(subE1 - subE2)
            //         console.log(aResult)
            //         return aResult
            //     } else if (subE1 === subE2) {
            //         let aResult = 0
            //         console.log(aResult)
            //         return aResult
            //     }


        }
        // return true// 这句话到底啥作用？
    }

    parse(express: string): boolean {
        if (!express || !this.validateExpress('')) { //这里null为什么return false不管用
            return false
        }
        express = express.trim()
        express = express.replace(/ /g, '')  //replace()要用"//g"才可以替换所有想要替换的值
        console.log(express)
        // console.log((express).length)

        let leftB: number = express.indexOf('(')
        let rightB = undefined
        if (leftB >= 0) {
            rightB = express.indexOf(')', leftB)
            let stringInBrace = express.substring(leftB + 1, rightB)
            console.log(stringInBrace)
            let bResult: number = this.CalculateExpress(stringInBrace) //bResult是括号里的值
            // console.log(bResult)
            let cResult: string = express.replace(express.substring(leftB, rightB + 1), String(bResult))//这里是replace括号之后的express
            console.log(cResult)
            this.CalculateExpress(cResult)
        } else if (-1 === rightB || -1 === leftB) {
            this.CalculateExpress(express)
        }
        return true
    }
}

let OOB_Calc1 = new OOB_Calc()
debugger
OOB_Calc1.parse('    9 / (5-3)  ')
// let str = '334466'
// '0' + str

