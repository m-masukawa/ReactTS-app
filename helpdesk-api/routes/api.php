<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InquiryController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);
    
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    
    Route::apiResource('inquiries', InquiryController::class)
        ->only(['index', 'store', 'update', 'destroy']);
});