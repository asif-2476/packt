<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // \App\Models\Book::factory()->count(10000)->create();
        $response = Http::get('https://fakerapi.it/api/v1/books?_quantity=1000');

        
        $data = $response->json();
        $data = $data['data'];
        

        
        foreach ($data as $item) {
            \App\Models\Book::create([
                "title" => $item['title'],
                "author" => $item['author'],
                "genre" => $item['genre'],
                "description" => $item['description'],
                "isbn" => $item['isbn'],
                "published_date" => $item['published'],
                "publisher" => $item['publisher']
            ]);
        }
    }
}

