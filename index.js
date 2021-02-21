$("#run-search").on("click", function (event) {
  event.preventDefault();
  clear();

  let searchTerm = $("#search-term").val().trim();
  let numArticles = $("#article-count").val();
  let startYear = $("#start-year").val();
  let endYear = $("#end-year").val();
  let APIKey = "GWvyGGIlEujsYgX1McLVgidDrgeZbR7f";

  let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${APIKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then((response) => {
    for (let i = 0; i < numArticles; i++) {
      let article = response.response.docs[i];

      // increase article count
      let articleCount = i + 1;

      // create the list group to contain the articles and add the article content for each
      let articleList = $("<ul>");
      articleList.addClass("list-group");

      $("#article-section").append(articleList);

      // if the article has a headline, log and append to listItem
      let listItem = $("<li class='list-group-item'>");
      let headline = article.headline.main;

      listItem.append(
        "<span class='label label-primary'>" +
          articleCount +
          "</span>" +
          "<strong> " +
          headline +
          "</strong>"
      );

      // If the article has a byline, log and append to listItem
      let byline = article.byline.original;

      if (byline && byline.original) {
        listItem.append("<p>" + byline + "</p>");
      }

      // Log section, and append to document if exists
      let section = article.section_name;

      listItem.append("<p>Section: " + section + "</p>");

      // Log published date, and append to document if exists
      let pubDate = article.pub_date;
      let dateArr = pubDate.split("T");
      // change date format to month/date/year
      let dateArrDate = moment(dateArr[0]).format("MMM do YYYY");
      listItem.append("<p>" + dateArrDate + "</p>");

      // Append and log url
      listItem.append(
        "<a href='" + article.web_url + "'>" + article.web_url + "</a>"
      );

      // append the article
      articleList.append(listItem);
    }
  });
});

function clear() {
  $("#article-section").empty();
}

$("#clear-all").on("click", clear);
