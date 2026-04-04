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

    public function deleteOrder($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Commande introuvable'], 404);
        }
        
        // Supprimer toutes les configurations de maillot associées et leurs images preview
        foreach ($order->customizations as $customization) {
            if ($customization->preview_image) {
                $path = str_replace('/storage/', '', $customization->preview_image);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($path);
            }
        }
        
        $order->delete();
        return response()->json(['message' => 'Commande supprimée avec succès']);
    }
}
