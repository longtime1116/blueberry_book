import { createInterface } from "readline";
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
    //if (obj17.baz !== undefined) {
    //  console.log(obj17.baz * 100); // これならエラーにならない
    //}
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

    // 部分型
    type User = {
      name: string;
      age: number;
    };
    type Creator = {
      name: string;
      age: number;
      penName: string;
    };
    const creator = {
      name: "Murakami",
      age: 60,
      penName: "Haru",
    };
    // 構造的部分型。CreatorはUserの部分型なので、代入可能。たまたま一致しているだけでも部分型とみなす。
    // なお、世の中の他の言語では、名前的部分型というものが多い。明示的に宣言されたものだけが部分型としてみなされる。
    const user: User = creator;
    console.log(user);
    // 明示的に作ろうとするとコンパイルエラーになるが、型安全性の観点からのエラーではない！
    // なぜ後からcreatorをUser型の変数に入れてもエラーにならないかというと、creatorを別の用途でも使うが、たまたまUserの側面も持っているからOK、みたいな解釈をされるから・・・。
    //const user2: User = { name: "Murakami", age: 70, penName: "Ryu" };

    // 構造的部分型を成す条件は、プロパティが包含されていること。Tが持つプロパティは全てSに存在する。その各プロパティについて、Sにおけるそのプロパティの方は、Tのそれの部分型になっている。
    type UserPair = {
      member1: User;
      member2: User;
    };
    type CreatorPair = {
      member1: Creator;
      member2: Creator;
    };
    const member1: Creator = { name: "A", age: 10, penName: "AA" };
    const member2: Creator = { name: "B", age: 20, penName: "BB" };
    const creatorPair: CreatorPair = {
      member1,
      member2,
    };
    const userPair: UserPair = creatorPair;
    console.log(userPair);
  }
}
namespace Chapter3_4 {
  if (false) {
    // シンプルな例
    type User<T> = {
      name: string;
      child: T;
    };
    const bloodTypeList = ["A", "B", "O", "AB"] as const;
    type BloodType = (typeof bloodTypeList)[number];
    type Human = {
      name: string;
      bloodType: BloodType;
    };
    type Animal = {
      name: string;
      species: string;
    };
    type HasName = {
      name: string;
    };
    // "A extends B" は、「AはBの部分型でなければならない」という制約。
    // "Parent = Human" は、デフォルト引数
    type Family<
      Parent extends HasName = Human,
      Child extends HasName = Human
    > = {
      mother: Parent;
      father: Parent;
      child: Child;
    };
    const mother: Human = { name: "haha", bloodType: "A" };
    const father: Human = { name: "chichi", bloodType: "AB" };
    const child: Animal = { name: "Pochi", species: "dog" };
    const tanakaKe: Family<Human, Animal> = { mother, father, child };
    console.log(tanakaKe);
  }
}

namespace Chapter3_5 {
  if (false) {
    const arr1: number[] = [1, 2, 3];
    const arr2: (string | number)[] = [4, "5", 2 * 3];
    const arr3 = [...arr1, ...arr2];
    console.log(arr3);
    // ↓以下の二つの書き方は同じことを意味するが、複雑な型を表現する場合は前者の書き方をする、という書き分け流派が存在する。
    const arr4: Array<{ name: string }> = [
      { name: "Tanaka" },
      { name: "Sato" },
      { name: "Suzuki" },
    ];
    const arr5: { name: string }[] = [
      { name: "Tanaka" },
      { name: "Sato" },
      { name: "Suzuki" },
    ];
    console.log(arr4, arr5);
    // 読み取り専用配列
    const arr6: readonly number[] = [1, 2, 3];
    // arr[1] = 10; // エラー！
    // console.log(arr6[-1]); // undefined。末尾にアクセスする-1表記はできない
    // push, includes, indexOf, slice, concat
    // length は method ではなくプロパティ
    // for-of でイテレート
    for (const elm of arr6) {
      console.log(elm);
    }
    // tuple
    let tuple: [string, number] = ["foo", 0];
    tuple = ["bar", -1];
    tuple[1] = 100;
    console.log(tuple);
    // tuple の場合は、存在しない要素にインデックスアクセスをしようとするとコンパイルエラーが出る！arrayの場合は出ない。pushとかされうるから。
    // array の場合は、存在しない要素にアクセスしようとすると undefined が返るので、型安全性が壊れてしまう！！
    // なるべくインデックスアクセスは使わないようにする。tupleでいいときはtupleを使う
    // tuple[100] = 100;
    // const arr7 = [1, 2, 3];
    // console.log(arr7[101]);

    // ラベル付きタプル型というものもあるが、アクセス時にはhoge.nameのようにできるわけではなく単にラベルがつくだけ。
    // readonly をつけると読み取り専用になる。
    type User = readonly [name: string, age: number];
    const hoge: User = ["hoge", 10];
    // hoge[1]++; // エラー！
    console.log(hoge[0]);
  }
}
namespace Chapter3_6 {
  if (false) {
    // 分割代入
    const user = {
      name: "hoge",
      age: 100,
      phoneNumber: "08000000000",
      creator: {
        penName: "Foo",
      },
      favoriteNumber: [2, 3, 5, 7, 11, 13],
    };
    // 分割代入では型注釈を与えることができない。
    // ネストしていても取れる。
    const {
      name,
      age: nenrei,
      creator: { penName },
    } = user;
    console.log(name, nenrei, penName);
    // 配列でも可能
    const arr1: number[] = [1, 2, 3, 4, 5];
    const [a, b, c] = arr1;
    console.log(a, b, c);
    const {
      // ,をつけるとスキップできる
      favoriteNumber: [, secondPrime, , fourthPrime],
    } = user;
    console.log(secondPrime, fourthPrime);
    const arr2 = [{ name1: "foo" }, { name1: "bar" }, { name1: "baz" }];
    // 配列の一つ目をスキップして、二つ目のオブジェクトのname1を取得
    const [, { name1 }] = arr2;
    console.log(name1);
    // もちろんtupleも。
    const tuple: [string, number] = ["hoge", 10];
    const [, age2] = tuple;
    console.log(age2);

    // デフォルト値の指定は、undefinedの時に設定される
    type Obj = { foo?: number };
    const obj1: Obj = {};
    const obj2: Obj = { foo: 8 };
    const { foo = 500 } = obj1;
    const { foo: bar = 500 } = obj2;
    // bar は8。
    console.log(foo, bar);

    // nullの時は、デフォルト値は設定されない。上記のように、Objの型定義的にfooはnumber|undefinedなので、nullにはなり得ないようにするとわかりやすい
    // ??演算子はnullとundefinedの時だけだし、このundefinedの時のみ適用されるという仕様は珍しいので注意。
    const obj3 = { baz: null };
    const { baz = 400 } = obj3;
    console.log(baz); // nullのまま！

    type NestedObj = {
      obj?: {
        hoge: number;
      };
    };
    const nested1: NestedObj = {
      obj: {
        hoge: 123,
      },
    };
    const nested2: NestedObj = {};
    // obj は存在しない可能性があるので、もしも存在しないときに備えてデフォルト値を設定しておかないとコンパイルエラーになる
    const { obj: { hoge: hoge1 } = { hoge: 1000 } } = nested1;
    const { obj: { hoge: hoge2 } = { hoge: 1000 } } = nested2;
    console.log(hoge1, hoge2);

    // restパターン。配列でも利用可能
    const obj4 = { a: 1, b: 2, c: 3, d: 4 };
    const { a: first, b: second, ...restObj } = obj4;
    console.log(first, second, restObj);
  }
}

namespace Chapter3_7 {
  if (false) {
    // Date。Temporalが主流になっているかも？
    const d1 = new Date();
    console.log(d1);
    const timeNum1 = d1.getTime();
    console.log(timeNum1); // 数値
    console.log(new Date(timeNum1)); // 復元！
    console.log(Date.now()); // 数値
    const d2 = new Date("2020-02-29T15:00:00+09:00");
    console.log(d2); // 閏年の2/29
    d2.setFullYear(2021);
    console.log(d2); // ちゃんと3/1になっている！

    // 正規表現
    const r = /ab+c/;
    console.log(r.test("aaabcccc"));
    // replace, match, キャプチャリンググループ,名前付きキャプチャリンググループ...

    // Mapオブジェクト, Setオブジェクト
    const map: Map<string, number> = new Map();
    map.set("foo", 1234);
    console.log(map);
    console.log(map.get("foo")); // get の戻り値の型は number|undefined
    console.log(map.has("foo"));
    console.log(map.delete("foo"));
    console.log(map.has("foo"));
    console.log(map.get("foo"));
    map.clear();
    console.log(map);
    map.set("a", 13);
    map.set("c", 11);
    map.set("b", 12);
    map.set("d", 10);
    // keys や values もある
    for (const e of map.entries()) {
      console.log(e);
    }
    const set: Set<number> = new Set();
    set.add(10);
    set.add(11);
    set.add(12);
    console.log(set.has(12));

    // WeakMap, WeakSet もある。
    // キーとしてオブジェクトしか使えない。また、keys/values/entriesといった列挙系のメソッドが存在しない。
    // キーのオブジェクトに対する参照が弱参照である。
    // すなわち、キーとなったオブジェクトへの参照をそのWeakMap/WeakSet以外が持たなくなった時に
    // ガベージコレクションが実行されるが、もはやWeakMap/WeakSetに対してそのキーを使って参照する術を持たない(何せ参照を持たないのだから)ので、
    // ガベージコレクションを実行することが正当化される。

    // プリミティブなのにプロパティがあるように見えるケース
    type HasLength = { length: number };
    const lengthObj: HasLength = "foobar"; // string は length を持つので代入できる
    console.log(lengthObj);

    // {} という型。プロパティが1つもないオブジェクト型。nullとundefined以外のあらゆる値を受け入れる
    let val: {} = 123;
    val = "foobar";
    val = 123;
    // エラーになる！
    // val = 100 * val;
    // val = null;
    // val = undefined;
  }
}

namespace Chapter3_8 {
  // map とか使いたいところだけど、ここまでの知識で書く
  type User = {
    name: string;
    age: number;
    premiumUser: boolean;
  };
  const data: string = `
    Sato, 28, 1
    Tanaka, 22, 0
    Yamada, 44, 1`;

  const users: User[] = [];
  const lines = data.split("\n");
  for (const line of lines) {
    if (line === "") {
      continue;
    }
    const [name, ageString, premiumUserString] = line.split(",");
    const age = Number(ageString);
    const premiumUser = Boolean(Number(premiumUserString));
    users.push({
      name,
      age,
      premiumUser,
    });
  }

  for (const user of users) {
    if (user.premiumUser) {
      console.log(`${user.name}(${user.age})はプレミアムユーザーです`);
    } else {
      console.log(
        `${user.name}(${user.age})はプレミアムユーザーではありません`
      );
    }
  }
}
