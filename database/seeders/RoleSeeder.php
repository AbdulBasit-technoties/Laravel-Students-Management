<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = [
            [
                'id' => '1',
                'title' => Role::ROLES['Admin'],
            ],
            [
                'id' => '2',
                'title' => Role::ROLES['User'],
            ],
        ];
        Role::insert($role);
    }
}
