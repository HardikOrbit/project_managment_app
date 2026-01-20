<?php

namespace App\Modules\Users\Model;

use App\Models\Permission;
use App\Models\Role;
use App\Modules\Project\Model\Project;
use App\Modules\Project\Model\ProjectPermission;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function role()
    {
        return $this->belongsTo(Role::class);   
    }
    public function hasPermission(string $module, string $action): bool
    {
        // find permission record
        $permission = Permission::where('module', $module)->where('action', $action)->first();
        if (!$permission) {
            return false; // permission not defined
        }

        // 1) user-specific override?
        $userPerm = $this->permissions()->where('permission_id', $permission->id)->first();
        if ($userPerm) {
            return (bool) $userPerm->pivot->allowed;
        }

        // 2) fallback to role permission
        if ($this->role) {
            return $this->role->permissions()
                ->where('permission_id', $permission->id)
                ->wherePivot('allowed', true)
                ->exists();
        }

        return false;
    }
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'user_permissions')->withPivot('allowed')->withTimestamps();
    }
    public static function GetAllUsersWithout($roles)
    {
        $role = Role::whereIn('name', $roles)->pluck('id')->toArray();
        return User::whereNotIn('role_id', $role);
    }

}
