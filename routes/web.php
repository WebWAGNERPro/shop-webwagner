<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ScriptsController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Routes du panier
    Route::get('cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::put('cart/update/{cartProductId}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('cart/remove/{cartProductId}', [CartController::class, 'remove'])->name('cart.remove');
});

Route::get('/api/scripts', [ScriptsController::class, 'getAll'])->name('scripts.all');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
