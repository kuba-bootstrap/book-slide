(function(){

    var Book = function(options) {
        Backbone.View.call(this, options);
    	this.bookInitialize(options);
  	};

    // Attach Book to the window, but through the namespace 'kb'
    var root = this;
    root.kb = root.kb || {};
    root.kb.Book = Book;

  	Book.extend = Backbone.View.extend;

  	_.extend(Book.prototype, Backbone.View.prototype, {
        bookInitialize: function(options) {
            this._pageTemplate = this.options.pageTemplate;
            this._size = this.options.size;
            this._pointer = 0;
            this._totalPages = 0;
            this._pages = [];
            this.book();
    	},
    	book: function(){
            if(this.options.swipe === true) this.registerSwipe();
            this.collection.forEach(this.loadPages, this);
            this.resetBook();
    	},
        loadPages: function(item){
            item.set({id: 'book-page-' + this._totalPages});

            var template = Handlebars.compile($(this.options.pageTemplate).html()),
                page = template(item.toJSON());
            
            this.$el.append(page);
            this._pages.push('#book-page-' + this._totalPages);
            this._totalPages++;
        },
        registerSwipe: function(){
            var self = this;

            function moveRight(){
                self.moveBook('right');
            }

            function moveLeft(){
                self.moveBook('left');
            }

            this.$el.swipe({ 
                swipeTime: 1000, 
                swipeX: 50, 
                left: moveRight, 
                right: moveLeft
            });
        },
        resetBook: function(){
            if(this._pages != null){
                $(this._pages[0]).css({
                    '-webkit-transform': 'translate3d(0px, 0px, 0px)',
                    'z-index': '1',
                    'opacity': 1
                });
            }
        },
        moveBook: function(direction){
            if(direction == 'left'){
                if(this._pointer > 0){
                    this._pointer--;
                    
                    var objectP = this._pages[this._pointer + 1],
                        objectM = this._pages[this._pointer];

                    $(objectP).css({
                        '-webkit-transform': 'translate3d(' + this._size.width + 'px, 0px, 0px)',
                        'z-index': 1,
                        'opacity': 0
                    });
                    $(objectM).css({
                        '-webkit-transform': 'translate3d(0px, 0px, 0px)',
                        'z-index': 1,
                        'opacity': 1
                    });
                }
            } else if(direction == 'right' && this._pages.length > 1){
                if(this._pointer < (this._pages.length - 1)){
                    this._pointer++;
                    
                    var objectP = this._pages[this._pointer - 1],
                        objectM = this._pages[this._pointer];

                    $(objectP).css({
                        '-webkit-transform': 'translate3d(' + (this._size.width * -1) + 'px, 0px, 0px)',
                        'z-index': 1,
                        'opacity': 0
                    });
                    $(objectM).css({
                        '-webkit-transform': 'translate3d(0px, 0px, 0px)',
                        'z-index': 1,
                        'opacity': 1
                    });
                }
            }
        }
  	});

  	window.Book = Book;

})();