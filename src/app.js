import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Add post listener
ui.postSubmit.addEventListener('click', submitPost);

// Listen for delete
ui.posts.addEventListener('click', deletePost);

function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}

function submitPost() {
  const post = {
    title: ui.titleInput.value,
    body: ui.bodyInput.value,
  };
  // Make post request
  http
    .post('http://localhost:3000/posts', post)
    .then((data) => {
      ui.showAlert('Added post', 'success');
      ui.clearInputs();
      getPosts();
    })
    .catch((err) => console.log(err));
}

function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    const name =
      e.target.parentElement.parentElement.firstElementChild.textContent;
    if (confirm('Are you sure?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert(`Removed '${name}'`, 'success');
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
  e.preventDefault();
}
