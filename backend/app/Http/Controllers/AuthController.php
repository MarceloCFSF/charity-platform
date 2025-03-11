<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->validated();
            $result = $this->authService->login($credentials);

            return response()->json([
                'message' => 'Login successful',
                'user' => $result['user'],
                'token' => $result['token'],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        }
    }

    public function register(RegisterRequest $request)
    {
        try {
            $this->authService->register($request->validated());
    
            $credentials = $request->only('email', 'password');
            $result = $this->authService->login($credentials);

            return response()->json([
                'message' => 'User Registered successful',
                'user' => $result['user'],
                'token' => $result['token'],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        }
    }

    public function me()
    {
        return response()->json(Auth::user());
    }

    public function logout()
    {
        try {
            $this->authService->logout(Auth::user());
    
            return response()->json([
                'message' => 'Logged out',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ]);
        }
    }
}
