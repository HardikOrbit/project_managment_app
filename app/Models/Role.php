<?php

namespace App\Models;

use App\Modules\Users\Model\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Permission;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permissions')
            ->withPivot('allowed')
            ->withTimestamps();
    }
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function permissionsRelation()
    {
        return $this->belongsToMany(Permission::class, 'role_permissions')->withPivot('allowed');
    }

    //Get role by role name
    public static function getRoleByName($RoleName)
    {
        return Role::where('name', $RoleName)->get();
    }

    //Get role not in given name and asc order
    public static function getRoleByNotInOrderAsc($RoleName)
    {
        return Role::whereNotIn('name', $RoleName)
            ->orderBy('id', 'asc')
            ->get();
    }

    //Get role by id with permission
    public static function getRoleByIdWithPermission($roleId)
    {
        return Role::with('permissions')->findOrFail($roleId);
    }

    //Get role by id 
    public static function getRoleById($roleId)
    {
        return Role::findOrFail($roleId);
    }

}

