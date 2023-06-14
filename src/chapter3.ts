namespace Chapter3 {
  if (false) {
    const obj1 = {
      name: "Tanaka",
      age: 100,
    };
    console.log(obj1);
    console.log(obj1.name, obj1.age);
    const familyName = "Sato";
    const obj2 = {
      familyName,
      age: 98,
    };
    console.log(obj2);
    obj2.age++;
    console.log(obj2);
    const obj3 = {
      foo: 123,
      "foo bar": "aaa",
      100: 400,
    };
    console.log(obj3);
    console.log(obj3["100"]);
    console.log(obj3["foo bar"]);
    const propName = 100;
    const obj4 = {
      [propName]: "hoge",
    };
    console.log(obj4);
    // 試しにFizzBuzz書いてみる
    //const fizzBuzzObj = {
    //  "0": "FizzBuzz",
    //  "3": "Fizz",
    //  "6": "Fizz",
    //  "9": "Fizz",
    //  "12": "Fizz",
    //  "5": "Buzz",
    //  "10": "Buzz",
    //};
    //for (let i = 1; i < 32; i++) {
    //  const message = fizzBuzzObj[String(i % 15)] || String(i);
    //  console.log(message);
    //}
  }
  const obj5 = {
    foo: 100,
    bar: 200,
  };
  const obj6 = {
    foo: -99,
  };
  const obj7 = {
    ...obj5,
    ...obj6,
    baz: 100,
  };
  console.log(obj7);
  const obj8 = {
    name: "Foo",
  };
  const obj9 = obj8;
  const obj10 = { ...obj8 };
  obj8.name = "Bar";
  console.log(obj8.name, obj9.name, obj10.name);
  const obj11 = {
    obj: { num: 100 },
  };
  const obj12 = { ...obj11 };
  obj11.obj.num++;
  // deep copy されているわけではないので、同じ値になっている
  console.log(obj11, obj12);
  const obj13: {
    foo: number;
    bar: string;
  } = {
    foo: 100,
    bar: "hoge",
  };
  console.log(obj13);
  // type文
  type FooBarObj = {
    foo: number;
    bar: string;
  };
  const obj14: FooBarObj = {
    foo: 10,
    bar: "Hello, world!",
  };
  console.log(obj14);
  // type は既にある型に別名を付けているだけ。
  // 従って、↓でUserAge型をuserId型に代入できてしまう！！！
  type Age = number;
  type UserId = number;
  let age: Age = 10;
  let userId: UserId = 10000;
  age = userId;
  console.log(age);

  // objectの型の場合のみ、interface が使える。
  // 基本的に現在ではtypeを使っておけば問題ないようだ
  interface FooObj {
    foo: number;
  }
  const obj15: FooObj = {
    foo: 15,
  };
  // インデックスシグネチャ
  type PriceData = {
    [key: string]: number;
  };
  const priceData: PriceData = {
    apple: 220,
    coffee: 120,
  };
  priceData.bento = 250;
  console.log(priceData);
  // ← これは undefined になるが、number型であるべきなので矛盾する。すなわち、インデックスシグネチャは型安全性を破壊してしまうと言える。
  // Mapを使えば、number|undefined というユニオン型をvalueが取るので、型安全性が破壊されない。
  console.log(priceData.banana);

  type MyObj = {
    foo: boolean;
    bar: boolean;
    baz?: number;
  };
  const obj16: MyObj = { foo: false, bar: true };
  const obj17: MyObj = { foo: false, bar: true, baz: 4 }; // マウスオンすると、number|undefined
  console.log(obj16.baz);
  console.log(obj17.baz);
  // console.log(obj17.baz * 100); //これはエラーになる
  if (obj17.baz !== undefined) {
    console.log(obj17.baz * 100); // これならエラーにならない
  }
  type MyObj2 = {
    readonly foo: boolean;
  };
  const obj18: MyObj2 = {
    foo: true,
  };
  // obj18.foo = false; // エラーになる

  // Tはnumber型。
  const num: number = 0;
  type T = typeof num;
  const foo: T = 100;
  type T2 = typeof obj18;
  // typeof を使うのは、自作の型ではなく値が最上位の事実としてくる場合。
  // as const はここまでで出てきていないが、変数宣言の時につけるとdeepにreadonly化してくれる。typeにつけるreadonlyはshallow。
  const commandList = ["attack", "defend", "run"] as const;
  type Command = (typeof commandList)[number];
  const command: Command = "defend";
  console.log(command);
  // これをtypeの定義からすると、二回書くことになる
  type Command2 = "attack" | "defend" | "run";
  const commandList2: Command2[] = ["attack", "defend", "run"];
}
