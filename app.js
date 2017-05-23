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
        currentCat: null,
        isAdminShowing: false
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
            adminView.init();
        },
        setAdminShowing: function() {
            model.isAdminShowing = model.isAdminShowing ? false : true;
        },
        getAdminShowing: function() {
            return model.isAdminShowing;
        },
        updateForm: function() {
              model.currentCat.name = adminView.adminName.val();
              model.currentCat.url = adminView.adminUrl.val();
              model.currentCat.clicks = adminView.adminClicks.val();
              catListView.render();
              catDisplayView.render();
        }
    };
    
    var catListView = {
        init: function() {
            this.catList = $("#catList");
            octopus.setCurrentCat(octopus.getCats()[0]);
            this.render();
        },
        render: function() {
            this.catList.html('');
            octopus.getCats().forEach(function(cat) {
                var elem = document.createElement("h2");
                elem.textContent = cat["name"];
                this.catList.appendChild(elem);
                
                elem.addEventListener('click', (function(catCopy){
                    return function() {
                        //only allow current cat to switch if admin view is off
                        if (!octopus.getAdminShowing()) {
                            octopus.setCurrentCat(catCopy);
                            catDisplayView.render();
                        }
                    };
                })(cat));
            });
        }
    };
    
    var catDisplayView = {
        init: function() {
            this.catDisplay = $("#catDisplay");
            this.render();
        },
        render: function() {
                this.catDisplay.html('');
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
    
    var adminView = {
      init: function() {
          this.adminFormButton = $("#adminFormButton");
          this.adminForm = $("#adminForm");
          this.adminName = $("#adminName");
          this.adminUrl = $("#adminUrl");
          this.adminClicks = $("#adminClicks");
          this.adminSave = $("#adminSave");
          
          this.adminFormButton.on('click', function() {
                adminView.render();
          });
          
          this.adminSave.on('click', function(e) {
            e.preventDefault();
            octopus.updateForm();
            adminView.render();
          });
          
      },
      render: function() {
          if (!octopus.getAdminShowing()) {
              var cat = octopus.getCurrentCat();
              this.adminName.val(cat.name);
              this.adminUrl.val(cat.url);
              this.adminClicks.val(cat.clicks);
              this.adminForm.show();
          } else {
              this.adminForm.hide();
          }
          octopus.setAdminShowing();
      }
    };
    
    octopus.init();
});