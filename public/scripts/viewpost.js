const addCommentClickHandler = async (event) => {

    const postId = event.target.getAttribute('data-id');
    const comment_content = $('#new-comment').val().trim();

    if (comment_content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ postId, comment_content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

$("#add-comment-button").click(addCommentClickHandler);
