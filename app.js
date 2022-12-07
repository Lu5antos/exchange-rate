const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;


// fetch post from API
async function getPost() {
    // make an api call to url
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    // store the json info in data variable and return it
    const data = await res.json();
    return data;
}

// Show posts in DOM
async function showPosts() {
    const posts = await getPost();

   posts.forEach(post => {
    // create a div and store it in the postEL var
    const postEl = document.createElement('div');
    // add a class to the div stored in postEl
    postEl.classList.add('post');
    // add the structure of the post
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
        `;

        // take the global postsContainer var and (which is a div)...
        // ...and add the new element (postEl) inside of it.
        postsContainer.appendChild(postEl);    
   });
}

// Show loader and fetch more posts
function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(()=>{
            page ++;
            showPosts();
        }, 200)
    }, 1000);
}

//filter posts by input
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        // search the title of the posts
        const title = post.querySelector(".post-title").innerText.toUpperCase();
        //search the body of the posts
        const body = post.querySelector(".post-body").innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

// show inital posts
showPosts();

window.addEventListener('scroll', () => {
    // descructuring allows you to pull variables out of an object
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 4.5) {
        showLoading();
    }
});


filter.addEventListener('input', filterPosts)