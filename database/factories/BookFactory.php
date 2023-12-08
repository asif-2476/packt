<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    protected $mode = Book::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "title" => $this->faker->title(),
            "author" => $this->faker->name(),
            "genre" => $this->faker->word(),
            "description" => $this->faker->text(),
            "isbn" => $this->faker->isbn13(),
            "published_date" => $this->faker->date(),
            "publisher" => $this->faker->company()
        ];
    }
}
