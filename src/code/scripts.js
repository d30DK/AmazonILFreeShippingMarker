var shippingMarker,
	extensionRan = false,
	debugMode = false;

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "interactive") {
		clearInterval(readyStateCheckInterval);

		$( document ).ready(function() {
			shippingMarker = new amazonShippingMarker(debugMode);
			extensionRan = true;
		});
	}
	}, 10);
});
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		if(!extensionRan) {
			$( document ).ready(function() {
				shippingMarker = new amazonShippingMarker(debugMode);
				extensionRan = true;
			});
		}
	}
	}, 10);
});




function amazonShippingMarker(debug = false) {
	this.currentPage = location.href;
	this.styleClass = 'amazonFreeShipping';
	this.inCart = (this.currentPage.indexOf('/cart/')!=-1) ? true : false;
	this.inProduct = (this.currentPage.indexOf('/product/')!=-1 || this.currentPage.indexOf('/dp/')!=-1) ? true : false;
	this.inCatalog = (!this.inCart && !this.inProduct) ? true : false;
	this.debug = debug;
    this.init();
}

amazonShippingMarker.prototype = {
    init: function () {
		if(this.debug) {
			console.log('in cart: '+this.inCart);
			console.log('in product: '+this.inProduct);
			console.log('in catalog: '+this.inCatalog);
		}

		// Mark products based on current page
		if(this.inCatalog) {
			this.markCatalogProducts();
		} else if(this.inProduct) {
			this.markProductPage();
			this.detectProductUrlChange();
		} else if(this.inCart) {
			this.markCartProducts();
		}
    },

    markCatalogProducts: function () {

		try {
			$('div.s-align-children-center:contains("FREE Shipping to Israel")').parent().parent().parent().parent().parent().addClass(this.styleClass);

			if(this.debug) console.log('marked products in catalog page');
		} catch(e) {
			
		}
    },

    markCartProducts: function () {
		
		try {

			var _this = this;
			var markProductInCart = function() {
				$('div.sc-list-item-content:contains("FREE Shipping to Israel")').addClass(_this.styleClass);
			};
			
			markProductInCart();

			$("#sc-saved-cart-items").bind("DOMSubtreeModified",function(){
				markProductInCart();
			});
			
			$(".sc-list-body").bind("DOMSubtreeModified",function(){
				markProductInCart();
			});

			if(this.debug) console.log('marked products in cart page');
		} catch(e) {
			
		}
    },

    markProductPage: function () {
		
		try {
			$('div.a-box-inner:contains("(Eligible for FREE Shipping on qualifying orders over $49.00)")').addClass(this.styleClass).find('.accordion-row-content').addClass(this.styleClass);
			$('div#price:contains("(Eligible for FREE Shipping on qualifying orders over $49.00)")').addClass(this.styleClass).find('.accordion-row-content').addClass(this.styleClass);
			
			$('div.a-box-inner:contains("FREE Shipping to Israel")').addClass(this.styleClass).find('.accordion-row-content').addClass(this.styleClass);
			$('div#price:contains("FREE Shipping to Israel")').addClass(this.styleClass).find('.accordion-row-content').addClass(this.styleClass);

			if(this.debug) console.log('marked products in product page');
		} catch(e) {
			
		}
	},
	
	detectProductUrlChange: function () {
		var _this = this;
		this.productInterval = setInterval(function() {
			if(_this.currentPage != location.href) {
				_this.currentPage = location.href;
				_this.markProductPage();
			}
		}, 700);

	}

};