<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClassResource;
use App\Http\Resources\StudentResource;
use App\Models\Classes;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::paginate(10);
        return Inertia::render("Student/Index", [
            "students" => StudentResource::collection($students),
        ]);
    }
    public function create(){
        $classes = ClassResource::collection(Classes::all());
        return Inertia::render("Student/Create",[
            'classes' => $classes 
        ]);
    }
    public function show(Student $student)
    {
        return Inertia::render("Student/Show", [
            "student" => new StudentResource($student),
        ]);
    }
    public function store(Request $request)
    {
        $student = Student::create($request->all());
        return redirect(route(""))->with("success","");
    }
    public function update(Request $request, Student $student)
    {
        $student->update($request->all());
        return redirect(route("students.show", $student->id))->with("success","");
    }
    public function destroy(Student $student)
    {
        $student->delete();
        return redirect(route("students"))->with("success","");
    }
}
