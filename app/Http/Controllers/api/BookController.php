<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BookController extends Controller
{
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

        $current_url = $request->fullUrl();
        if (Cache::has("books:list:{$current_url}")) {
            return response()->json(Cache::get("books:list:{$current_url}"));
        }
        $books = $books->orderBy('published_date','desc')->paginate(100);
        Cache::rememberForever("books:list:{$current_url}", function () use ($books) {
            return BookResource::collection($books)->response()->getData();
        });
        return BookResource::collection($books)->additional([
            'meta' => [
                'search' => $request->search,
                'filters' => $request->filters,
            ]
        ]);
    }

    public function bookDetails($id){
        $data = Book::where('id',$id)->first();
        return response()->json(['data'=>$data]);
    }


}
