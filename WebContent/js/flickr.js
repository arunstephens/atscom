var backgroundImage;
var photos;
var caption;
var showFullSize = false;

$(function()
{
	// create background image
	backgroundImageContainer = $('<div id="backgroundImageContainer" />');
	backgroundImage = $('<img id="backgroundImage" />');
	backgroundImageContainer.append(backgroundImage);
	$(document.body).append(backgroundImageContainer);

	caption = $('#caption');
	
	// load images from flickr
	tags = 'wallpaper';
	url = "http://api.flickr.com/services/rest?method=flickr.photos.search&api_key=ebf4a5474ae8d40e19afaa68ae92004b&user_id=30019335@N00&extras=original_format&tags=" + tags +  "&format=json&jsoncallback=?";
	
	$.getJSON(url, function(data)
	{
		photos = data.photos.photo;
		
		showRandomPhoto();
	});
	
	
	$(window).resize(resizeBackgroundImage);
});

function resizeBackgroundImage()
{
	imageAR = backgroundImage.width() / backgroundImage.height();
	screenAR = $(window).width() / $(window).height();
	
	if (imageAR > screenAR)
	{
		backgroundImage.css('width', 'auto');
		backgroundImage.css('height', '100%');
	}
	else
	{
		backgroundImage.css('width', '100%');
		backgroundImage.css('height', 'auto');
	}
}

function showRandomPhoto()
{
	var index = Math.round(Math.random() * (photos.length - 1));
	
	console.log(index);
	
	var photo = photos[index];
	
	if (photo == null)
	{
		caption.text("Couldn't load background image from Flickr");
		
		return;
	}
	
	// http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}_[mstb].jpg
	var url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_';
	if (photo.originalsecret != null && showFullSize)
	{
		url = url + photo.originalsecret + '_o.' + photo.originalformat;
	}
	else
	{
		url = url + photo.secret + '_b.jpg';
	}
	
	backgroundImage.attr('src', url);
	
	
	caption.text(photo.title);
	caption.attr('href', 'http://flickr.com/arunstephens/' + photo.id);
	caption.attr('title', 'View original image on Flickr');
		
	resizeBackgroundImage();
}
