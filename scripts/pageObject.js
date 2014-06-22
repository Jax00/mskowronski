$PAGE_BUILT = false;

function imageObject(title, description, thumbURL, bigURL) {
	this.title = title;
	this.description = description;
	this.thumbURL = thumbURL;
	this.bigURL = bigURL;
}

function menuItem(universalName, anchor, page) {
	this.universalName = universalName;
	this.anchor = anchor;
	this.page = page;
}

var pageObject = {
	header: null,
	menu: null,
	content: null,
	footer: null,

	readyToDisplay: false,
	isDisplayed: false,

	page: {
		language: null,
		header: null,
		menu: new Array(),
		page: {
			title: null,
			content: null,
		},
		images: new Array(),
		footer: null,
	},

	checkElement: function checkElement(element) {
		if (!(element instanceof jQuery)) {
			return $(element);
		}
		return element;
	},

	constructorBody: function constructorBody(bodyElement) {
		bodyElement = this.checkElement(bodyElement);
		var container = $(document.createElement('div')).attr('class', 'container');
		this.header = $(document.createElement('div')).attr('class', 'header');
		this.menu = $(document.createElement('div')).attr('class', 'menu');
		this.content = $(document.createElement('div')).attr('class', 'content');
		this.footer = $(document.createElement('div')).attr('class', 'footer');
		container.append(this.header).append(this.menu).append(this.content).append(this.footer);
		bodyElement.append(container);
	},

	constructorElements: function constructorElements(headerElement, menuElement, contentElement, footerElement) {
		this.header = this.checkElement(headerElement);
		this.menu = this.checkElement(menuElement);
		this.content = this.checkElement(contentElement);
		this.footer = this.checkElement(footerElement);
	},

	loadPage: function loadPage(url) {
		this.readyToDisplay = false;
		this.isDisplayed = false;
		this.clear();
		var pageProperty = this.page;
		var objectProperty = this;
		$.getJSON(url, function(data) {
			pageProperty.language = data['language'];
			pageProperty.page.title = data.page.title;
			pageProperty.page.content = data.page.content;
			pageProperty.header = data.header;
			pageProperty.footer = data.footer;
			data.menu.forEach(function(entry) {
				var item = new menuItem(entry.universalName, entry.anchor, entry.page);
				pageProperty.menu.push(item);
			});
			data.images.forEach(function(entry) {
				var image = new imageObject(entry.title, entry.description, entry.thumbURL, entry.bigURL);
				pageProperty.images.push(image);
			});
			objectProperty.readyToDisplay = true;
		}).fail(function () {
			window.location.replace(window.location);
		});
		return this;
	},

	clear: function clear() {
		this.page.language = null;
		this.page.menu = new Array();
		this.page.page.title = null;
		this.page.page.content = null;
		this.page.images = new Array();
	}
};

function displayPage(pageObject) {
	if (!pageObject.isDisplayed && pageObject.readyToDisplay) {
		if ($PAGE_BUILT == true) {
			reloadContent(pageObject);
		}
		else {
			buildHeader(pageObject);
			buildMenu(pageObject);
			reloadContent(pageObject);
			buildFooter(pageObject);
			$PAGE_BUILT = true;
		}
		pageObject.isDisplayed = true;
	}
	return pageObject;
}

function buildMenu(pageObject) {
	var ul = $(document.createElement('ul')).attr('class', 'menu-list');
	pageObject.page.menu.forEach(function (entry) {
		var li = $(document.createElement('li')).attr('class', 'menu-item');
		li.bind('click', function() {
			pageObject.loadPage(entry.anchor+'?page='+entry.page+'&language='+pageObject.page.language);
		});
		li.append(Texts[entry.universalName]);
		ul.append(li);
	});
	pageObject.menu.append(ul);
	return ul;
}

function buildHeader(pageObject) {
	pageObject.header.append(pageObject.page.header);
}

function buildFooter(pageObject) {
	pageObject.footer.append(pageObject.page.footer);
}

function reloadContent(pageObject) {
	pageObject.content.fadeOut('slow', function() {
		pageObject.content.empty();
		var title = $(document.createElement('span')).attr('class', 'title');
		var article = $(document.createElement('span')).attr('class', 'article');
		var gallery = $(document.createElement('span')).attr('class', 'gallery');
		pageObject.content.append(title);
		pageObject.content.append(article);
		pageObject.content.append(gallery);
		title.append(pageObject.page.page.title);
		article.append(pageObject.page.page.content);
		makeGallery(pageObject, gallery);
		pageObject.content.fadeIn('slow');
	});
}

function makeGallery(pageObject, container) {
	pageObject.page.images.forEach(function (entry) {
		var img = $(document.createElement('img')).attr('src', entry.thumbURL).attr('alt', entry.description);
		var a = $(document.createElement('a')).attr('class', 'image-link').attr('data-lightbox', 'imageset').attr('data-title', entry.title).attr('href', entry.bigURL).append(img);
		container.append(a);
	});
}