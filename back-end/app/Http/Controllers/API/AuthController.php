<?php

namespace App\Http\Controllers\API;

use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{


    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($validatedData)) {
            throw ValidationException::withMessages([
                'credentials' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $request->user()->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }



    public function register(Request $request)
    {
        $input = $request->all();

        $validation = Validator::make($input,[
            'firstName'=> 'required',
            'lastName'=> 'required',
            'city'=> 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if($validation->fails()){
            return response()->json(['success' => false, 'error' => $validation->errors()]);
        }

        $user = User::create([
            'firstName'     => $input['firstName'],
            'lastName'     => $input['lastName'],
            'city'     => $input['city'],
            'phone'     => $input['phone'],
            'email'    => $input['email'],
            'password' => Hash::make($input['password']),
            'isAdmin'    => false,
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        if($user){
            return response()->json(['success' => true, 'message'=>'registred succefully', 'token' => $token, 'user' => $user,]);
        }

        return response()->json(['success' => false, 'message'=>'not registred']);

    }



    public function logout(Request $request)
    {
        $user = $request->user()->tokens()->delete();

        // Return a success response
        if($user){
            return response()->json([
                'message' => 'logout Success',
                'user' => $user
            ], 200);
        }

        return response()->json([
            'message' => 'unothorize',
        ], 200);
    }

    public function logged(Request $request)
    {
        $logged = auth()->user();
        if($logged){
            return response()->json([
                'message' => 'Successfully logged data',
                'user' => $logged
            ], 200);
        }

        return response()->json([
            'message' => 'unothorize',
        ], 201);

    }

}
