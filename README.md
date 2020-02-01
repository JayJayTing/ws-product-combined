
INSTALLATION:
- folders ws-product-node and ws-product-react are both root directories for backend and front end respectively
- simply npm install within the root directories

ws-product-node
- npm install
- npm run dev

ws-product-react
- npm install
- npm start


Backend Code for ws-products
- Additional queries were added.
- query limit is customizable and is determined by user ip address
- cors feature added

Frontend code for ws-products

- implemented with react-redux and redux thunk for async api queries

1) Daily Events Bar Chart Sorted by Custom Dates
  - 3 buttons to select from will change data on chart
  
2) Daily Stats Bar Chart Sorted by Custom Dates
  - 6 buttons to select from 
    - 3 buttons for customizable category of stats to layout
    - 3 buttons to shift query to next week
    
3) Hourly Stats Line Chart - Collection of averaged stats labeled by hour and custom dates
  *prep work: There are 2 Input elements that will have to be filled with the range of dates you would like to pull from the database (there are already values in there if you just want to test it out). Either click on Get Average Stats For Specified Date OR click on Get Sum of Stats For Specified Date to execute query from database.
   - 3 buttons on bottom of table will determine the stats of which you would like to inquire
   
4) Events Table - A Table with Fuzzy search that will filter out the information wanted by POI name.
  - there is a toggle button for the user to see data by stats, or data by events.
  - there is a search bar that you can type into and will execute the fuzzy search.
  
  
