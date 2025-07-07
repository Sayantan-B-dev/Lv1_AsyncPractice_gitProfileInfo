// function chance70(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const randomValue = Math.random();
//             if (randomValue < 0.7) {
//                 resolve();
//             } else {
//                 reject();
//             }
//         }, 500);
//     })
// }
// chance70().then(() => {
//     console.log("got 70% chance" );
// }).catch(error => {
//     console.error("got 30% chance");
// })


function getUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { name: "Ted", age: 30 };
            resolve(user);
        }, 1000);
    });
}
function getUserPosts(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const posts = [
                { title: "Post 1", content: "Content 1" },
                { title: "Post 2", content: "Content 2" }
            ];
            resolve({ user, posts });
        }, 1000);
    });
}
function getPostComments(posts) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const comments = [
                { postTitle: posts[0].title, comment: "Comment 1" },
                { postTitle: posts[1].title, comment: "Comment 2" }
            ];
            resolve({ posts, comments });
        }, 1000);
    });
}

// getUserData().then(user => {
//     getUserPosts(user).then(userPosts => {
//         getPostComments(userPosts.posts).then(postComments => {
//             console.log("User Data:", user);
//             console.log("User Posts:", userPosts.posts);
//             console.log("Post Comments:", postComments.comments);
//         })
//             .catch(error => {
//                 console.error("Error fetching post comments:", error);
//             })
//     })
// }) //Avoid this nested structure

getUserData()
    .then(user => {
        console.log("User Data:", user);
        return getUserPosts(user);
    })
    .then(userPosts => {
        console.log("User Posts:", userPosts.posts);
        return getPostComments(userPosts.posts);
    })
    .then(postComments => {
        console.log("Post Comments:", postComments.comments);
    })
    .catch(error => {
        console.error("Error:", error);
    });
