class BigNumber {
  constructor(numberOne, numberTwo) {
    this.firstNumber = numberOne;
    this.secondNumber = numberTwo;
  }

  sum(localNum1, localNum2) {
    let firstNumber;
    let secondNumber;

    if (localNum1 && localNum2) {
      firstNumber = localNum1.split("");
      secondNumber = localNum2.split("");
    } else {
      firstNumber = this.firstNumber.split("");
      secondNumber = this.secondNumber.split("");
    }

    let sum = "";
    let Msum = false;
    const Msign = "-";
    if (firstNumber[0] == Msign && secondNumber[0] == Msign) {
      firstNumber.shift();
      secondNumber.shift();

      Msum = true;
    }

    if (secondNumber.length > firstNumber.length) {
      [firstNumber, secondNumber] = [secondNumber, firstNumber];
    }

    let carry = 0;
    let a;
    let b;
    let temp;
    let digitSum;

    for (let i = 0; i < firstNumber.length; i++) {
      a = parseInt(firstNumber[firstNumber.length - 1 - i]);
      b = parseInt(secondNumber[secondNumber.length - 1 - i]);
      b = b ? b : 0;
      temp = (carry + a + b).toString();
      digitSum = temp.charAt(temp.length - 1);
      carry = parseInt(temp.substr(0, temp.length - 1));
      carry = carry ? carry : 0;

      sum = i === firstNumber.length - 1 ? temp + sum : digitSum + sum;
    }

    return Msum ? Msign + sum : sum;
  }

  minus(localNum1, localNum2) {
    let firstNumber;
    let secondNumber;

    if (localNum1 && localNum2) {
      firstNumber = localNum1.split("");
      secondNumber = localNum2.split("");
    } else {
      firstNumber = this.firstNumber.split("");
      secondNumber = this.secondNumber.split("");
    }

    let minus = "";
    let Mminus = false;
    const Msign = "-";
    const conditinTwo = firstNumber[0] == Msign && secondNumber[0] == Msign;
    if (conditinTwo) {
      firstNumber.shift();
      secondNumber.shift();
      [firstNumber, secondNumber] = [secondNumber, firstNumber];
    }
    const conditinOne = firstNumber[0] == Msign || secondNumber[0] == Msign;
    if (!conditinOne) {
      if (secondNumber.length > firstNumber.length) {
        [firstNumber, secondNumber] = [secondNumber, firstNumber];
        Mminus = true;
      }
      if (firstNumber.length === secondNumber.length) {
        for (let j = 0; j < firstNumber.length; j++) {
          if (firstNumber[j] > secondNumber[j]) {
            break;
          } else if (firstNumber[j] < secondNumber[j]) {
            [firstNumber, secondNumber] = [secondNumber, firstNumber];
            Mminus = true;
            break;
          }
        }
      }
    }

    let a;
    let b;
    let temp;
    for (let i = 0; i < firstNumber.length; i++) {
      a = parseInt(firstNumber[firstNumber.length - 1 - i]);
      b = parseInt(secondNumber[secondNumber.length - 1 - i]);
      b = b ? b : 0;

      if (a >= b) {
        temp = (a - b).toString();
      } else {
        firstNumber[firstNumber.length - 2 - i] = (
          parseInt(firstNumber[firstNumber.length - 2 - i]) - 1
        ).toString();
        a += 10;
        temp = (a - b).toString();
      }

      minus = temp + minus;
    }
    if (minus[0] === "0") {
      let k = 0;
      while (true) {
        if (k === minus.length) return "0";

        if (minus[k] !== "0") {
          return Mminus
            ? Msign + minus.slice(k, minus.length)
            : minus.slice(k, minus.length);
        }

        k++;
      }
    }

    return Mminus ? Msign + minus : minus;
  }

  multiplication(localNum1, localNum2) {
    let firstNumber;
    let secondNumber;

    if (localNum1 && localNum2) {
      firstNumber = localNum1.split("");
      secondNumber = localNum2.split("");
    } else {
      firstNumber = this.firstNumber.split("");
      secondNumber = this.secondNumber.split("");
    }

    if (firstNumber[0] == "0" || secondNumber[0] == "0") {
      return "0";
    }

    let multiSum = [];
    let multi = "";

    let Mmulti = false;
    const Msign = "-";
    const conditinOne = firstNumber[0] == Msign && secondNumber[0] == Msign;
    const conditinTwo = firstNumber[0] == Msign || secondNumber[0] == Msign;

    if (conditinOne) {
      firstNumber.shift();
      secondNumber.shift();
    } else if (!conditinOne && conditinTwo) {
      Mmulti = true;
      firstNumber[0] == "-" ? firstNumber.shift() : firstNumber;
      secondNumber[0] == "-" ? secondNumber.shift() : secondNumber;
    }

    if (secondNumber.length > firstNumber.length) {
      [firstNumber, secondNumber] = [secondNumber, firstNumber];
    }

    let carry = 0;
    let a;
    let b;
    let temp;
    let digitMulti;

    for (let i = 0; i < secondNumber.length; i++) {
      b = parseInt(secondNumber[secondNumber.length - 1 - i]);
      carry = 0;
      for (let j = 0; j < firstNumber.length; j++) {
        a = parseInt(firstNumber[firstNumber.length - 1 - j]);
        temp = (b * a + carry).toString();
        digitMulti = temp.charAt(temp.length - 1);
        carry = parseInt(temp.substr(0, temp.length - 1));
        carry = carry ? carry : 0;
        multi =
          j === firstNumber.length - 1 ? temp + multi : digitMulti + multi;
      }

      multiSum.push(multi + "0".repeat(i));
      multi = "";
    }
    // console.log(multiSum)

    if (multiSum.length === 1) {
      return Mmulti ? Msign + multiSum[0] : multiSum[0];
    }
    multi = this.sum(multiSum[0], multiSum[1]);

    for (let i = 2; i < multiSum.length; i++) {
      multi = this.sum(multi, multiSum[i]);
    }

    return Mmulti ? Msign + multi : multi;
  }

  division() {
    const Msign = "-";
    let Mdivi = false;
    const conditinOne =
      this.firstNumber[0] == Msign && this.secondNumber[0] == Msign;
    const conditinTwo =
      this.firstNumber[0] == Msign || this.secondNumber[0] == Msign;

    let Mbg1 = this.firstNumber.split("");
    let Mbg2 = this.secondNumber.split("");

    if (conditinOne) {
      Mbg1.shift();
      Mbg2.shift();
    } else if (!conditinOne && conditinTwo) {
      Mdivi = true;
      Mbg1[0] == "-" ? Mbg1.shift() : Mbg1;
      Mbg2[0] == "-" ? Mbg2.shift() : Mbg2;
    }

    let [firstNumber, secondNumber] = this.#changeNumbers(Mbg1, Mbg2);

    let multiToBig;
    let count = "1";

    while (true) {
      count = this.inc(count);
      multiToBig = this.multiplication(secondNumber, count);
      if (this.#compareNumbers(multiToBig, firstNumber))
        return Mdivi ? "-" + this.dec(count) : this.dec(count);
    }
  }

  factorial(Num) {
    let temp = Num;
    let fact = Num;
    while (temp !== "1") {
      temp = this.dec(temp);
      fact = this.multiplication(fact, temp);
    }

    return fact;
  }

  pow(Base, Exp) {
    let BasePow = Base;
    if (Base[0] == "-") {
      if (parseInt(Exp[Exp.length - 1]) % 2 == 0) {
        BasePow = BasePow.slice(1);
      }
    }

    let Power = this.multiplication(BasePow, BasePow);
    let Exp_temp = this.dec(Exp);

    while (Exp_temp !== "1") {
      Power = this.multiplication(Power, BasePow);
      Exp_temp = this.dec(Exp_temp);
    }

    return Power;
  }

  inc(num) {
    return this.sum(num, "1");
  }

  dec(num) {
    return this.minus(num, "1");
  }

  shiftR(num, n) {
    let numArr = num.split("");

    let count = n;

    while (count) {
      numArr.pop();
      count--;
    }

    return numArr.join("");
  }

  shiftL(num, n) {
    let numArr = num.split("");

    let count = n;

    while (count) {
      numArr.push("0");
      count--;
    }

    return numArr.join("");
  }

  #changeNumbers(firstNumber, secondNumber) {
    if (secondNumber.length > firstNumber.length) {
      [firstNumber, secondNumber] = [secondNumber, firstNumber];
    }

    if (firstNumber.length === secondNumber.length) {
      for (let j = 0; j < firstNumber.length; j++) {
        if (firstNumber[j] > secondNumber[j]) {
          break;
        } else if (firstNumber[j] < secondNumber[j]) {
          [firstNumber, secondNumber] = [secondNumber, firstNumber];
          break;
        }
      }
    }

    return [firstNumber.join(""), secondNumber.join("")];
  }

  #compareNumbers(firstNumber, secondNumber) {
    console.log(firstNumber, secondNumber);
    if (firstNumber.length > secondNumber.length) {
      return true;
    }

    if (firstNumber.length === secondNumber.length) {
      for (let j = 0; j < firstNumber.length; j++) {
        if (firstNumber[j] > secondNumber[j]) {
          return true;
        } else if (firstNumber[j] < secondNumber[j]) {
          return false;
        }
      }
    }
  }
}
const bigN = new BigNumber("-600", "-300");
// console.log(bigN.sum());
console.log(bigN.minus());
// console.log(bigN.multiplication());
// console.log(bigN.division());
// console.log(bigN.factorial("7"));
// console.log(bigN.pow("5", "3"));
// console.log(bigN.shiftR("672467246742571", 3));
// console.log(bigN.shiftL("672467246742571", 5));
// console.log(bigN.inc("8541584158105058158110521484884105015810501"))
// console.log(bigN.dec("8541584158105058158110521484884105015810500"))
