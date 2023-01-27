<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Posts/Index', [
            'posts' => Post::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Store a newly created post in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validating the post data before saving it to the database
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'body' => 'required|string|max:255',
        ]);

        // Creating a new post with the validated data
        $request->user()->posts()->create($validated);

        // Redirecting back to the posts page (update the posts view in the frontend)
        return redirect()->route('posts.index');
    }

    /**
     * Update the specified post in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {   
        // Authorizing the user to update the post using the PostPolicy class in app\Policies\PostPolicy.php (see the update method)
        $this->authorize('update', $post);

        // Validating the post data before saving it to the database just like in the store method
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'body' => 'required|string|max:255',
        ]);

        // Updating the post with the validated data
        $post->update($validated);

        // Redirecting back to the posts page (update the posts view in the frontend)
        return redirect()->route('posts.index');
    }

    /**
     * Remove the specified post from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        // Deleting the post
        $post->delete();

        // Redirecting back to the posts page (update the posts view in the frontend)
        return redirect()->route('posts.index');
    }
}
