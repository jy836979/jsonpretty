(function(window, doc){'use strict';

// Constructor	
var JY_JSParse = function(el, options) {
	var that = this;

	that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
	console.log("JY_JSParse initializer >> wrapper", that.wrapper);

	that.jsonContents = '';
	that.strContents = '';

};

// Prototype
JY_JSParse.prototype = {
	getId: function() {
		return this.wrapper.id;
	}
	, strToJson: function(str) {
		// console.log("JY_JSParse strToJson >> text", str);
		// console.log("JY_JSParse strToJson >> json", this.jsonContents);
		return toJsonByStr(str);
	}
	, printJson: function() {
		this.wrapper.innerHTML = jsonContents;
	}
	, getErrorMsg: function() {
		return error_msg;
	}
};

var jsonContents = '';
var error_msg = '';
function toJsonByStr (val) {
	var _str = val.replace(/(\s*)/g,"");
	var ret = true;
	try{
		var _obj = JSON.parse(_str);
		jsonContents = subObjToStr(_obj, 1);
		console.log("toJsonByStr >> ", val);
		console.log("toJsonByStr 공백 제거 >> ", _str);
	}catch(e){
		ret = false;
		error_msg = e.toString();
		jsonContents = '';
		console.log("toJsonByStr JSON Error >> ", e.toString());
	}
	
	return ret;
}

function subObjToStr(_obj , _depth) {
	var output = '';
	var nline = '';
	var comma = '';
	var _str = '';
	for(var _key in _obj) {
		console.log(_key);
		var _val = '';
		if(_str != ''){
			nline='\n'; 
			comma=',';
		}
		if(typeof _obj[_key] == 'object'){
			_val = subObjToStr(_obj[_key], _depth + 1);
		} else {
			_val = "\"" + _obj[_key] + "\"";
		}
		_str+= nline + tabGubn(_depth) + comma + "\"" + _key + "\"" + ":" + _val;
	}
	return "{\n" + _str + "\n" + tabGubn(_depth - 1) + "}";
}

function tabGubn(len) {
	var _gubn = '    ';
	var _ret = '';
	for(var i=0; i < len; i++){
		_ret += _gubn;
	}
	return _ret;
}

window.JY_JSParse = JY_JSParse;

})(window, document);