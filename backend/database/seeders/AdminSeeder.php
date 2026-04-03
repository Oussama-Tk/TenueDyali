<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['username' => 'OussamaAdmin18022007'],
            [
                'name' => 'Oussama Admin',
                'email' => 'admin@tenuedyali.com',
                'telephon' => '0623456789',
                'password' => Hash::make('o_Dexter@18022007'),
                'is_admin' => true
            ]
        );
    }
}
