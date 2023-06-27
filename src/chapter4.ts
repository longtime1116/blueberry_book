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
    type HasName = {
      name: string;
    };
    type HasNameAndAge = {
      name: string;
      age: number;
    };
    const fromAge = (age: number): HasNameAndAge => ({
      name: "Hoge",
      age,
    });
    // 実体の関数 fromAge の返り値の型 HasNameAndAge は f の返り値の部分型なので、代入可能。
    const f: (age: number) => HasName = fromAge;
    console.log(f(100));
    // どんな型を返す関数型も、void型を返す関数型の部分型として扱われる
    const g: (age: number) => void = fromAge;
    console.log(g(100)); // void 型を返すという型になっているが、実際はfromAgeが入っているので、HasNameAndAge型のオブジェクトが返っている。というかvoidなんだからこういう使い方をしないはず。
    //
    //

    // 実体の関数 showName の引数の型は HasName であり、nameは必要だがageは必要ない。
    // ある関数 h に showName を代入するということは、h(obj); という形で呼び出すということが可能であるということである。
    // そのためには obj は HasName あるいはその部分型であれば良い。
    // したがって、ここで h の引数の型を HasNameAndAge とすると、h に showName を代入できる。
    // すなわち、showName は h の部分型であると言える。
    const showName = (obj: HasName) => {
      console.log(obj.name);
    };
    const h: (obj: HasNameAndAge) => void = showName;
    // 共変の位置にある関数型の返り値の型は順方向の部分型関係が成立し、反変の位置にある関数型の引数の型は逆方向。
    // returnName の引数は name さえ持っていればいいので、name以外の何かを持っていてもいい。 HasNameAndAgeでもOK。
    // returnName の返り値は name と age を返すので、name と age 以外の何かを求められなければいい。HasNameならOK。
    const returnName = ({ name }: HasName): HasNameAndAge => ({
      name: name,
      age: name.length,
    });
    const f2: (obj: HasNameAndAge) => HasName = returnName;
    console.log(f2({ name: "a", age: 2 }));

    // 引数の数による部分型
    type SingleArgFunc = (arg: number) => number;
    type DoubleArgFunc = (arg1: number, arg2: number) => number;
    const square: SingleArgFunc = (num: number) => num * 2;
    const sum: DoubleArgFunc = (num1: number, num2: number) => num1 + num2;
    const someDoubleArgFunc: DoubleArgFunc = square;
    console.log(someDoubleArgFunc(10, 3)); // 3 はもちろん使われない
  }
}
