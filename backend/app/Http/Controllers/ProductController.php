<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'custom_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = $request->except(['image', 'custom_image', 'is_available']);
        
        $data['is_available'] = filter_var($request->is_available, FILTER_VALIDATE_BOOLEAN) ?? true;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image_url'] = '/storage/' . $path;
        }

        if ($request->hasFile('custom_image')) {
            $path2 = $request->file('custom_image')->store('products', 'public');
            $data['custom_image_url'] = '/storage/' . $path2;
        }

        $product = Product::create($data);

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'custom_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = $request->except(['image', 'custom_image', 'is_available']);

        if ($request->has('is_available')) {
            $data['is_available'] = filter_var($request->is_available, FILTER_VALIDATE_BOOLEAN);
        }

        if ($request->hasFile('image')) {
            if ($product->image_url) {
                $oldPath = str_replace('/storage/', '', $product->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('products', 'public');
            $data['image_url'] = '/storage/' . $path;
        }

        if ($request->hasFile('custom_image')) {
            if ($product->custom_image_url) {
                $oldPath = str_replace('/storage/', '', $product->custom_image_url);
                Storage::disk('public')->delete($oldPath);
            }
            $path2 = $request->file('custom_image')->store('products', 'public');
            $data['custom_image_url'] = '/storage/' . $path2;
        }

        $product->update($data);

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        if ($product->image_url) {
            $oldPath = str_replace('/storage/', '', $product->image_url);
            Storage::disk('public')->delete($oldPath);
        }
        if ($product->custom_image_url) {
            $oldPath = str_replace('/storage/', '', $product->custom_image_url);
            Storage::disk('public')->delete($oldPath);
        }
        $product->delete();
        return response()->json(['message' => 'Produit supprimé']);
    }
}
