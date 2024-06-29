const addIconButton = document.getElementById('add-icon-button');
const removeicon = document.getElementById('removeicon');
const addblog = document.getElementById('addblog');
const background = document.getElementById('background');

addIconButton.addEventListener('click',()=>{
    addblog.style.display = 'block';
    background.style.display = 'block';
});

removeicon.addEventListener('click',()=>{
    addblog.style.display = 'none';
    background.style.display = 'none';
});

const blogData = document.getElementById('blog-data');

let blogLocalStorage = JSON.parse(localStorage.getItem('blog')) || [];


blogData.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formData = new FormData(blogData);

    const data = {
        title : formData.get('title'),
        image : null,
        description : formData.get('description'),
        content : formData.get('content')
    }
    
    const imageFile = formData.get('image');
    if(imageFile){
        const reader = new FileReader();
        reader.onload = function (){
            data.image = reader.result;
            blogLocalStorage.push(data);
            localStorage.setItem('blog',JSON.stringify(blogLocalStorage));
        };
        reader.readAsDataURL(imageFile);
    }
    else{
        blogLocalStorage.push(data);
        localStorage.setItem('blog',JSON.stringify(blogLocalStorage));
    }
    
    addblog.style.display = 'none';
    background.style.display = 'none';
    window.location.href = '/'
});


function displayBlogs() {
    const displayBlog = document.getElementById('all-blog');
    let html = '';

    if (blogLocalStorage.length === 0) {
        html = '<h1 id="noblogs">No blogs available</h1>';
    } else {
        blogLocalStorage.forEach((d, idx) => {
            html += `<div class="blog-card">
                <div class="image-body">
                    <img src="${d.image}" alt="image">
                </div>
                <div class="blog-card-details">
                    <p class="blog-card-details-heading">${d.title}</p>
                    <p class="blog-card-details-description">${d.description}</p>
                    <a href='./Blog.html?index=${idx}' class="blog-card-details-button"><button>Read More</button></a>
                </div>
            </div>`;
        });
    }

    displayBlog.innerHTML = html ;
}

displayBlogs();