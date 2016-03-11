var app = {
	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},	
	renderHomeView: function() {
		/*var html =
				"<div class='header'><h1>PG Build App</h1></div>" +
				"<div class='search-view'>" +
				"<input class='search-key'/>" +
				"<ul class='employee-list'></ul>" +
				"</div>"
		$('body').html(html);
		$('.search-key').on('keyup', $.proxy(this.findByName, this));*/
		$('body').html(this.homeTpl());
		$('.search-key').on('keyup', $.proxy(this.findByName, this));
	},
    findByName: function() {
		var self = this;
		this.store.findByName($('.search-key').val(), function(employees) {
			$('.employee-list').html(self.employeeLiTpl(employees));
		});
    },
    initialize: function() {
        var self = this;
		this.store = new MemoryStore(function() {
			self.showAlert('Store Initialized', 'Info');
			self.renderHomeView();
		});
		this.homeTpl = Handlebars.compile($("#home-tpl").html());
		this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
    }

};

app.initialize();