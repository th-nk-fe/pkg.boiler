#pkg.tooltip
>CSS and JS enhanced Tooltips

Tooltips consist of an element which acts as the trigger and the tooltip__text which will be displayed when the user hovers over the trigger:

##Example:
```html
<a class="btn tooltip tooltip--top"><span class="tooltip__text">tooltip text</span>tooltip trigger</a>
```

##Usage
Tooltips are initialised by adding a class of tooltip to an html element, and then defining the position of the tooltip with one of the following classes:

```css
.tooltip--top
.tooltip--bottom
.tooltip--left
.tooltip--right
```

##JS
To get JS enhanced tooltips which adds fading in and moves the tooltips to their own layer above all other content, add the following data-attribute to your html element:

```html
<a data-tooltip-type="enhanced"></a>
```


###Offsets
To offset the position of the tooltip, add the following data-attributes:

```html
<a data-tooltip-offset-x="20" data-tooltip-offset-y="-10"></a>
```



