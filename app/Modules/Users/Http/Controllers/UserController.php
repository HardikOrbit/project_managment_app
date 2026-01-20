<?php

namespace App\Modules\Users\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Modules\Project\Model\Project;
use App\Modules\Users\Model\User;
use Carbon\Carbon;
use Illuminate\Console\View\Components\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mail;
use Inertia\Inertia;

class UserController extends Controller
{
    // public function index()
    // {

    //     if (!user_can('Users', 'view')) {
    //         return abort(403, 'Access denied: no permission to view user.');
    //     }
    //     $user = Auth()->user()->role->name;
    //     if ($user === 'Super Admin' || $user === 'HR') {
    //         $data = User::GetAllUsersWithout(['Super Admin'])->get();
    //     }
    //     if ($user === 'Developer') {
    //         $data = User::GetAllUsersWithout(['Super Admin', 'HR'])->get();
    //     }
    //     if ($user === 'User') {
    //         $data = User::GetAllUsersWithout(['Super Admin', 'HR', 'Developer'])->get();
    //     }
    //     return Inertia::render('User/Index', [
    //         'data' => $data
    //     ]);
    // }

    public function index()
    {
        if (!user_can('Users', 'view')) {
            abort(403, 'Access denied: no permission to view user.');
        }

        $roleName = auth()->user()->role->name;
        $excludeRoles = [];

        if ($roleName === 'Super Admin' || $roleName === 'HR') {
            $excludeRoles = ['Super Admin'];
        } elseif ($roleName === 'Developer') {
            $excludeRoles = ['Super Admin', 'HR'];
        } elseif ($roleName === 'User') {
            $excludeRoles = ['Super Admin', 'HR', 'Developer'];
        }

        $data = User::GetAllUsersWithout($excludeRoles)
            ->with('role')
            ->get();

        return Inertia::render('User/Index', [
            'data' => $data,
            'can' => [
                'edit' => user_can('Users', 'edit'),
                'delete' => user_can('Users', 'delete'),
            ],
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        if (!user_can('Users', 'create')) {
            abort(403, 'Access denied: no permission to create user.');
        }

        return Inertia::render('User/AddEdit', [
            'roles' => \App\Models\Role::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'role' => 'required|exists:roles,id',
        ]);

        $user = User::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role_id' => $request->input('role'),
        ]);
        return redirect()->route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {

        if (!user_can('Users', 'edit')) {
            abort(403, 'Access denied: no permission to edit user.');
        }

        $permissions = Permission::all();
        $userPermissions = $user->permissions()->withPivot('allowed')->get()->keyBy('id');
        return Inertia::render('User/AddEdit', ['user' => $user, 'roles' => \App\Models\Role::all(), 'permissions' => $permissions, 'userPermissions' => $userPermissions]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {

        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|exists:roles,id',
        ]);

        $use_global = 1;
        if ($request->use_global != 1) {
            $use_global = 0;
            $data = [];
            foreach ($request->permissions ?? [] as $permissionId => $allowed) {
                $data[$permissionId] = ['allowed' => $allowed ? 1 : 0];
            }
            $user->permissions()->sync($data);
        }

        $table = User::find($user->id);
        $table->first_name = $request->input('first_name');
        $table->last_name = $request->input('last_name');
        $table->email = $request->input('email');
        if ($request->password) {
            $table->password = bcrypt($request->password);;
        }
        $table->role_id = $request->input('role');
        $table->use_global = $use_global;
        $table->save();
        return redirect()->route('users.index')->with('success', 'User successfully updated');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

        if (!user_can('Users', 'delete')) {
            abort(403, 'You do not have permission to delete user.');
        }

        $user->delete();
        return redirect()->route('users.index');
    }

    public function profile(User $user)
    {
        $user = auth()->user();
        return view('modules_views::Users.views.profile', compact('user'));
    }
    public function profile_update(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $table = User::find($user->id);
        $table->first_name = $request->first_name;
        $table->last_name = $request->last_name;
        $table->email = $request->email;
        if ($request->password) {
            $table->password = bcrypt($request->password);;
        }
        $table->save();

        return redirect()->route('users.index')->with('success', 'User successfully updated');
    }
    public function forgotPassword(Request $request)
    {

        //for send mail with code when click send email
        if ($request->has('sendMail') && $request->sendMail) {
            $toEmail = $request->email; // your test email
            $code = rand(100000, 999999);
            session(['code' => $code, 'expires_at' => now()->addMinutes(5)]);
            try {
                Mail::raw('For your new password enter this code:' . $code . '', function ($message) use ($toEmail) {
                    $message->to($toEmail)
                        ->subject('password reset code');
                });
            } catch (\Throwable $th) {
                return $th;
            }
            return 'Email sent successfully!';
        }

        //for email code verification
        if ($request->has('emailCode')) {
            $validate = $request->validate([
                'email' => 'required',
                'emailCode' => 'required',
            ]);

            if (session()->has('expires_at') && now()->greaterThan(session('expires_at'))) {
                session()->forget(['code', 'expires_at']); // clear session
                return response()->json(['codeVerification' => true, 'codeExpire' => true]);
            }
            if (session()->has('expires_at') && !now()->greaterThan(session('expires_at'))) {

                if ($request->emailCode != session('code')) {
                    return response()->json(['errors' => ['emailCode' => ['Invalid email code . . . !']]], 422);
                }
                if ((int) $request->emailCode == session('code')) {
                    return response()->json(['codeVerification' => true, 'codeMatch' => true]);
                }
            }
        }

        //for update password when click submit btn of newpassword
        if ($request->has('newPassword') && $request->has('conformPassword')) {

            $validate = $request->validate([
                'email' => 'required',
                'newPassword' => 'required|min:8',
                'conformPassword' => 'required|min:8|same:newPassword'
            ]);
            $table = User::where('email', $request->email)->first();
            $table->password = $request->newPassword;
            $table->save();
            return response()->json(['update' => true]);
        }

        //for validation old password right or not
        if ($request->has('oldPassword') && $request->oldPassword) {

            $validate = $request->validate([
                'email' => 'required',
                'oldPassword' => 'required|min:8',
            ]);
            if (Auth::attempt(['email' => $validate['email'], 'password' => $validate['oldPassword']])) {
                return response()->json(['oldPassword' => true, 'oldMatch' => true]);
            }
            return response()->json(['oldPassword' => true, 'oldPasswordError' => 'The provided password do not match our records.']);
        }

        return redirect()->route('users.index');
    }
}
