<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'institution_id',
        'user_id',
        'value',
        'date'
    ];
}
