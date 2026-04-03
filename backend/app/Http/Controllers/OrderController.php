<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderCustomization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'total_amount' => 'required|numeric',
            'items' => 'required|array',
        ]);

        try {
            DB::beginTransaction();

            $order = Order::create([
                'user_id' => $request->user() ? $request->user()->id : null,
                'total_amount' => $request->total_amount,
                'status' => 'pending',
            ]);

            foreach ($request->items as $item) {
                if (isset($item['customization'])) {
                    $customization = $item['customization'];
                    OrderCustomization::create([
                        'order_id' => $order->id,
                        'product_id' => $item['product_id'],
                        'name_flocage' => $customization['name'] ?? null,
                        'number_flocage' => $customization['number'] ?? null,
                        'size' => $customization['size'] ?? 'L',
                        'font' => $customization['font'] ?? null,
                        'color' => $customization['color'] ?? null,
                        'pos_x' => $customization['pos_x'] ?? 0,
                        'pos_y' => $customization['pos_y'] ?? 0,
                    ]);
                }
            }

            DB::commit();

            return response()->json(['message' => 'Commande validée avec succès.', 'order' => $order], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erreur lors de la création de la commande.', 'error' => $e->getMessage()], 500);
        }
    }
}
