<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        $contactMessage = ContactMessage::create($request->all());

        return response()->json(['message' => 'Message envoyé avec succès.', 'data' => $contactMessage], 201);
    }
}
