<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class InquiryController extends Controller
{

    public function index(): JsonResponse
    {
        return response()->json(Inquiry::latest()->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'titleJa'     => 'required|string|max:100',
            'titleEn'     => 'required|string|max:100',
            'contentJa'   => 'required|string|max:1000',
            'contentEn'   => 'required|string|max:1000',
            'requesterJa' => 'required|string|max:100',
            'requesterEn' => 'required|string|max:100',
        ]);

        $inquiry = Inquiry::create($validated);
        return response()->json($inquiry->fresh(), 201);
    }

    public function show(Inquiry $inquiry): JsonResponse
    {
        return response()->json($inquiry);
    }

    public function update(Request $request, Inquiry $inquiry): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        $inquiry->update($validated);
        return response()->json($inquiry);
    }

    public function destroy(Inquiry $inquiry): JsonResponse
    {
        Gate::authorize('admin');
        $inquiry->delete();
        return response()->json(null, 204);
    }
}