namespace Chapter4_1 {
  if (false) {
    type Human = {
      height: number;
      weight: number;
    };
    const calcBMI1 = function (human: Human): number {
      return human.weight / human.height ** 2;
    };
    // 分割代入を使うと簡潔に
    const calcBMI2 = function ({ height, weight }: Human): number {
      return weight / height ** 2;
    };
    // アロー関数。functionを省略し、=>を追加。
    const calcBMI3 = ({ height, weight }: Human): number => {
      return weight / height ** 2;
    };
    // アロー関数の省略形。return不要。
    const calcBMI4 = ({ height, weight }: Human): number =>
      weight / height ** 2;
    // 省略形でオブジェクトを返す場合は、()で囲わないと省略形でないものとみなされreturnがないと怒られる
    const calcBMI5 = ({ height, weight }: Human): object => ({
      bmi: weight / height ** 2,
    });

    const me: Human = { height: 1.78, weight: 66 };
    console.log(calcBMI1(me));
    console.log(calcBMI2(me));
    console.log(calcBMI3(me));
    console.log(calcBMI4(me));
    console.log(calcBMI5(me));
    console.log(typeof calcBMI1); // function

    const obj1 = {
      // メソッド記法。コラム17を読む感じ、敢えてこの記法を使うメリットは乏しそう。
      // functionだけ省略している感じ？
      double1(num: number): number {
        return num * 2;
      },
      // 以下の二つは通常の書き方。
      // double2/double3 というプロパティに対して無名関数を割り当てている
      double2: (num: number): number => {
        return num * 2;
      },
      double3: (num: number): number => num * 2,
    };
    console.log(obj1.double1(100));
    console.log(obj1.double2(200));
    console.log(obj1.double3(400));
    const sum = (...args: number[]): number => {
      let result = 0;
      for (const n of args) {
        result += n;
      }
      return result;
    };
    console.log(sum(1, 2, 3));
    const ary1 = [1, 2, 3];
    console.log(sum(...ary1, 100, ...ary1));

    // spread構文を使う場合、配列の個数が型情報にないとエラーになるので、タプルを使うと解決できる
    const sum2 = (a: number, b: number, c: number) => a + b + c;
    //const nums: number[] = [1, 2, 3]; // ←これを使うとエラーになる
    const nums: [number, number, number] = [1, 2, 3];
    // as const で面倒な書き方をしなくても良くなる
    const nums2 = [1, 2, 3] as const;
    console.log(sum2(...nums));
    console.log(sum2(...nums2));

    // 上の記法だと boolean|undefined になってしまう！
    const tellMeYourName1 = (isPenName?: boolean): string => {
      if (isPenName) {
        return "真木";
      } else {
        return "見田";
      }
    };
    const tellMeYourName2 = (isPenName: boolean = false): string => {
      if (isPenName) {
        return "真木";
      } else {
        return "見田";
      }
    };
    console.log(tellMeYourName1());
    console.log(tellMeYourName1(undefined));
    console.log(tellMeYourName1(false));
    console.log(tellMeYourName1(true));
    console.log(tellMeYourName2());
    console.log(tellMeYourName2(undefined));
    console.log(tellMeYourName2(false));
    console.log(tellMeYourName2(true));

    type User = { name: string; age: number };
    const users: User[] = [
      { name: "a", age: 10 },
      { name: "b", age: 11 },
      { name: "c", age: 12 },
    ];
    const names = users.map((user) => user.name);
    console.log(names);
    // 他にも、filter, every, some, find など
    // コールバック関数を引数として受け取るような関数は高階関数と呼ばれる
  }
}
namespace Chapter4_2 {
  if (false) {
    // 関数型
    // ここで、repeatNumという引数名はカタチェックには影響しない。あくまでドキュメンテーション目的
    type F = (repeatNum: number) => string;
    const xRepeat: F = (num: number): string => "x".repeat(num);
    const yRepeat: F = (num: number) => "y".repeat(num);
    console.log(xRepeat(5));
    console.log(yRepeat(5));

    // コールシグネチャによる関数型の表現。わざわざ関数オブジェクトに独自のプロパティを持たせる必要がないことが多いので、あまり使われないらしい
    type MyFunc = {
      isUsed: boolean;
      (arg: number): void;
    };
    const double: MyFunc = (arg: number) => {
      console.log(arg * 2);
    };
    double(1000);
    double.isUsed = true;
    console.log(double.isUsed);
  }
}

namespace Chapter4_3 {
  if (false) {
  }
}
