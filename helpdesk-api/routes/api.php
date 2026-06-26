<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InquiryController;
use Illuminate\Support\Facades\Route;

// 🔓 誰でもアクセスできるルート（ユーザー登録・ログイン）
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);
    
    // ★ ここにプロフィール更新のルートを追記！
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    
    Route::apiResource('inquiries', InquiryController::class)
        ->only(['index', 'store', 'update', 'destroy']);
});