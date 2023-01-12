function processForm() {
  // Get the value of the input field
  var keyword = document.getElementById("keyword").value;

  // Send a request to the news API
  var request = new XMLHttpRequest();
  request.open("GET", "https://newsapi.org/v2/everything?q=" + keyword + "&apiKey=710f5ce47ea54fb7aa5711202660cc5d", true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      // Get five random articles from the list
      var articles = shuffle(data.articles).slice(0, 5);
      // Display the articles
      displayArticles(articles);
    } else {
      console.log("Error: " + data);
    }
  };
  request.send();
}

// Shuffle the elements of an array in place
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Display the articles in the extension's user interface
function displayArticles(articles) {
  var container = document.getElementById("articles");
  container.innerHTML = "";
  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    var div = document.createElement("div");
    div.innerHTML = "<h3>" + article.title + "</h3>" +
                    "<p>" + article.description + "</p>" +
                    "<a href='" + article.url + "' target='_blank'>Read more</a>";
    container.appendChild(div);
  }
}

// Attach the form's submit event to the processForm function
document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();
  processForm();
});