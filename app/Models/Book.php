<?php

namespace App\Models;

use App\Search\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    // use Searchable;
    protected $fillable = [
        "title",
        "author",
        "genre",
        "description",
        "isbn",
        "published_date",
        "publisher",
    ];
}
