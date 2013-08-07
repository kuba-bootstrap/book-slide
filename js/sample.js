(function(){

	var M = Backbone.Model.extend();
	var C = Backbone.Collection.extend({model: M});

	var m1 = new M({img: '1'}),
		m2 = new M({img: '2'}),
		m3 = new M({img: '3'}),
		c1 = new C([m1, m2, m3]);

	var View = Backbone.View.extend({
		initialize: function(){

		},
		render: function(){


			return this;
		}
		renderItem: function(){
			
		}
	});

	var SubView = Backbone.View.extend({
		render: function(){


			return this;
		}
	});	

	new View({collection: c1});

})();