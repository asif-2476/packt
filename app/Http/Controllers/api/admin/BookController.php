<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Carbon\Carbon;
use JWTAuth;


class BookController extends Controller
{
    public function login(Request $request){
        try{
            $credentials = request(['email', 'password']);

            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            // $payload = JWTAuth::decode($token);
            // $expires_at = date('d M Y h:i', $payload->get('exp')); 
            // dd($payload->get('exp'));
            //return $this->respondWithToken($token);
            return response()->json([
                'message'=>'User loggined successfully',
                'token' => $token,
                 'expiresIn'=>3600,
                 'userId'=>JWTAuth::user()->id
                
            ]);
        }
        catch (\Exception $e) {$e->getMessage();
            return response()->json(['error' =>$e->getMessage()], 500);
        }
    }

    public function getBooks(Request $request)
    {
        $request->validate([
            'search' => 'nullable|string',
            'filters' => 'nullable|string'
        ]);
        $books = Book::select('*');
        if ($request->filled('search')) {
            $books->where(function ($query) use ($request) {
                $query->where('title', 'like', "%{$request->search}%")
                    ->orWhere('isbn', 'like', "%{$request->search}%")
                    ->orWhere('genre', 'like', "%{$request->search}%")
                    ->orWhere('author', 'like', "%{$request->search}%")
                    ->orWhere('publisher', 'like', "%{$request->search}%");
            });
        }
        if ($request->filled('filters')) {
            $query = [];
            $filters = explode(',', $request->filters);
            foreach ($filters as $filter) {
                $filter = explode(':', $filter);
                if ((new Book())->isFillable($filter[0])) {
                    $query[] = [$filter[0], '=', $filter[1]];
                }
            }
            $books->where($query);
        }
        $books = $books->orderBy('id','desc')->paginate(100);
        
        return BookResource::collection($books)->additional([
            'meta' => [
                'search' => $request->search,
                'filters' => $request->filters,
            ]
        ]);
    }

    public function addUpdate(Request $request){
       
        $data = $request->all();
        $data['published_date'] = Carbon::parse($data['published_date'])->format('Y-m-d');
        //dd($data);    
        if($request->id != ''){
           unset($data['id']);
           Book::where('id',$request->id)->update($data);
           $msg = "Book Updated Successfully";
        }
        else{
           unset($data['id']);
           
           Book::create($data);
           $msg = "Book Added Successfully";
        }

        return response()->json(['message'=>$msg]);

    }
    
}
