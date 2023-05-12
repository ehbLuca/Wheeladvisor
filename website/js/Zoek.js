window.addEventListener('DOMContentLoaded', function() {
    var contentContainer = document.getElementById('contentContainer');
    var isLoading = false;
    var page = 1;
  
    function fetchData(page) {
      isLoading = true;
  
      // Simulating asynchronous data fetching
      setTimeout(function() {
        var data = getPosts(page); // Replace this with your own data-fetching mechanism
  
        if (data.length > 0) {
          data.forEach(function(post) {
            var postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.textContent = post.title;
  
            contentContainer.appendChild(postElement);
          });
        }
  
        isLoading = false;
        page++;
      }, ); // Simulated delay for demonstration purposes
    }
  
    function getPosts(page) {
      // Replace this with your own data-fetching mechanism (e.g., AJAX request, API call)
      // Return the data for the specified page (e.g., an array of posts)
      // For demonstration purposes, let's generate some dummy data
      var posts = [];
      for (var i = 1; i <= 10; i++) {
        var post = {
          id: i + ((page - 1) * 10),
          title: 'Post ' + (i + ((page - 1) * 10))
        };
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
  