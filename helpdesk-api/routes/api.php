<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\InquiryController;

Route::apiResource('inquiries', InquiryController::class)
    ->only(['index', 'store', 'update', 'destroy']);