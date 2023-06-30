// ユニオン型は直和型じゃない、ということを実感するためのコーナー
namespace UnionTest {
  namespace UnionTest1 {
    // 一見直和型っぽく見える例
    const greetingList = ["hello", "hi", "good evening"] as const;
    type Greet = (typeof greetingList)[number];
    function greet(message: Greet): void {
      console.log(message);
    }
    greet(greetingList[0]);
  }

  namespace UnionTest2 {
    // TypeScriptは構造的部分型を採用しているので、以下でUserでもFighterでもないものを引数として渡せてしまう
    type User = {
      name: string;
      email: string;
    };
    type Fighter = {
      name: string;
      weightKg: number;
      heightCm: number;
    };
    type FightableUser = {
      name: string;
      email: string;
      weightKg: number;
      heightCm: number;
    };
    function greetTo(person: User | Fighter): void {
      console.log(`Hello, ${person.name}`);
    }
    const tom: FightableUser = {
      name: "tom",
      email: "tom@email.com",
      weightKg: 66,
      heightCm: 178,
    };
    greetTo(tom);
  }

  namespace UnionTest3 {
    // タグ付きユニオンを使えば解決！
    type User = {
      type: "User";
      name: string;
      email: string;
    };
    type Fighter = {
      type: "Fighter";
      name: string;
      weightKg: number;
      heightCm: number;
    };
    type FightableUser = {
      type: "FightableUser";
      name: string;
      email: string;
      weightKg: number;
      heightCm: number;
    };
    function greetTo(person: User | Fighter): void {
      console.log(`Hello, ${person.name}`);
    }
    const tom: FightableUser = {
      type: "FightableUser",
      name: "tom",
      email: "tom@email.com",
      weightKg: 66,
      heightCm: 178,
    };
    // ちゃんとコンパイルエラーになる！
    // greetTo(tom);
  }
}

namespace Chapter6_1_3 {
  // インターセクション型
  type Animal = {
    species: string;
    age: number;
  };
  type Human = Animal & {
    name: string;
  };
  const tama: Animal = {
    species: "cat",
    age: 2,
  };
  const taro: Human = {
    species: "human",
    age: 4,
    name: "taro",
  };
}

namespace Chapter6_1_4 {
  type Human = { name: string };
  type Animal = { species: string };
  function getName(human: Human) {
    return human.name;
  }
  function getSpecies(animal: Animal) {
    return animal.species;
  }
  const mysteryFunc = Math.random() < 0.5 ? getName : getSpecies;
  const human: Human & Animal = {
    name: "taro",
    species: "homo sapiens sapiens",
  };
  console.log(mysteryFunc(human));
}

namespace Chapter6_1_5 {
  type Human = {
    name: string;
    age?: number;
  };
  type Animal = {
    species: string;
    age: number | undefined;
  };
  const taro: Human = {
    name: "taro",
    age: 100,
  };
  // exactOptionalPropertyTypes を on にすると、このage: undefined をエラーにできる
  // const jiro: Human = {
  //   name: "jiro",
  //   age: undefined,
  // };
  const sabro: Human = {
    name: "sabro",
  };
  const tama: Animal = {
    species: "cat",
    age: 100,
  };
  const pochi: Animal = {
    species: "dog",
    age: undefined,
  };
  // これがエラーになる！age? は省略可能を表すが、number|undefinedだと、どちらでもいいので明示的に存在しなければならない
  // const pero: Animal = {
  //   species: "dog",
  // };

  // オプショナルテェイニングによるプロパティアクセス。human?.["age"]   getTimeFunc?.() のようなものも。
  const useMaybeHuman = (human: Human | undefined) => {
    const age = human?.age?.toString();
    console.log(age);
    // 書籍では、以下のような書き方でコンパイルエラーがでていない。?. 以降は全てすっ飛ばされて undefined が返ると言っている。しかし、ここではコンパイルエラーになる。
    // const age = human?.age.toString();
  };
  console.log(useMaybeHuman(undefined));
}

namespace Chapter6_2 {
  // テンプレートリテラル型
  function getHelloStr(): `Hello, ${string}!` {
    const rand = Math.random();
    if (rand < 0.3) {
      return "Hello, world!";
    } else if (rand < 0.6) {
      return "Hello, xxx!";
    } else {
      // ここでテンプレートにマッチしないとエラーになる
      // return "hello!";
      return "Hello, !";
    }
  }
  function makeKey<T extends string>(userName: T) {
    return `user:${userName}` as const;
  }
  const taroKey: "user:taro" = makeKey("taro");
  const jiroKey = makeKey("jiro");
  console.log(jiroKey);
  function fromKey<T extends string>(key: `user:${T}`): T {
    return key.slice(5) as T; // 使いたくないasを使ってなんとか実現
  }
  const userName = fromKey("user:jiro");
  console.log(userName);

  // widening
  const taro1 = "taro";
  const taro2: "taro" = "taro";
  // taro3 は string のプリミティブ型だが、taro4 は "taro"のリテラル型
  let taro3 = taro1;
  let taro4 = taro2;
}

namespace Chapter6_3 {
  type Animal = {
    type: "animal";
    species: string;
  };
  type Human = {
    type: "human";
    name: string;
  };
  type Robot = {
    type: "robot";
    name: string;
  };
  type User = Animal | Human | Robot;
  // default 節がなくても、返り値が string だと判定してくれる
  function getUserName(user: User): string {
    switch (user.type) {
      case "human":
        return user.name;
      case "animal":
        return "Mr.Nobody";
      case "robot":
        return `CPU: ${user.name}`;
    }
  }
  const tama: Animal = { type: "animal", species: "cat" };
  console.log(getUserName(tama));
}
