# Software-Process.github.io
Attempting to host using GitHub Pages

## How is the data stored?
On Chrome

- Right click the webpage
- Click "Inspect" (or use ctrl+ shift+I)
- In the inspector, click on the "Application" tab
- Expand "Local Storage" in the left menu of the Inspector
- Click on "https://software-process.github.io/"
- Notice the Key "postsRecord" and its Value

The data is stored locally in a JSON file. Every time a post is added,  it is added to an array and updates the JSON file:
```javascript
[
  {"title":"post 1"},
  {"title":"post 2"},
  {"title":"post 3"}
]
```
As a test. each post only contains a title as the Key and its value as the Value. However, as posts become more complex more key-value pairs can be added.

## (Temporary)
Michael making first pull request.

