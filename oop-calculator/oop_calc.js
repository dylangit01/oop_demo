var OOB_Calc = /** @class */ (function () {
    function OOB_Calc() {
    }
    //下面黄色这句话啥意思？
    OOB_Calc.prototype.validateExpress = function (express) {
        if (express === null || undefined) {
            return false;
        }
        return true;
    };
    OOB_Calc.prototype.CalculateExpress = function (express01) {
        express01 = express01.replace(/--/g, '+');
        var calcWay3 = express01.indexOf('*');
        var calcWay4 = express01.indexOf('/');
        var calcWay1 = express01.indexOf('+');
        var calcWay2 = express01.indexOf('-');
        var exEnd = undefined; //这句可以不要吗？
        if (calcWay3 >= 0) {
            exEnd = express01.indexOf('*', 0);
        }
        else if (calcWay4 >= 0) {
            exEnd = express01.indexOf('/', 0);
        }
        else if (calcWay1 >= 0) {
            exEnd = express01.indexOf('+', 0);
        }
        else if (calcWay2 >= 0) {
            exEnd = express01.indexOf('-', 0);
        }
        //string.substring 包含开始的第一位，到end的前一位：
        // let subE1: number = parseInt(express.substring(0, exEnd), 10) //->但是这种方式可以规避掉非数字，然后只取数字进行计算
        var subE1 = Number(express01.substring(0, exEnd));
        // .replace('*', '')
        // .replace('/', ''))
        console.log(subE1);
        // let subE2: number = parseInt(express.substring(exEnd + 1, express.length), 10)
        var subE2 = Number(express01.substring(exEnd + 1, express01.length));
        console.log(subE2);
        if (calcWay3 >= 0) {
            var aResult = subE1 * subE2;
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
            console.log(aResult);
            return aResult;
        }
        else if (calcWay4 >= 0) {
            var aResult = subE1 / subE2;
            console.log(aResult);
            return aResult;
        }
        else if (calcWay1 >= 0) {
            var aResult = subE1 + subE2;
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
            console.log(aResult);
            return aResult;
        }
        else if (calcWay2 >= 0) {
            var aResult = subE1 - subE2;
            // if (subE2 < 0 && subE1 < 0) {
            //     subE1 = -subE1
            //     subE2 = -subE2
            //     aResult = -(subE1 + subE2)
            // }
            console.log(aResult);
            return aResult;
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
    };
    OOB_Calc.prototype.parse = function (express) {
        if (!express || !this.validateExpress('')) { //这里null为什么return false不管用
            return false;
        }
        express = express.trim();
        express = express.replace(/ /g, ''); //replace()要用"//g"才可以替换所有想要替换的值
        console.log(express);
        // console.log((express).length)
        var leftB = express.indexOf('(');
        var rightB = undefined;
        if (leftB >= 0) {
            rightB = express.indexOf(')', leftB);
            var stringInBrace = express.substring(leftB + 1, rightB);
            console.log(stringInBrace);
            var bResult = this.CalculateExpress(stringInBrace); //bResult是括号里的值
            // console.log(bResult)
            var cResult = express.replace(express.substring(leftB, rightB + 1), String(bResult)); //这里是replace括号之后的express
            console.log(cResult);
            this.CalculateExpress(cResult);
        }
        else if (-1 === rightB || -1 === leftB) {
            this.CalculateExpress(express);
        }
        return true;
    };
    return OOB_Calc;
}());
var OOB_Calc1 = new OOB_Calc();
debugger;
OOB_Calc1.parse('    3-1 / (5-3)  ');
// let str = '334466'
// '0' + str
//# sourceMappingURL=OOB_Calc.js.map