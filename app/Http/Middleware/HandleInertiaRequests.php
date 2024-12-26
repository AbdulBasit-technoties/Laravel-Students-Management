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
        $user = $request?->user()?->load('roles.permissions');
        $permissions = [];
        if ($user) {
            foreach ($user->roles as $role) {
                foreach ($role->permissions as $singlePermission) {
                    $permissions[] = $singlePermission->title;
                }
            }
            // collect($permissions)->unique()->map(function ($permission) {
            //     return [$permission => true];
            // })->collapse();
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'can' => $user ? collect($permissions)->unique()->map(function ($permission) {
                return [$permission => true];
            })->collapse()->toArray() : [],
        ];
    }
}
