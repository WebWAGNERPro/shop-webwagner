<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scripts extends Model
{
    protected $casts = [
        'price' => 'float',
        'rating' => 'float',
        'isNew' => 'boolean',
        'isFeatured' => 'boolean',
        'isOnSale' => 'boolean',
        'discount' => 'integer',
        'sales_count' => 'integer',
        'requirements' => 'array',
    ];

    protected $fillable = [
        'title',
        'description',
        'price',
        'category',
        'rating',
        'image',
        'video',
        'isNew',
        'isFeatured',
        'isOnSale',
        'discount',
        'sales_count',
        'requirements',
        'documentation',
    ];
}
