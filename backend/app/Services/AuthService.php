<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

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

    return null;
  }

  public function register($data)
  {
    $user = User::create($data);

    return $user;
  }

  public function logout()
  {
    Auth::logout();
  }
}
