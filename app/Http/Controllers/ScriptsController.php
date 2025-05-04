<?php

namespace App\Http\Controllers;

use App\Models\Scripts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScriptsController extends Controller
{
    public function getAll()
    {
        $scripts = Scripts::all();
        return response()->json($scripts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/scripts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'video' => 'nullable|url',
            'isNew' => 'boolean',
            'isFeatured' => 'boolean',
            'isOnSale' => 'boolean',
            'discount' => 'nullable|integer|min:0|max:100'
        ]);

        Scripts::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'category' => $request->input('category'),
            'rating' => 0,
            'image' => $request->input('image'),
            'video' => $request->input('video'),
            'isNew' => $request->input('isNew', false),
            'isFeatured' => $request->input('isFeatured', false),
            'isOnSale' => $request->input('isOnSale', false),
            'discount' => $request->input('discount', 0)
        ]);

        return redirect()->back()->with('success', 'Script created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Scripts $scripts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Scripts $scripts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Scripts $scripts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Scripts $scripts)
    {
        //
    }
}
