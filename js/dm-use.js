$(function(){

	var M = Backbone.Model.extend(),
		C = Backbone.Collection.extend({model: M});

	var m1 = new M({url: 'img/1.jpg'}),
		m2 = new M({url: 'img/2.jpg'}),
		m3 = new M({url: 'img/3.jpg'}),
		m4 = new M({url: 'img/4.jpg'}),
		m5 = new M({url: 'img/5.jpg'}),
		m6 = new M({url: 'img/6.jpg'}),
		m7 = new M({url: 'img/7.jpg'}),
		c1 = new C([m1, m2, m3, m4, m5]);


	var View = Book.extend({
    	
    	initialize: function(options) {
      		console.log('initialize');
    	},
    	render: function() {
      		this.$el.html();
      		
      		return this;
    	}
  	});

  	// View declaration

  	var book = new View({el: '#box', pageTemplate: '#page', collection: c1, size: {width: 1024, height: 768}, swipe: true});

});