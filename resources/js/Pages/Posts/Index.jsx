import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import Post from '@/Components/Post';

// Create a new post page component and export it (using auth prop from the layout to check if the user is authenticated)
const Index = ({auth, posts}) => {

    // Use the useForm hook to create a form instance
    const { data, setData, post, processing, reset, errors } = useForm ({
        title: '',
        body: ''
    })

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Use the post method to submit the form data to the server, if successful, reset the form
        post(route('posts.store'), {
            onSuccess: () => reset()
        })
    }

    return (
        // Use the AuthenticatedLayout component to wrap the form and pass the auth prop to it
        <AuthenticatedLayout auth={auth}>
            <Head title="Create Post" />

            {/* Form to create a new post */}
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        type="text"
                        placeholder='Enter title here...'
                        autoFocus
                        className='mb-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />

                    {/* Display the error message in title input if there is any */}
                    <InputError message={errors.title} className="mt-2" />

                    <label htmlFor="body">Body</label>
                    <textarea
                        value={data.body}
                        onChange={e => setData('body', e.target.value)}
                        type="text"
                        placeholder='Enter body here...'
                        className='mb-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                    
                    {/* Display the error message in body input if there is any */}
                    <InputError message={errors.body} className="mt-2" />
                    
                    <div className="flex justify-center">
                        <PrimaryButton
                            className="mt-4"
                            disabled = {processing}
                        >
                            Create Post
                        </PrimaryButton>
                    </div>
                </form>
                
                {/* Map of all posts */}
                <div className="mt-6 space-y-4">                
                    {
                        posts.map(post => (
                            <div className="bg-white shadow-md p-2 rounded-lg hover:bg-gray-50" key={post.id}>
                                <Post post={post} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;