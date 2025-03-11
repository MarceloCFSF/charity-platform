<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class AuthService
{
  public function login($credentials)
  {
    if (Auth::attempt($credentials)) {
      /** @var \App\Models\User $user **/
      $user = Auth::user();
      $token = $user->createToken('auth-token')->plainTextToken;

      return [
        'user' => $user,
        'token' => $token,
      ];
    }

    throw new \Exception('Invalid credentials', 401);
  }

  public function register($data)
  {
    $user = User::create($data);

    return $user;
  }

  public function logout(User $user)
  {
    PersonalAccessToken::where('tokenable_id', $user->id)->delete();
  }
}
