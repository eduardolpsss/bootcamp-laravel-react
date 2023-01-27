import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Import the relativeTime plugin to dayjs
dayjs.extend(relativeTime);

import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';

// Component for displaying the posts that are fetched from the API
const Post = ({post}) => {
    // Get the auth prop from the page props
    const { auth } = usePage().props;
    
    // Create a state variable to track if the post is being edited
    const [editing, setEditing] = useState(false)

    // Use the useForm hook to create a form instance
    const {data, setData, patch, processing, reset, errors} = useForm({
      title: post.title,
      body: post.body
    })

    // Function to handle the editing and deleting of the post
    const handleSubmit = (e) => {
        e.preventDefault();

        // Patch of update the post using post.update route
        patch(route('posts.update', post.id), {
            onSuccess: () => setEditing(false)
        })
    }

    return (
        <div className="p-4 flex space-x-2">

            {/* Display a posted icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-200 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>

            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        {/* Display the name of the user who created the post and the date */}
                        <span className='text-gray-600'>{post.user.name}</span>
                        <small className='ml-2 text-sm text-gray-400'>{dayjs(post.created_at).fromNow()}</small>
                        
                        {/* Display edited if the post is being edited */}
                        {post.created_at !== post.updated_at && <small className='text-sm text-gray-400'> &#183; edited</small>}
                    </div>
                    { post.user.id === auth.user.id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button
                                    className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-200 focus:bg-gray-100 transition duration-150 ease-in-out'
                                    onClick={ ()=> setEditing(true)}
                                >
                                    Edit     
                                </button>
                                <Dropdown.Link
                                    as="button"
                                    href={route('posts.destroy', post.id)}
                                    method='delete'
                                >
                                    Delete
                                </Dropdown.Link>                                    
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>

                {/* Display the form to edit the post if the post is being edited */}
                {
                    editing ? (
                        <form onSubmit={handleSubmit} className='mt-2'>
                            <label htmlFor="title">Editing title</label>
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

                            <label htmlFor="body">Editing body</label>
                            <textarea
                                value={data.body}
                                onChange={e => setData('body', e.target.value)}
                                type="text"
                                placeholder='Enter body here...'
                                className='mb-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            />

                            {/* Display the error message in body input if there is any */}
                            <InputError message={errors.body} className="mt-2" />

                            <div className='flex justify-end'>
                                <button
                                    type='button'
                                    className='mr-2 text-sm text-gray-600'
                                    onClick={ () => setEditing(false) && reset()}
                                >
                                    Cancel
                                </button>
                                <PrimaryButton
                                    type='submit'
                                    className='mr-2'
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    ) : null
                }

                {/* Display the title and body of the post */}
                <p className="mt-4 text-lg text-gray-600">{post.title}</p>
                <p className="mt-4 text-gray-600">{post.body}</p>
            </div>
        </div>
    );
}

export default Post;