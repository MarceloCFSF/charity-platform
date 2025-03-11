<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AuthServiceTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected AuthService $authService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->authService = app(AuthService::class);
    }

    public function test_can_register_a_new_user(): void
    {
        $userData = [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'password' => 'password'
        ];

        $this->authService->register($userData);

        $this->assertDatabaseHas('users', [
            'email' => $userData['email']
        ]);

        $user = User::where('email', $userData['email'])->first();
        $this->assertTrue(password_verify('password', $user->password));
    }

    public function test_can_login()
    {
        $password = 'password';
        $user = User::factory()->create([
            'password' => bcrypt($password)
        ]);

        $result = $this->authService->login([
            'email' => $user->email,
            'password' => $password
        ]);
        
        $this->assertNotNull($result['user']);
        $this->assertArrayHasKey('token', $result);

        $this->assertTrue(Auth::check());

        $this->assertEquals($user->id, Auth::id());
        $this->assertEquals($user->toArray(), $result['user']->toArray());
    }

    public function test_logout_logs_out_authenticated_user()
    {
        $user = User::factory()->create();
        Auth::login($user);

        $this->assertTrue(Auth::check());

        $this->authService->logout();

        $this->assertFalse(Auth::check());
    }
}
