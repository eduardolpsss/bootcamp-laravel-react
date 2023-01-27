<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // The user that owns the post (relationship many-to-one) 
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // The attributes that are mass assignable.
    protected $fillable = [
        'title',
        'body',
    ];


}
