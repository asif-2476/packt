<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('admin')->group(function () {
    Route::post("/login", [\App\Http\Controllers\api\admin\BookController::class, "login"]);
    Route::get("/books", [\App\Http\Controllers\api\admin\BookController::class, "getBooks"]);
    Route::post("/book/add-update", [\App\Http\Controllers\api\admin\BookController::class, "addUpdate"]);
});

Route::get("/books", [\App\Http\Controllers\api\BookController::class, "getBooks"]);
Route::get("/book/{id}", [\App\Http\Controllers\api\BookController::class, "bookDetails"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
