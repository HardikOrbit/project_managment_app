<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;

class RolesPermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //add role
        $roles = [
            'Super Admin',
            'HR',
            'Developer',
            'User',
        ];

        foreach ($roles as $key => $value) {
            $Role = new Role();
            $Role->name = $value;
            $Role->save();
        }

        //add roles permission into permission table
        $modules = ['Roles Permissions'];
        $actions = ['view', 'edit', 'all'];

        foreach ($modules as $module) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(['module' => $module, 'action' => $action]);
            }
        }

        // attach permissions to roles (role defaults)
        $table = Permission::all();
        foreach ($table as $key => $value) {
            Role::find(1)->permissions()->attach([$value->id => ['allowed' => true]]);
            if ($value->module == "Project" || $value->module == "Task") {
                Role::find(2)->permissions()->attach([$value->id => ['allowed' => true]]);
            } else {
                Role::find(2)->permissions()->attach([$value->id => ['allowed' => false]]);
            }
            if ($value->module == "Project" || $value->module == "Task") {
                if ($value->action == "view") {
                    Role::find(3)->permissions()->attach([$value->id => ['allowed' => true]]);
                } else {
                    Role::find(3)->permissions()->attach([$value->id => ['allowed' => false]]);
                }
            } else {
                Role::find(3)->permissions()->attach([$value->id => ['allowed' => false]]);
            }
        }

    }
}
