const updatePostClickHandler = async (event) => {

    const postId = event.target.getAttribute('data-id');
    const title = $('#post-title').val().trim();
    const post_content = $('#post-content').val().trim();

    const response = await fetch('/api/posts/' + postId, {
        method: 'PUT',
        body: JSON.stringify({ title, post_content }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

const deletePostClickHandler = async (event) => {

    const postId = event.target.getAttribute('data-id');

    const response = await fetch('/api/posts/' + postId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

$("#update-post-button").click(updatePostClickHandler);
$("#delete-post-button").click(deletePostClickHandler);