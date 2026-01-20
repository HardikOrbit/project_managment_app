<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Schema::defaultStringLength('191');
        $this->loadMigrationsFrom([
            base_path('App/Modules/Users/database/migrations'),
        ]);
        $this->loadMigrationsFrom([
            base_path('App/Modules/Project/database/migrations'),
        ]);
    }
}
