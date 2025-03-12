<?php

namespace App\Http\Controllers;

use App\Http\Requests\Donation\DonationStoreRequest;
use App\Http\Requests\Donation\DonationUpdateRequest;
use App\Models\Donation;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::all();
        return response()->json($donations);
    }

    public function store(DonationStoreRequest $request)
    {
        $donation = Donation::create($request->validated());
        return response()->json($donation);
    }

    public function show(Donation $donation)
    {
        return response()->json($donation);
    }

    public function update(DonationUpdateRequest $request, Donation $donation)
    {
        $donation->update($request->validated());
        return response()->json($donation);
    }

    public function destroy(Donation $donation)
    {
        $donation->delete();
        return response(null, 204);
    }
}
