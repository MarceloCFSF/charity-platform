<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Mockery;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $authServiceMock;

    public function setUp(): void
    {
        parent::setUp();

        $this->authServiceMock = Mockery::mock(AuthService::class);
        $this->app->instance(AuthService::class, $this->authServiceMock);
    }

    public function test_register_return_user_and_token()
    {
        $password = 'password';
        $user = User::factory()->make(['password' => $password]);
        $userData = [
            'name' => $user->name,
            'email' => $user->email,
            'password' => $password
        ];

        $token = 'fake-token';

        $this->authServiceMock->shouldReceive('register')
            ->once()
            ->with($userData)
            ->andReturn($user);
        
        $this->authServiceMock->shouldReceive('login')
            ->once()
            ->with([
                'email' => $userData['email'],
                'password' => $userData['password']
            ])
            ->andReturn([
                'user' => $user,
                'token' => $token,
            ]);

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'User Registered successful',
            'user' => $user->toArray(),
            'token' => $token,
        ]);
    }

    public function test_login_returns_user_and_token()
    {
        $password = 'password';
        $user = User::factory()->make(['password' => $password]);
        $loginData = [
            'email' => $user->email,
            'password' => $password
        ];

        $token = 'fake-token';
        
        $this->authServiceMock->shouldReceive('login')
            ->once()
            ->with($loginData)
            ->andReturn([
                'user' => $user,
                'token' => $token,
            ]);

        $response = $this->postJson('/api/login', $loginData);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Login successful',
            'user' => $user->toArray(),
            'token' => $token,
        ]);
    }

    public function test_logout_returns_success_message()
    {
        $this->authServiceMock->shouldReceive('logout')->once();

        $response = $this->postJson('/api/logout');

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Logged out',
        ]);
    }
}
