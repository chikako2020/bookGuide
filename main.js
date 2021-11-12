'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
      // 何かタグがある限りループ
      element.removeChild(element.firstChild);
    }
  }
  const answers = [
    '{userName}さんにおすすめの本は『年収９０万円で東京ハッピーライフ』（大原扁理/著）です。週休5日、就職しなくても生きていける。それも東京で！世間の常識から外れた著者の生活ですが、気付かされることが、きっとたくさんありますよ。{userName}さんだけのハッピーライフを作り上げてくださいね',
    '{userName}さんにおすすめの本は『なぜ星付きシェフの僕がサイゼリヤでバイトするのか？偏差値３７のバカが見つけた必勝法』（村山太一/著）です。MBAよりリアルバイト！本場イタリアの三つ星レストランで副料理長だった著者が、サイゼリアの週１バイトで見つけた必勝法とは？夢を叶えるため、一流に学ぶ筆者の姿が素晴らしいです',
    '{userName}さんにおすすめの本は『馬鹿ブス貧乏で生きるしかないあなたに愛をこめて書いたので読んでください』（藤森かよこ/著）です。特別に優れた才能、容姿、家柄…そんなものが一つもない{userName}さんのために、著者が考えに考え抜いた人生サバイバル術。女性だけでなく、男性にもぜひ読んでもらいたい一冊です！',
    '{userName}さんにおすすめの本は『LIFE SHIFT(ライフ・シフト)」（リンダ グラットン ほか/著）です。誰もが100歳まで生きる時代がもう訪れようとしています。長寿社会を楽しむために、どのように生き方、働き方を変えていくべきか、その一つの答えが本書にあります。',
    '{userName}さんにおすすめの本は『「頭のゴミ」を捨てれば、脳は一瞬で目覚める! 』（苫米地英人/著）です。頭の中がごちゃごちゃして考えがまとまらない、という{userName}さんにおすすめの一冊。頭をスッキリさせて、クリアな思考で、毎日ハッピーに過ごしましょう。',
    '{userName}さんにおすすめの本は『不老長寿メソッド 死ぬまで若いは武器になる』（鈴木祐/著）です。人間誰しも歳をとります。世界最先端の科学が証明した、肌・髪・体・心の老化を抑えて、若さを保つメソッドとは？ここで紹介されている方法をぜひ実践して、いつまでも若々しい{userName}さんでいてください！',
    '{userName}さんにおすすめの本は『無理ゲー社会』（橘玲/著）です。現代社社会において人生とは、無理ゲー(攻略が無理なほど難しいゲーム)？遺伝ガチャで人生は決まるのか？いつもながら辛口の著者ですが、最後の４章では、ほのかな希望の光を感じさせてくれるかも？',
    '{userName}さんにおすすめの本は『本当の自由を手に入れる お金の大学』（両@リベ大学長/著）です。一生お金に困らない「5つの力」を身につけて、生活・仕事・老後のお金の不安を減らし、自由に生きよう！人気YouTuberの著者が教えてくれる、一生お金に困らない必勝法！'
  ]; 


/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string} userName ユーザーの名前
 * @return{string} 診断結果
 */
function assessment(userName){
  //userName(文字列)を数値（漢字だと５桁）に変換
  let number = 0;
  for (let i =0;i < userName.length; i ++){
      number += userName.charCodeAt(i);
  }
  //5桁の数値を回答結果の範囲に変換
  let index = number % answers.length;
  //おすすめの本
  return answers[index].replace(/\{userName\}/g, userName);
}

  /**
   * 指定した要素に診断結果用のタグを設定する。
   *@param{HTMLElement}element HTMLの要素
   *@param{string}result　おすすめの本のテキスト
  */
function appendAssessmentResult(element,result){
  //result-areaにh3タグで'おすすめの本'という文字を表示
  const h3 = document.createElement('h3');//h3タグを作る
  h3.innerText = 'おすすめの本';//h3タグに'おすすめの本'の文字列を設定
  element.appendChild(h3);//result-areaにh3変数を設定
  resultDivided.style.display = 'block'; //result-areaに枠線を表示

//result-areaにpタグでおすすめの本を表示
const p = document.createElement('p');
p.innerText = result;
element.appendChild(p);
}

/**
 * 指定した要素にツイートボタンを設定する。
 * @param{HTMLElement}element HTMLの要素
 * @param{string}message ツイート本文
 */
function appendTweetButton(element,message){
  //aタグを作って属性を設定する
  const a =document.createElement('a');
  const href =
  'https://twitter.com/intent/tweet?button_hashtag='
  + encodeURIComponent('あなたにおすすめの本')
  + '&ref_src=twsrc%5Etfw';
a.setAttribute('href', href);
a.className = 'twitter-hashtag-button';
a.setAttribute('data-text', message);
a.innerText = 'Tweet #あなたにおすすめの本';

// aタグをHTMLとして追加する
element.appendChild(a);

// scriptタグを作る
const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    
//scriptタグをHTMLとして追加する
element.appendChild(script);
}

  assessmentButton.onclick = () => {
    　let userName = userNameInput.value;
    if (!userName) {
      // 名前の入力がなかったので処理を中断
      return;
    }

    //診断結果の表示
    removeAllChildren(resultDivided);
    const result = assessment(userName);
    appendAssessmentResult(resultDivided,result);
  
    const img = document.createElement('img');  // imgタグを診断結果表示エリアに追加
    img.setAttribute('src', 'bookGuide.png');
    resultDivided.appendChild(img);

//Tweetボタンの表示
removeAllChildren(tweetDivided);
appendTweetButton(tweetDivided,result);
  }

  //入力欄でEnterキーを押した時に診断を実行
  userNameInput.onkeydown = event =>{
    if(event.key === 'Enter'){
      assessmentButton.onclick();
    }
    };
  
   


