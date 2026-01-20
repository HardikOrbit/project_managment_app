<?php

namespace Database\Seeders;

use App\Modules\Users\Model\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class Add_Super_Admin_Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $table = new User();
        $table->first_name = 'super';
        $table->last_name = 'admin';
        $table->email = 'super_admin@gmail.com';
        $table->password = Hash::make('12345678');
        $table->role_id = 1;
        $table->save();
    }
}