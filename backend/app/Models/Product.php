<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'price', 'image_url', 'custom_image_url', 'is_available'];

    public function orderCustomizations()
    {
        return $this->hasMany(OrderCustomization::class);
    }
}
