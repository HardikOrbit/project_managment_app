<?php
use App\Modules\Auth\Http\Controllers\AuthController;
use App\Modules\Users\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {
    Route::resource('users', UserController::class);
    Route::get('profile', [UserController::class, 'profile'])->name('profile');
    Route::patch('/profile', [UserController::class, 'profile_update'])->name('profile_update');
    Route::post('/forgotPassword', [UserController::class, 'forgotPassword']);

});