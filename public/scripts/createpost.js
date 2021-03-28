const createPost = async () => {

    const title = $('#new-post-title').val().trim();
    const post_content = $('#new-post-content').val().trim();

    const response = await fetch('/api/posts', {
        
      method: 'POST',
      body: JSON.stringify({ title, post_content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
  
$('#create-post-submit').click(createPost);