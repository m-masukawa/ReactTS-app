<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    public static $snakeAttributes = false;

    protected $fillable = [
        'titleJa',
        'titleEn',
        'contentJa',
        'contentEn',
        'requesterJa',
        'requesterEn',
        'status',
    ];
}