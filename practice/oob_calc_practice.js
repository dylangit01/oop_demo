// let str = '  3 + 4 * 3 / 3 - 5 - 6  ';
// let regx=/[+-/]/g
// console.log(str.match(regx))
// console.log(str.split(regx))
//
// let expp = /[/\*]/g
// console.log(str.match(expp))
// console.log(str.split(expp))
var OOB_Calc = /** @class */ (function () {
    function OOB_Calc() {
    }
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
        var exEnd = undefined;
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
        var subE1 = Number(express01.substring(0, exEnd));
        console.log(subE1);
        var subE2 = Number(express01.substring(exEnd + 1, express01.length));
        console.log(subE2);
        if (calcWay3 >= 0) {
            var aResult = subE1 * subE2;
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
            console.log(aResult);
            return aResult;
        }
        else if (calcWay2 >= 0) {
            var aResult = subE1 - subE2;
            console.log(aResult);
            return aResult;
        }
    };
    OOB_Calc.prototype.parse = function (express) {
        if (!express || !this.validateExpress('')) {
            return false;
        }
        express = express.trim();
        express = express.replace(/ /g, '');
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
            var exctMulSign = /[+-]/g;
            // let dResult = cResult.match(exctMulSign)
            var eResult = cResult.split(exctMulSign);
            // console.log(dResult)
            console.log(eResult);
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
// debugger
OOB_Calc1.parse('   1 + 3 - 4 * 3 / 3 * (7 - 6 )  ');
//# sourceMappingURL=OOB_Calc_Practice.js.map