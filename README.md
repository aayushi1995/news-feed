
# News Feed APP
This is open source news app which fetches different news from different sources such as 
1. https://open-platform.theguardian.com/
2. https://developer.nytimes.com/apis
3. https://newsapi.org/docs

Filtering can be done on the Date article was published, categories, and sources
Users can also set their default news preferences.

## News Feed behaviour: 

Action: User clicks on any news feed card. 
Behaviour : User gets redirected to that specific URL.

Action: User searches “olympics ” in the search bar. (Preferences or Filters are already there)
Behaviour : User makes a search on the news feed with relevant preferences or filters that are set

Action : User clicks on the settings icon, clicks the preferences drawer and selects few categories and save the the preferences.

Behaviour : News feed gets refreshed and gives results after apply the preferences.

Action / Situation : User clicks on the filter icon, apply some filters and preferences were already saved.
Behaviour: News Feed takes filters and overrides the preferences and gives results.

Action: User has preferences saved and applies filters, reloads the page.
Behaviour: Preferences and Filters are persisted. (local storage implemented)

### Future Scope 
What I could have added if I had more time. 
1. Load more functionality
2. Cache API data for 1 minute if the same payload is passed to the same API
3. Swipe functionality on mobile instead of scroll.
4. Implement virtualisation for better performances

## Setting up and running it locally via Docker

### Docker Pull command
docker pull aayushi226/news-feed

### Code structure
1. I have added .css files for each components since my css isnt going to change, so I dont need a css-in-jss libraries like styled components thereby having seprate

### Libraries used
-

### Application Design 
- 

## Issues I faced during the assignment

I came across a number of issues and questions while developing this assignment.

1. Only 3 Data sources can be used

a. NewsAPI: NewsAPI is decent documentation and is working fine. . (Can be implemented)

b. Open news:  It doesn’t have any documentation on how should I use the open news API, I had to skim through the open source code on github, which became quite confusing given the timeline.  (Can’t be implemented)

c. News-cred: It says Newscred is now “Optimisely” and I went through the documentation, I couldn’t find any open source api urls or documentation for fetching news and articles. (Can’t be implemented)

d. The Guardian: The Guardian has a really good documentation. 

e. New York Times has a really good documentation. (Can be implemented)

f. BBC news: documentation is outdated and wasn’t able to find anything solid.  (Can’t be implemented)

2. Filter by AUTHOR: After consistent search in the documentation, I found out that filter by author is not possible in all the API’s: Guardian API’s, News API and Ny-times API. 
Even if the option might be available I didn’t get enough time to skim through the documentation and implement filtering by author