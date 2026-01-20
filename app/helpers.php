<?php
if (!function_exists('user_can')) {
    function user_can($module, $action)
    {
        $user = Auth()->user();

        // Always allow Super Admin
        if ($user->role->name === 'Super Admin') {
            return true;
        }

        // 1. Check user-specific permissions
        // If user has custom permissions enabled (use_global = false)
        if (!$user->use_global) {
            $userPermission = $user->permissions()
                ->where('module', $module)
                ->where('action', $action)
                ->first();

            return $userPermission ? (bool) $userPermission->pivot->allowed : false;
        }

        // 2. Fallback to role permissions
        // Fallback to role permissions if use_global is true
        return $user->role->permissions()
            ->where('module', $module)
            ->where('action', $action)
            ->wherePivot('allowed', true)
            ->exists();

    }
}