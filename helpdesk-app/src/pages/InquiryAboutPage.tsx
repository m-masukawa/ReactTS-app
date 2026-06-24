//作品概要画面
import type { Language } from "../types/inquiry";

type InquiryAboutPageProps = {
  lang: Language;
};

export const InquiryAboutPage = ({ lang }: InquiryAboutPageProps) => {
  return (
    <div className="eo-card" style={{ maxWidth: "800px", margin: "20px auto", textAlign: "left" }}>
      
      {lang === "ja" ? (
        /* 🇯🇵 日本語コンテンツ */
        <div>
          <h2>『キャプテンEO』作品概要</h2>
          <p><strong>『キャプテンEO（Captain EO）』</strong>は、1986年に制作された約17分の3D短編SFミュージカル映画で、ディズニーパークのシアター型アトラクションとして上映されました。主演は Michael Jackson（マイケル・ジャクソン）です。</p>
          
          <div className="eo-log-box">
            <p><strong>【超豪華制作陣】</strong></p>
            <ul>
              <li>製作総指揮：George Lucas（ジョージ・ルーカス）</li>
              <li>監督：Francis Ford Coppola（フランシス・フォード・コッポラ）</li>
              <li>音楽：James Horner（ジェームズ・ホーナー）</li>
            </ul>
          </div>

          <h3>主要登場人物（CREW）</h3>
          <p><strong>・Michael Jackson／キャプテンEO:</strong> 宇宙船のリーダー。戦闘能力よりも「音楽」「愛」「希望」の力で敵を変えていく平和主義の主人公。歌とダンスで世界を救います。</p>
          <p><strong>・Anjelica Huston／最高指導者:</strong> 荒廃した惑星を支配する独裁者。冷酷な存在ですが、EOによって本来の美しさを取り戻します。</p>
          <p><strong>・フーター / ファズボール:</strong> 頼れる相棒たち。ドジだけど重要な場面で大活躍する象のフーターと、EOの肩に乗る飛行生物ファズボール。</p>
          <p><strong>・ギーク / メジャー・ドモ:</strong> 2頭のナビゲーター「アイディ＆オーディ」と、楽器に変形できる大型警備ロボット。</p>

          <h3>あらすじ</h3>
          <div className="eo-log-box" style={{ fontStyle: "italic" }}>
            宇宙船の船長キャプテンEOと少し頼りない仲間たちは、荒廃した惑星を支配する最高指導者に「贈り物」を届ける任務を受けます。到着直後に捕らえられ処罰を言い渡されますが、EOは「私が持ってきた贈り物は、あなたの中に眠る美しさを解き放つ鍵だ」と宣言。
            仲間たちと演奏を始め、『We Are Here to Change the World』を歌い、兵士や最高指導者自身をも美しい姿へと変身させます。光に満ちた平和な世界へと生まれ変わった惑星を、全員が『Another Part of Me』で祝福する中、EOたちは宇宙へ旅立っていきます。
          </div>

          <h3>豆知識</h3>
          <p>『キャプテンEO』は、よく「スター・ウォーズとマイケル・ジャクソンとディズニーが合体した作品」と表現されます。17分という短さながら、当時の最先端技術を結集した4D効果（レーザーや風、振動）や、とんでもない制作費（約2300万〜3000万ドル）が投入された、1980年代ポップカルチャーの偉大な象徴です。</p>
        </div>
      ) : (
        /* 英語コンテンツ */
        <div>
          <h2>ABOUT "CAPTAIN EO"</h2>
          <p><strong>"Captain EO"</strong> is a 1986 sci-fi short 3D musical film starring Michael Jackson, shown at Disney theme parks. Running at 17 minutes, it was an early pioneer of "4D" attractions featuring in-theater laser effects, smoke, and starfields.</p>
          
          <div className="eo-log-box">
            <p><strong>【THE LEGENDARY CREW】</strong></p>
            <ul>
              <li>Executive Producer: George Lucas</li>
              <li>Director: Francis Ford Coppola</li>
              <li>Music: James Horner</li>
            </ul>
          </div>

          <h3>CHARACTER LOGS</h3>
          <p><strong>・Michael Jackson as Captain EO:</strong> Leader of the spaceship. A pacifist hero who transforms enemies using the power of music, love, and hope.</p>
          <p><strong>・Anjelica Huston as The Supreme Leader:</strong> A cold, mechanical queen ruling a desolate planet, who reclaims her inner beauty through EO.</p>
          <p><strong>・Hooter & Fuzzball:</strong> EO's loyal crew mates. The clumsy elephant-like alien Hooter and the small, winged mythical creature Fuzzball.</p>
          <p><strong>・Geek & Major Domo:</strong> The two-headed navigator (Idy & Ody) and the security robot capable of transforming into musical instruments.</p>

          <h3>SUMMARY</h3>
          <div className="eo-log-box" style={{ fontStyle: "italic" }}>
            Captain EO and his ragtag crew are on a mission to deliver a "gift" to the Supreme Leader of a dark, cybernetic world. Upon arrival, they are captured, but EO tells the queen that his gift is the key to unlocking her hidden beauty.
            Through the power of song and dance, performing "We Are Here to Change the World," EO transforms the bleak palace and its bio-mechanical army into a vibrant, colorful paradise. After transforming the Supreme Leader back into a beautiful maiden, EO and his crew blast off into space as the planet celebrates to "Another Part of Me."
          </div>

          <h3>TRIVIA</h3>
          <p>Often described as the ultimate crossover between Star Wars, Michael Jackson, and Disney, it was one of the most expensive films per minute ever made at the time (estimated $23–30 million). It stands as a monumental icon of 1980s pop culture.</p>
        </div>
      )}

    </div>
  );
};