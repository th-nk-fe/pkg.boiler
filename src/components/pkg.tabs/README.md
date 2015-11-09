#pkg.tabs
>Module for tabbed content

The tabs structure consists of an unordered list of tabs that have hashes corresponding to tab ids. Then when you click on each tab, only the container with the corresponding tab id will become visible.

##Example:
```html
<div class="tabs">
	<ul class="tabs__nav">
		<li><a href="#content1">Tab 1</a></li>
		<li><a href="#content2">Tab 2</a></li>
		<li><a href="#content3">Tab 3</a></li>
		<li><a href="#content4">Tab 4</a></li>
	</ul>
	<div class="tabs__content">
		<div id="content1">
			<p>Tab 1 content</p>
		</div>
		<div id="content2">
			<p>Tab 2 content</p>
		</div>
		<div id="content3">
			<p>Tab 3 content</p>
		</div>
		<div id="content4">
			<p>Tab 4 content</p>
		</div>
	</div>
</div>
```



##Preselecting a default tab
To preselect a tab as active on page load, add a class of active to the anchor tag:

```html
<div class="tabs">
	<ul class="tabs__nav">
		<li><a href="#content1">Tab 1</a></li>
		<li><a href="#content2">Tab 2</a></li>
		<li><a class="active" href="#content3">Tab 3</a></li>
		<li><a href="#content4">Tab 4</a></li>
	</ul>
	<div class="tabs__content">
		<div id="content1">
			<p>Tab 1 content</p>
		</div>
		<div id="content2">
			<p>Tab 2 content</p>
		</div>
		<div id="content3">
			<p>Tab 3 content</p>
		</div>
		<div id="content4">
			<p>Tab 4 content</p>
		</div>
	</div>
</div>
```



