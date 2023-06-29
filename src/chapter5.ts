namespace Chapter5_1 {
  if (false) {
    // クラス宣言とnew構文
    // デフォルト値を設定できる
    class User {
      // staticをつけると、静的の名の通り、クラスそのものに属するプロパティとメソッドを定義できる
      // User.adminName のように呼び出せる
      static adminName: string = "root";
      static getAdminUser() {
        return new User(User.adminName, 1000);
      }

      // ↓の冗長と言っているやつ、private age の代わりに #age、this.ageの代わりにthis.#age としてもプライベートプロパティにできる。こレはTSではなくES2015以降の
      // JSの機能なので、ランタイムでもプライベート性が守られる利点がある

      // これは冗長
      // // readonly をつけると、コンストラクタ以降で更新できない
      // readonly name: string = "";
      // private age: number = 0;
      // constructor(name: string, age: number) {
      //   this.name = name;
      //   this.age = age;
      // }

      // なのでこう書ける
      constructor(public readonly name: string = "", private age: number = 0) {}

      isAdult(): boolean {
        return this.age >= 20;
      }
      setAge(newAge: number): void {
        this.age = newAge;
      }
    }
    const taro = new User("taro");
    // private 修飾しがついているのでエラーになる
    // taro.age = 100;
    console.log(taro);
    console.log(taro.isAdult());
    taro.setAge(50);
    console.log(taro.isAdult());
    console.log(taro);

    const root = User.getAdminUser();
    console.log(root);
    root.setAge(10000);
    console.log(root);
  }
}

namespace Chapter5_1_11 {
  if (false) {
    class User<T> {
      name: string;
      #age: number;
      readonly data: T;
      constructor(name: string, age: number, data: T) {
        this.name = name;
        this.#age = age;
        this.data = data;
      }
      public isAdult(): boolean {
        return this.#age >= 20;
      }
    }
    const taro = new User<string>("taro", 18, "additional data");
    console.log(taro.data);
    const jiro = new User("taro", 18, { num: 123 });
    console.log(jiro);
  }
}

namespace Chapter5_2 {
  // class 宣言をすると、その変数名の型も作られる
  class User {
    name: string = "";
    age: number = 0;
    isAdult(): boolean {
      return this.age >= 20;
    }
  }
  const taro = new User();
  // あくまでUser型は、「string型のプロパティnameとnumberのageと()=>boolean型のisAdultメソッドを持つ」ことが特徴であり、
  // new user という式はそのような特徴を持ったオブジェクトを作る便利な手段にすぎない。
  const jiro: User = {
    name: "jiro",
    age: 10,
    isAdult: () => false,
  };
  // 以下のようにクラス式では（無名クラス?を代入しているだけでは）、型は当然作られない
  const Person = class {
    name: string = "";
    age: number = 0;
  };

  // instance of
  console.log(taro instanceof User);
  console.log(jiro instanceof User); //  jiro は User 型だが、Userクラスのインスタンスではない！
}

namespace Chapter5_3 {
  type HasName = {
    name: string;
  };
  // implements によるクラスの型チェック
  class User implements HasName {
    name: string;
    protected age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    public isAdult(): boolean {
      return this.age >= 20;
    }
  }
  class PremiumUser extends User {
    rank: number;
    constructor(name: string, age: number, rank: number = 1) {
      // super で親のコンストラクタを呼び出す
      super(name, age + 1);
      // このthisは、親クラスのコンストラクタを呼び出した後でないとコンパイルエラーになる
      this.rank = rank;
    }
    // override 修飾子はあってもなくてもいい。TSの仕様。
    // ただし、noImplicitOverride コンパイラオプションと組み合わせると必須になる。親のisAdultを変えた時にこちらにエラーを発生させられる
    public override isAdult(): boolean {
      // これは age が private でも使える
      // return true;
      // age が private だと #age にアクセスできないのでprotectedにした
      // ただし、子クラスで更新もできるようになってしまうので、親クラスでの前提が崩れてしまったりするので注意が必要
      return this.age >= 10;
    }
  }
  function greetMessage(u: User): string {
    return `Hello, ${u.name}-san`;
  }
  const taro = new PremiumUser("taro", 18);
  console.log(taro.rank);
  console.log(taro.name);
  // オーバーライドしているので true
  console.log(taro.isAdult());
  // 子クラスも渡せる
  console.log(greetMessage(taro));
}
