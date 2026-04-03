<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderCustomization extends Model
{
    protected $fillable = ['order_id', 'product_id', 'name_flocage', 'number_flocage', 'size', 'font', 'color', 'pos_x', 'pos_y'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
