<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = ['titre', 'description', 'type', 'service', 'urgence','statut', 'user_id'];

}
