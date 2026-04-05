<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ContactController;

// Public
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/proxy-image', function (\Illuminate\Http\Request $request) {
    $path = str_replace('/storage/', '', $request->query('url'));
    $fullPath = storage_path('app/public/' . $path);

    if (file_exists($fullPath)) {
        return response()->file($fullPath);
    }
    return abort(404);
});

// Protected
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/orders', [OrderController::class, 'store']);
});

// Admin Routes
use App\Http\Controllers\AdminController;

Route::middleware(['auth:sanctum', App\Http\Middleware\IsAdmin::class])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/{id}', [ProductController::class, 'update']); // Use POST with _method=PUT for multipart/form-data
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    Route::get('/admin/orders', [AdminController::class, 'orders']);
    Route::delete('/admin/orders/{id}', [AdminController::class, 'deleteOrder']);
    Route::get('/admin/messages', [AdminController::class, 'messages']);
});
