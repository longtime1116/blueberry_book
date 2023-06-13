namespace Chapter2 {
  if (false) {
    // プリミティブ
    // 少数も整数も同じ number 型のリテラル
    const width1 = 5;
    const width2 = 8;
    const height: number = 3;
    const area = ((width1 + width2) * height) / 2;
    console.log(area); // 19.5

    console.log(0b111111111); // 2進数
    console.log(0o777); // 8進数
    console.log(0xff); // 16進数

    // 指数標記
    console.log(1.2e4);
    console.log(1e-3);
    // 桁区切り
    console.log(1_000_000);
    // TypeScript における数値は、IEEE754倍精度浮動小数点数
    // 2^53を超えると正確に表現できなくなる
    console.log(0b11111111111111111111111111111111111111111111111111111); // 9007199254740991 ← 2^53-1
    console.log(0b11111111111111111111111111111111111111111111111111111 + 1); // 9007199254740992
    console.log(0b11111111111111111111111111111111111111111111111111111 + 2); // 9007199254740992 ← おかしくなる
    // 小数点計算を正確にやりたければ、それ用の library を。整数ならBigIntを。
    console.log(0.1 + 0.2); // 0.30000000000000004

    // Bigint型のリテラル。上限のない整数。
    const bignum: bigint = 123n + 654n + 2n;
    console.log(bignum);
    console.log(5n / 2n); // 少数切り捨て

    // 文字列リテラル
    console.log(
      "Hello\n\
World"
    );
    // テンプレートリテラル
    console.log(
      `Hello
World`
    );
    const helloStr: string = "hello";
    console.log(`${helloStr}, World`); // 式を埋め込める

    // 真偽値リテラル
    const no: boolean = false;
    const yes: boolean = true;
    console.log(yes, no);

    // nullとundefined
    const val1: null = null;
    const val2: undefined = undefined;
    console.log(val1, val2);

    // 書籍にはないけど、シンボル。Rubyのそれとは違うので注意。基本使わないっぽい。
    const tokenString: string = "tokenString";
    const tokenString2: string = "tokenString";
    const Sym = Symbol(tokenString);
    const Sym2 = Symbol(tokenString2); // Sym2とSymは別物。
    console.log(Sym.toString());
    console.log(Symbol.for(tokenString));
    console.log(Symbol.keyFor(Symbol.for(tokenString)));

    // 型変換
    console.log(Number(true)); // 1
    console.log(Number(false)); // 0
    console.log(Number(null)); // 0
    console.log(Number(undefined)); // NaN
    console.log(BigInt("1234")); // 1234n
    console.log(BigInt(500)); // 500n
    console.log(BigInt(true)); // 1n
    // console.log(BigInt("hoge")); // ランタイムエラー
    console.log(String(true)); // true
    console.log(Boolean(123)); // true
    console.log(Boolean(0)); // false
    console.log(Boolean(1n)); // true
    console.log(Boolean(0n)); // false
    console.log(Boolean("")); // false
    console.log(Boolean("foobar")); // true
    console.log(Boolean(null)); // false
    console.log(Boolean(undefined)); // false
  }
  let foo: number = 10;
  foo++;
  console.log(foo);

  // == と != は原則使わないが、以下の場合のみ使うことがある。以下の二つは同じ意味。
  console.log("a" == null);
  console.log("a" === null || "a" === undefined);

  // NaNはどんな比較をしてもfalseを返すので注意
  let x: number = Number("a");
  console.log(x > 0);
  console.log(x === 0);
  console.log(x < 0);
  //console.log(x === NaN); // falseになる！警告が出るのでコメントアウトしておく
  console.log(Number.isNaN(x)); // これを使うと判別できる

  // &&と||が返す値
  console.log(false && "b"); // false
  console.log("a" && "b"); // b
  console.log(false || "b"); // b
  console.log("a" || "b"); // a
  console.log(0 || "b"); // b(暗黙的にBoolean(0)を行うので)
  // ??演算子。nullとundefinedの時のみ
  console.log(null ?? "b"); // b
  console.log(undefined ?? "b"); // b
  console.log(0 ?? "b"); // 0が返る!!!

  // 三項演算子
  console.log(true ? "true" : "false");
  console.log(false ? "true" : "false");

  // 代入演算子の戻り値は、その代入した値
  let n = 0;
  console.log((n = 100));

  // bit 演算
  console.log(0b0101 | 0b1100); // 0b1101 => 13
  console.log(0b0101 & 0b1100); // 0b0100 => 4
  console.log(~0b0101); /* 11111111111111111111111111111010 ← 2の補数表現
                           00000000000000000000000000000101 + 1 = 6 => これにマイナスをつけて -6 */
  // void は演算子でもあり、常に undefined を返す。ただ、型としてのvoidとしても用いられる
  console.log(void n); // undefined
  const v: void = undefined;
  console.log(v);
}
