require("./style.scss");

new Vue({
    el: '#app',
    data: {
        posts: [],
        newPost: { 
            title: '',
            content: ''
        },
        editPost: {
            id: '',
            title: '',
            content: ''
        }
    },
    mounted() {
        this.fetchPosts();
    },
    methods: {
        fetchPosts() {
            fetch("http://localhost:8000/api.php")
                .then(response => response.json())
                .then(posts => {
                    this.posts = posts;
                })
                .catch(error => console.error("Error fetching posts:", error));
        },

        createPost() {
            const data = {
                title: this.newPost.title,
                content: this.newPost.content
            };

            fetch("http://localhost:8000/api.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.message) {
                        alert(result.message);
                        this.newPost.title = '';
                        this.newPost.content = '';
                        this.fetchPosts();
                    } else {
                        alert(result.error || "Error occurred");
                    }
                })
                .catch(error => console.error("Error creating post:", error));
        },

        deletePost(postId) {
            fetch("http://localhost:8000/api.php", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: postId })
            })
                .then(response => response.json())
                .then(result => {
                    if (result.message) {
                        alert(result.message);
                        this.fetchPosts(); 
                    } else {
                        alert(result.error || "Error occurred");
                    }
                })
                .catch(error => console.error("Error deleting post:", error));
        },

        editPostMethod(post) {
            this.editPost.id = post.id;
            this.editPost.title = post.title;
            this.editPost.content = post.content;
        },

        cancelEdit() {
            this.editPost = { id: '', title: '', content: '' };
        },

        updatePost(postId) {
            const data = {
                id: this.editPost.id,
                title: this.editPost.title,
                content: this.editPost.content
            };

            fetch("http://localhost:8000/api.php", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.message) {
                        alert(result.message);
                        this.fetchPosts(); 
                        this.cancelEdit(); 
                    } else {
                        alert(result.error || "Error occurred");
                    }
                })
                .catch(error => console.error("Error updating post:", error));
        }
    }
});
