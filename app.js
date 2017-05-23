$(function(){
    var model = {
        cats: [
                {
                    name: "Alfred",
                    url: "https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/0e09cd9c1a159318?w=1200&h=600&crop=1",
                    clicks: 0
                },
                {
                    name: "Gable",
                    url: "http://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg",
                    clicks: 0
                },
                {
                    name: "Snuggles",
                    url: "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg",
                    clicks: 0
                },
                {
                    name: "Sanderson",
                    url: "https://cmeimg-a.akamaihd.net/640/clsd/getty/c64f76dc20c246ca88ee180fe4b4b781",
                    clicks: 0
                },
                {
                    name: "Brands",
                    url: "https://s-media-cache-ak0.pinimg.com/736x/35/8c/57/358c57c204a2fec21fa50b917a0728aa.jpg",
                    clicks: 0
                }
            ],
        currentCat: null
    };
    
    var octopus = {
        getCats: function() {
            return model.cats;
        },
        setCurrentCat: function(cat) {
          model.currentCat = cat;  
        },
        getCurrentCat: function() {
          return model.currentCat;  
        },
        init: function() {
            catListView.init();
            catDisplayView.init();
        }
    };
    
    var catListView = {
        init: function() {
            this.catList = $("#catList");
            
            catListView.render();
        },
        render: function() {
            octopus.getCats().forEach(function(cat) {
                var elem = document.createElement("h2");
                elem.textContent = cat["name"];
                this.catList.appendChild(elem);
                
                elem.addEventListener('click', (function(catCopy){
                    return function() {
                        octopus.setCurrentCat(catCopy);
                        catDisplayView.render();
                    };
                })(cat));
            });
        }
    };
    
    var catDisplayView = {
        init: function() {
            this.catDisplay = $("#catDisplay");
        },
        render: function() {
                var currentCat = octopus.getCurrentCat();
                var catName = '<h1>' + currentCat["name"] + '</h1>';
                var catImg = '<img src="' + currentCat["url"] +'">';
                var catClicks = '<h1 id="numClicks">' + currentCat["clicks"] + '</h1>';
                
                this.catDisplay.html(catName+catImg+catClicks);
                
                $("img").on('click', function() {
                    $("#numClicks").html(++currentCat["clicks"]);
                });
        }
    };
    
    octopus.init();
});