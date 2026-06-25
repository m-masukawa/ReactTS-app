<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

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
