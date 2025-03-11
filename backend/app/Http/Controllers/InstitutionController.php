<?php

namespace App\Http\Controllers;

use App\Models\Institution;

class InstitutionController extends Controller
{
    public function index()
    {
        $institutions = Institution::all();
        return response()->json($institutions);
    }

    public function show(Institution $institution)
    {
        return response()->json($institution);
    }
}
