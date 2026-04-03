<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function orders()
    {
        $orders = Order::with(['user', 'customizations.product'])->orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }

    public function messages()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        return response()->json($messages);
    }
}
