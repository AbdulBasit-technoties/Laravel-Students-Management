<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    /** @use HasFactory<\Database\Factories\ClassesFactory> */
    use HasFactory;
    protected $fillable = ['name'];
    
    public function sections() {
        return $this->hasMany(Section::class, 'class_id');
    }

    public function students() {
        return $this->hasMany(Student::class,'class_id');
    }    
}