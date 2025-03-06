<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Services\AuthService;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        $result = $this->authService->login($credentials);

        if ($result) {
            return response()->json([
                'message' => 'Login successful',
                'user' => $result['user'],
                'token' => $result['token'],
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }

    public function register(RegisterRequest $request)
    {
        User::create($request->validated());
        
        $credentials = $request->only('email', 'password');

        $result = $this->authService->login($credentials);

        if ($result) {
            return response()->json([
                'message' => 'User Registered successful',
                'user' => $result['user'],
                'token' => $result['token'],
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }

    public function logout()
    {
        $this->authService->logout();

        return response()->json([
            'message' => 'Logged out',
        ]);
    }
}
