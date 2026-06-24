<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Inquiry;

class InquirySeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'titleJa' => '宇宙船の最高速度（ハイパースペース）が出ない',
                'titleEn' => 'Spaceship Cannot Reach Hyperspeed',
                'contentJa' => '最高指導者（スプレマシー）の星へ向かう途中ですが、フーターが回路にゴミを詰まらせたせいで推進力がガタ落ちしています。至急、メインコンピューターのリセット方法を教えてください。',
                'contentEn' => 'On our way to the Supreme Leader\'s planet, Hooter clogged the circuits, causing a massive drop in propulsion. Requesting immediate instructions to reset the main computer.',
                'requesterJa' => 'キャプテンEO',
                'requesterEn' => 'Captain EO',
                'status' => 'pending',
                'created_at' => '1986-09-12 09:00:00',
            ],
            [
                'titleJa' => '変形ロボット（メジャードモ）の関節がロックされた',
                'titleEn' => 'Major Domo\'s Joint Actuators are Locked',
                'contentJa' => '敵のパトロール艦から逃げる際、メジャードモがドラムキットに変形したまま戻らなくなりました。油を差してもマイケル特有のターンに追いつきません。サーボモーターの出力を遠隔で上げられませんか？',
                'contentEn' => 'While evading the enemy patrol ship, Major Domo transformed into a drum kit and got stuck. Even with lubrication, he can\'t keep up with Michael\'s spins. Can we remotely boost the servo motor output?',
                'requesterJa' => '司令官ボグ',
                'requesterEn' => 'Commander Bog',
                'status' => 'in_progress',
                'created_at' => '1986-09-15 14:30:00',
            ],
            [
                'titleJa' => '暗黒の女王（最高指導者）の宮殿へのハッキング成否',
                'titleEn' => 'Palace Security Hack Status Report',
                'contentJa' => '宮殿のセキュリティシステムへの侵入ラインを確保しました。EOのダンスと音響エネルギーを増幅させるための電力同調、バックアップ回路の接続が完了したことを報告します。We are here to change the world.',
                'contentEn' => 'Infiltration lines into the palace security system are secure. Power tuning for amplifying EO\'s dance and sonic energy, and backup circuit connections are complete. We are here to change the world!',
                'requesterJa' => 'ファズボール',
                'requesterEn' => 'Fuzzball',
                'status' => 'completed',
                'created_at' => '1986-09-18 18:00:00',
            ],
        ];

        foreach ($data as $item) {
            Inquiry::create($item);
        }
    }
}