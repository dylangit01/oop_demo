// let str = '  3 + 4 * 3 / 3 - 5 - 6  ';
// let regx=/[+-/]/g
// console.log(str.match(regx))
// console.log(str.split(regx))
//
// let expp = /[/\*]/g
// console.log(str.match(expp))
// console.log(str.split(expp))

class OOB_Calc {
    result: string

    validateExpress(express: string): boolean {
        if (express === null || undefined) {
            return false
        }
        return true
    }

    CalculateExpress(express01: string): number {

        express01 = express01.replace(/--/g,'+')

        let calcWay3: number = express01.indexOf('*')
        let calcWay4: number = express01.indexOf('/')
        let calcWay1: number = express01.indexOf('+')
        let calcWay2: number = express01.indexOf('-')

        let exEnd = undefined

        if (calcWay3 >= 0) {
            exEnd = express01.indexOf('*', 0)
        } else if (calcWay4 >= 0) {
            exEnd = express01.indexOf('/', 0)
        } else if (calcWay1 >= 0) {
            exEnd = express01.indexOf('+', 0)
        } else if (calcWay2 >= 0) {
            exEnd = express01.indexOf('-', 0)
        }

        let subE1: number = Number(express01.substring(0, exEnd))
        console.log(subE1)

        let subE2: number = Number(express01.substring(exEnd + 1, express01.length))
        console.log(subE2)

        if (calcWay3 >= 0) {
            let aResult: number = subE1 * subE2
            console.log(aResult)
            return aResult

        } else if (calcWay4 >= 0) {
            let aResult: number = subE1 / subE2
            console.log(aResult)
            return aResult

        } else if (calcWay1 >= 0) {
            let aResult: number = subE1 + subE2
            console.log(aResult)
            return aResult

        } else if (calcWay2 >= 0) {
            let aResult: number = subE1 - subE2
            console.log(aResult)
            return aResult
        }
    }

    parse(express: string): boolean {
        if (!express || !this.validateExpress('')) {
            return false
        }
        express = express.trim()
        express = express.replace(/ /g, '')
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

            let exctMulSign = /[+-]/g
            // let dResult = cResult.match(exctMulSign)
            let eResult = cResult.split(exctMulSign)
            // console.log(dResult)
            console.log(eResult)
            let Duandian = undefined
            let aa = eResult.indexOf('*')
            if (aa >= 0) {
                Duandian = eResult.indexOf('*',0)
            }console.log(Duandian)
            // this.CalculateExpress()




            this.CalculateExpress(cResult)




        } else if (-1 === rightB || -1 === leftB) {
            this.CalculateExpress(express)
        }
        return true
    }
}

let OOB_Calc1 = new OOB_Calc()
// debugger
OOB_Calc1.parse('   1 + 3 - 4 * 3 / 3 * (7 - 6 )  ')


