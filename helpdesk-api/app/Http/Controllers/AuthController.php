<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // 👤 新規ユーザー登録
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    // 🔑 ログイン
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['ログイン情報が正しくありません。'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    // 🚪 ログアウト
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    // 👑 現在のログインユーザー情報取得
    // 👑 現在のログインユーザー情報取得
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    // 🚀 ★ここにプロフィール更新メソッドを追加！
    public function updateProfile(Request $request)
    {
        // 1. バリデーション（名前は必須、画像は任意文字列）
        $request->validate([
            'name' => 'required|string|max:255',
            'avatarUrl' => 'nullable|string', // フロントから avatarUrl で届くBase64文字列
        ]);

        // 2. ログイン中のユーザーモデルを取得
        $user = $request->user();

        // 3. 届いたデータでデータベースを更新
        $user->name = $request->name;
        $user->avatar_url = $request->avatarUrl; // マイグレーションで作ったカラム名
        $user->save();

        // 4. フロントの `onUpdateSuccess` が要求するオブジェクト形式で返却
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatarUrl' => $user->avatar_url, // React側が読み取れるようにキャメルケースで同期
        ]);
    }
}