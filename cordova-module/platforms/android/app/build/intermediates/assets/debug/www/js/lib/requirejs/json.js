define(["text"],function(text){function cacheBust(a){return a=a.replace(CACHE_BUST_FLAG,""),a+=a.indexOf("?")<0?"?":"&",a+CACHE_BUST_QUERY_PARAM+"="+Math.round(2147483647*Math.random())}var CACHE_BUST_QUERY_PARAM="bust",CACHE_BUST_FLAG="!bust",jsonParse="undefined"!=typeof JSON&&"function"==typeof JSON.parse?JSON.parse:function(val){return eval("("+val+")")},buildMap={};return{load:function(a,b,c,d){d.isBuild&&(d.inlineJSON===!1||a.indexOf(CACHE_BUST_QUERY_PARAM+"=")!==-1)||0===b.toUrl(a).indexOf("empty:")?c(null):text.get(b.toUrl(a),function(b){var e;if(d.isBuild)buildMap[a]=b,c(b);else{try{e=jsonParse(b)}catch(a){c.error(a)}c(e)}},c.error,{accept:"application/json"})},normalize:function(a,b){return a.indexOf(CACHE_BUST_FLAG)!==-1&&(a=cacheBust(a)),b(a)},write:function(a,b,c){if(b in buildMap){var d=buildMap[b];c('define("'+a+"!"+b+'", function(){ return '+d+";});\n")}}}});