window.addEventListener('DOMContentLoaded', function() {
  var contentContainer = document.getElementById('contentContainer');
  var isLoading = false;
  var page = 1;
  var number = 1;
  
  function fetchData(page) {
    isLoading = true;
        
    setTimeout(function() {
      var data = getPosts(page); // Replace this with your own data-fetching mechanism
 
      if (data.length > 0) {
        data.forEach(function(post) {
          var anchorElement = document.createElement('a');
          var postElement = document.createElement('div');
          var imageElement = document.createElement('img');

          imageElement.src = "images/"+post.imageName;
          imageElement.classList.add('post-image');
          postElement.classList.add('post');
          postElement.textContent = post.title;

          postElement.appendChild(imageElement);
          contentContainer.appendChild(anchorElement);
          anchorElement.appendChild(postElement);
        });
      }
  
      isLoading = false;
      page++;
    }, ); 
  }
  
  function getPosts() {
    // Replace this with your own data-fetching mechanism
    var posts = [];
    for (var i = 1; i <= 10; i++) {
      var post = {
        id: i + number,
        title: "locatie " + number,
        imageName: "Nationaal-Park-Maasduinen.jpg"
        
      };
      number++;
      posts.push(post);
    }
    return posts;
  }
  
  function isScrollAtBottom() {
    var windowHeight = window.innerHeight;
    var documentHeight = document.documentElement.scrollHeight;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
    return (windowHeight + 50 + scrollTop >= documentHeight);
  }
  
  window.addEventListener('scroll', function() {
    if (!isLoading && isScrollAtBottom()) {
      fetchData(page);
    }
  });
  
  // Initial data fetching
  fetchData(page);
});
