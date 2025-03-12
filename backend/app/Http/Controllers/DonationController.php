<?php

namespace App\Http\Controllers;

use App\Http\Requests\Donation\DonationStoreRequest;
use App\Http\Requests\Donation\DonationUpdateRequest;
use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DonationController extends Controller
{
    public function index(Request $request)
    {
        /** @var \App\Models\User $user **/
        $user = $request->user();

        $donations = $user->donations()->get();
        return response()->json($donations);
    }

    public function store(DonationStoreRequest $request)
    {
        /** @var \App\Models\User $user **/
        $user = $request->user();
        $donation = $user->donations()->create($request->validated());
        return response()->json($donation);
    }

    public function show(Donation $donation)
    {
        Gate::authorize('view', $donation);
        return response()->json($donation);
    }

    public function update(DonationUpdateRequest $request, Donation $donation)
    {
        Gate::authorize('update', $donation);
        $donation->update($request->validated());
        return response()->json($donation);
    }

    public function destroy(Donation $donation)
    {
        Gate::authorize('delete', $donation);
        $donation->delete();
        return response(null, 204);
    }
}
