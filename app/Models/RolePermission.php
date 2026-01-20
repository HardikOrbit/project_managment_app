<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RolePermission extends Pivot
{
    protected $table = 'role_permissions';

    public function permission(): BelongsTo
    {
        return $this->belongsTo(Permission::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }
}
