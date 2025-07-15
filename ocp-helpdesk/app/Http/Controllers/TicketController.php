<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    if (!$request->user()) {
        return response()->json(['error' => 'Non authentifié'], 401);
    }
    $request->validate([
        'titre' => 'required|string',
        'description' => 'required|string',
        'type' => 'required|string',
        'service' => 'required|string',
        'urgence' => 'required|string',
    ]);

    $ticket = $request->user()->tickets()->create([
        'titre' => $request->titre,
        'description' => $request->description,
        'type' => $request->type,
        'service' => $request->service,
        'urgence' => $request->urgence,
        'statut' => 'en_attente'
    ]);
    
    return response()->json($ticket, 201);
}


    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
}
