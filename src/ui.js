class UI {
  constructor() {
    this.posts = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.container = document.querySelector('.postsContainer');
    this.cardForm = document.querySelector('.card-form');
    this.formEnd = document.querySelector('.form-end');
    this.forState = 'add';
  }

  showPosts(posts) {
    let output = '';
    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });
    this.posts.innerHTML = output;
  }

  clearInputs() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  fillForm(currPost) {
    this.titleInput.value = currPost.title;
    this.bodyInput.value = currPost.body;
    this.idInput.value = currPost.id;
    this.changeState('edit');
  }

  changeState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.textContent = 'Cancel Edit';
      this.cardForm.insertBefore(button, this.formEnd);
    } else if (type === 'add') {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      this.clearIDInput();
      this.clearInputs();
    }
  }

  clearIDInput() {
    this.idInput.value = '';
  }

  showAlert(msg, className) {
    // Clear any remaining alerts
    this.clearAlert();
    // Create and insert div
    const div = document.createElement('div');
    div.className = 'alert';
    div.className = `${div.className} alert-${className}`;
    div.textContent = msg;
    this.container.insertBefore(div, this.posts);

    setTimeout(this.clearAlert, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }
}

export const ui = new UI();
