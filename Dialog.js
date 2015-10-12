var DialogStyle = {
	mask: {
		'position': 'fixed',
		'top': 0,
		'left': 0,
		'right': 0,
		'bottom': 0,
		'font-size': '16px',
		'background': 'rgba(0, 0, 0,0.65)',
		'z-index':999
	},
	container: {
		'position': 'absolute',
		'top': '35%',
		'min-height': '6.250em',
		'width': '14.375em',
		'color': 'black',
		'background': 'white',
		'border-radius': '0.2em'
	},
	title: {
		'text-indent': '20px',
		'line-height': '35px',
		'border-bottom': '1px solid #eee'
	},
	content: {
		'padding': '15px',
		'min-height': '50px',
		'max-width': '300px',
		'font-size': '13px',
		'line-height': '1.2',
		'text-align': 'center',
		'color': '#888',
		'border-bottom': '1px solid #D5D5D6'
	},
	btns: {
		'display': '-webkit-flex',
		'display': 'flex'
	},
	btn: {
		'-webkit-flex': 1,
		'flex': 1,
		'height': '35px',
		'line-height': '35px',
		'border-right': '1px solid #D5D5D6',
		'text-align': 'center'
	}
}

function Dialog(opts) {
	if (!(this instanceof Dialog)) {
		return new Dialog(opts);
	}
	this.title = opts.title || null;
	this.content = opts.content || null;
	this.btns = opts.btns || null;
	this.init();
}
Dialog.prototype.init = function() {
	var self = this;
	var SW = window.screen.width;
	this.maskNode = document.createElement('div');
	this.addStyle(this.maskNode, DialogStyle.mask);
	this.container = document.createElement('div');
	this.container.style.left = (SW - 230) / 2 + 'px';
	this.addStyle(this.container, DialogStyle.container);
	if (this.title) {
		var titleNode = document.createElement('div');
		this.addStyle(titleNode, DialogStyle.title);
		titleNode.innerHTML = this.title;
		this.container.appendChild(titleNode);
	}
	if (this.content) {
		var contentNode = document.createElement('div');
		this.addStyle(contentNode, DialogStyle.content);
		contentNode.innerHTML = this.content;
		this.container.appendChild(contentNode);
	}
	if (this.btns) {
		var btnNodes = document.createElement('div');
		this.addStyle(btnNodes, DialogStyle.btns);
		for (var i in this.btns) {
			var btn = document.createElement('div');
			this.addStyle(btn, DialogStyle.btn);
			btn.innerHTML = this.btns[i].value;
			(function(el, j) {
				el.addEventListener('click', function() {
					self.btns[j].callback();
					self.close(self);
				}, false);
			})(btn, i);
			btnNodes.appendChild(btn);
		};
		this.container.appendChild(btnNodes);
	}
	this.maskNode.appendChild(this.container);
	document.querySelector('body').appendChild(this.maskNode);
}
Dialog.prototype.addStyle = function(el, style) {
	for (var item in style) {
		el.style[item] = style[item];
	}
}
Dialog.prototype.close = function(self) {
	document.querySelector('body').removeChild(self.maskNode);
	self = null;
}