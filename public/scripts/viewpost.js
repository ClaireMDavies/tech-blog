const addCommentClickHandler = async (event) => {

    const postId = event.target.getAttribute('data-id');
    const comment = $('#new-comment').val().trim();

    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ postId, comment }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

$("#add-comment-button").click(addCommentClickHandler);
