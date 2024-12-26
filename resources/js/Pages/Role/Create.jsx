import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Select from 'react-select'

export default function Create({ auth,permissions }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        selectedPermissions: [],
    })
    const options = permissions.data.map((permission) => {
        return { 
            value: permission.id,
            label: permission.title
        }
    })
      
    const submit = (e) => {
        e.preventDefault();
        post(route('roles.store'));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Role Create
                </h2>
            }
        >
            <Head title="Role List" />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                        <form onSubmit={submit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Role Information
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Use this form to create a new
                                            role.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Title
                                            </label>
                                            <input
                                                id="title"
                                                autoComplete="title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                type="text"
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500  sm:text-sm ${errors.name ? "text-red-900 focus:ring-red-500  focus:border-red-500 border-red-300 " : ""}`}
                                            />
                                            <InputError message={errors.title} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="permissions"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Permissions
                                            </label>
                                            <Select onChange={(selectedPermissions) =>{
                                                setData('selectedPermissions', selectedPermissions)
                                            }} isMulti options={options} />
                                            <InputError message={errors.permission} />
                                        </div>

                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <Link
                                        href={route('roles.index')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save
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