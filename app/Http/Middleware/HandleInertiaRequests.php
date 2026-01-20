<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $shared = [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
        ];

        // Add user_can only if user is logged in
        if ($request->user()) {
            $shared['user_can'] = [
                'Projectview' => user_can('Project', 'view'),
            ];
            $shared['user_can'] = [
                'Userview' => user_can('User', 'view'),
            ];
        }

        return $shared;
    }
}
