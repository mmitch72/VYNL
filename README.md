Project Requirements

- The site should be a single page that displays properly styled at 1280px wide (fixed).
- The page should look like a real, stand-alone website. 
- Users should see all of the kind of content that they would expect from any professional website. 
- No placeholder text allowed, text and photos should be realistic and high-quality, and everything you'd expect to see should be present (header, navigation (even within the page), footer, etc.
- When viewing the site in the browser, no errors should be visible in the console.
- ALL of your files, including any JS, HTML or CSS should be well organized, properly indented, well-commented, and appropriate (in terms of content and layout).
- Your HTML and CSS should validate without errors or warnings.
- Add the async or defer attribute to your script tag in the header to prevent errors on page load with the JS.
- Your JS should "use strict"; globally

jQuery Widget/Plugin - Use at least one

Ajax/API loaded content - Include a section/area where you load some kind of content to the page, either from a third-party API or from a JSON file that you create. You could allow the users to "page" through results in this section by only loading a few products/items at a time, or you can display them all at once. This should include at least three pieces of content (three movies, three portfolio projects, etc.

Web Storage - Use web storage on your site to store/display some info for the user. This could be content you write to their web storage and then retrieve/display on page load or it could be content that you allow the user to enter into a form, then store in web storage and display to them.

Slideshow/Carousel - Include a slideshow/carousel of images (that can also include text if you'd like) using jQuery (plugin/widget) or another JavaScript library (research and find one you like). This should have at least three images in it. 
Design Process

Brainstorming
To begin, I brainstormed ideas for the type of website I wanted to build. An online store seemed like a great choice to meet all the project requirements and provide a useful service. As a lover of music, I knew I wanted to create an online vinyl record store application that would allow users to search for their favorite albums, display them on the page, and provide links to access the music via a third-party API. 

A fully developed version of the website would incorporate a database of physical albums sourced from users worldwide and enable purchasing, trading, and album collection management. However, for the scope of this project, I decided to create an initial version of this idea. I found the iTunes Search API most appropriate due to its comprehensive discography and well-documented API implementation.

I started by sketching out ideas and possible wireframes for how I wanted the site to look while keeping functionality in mind. My initial wireframe (pictured below) served as the foundation for building my website.

Next, I gathered assets, color schemes, fonts, and images that I felt would work well to create a clean, modern, and inviting design. Once satisfied with the assembled assets, I began laying the website's foundation: HTML.

HTML
Organizationally, the body of the page consists of six elements: a header, an about section (where I incorporated a jQuery slideshow of images), a search bar for gathering user queries for the API requests, a featured albums section, a contact form, and a footer. I structured my HTML to include these six elements, using IDs and classes on sections to allow CSS and JavaScript to target and manipulate them as needed.

After creating the broad skeleton of the website's content, I transitioned to CSS. I discovered that coding the HTML and CSS simultaneously—starting from the top and working section by section—was my most productive workflow. This approach allowed me to see how the page was shaping up in real time.

CSS
After resetting the CSS, I imported my chosen fonts: "Montserrat Alternatives" for significant items and "Ubuntu" for body text.

I used a combination of flexbox, grid containers, variables, and pseudo-classes to create the desired layout. Since the project required a fixed width of 1280px, I did not use media queries to make the page responsive for different viewport sizes.
As my HTML and CSS files grew in size, I regularly saved and validated them to prevent unforeseen bugs.

Once I completed the HTML and CSS, I added interactive functionality to the website using JavaScript. I started by creating global variables for all elements I needed to access, update, or style.

JavaScript + jQuery
This project required several plugins and widgets accessed via jQuery. To equip my project with jQuery, I linked a jQuery CDN in the head of my HTML file. Alongside this CDN, I included the jQuery UI CDN, and a jQuery image slideshow plugin called "Cycle 2." I also included the custom jQuery UI Theme CDN named "Darkness".

The header of the webpage includes a light/dark toggle button that collects the user's last preference via a "storedTheme" variable and stores it in local storage. This ensures the user's preferred mode automatically loads during subsequent sessions, providing a consistent and personalized viewing experience.

The about section contains images organized in a <div> for the jQuery slideshow plugin. The slideshow displays three images of vinyl record stores with a smooth fade transition, complementing the page's overall design.

The search bar is where I implemented the jQuery tooltip plugin and the iTunes web API functionality—the website's most comprehensive feature. After gathering and validating user input, I created an event handler for the API request to execute upon pressing "Enter" or clicking the "Go" button.

One of the biggest challenges I encountered during development was dealing with 
cross-origin resource sharing (CORS), which blocked access to retrieve album data from iTunes. Calling a third-party web API from a browser requires a cross-origin HTTP request, as the web API is not hosted on the same server as the website. Additionally, the iTunes web API does not natively support CORS. After extensive research and trial and error, I discovered I could use a free service, All Origins, to set up a CORS proxy. The browser sends a request to the proxy, which forwards it to the iTunes API.

While this method is not the most secure due to the vulnerability of using a middleman service, it was suitable for this project's scope. For a production site handling user data, I would explore more secure options.

Another challenge was parsing the data, as the proxy service wraps the response. To extract the data, I modified the fetch API to first extract the proxy's JSON from the response, which worked well.

Once I accessed the album data, I iterated through the results to filter out duplicates, ensuring only unique albums were displayed. This approach improved the user experience by avoiding repeated entries on the screen. Each album cover image was then wrapped in a clickable anchor tag that redirected visitors to the respective album's page on Apple Music.

The "Featured Albums" section displays three arbitrarily chosen albums within a jQuery tab widget. Setting up the widget was straightforward, requiring minimal code changes, but I enhanced it with a custom jQuery theme to improve its visual appeal.
The most challenging part of this feature was aligning the automated jQuery tab properties with my existing CSS. Initially, the featured album covers displayed in a CSS flexbox, but the jQuery defaulted to block-level elements. Although I could override the jQuery "display: block" declaration dynamically, I couldn't initialize the tab content as "display: flex" by default.

Conclusion
If I had more time, I would continue improving the website's aesthetics to make it sleeker and more professional. I would also further customize the jQuery UI themes, resize album images retrieved from the iTunes API, and display accompanying text.
This project taught me a great deal about third-party APIs, CORS, parsing JSON, using jQuery, and web storage. Overall, I'm happy with the result and plan to use these design elements for future business and career endeavors.
​​​​​​​
