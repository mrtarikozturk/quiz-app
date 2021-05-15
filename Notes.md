- Props type belirlemek icin farkli yontemler olsa da en kullanisli olani asagidaki gibi ayri bir yapi olarak belirlemek olacaktir. 

- Props type'i ayri bir yapi olarak yazarken iki alternatif var. Birincisi `type` keyword'u ile yazmak ki bu durumda yapiyi sadece ilgili component icinde kullanmak tavsiye edilir. Ikincisi ise `interface` yapisi kullanmaktir ki eger export edilecekse `interface` yapisinin kullanilmasi tavsiye edilir.

- Props type belirlerken olusturulan yapi `object` olmadigina dikkat edin, her tip belirtiminin sonunda `,` yerine ';' kullanilmistir.

- Ilgili verinin herhangi bir sey olacagi durumlarda `any` kullanilir.

- `|` operatoru ile birden alternatif veri tipleri belirlenebilir.

- Functional componet'larda `React.FC<Props>` ifadesi ile hem props type hem de fonksiyonun geri donus tipi `React.FC` olarak belirlenebilir.

- Event'lere verilecek olan callback function'larin parametre ve geri donus tipi `(e:React.MouseEvent<HTMLButtonElement>)=>void` seklinde belirlenebilir. Bu arada fonksiyon geri donus tipi `void` olarak, parametre olan e'nin tipi ise `React.MouseEvent<HTMLButtonElement>` olarak belirlenmistir.

```js
type Props = {
    question:string;
    answers:string[];
    callback:(e:React.MouseEvent<HTMLButtonElement>)=>void;
    userAnswer: AnswerObject | undefined;
    questionNr:number;
    totalQuestion:number;
}

const QuestionCard: React.FC<Props> = (props) =>{}

```

- State'ler degistikleri icin type guvenliginin saglanmasi gerekir. Bunun icin `<>` isaretleri arasina veri tipi yazilmalidir. Ayni sekilde geri donus tipi object dizisi ise `interface` ya da `type` yardimi ile de type belirlenebilir. 
```js
    const [loading, setLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
```

- Typescript'in getirdigi bir diger super ozellik ise `enum` keywordu ile sabit degerlerin belirlenebilmesidir. enum belirlerken object yapisindan farkli olarak `=` kullanilir. key'ler standart olarak buyuk harflerler yazilir.

```js
export enum Difficulty{
    EASY='easy',
    MEDIUM='medium',
    HARD='hard',
}

```