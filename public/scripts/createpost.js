const createPost = async () => {

    const title = $('#new-post-title').val().trim();
    const content = $('#new-post-content').val().trim();

    const response = await fetch('/api/posts', {
        
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
  
$('#new-post-button').click(createPost);