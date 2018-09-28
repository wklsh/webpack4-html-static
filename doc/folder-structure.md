## Folder Structure

```
  app
    base
      //contains files that are needed throughout the app
      //e.g. base css styles, routes, configs, shared functions
    components
      //put all reusable React components here
      //e.g. header, comment box, breadcrumbs
    redux
      //redux actions and reducers go here
      //put both actions and reducers of the same store in the same file
    views
      //views are components for a single screen only
      //e.g. home, about us, contact us
  img
    ui
      //put common interface assets here
      //e.g. header background, logos
    icons
      //put reusable assets here
      //e.g. arrows, hearts, ticks, crosses
      //...and other folders to hold images according to its own respective pages
    views
      //page-specific image assets
  media
    //put videos here
  index.html
```
