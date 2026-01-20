<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = ['Users', 'Project', 'Task', 'Time'];
        $actions = ['view', 'edit', 'create', 'delete', 'all'];

        foreach ($modules as $module) {
            foreach ($actions as $action) {
                $permission = Permission::firstOrCreate(['module' => $module, 'action' => $action]);
            }
        }
    }
}
