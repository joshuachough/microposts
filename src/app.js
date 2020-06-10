import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Add post listener
ui.postSubmit.addEventListener('click', submitPost);

// Listen for delete
ui.posts.addEventListener('click', deletePost);

// Listen for edit state
ui.posts.addEventListener('click', enableEdit);

// Listen for cancel edit
ui.cardForm.addEventListener('click', cancelEdit);

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
  if (post.title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'danger');
  } else {
    if (ui.idInput.value === '') {
      // Make post request
      http
        .post('http://localhost:3000/posts', post)
        .then((data) => {
          ui.showAlert('Added post', 'success');
          ui.clearInputs();
          getPosts();
        })
        .catch((err) => console.log(err));
    } else {
      // Make put request
      http
        .put(`http://localhost:3000/posts/${ui.idInput.value}`, post)
        .then((data) => {
          ui.showAlert('Updated post', 'success');
          ui.changeState('add');
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.parentElement.firstElementChild.textContent;
    if (confirm('Are you sure?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert(`Removed '${title}'`, 'success');
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
  e.preventDefault();
}

function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const currPost = {
      id,
      title,
      body,
    };
    ui.fillForm(currPost);
  }
}

function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeState('add');
  }
}
