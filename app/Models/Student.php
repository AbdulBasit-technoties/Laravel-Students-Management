<?php


namespace App\Models;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;
    protected $fillable = ['name', 'email', 'class_id', 'section_id'];

    public function class()
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    public function section()
    {
        return $this->belongsTo(Section::class, 'section_id');
    }
    public function scopeSearch(Builder $query,Request $request)
    {
        return $query
        ->where(function($query) use ($request){
            return $query
            ->when
            (
                $request->class_id && $request->search,
                function($query) use ($request){
                    $query->where('class_id', $request->class_id)
                        ->where('name', 'like', '%'.$request->search.'%')
                        ->orWhere('email', 'like', '%'.$request->search.'%');
                }
            )->when($request->search,function($query) use ($request){
                $query->where('name', 'like', '%'.$request->search.'%')
                ->orWhere('email', 'like', '%'.$request->search.'%');
            })
            ->when($request->search,function($query)use ($request) {
                $query->where('class_id', $request->class_id);
            });
        });

    }
}
