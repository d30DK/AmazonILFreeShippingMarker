chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "interactive") {
		clearInterval(readyStateCheckInterval);

	$( document ).ready(function() {
		var styleClass = 'amazonFreeShipping';

		try {
			// category / results page
			$('div.s-align-children-center:contains("FREE Shipping to Israel")').parent().parent().parent().parent().parent().addClass(styleClass);

			// cart page
			$('div.sc-list-item-content:contains("FREE Shipping to Israel")').addClass(styleClass);

			// product page
			$('div.a-box-inner:contains("(Eligible for FREE Shipping on qualifying orders over $49.00)")').addClass(styleClass).find('.accordion-row-content').addClass(styleClass);
			$('div#price:contains("(Eligible for FREE Shipping on qualifying orders over $49.00)")').addClass(styleClass).find('.accordion-row-content').addClass(styleClass);
			
			$('div.a-box-inner:contains("FREE Shipping to Israel")').addClass(styleClass).find('.accordion-row-content').addClass(styleClass);
			$('div#price:contains("FREE Shipping to Israel")').addClass(styleClass).find('.accordion-row-content').addClass(styleClass);
		} catch(e) {
			
		}
	});

	}
	}, 10);
});