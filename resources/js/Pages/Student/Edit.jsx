import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Edit({ auth, classes,student }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: student.data.name,
        email: student.data.email,
        class_id: student.data.class.id,
        section_id: student.data.section.id,
    })
    const [sections, setSections] = useState([]);
    useEffect(() => {
        if (data.class_id) {
            axios.get(route('sections.index', {
                class_id: data.class_id
            })).then((response) => {
                setSections(response.data.data);
            })
        }
    }, [data.class_id])
    const submit = (e) => {
        e.preventDefault();
        patch(route('students.update',student.data.id));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Student Edit
                </h2>
            }
        >
            <Head title="Student List" />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                        <form onSubmit={submit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Student Information
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Use this form to edit a new
                                            student.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                autoComplete="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                type="text"
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500  sm:text-sm ${errors.name ? "text-red-900 focus:ring-red-500  focus:border-red-500 border-red-300 " : ""}`}
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                htmlFor="class_id"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                type="email"
                                                autoComplete="email"
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            />
                                            <div className={errors.email ? 'text-red-500' : ''}>
                                                {errors.email && <p>{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="className_id"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Class
                                            </label>
                                            <select
                                                id="class_id"
                                                value={data.class_id}
                                                onChange={(e) => setData('class_id', e.target.value)}
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            >
                                                <option value="">
                                                    Select a Class
                                                </option>
                                                {classes.data.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.id}>
                                                            {item.name}
                                                        </option>
                                                    )
                                                })
                                                }
                                            </select>
                                            <div className={errors.class_id ? 'text-red-500' : ''}>
                                                {errors.class_id && <p>{errors.class_id}</p>}
                                            </div>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Section
                                            </label>
                                            <select
                                                id='section_id'
                                                htmlFor="section_id"
                                                value={data.section_id}
                                                onChange={(e) => setData('section_id', e.target.value)}
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            >
                                                <option value="">
                                                    Select a Section
                                                </option>
                                                {sections.map((section) => {
                                                    return (
                                                        <option key={section.id} value={section.id}>
                                                            {section.name}
                                                        </option>
                                                    )
                                                })

                                                }
                                            </select>
                                            <div className={errors.section_id ? 'text-red-500' : ''}>
                                                {errors.section_id && <p>{errors.section_id}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <Link
                                        href={route('students.index')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
