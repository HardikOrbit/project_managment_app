<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_permissions')->withPivot('allowed')->withTimestamps();
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_permission')
            ->withPivot('allowed')
            ->withTimestamps();
    }
}
