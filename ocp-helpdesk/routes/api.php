<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\DB;
use App\Models\Ticket;

Route::middleware('auth:sanctum')->post('/tickets', [TicketController::class, 'store']);
// Register
Route::post('/register', [AuthController::class, 'register']);

// Login
Route::post('/login', [AuthController::class, 'login']);

// Protected route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Logout (must be authenticated)
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::get('/ticket-count', function () {
    return response()->json([
        'total' => \App\Models\Ticket::count(),
        'open' => \App\Models\Ticket::where('statut', 'open')->count(),
        'urgent' => \App\Models\Ticket::where('urgence', 'élevée')->count(),
        'pending' => \App\Models\Ticket::where('statut', 'en_attente')->count(),
        'closed' => \App\Models\Ticket::where('statut', 'regler')->count(),
        'normal' => \App\Models\Ticket::where('urgence', 'normal')->count(),
        'low' => \App\Models\Ticket::where('urgence', 'faible')->count(),
        
    ]);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [AuthController::class, 'index']);
    Route::post('/users', [AuthController::class, 'store']);
    Route::delete('/users/{id}', [AuthController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/my-tickets', function (Request $request) {
    return $request->user()->tickets()->latest()->get();
});

Route::get('/all-tickets', function () {
    return Ticket::latest()->get();
});
