<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {

        $admin = User::create([
            'name'     => '司令官ボグ',
            'email'    => 'ad@ad',
            'password' => '12345678',
        ]);
        $admin->is_admin = true;
        $admin->save();

        User::create([
            'name'     => 'キャプテンEO',
            'email'    => 'e@o',
            'password' => '12345678',
        ]);

        $this->call([
            InquirySeeder::class,
        ]);
    }
}
