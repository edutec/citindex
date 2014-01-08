define("citindex/CitIndex", ["amber_vm/smalltalk", "amber_vm/nil", "amber_vm/_st", "amber_core/Canvas", "amber_core/Kernel-Objects"], function(smalltalk,nil,_st){
smalltalk.addPackage('CitIndex');
smalltalk.packages["CitIndex"].transport = {"type":"amd","amdNamespace":"citindex"};

smalltalk.addClass('Application', smalltalk.Widget, ['searchWidget'], 'CitIndex');
smalltalk.addMethod(
smalltalk.method({
selector: "renderOn:",
category: 'rendering',
fn: function (html){
var self=this;
function $Browser(){return smalltalk.Browser||(typeof Browser=="undefined"?nil:Browser)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2;
_st(html)._with_(self._searchWidget());
$ctx1.sendIdx["with:"]=1;
$1=_st(html)._button();
_st($1)._onClick_((function(){
return smalltalk.withContext(function($ctx2) {
return _st($Browser())._open();
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
$2=_st($1)._with_("Browser");
return self}, function($ctx1) {$ctx1.fill(self,"renderOn:",{html:html},smalltalk.Application)})},
args: ["html"],
source: "renderOn: html\x0a\x09html with: self searchWidget.\x0a\x09html button onClick: [ Browser open ]; with: 'Browser'.",
messageSends: ["with:", "searchWidget", "onClick:", "button", "open"],
referencedClasses: ["Browser"]
}),
smalltalk.Application);

smalltalk.addMethod(
smalltalk.method({
selector: "searchWidget",
category: 'widgets',
fn: function (){
var self=this;
function $SearchWidget(){return smalltalk.SearchWidget||(typeof SearchWidget=="undefined"?nil:SearchWidget)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
$2=self["@searchWidget"];
if(($receiver = $2) == nil || $receiver == null){
self["@searchWidget"]=_st($SearchWidget())._new();
$1=self["@searchWidget"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"searchWidget",{},smalltalk.Application)})},
args: [],
source: "searchWidget\x0a\x09^ searchWidget ifNil: [ searchWidget := SearchWidget new ]",
messageSends: ["ifNil:", "new"],
referencedClasses: ["SearchWidget"]
}),
smalltalk.Application);


smalltalk.addMethod(
smalltalk.method({
selector: "start",
category: 'startup',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._new())._appendToJQuery_("body"._asJQuery());
return self}, function($ctx1) {$ctx1.fill(self,"start",{},smalltalk.Application.klass)})},
args: [],
source: "start\x0a\x09self new appendToJQuery: 'body' asJQuery",
messageSends: ["appendToJQuery:", "new", "asJQuery"],
referencedClasses: []
}),
smalltalk.Application.klass);


smalltalk.addClass('SearchModel', smalltalk.Object, [], 'CitIndex');
smalltalk.addMethod(
smalltalk.method({
selector: "search:callback:",
category: 'operations',
fn: function (aString,aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(jQuery)._getJSON_success_("search/*/*/".__comma(aString),(function(data){
return smalltalk.withContext(function($ctx2) {
return _st(aBlock)._value_(_st(data)._ifNotEmpty_ifEmpty_((function(){
return smalltalk.withContext(function($ctx3) {
return _st(data)._collect_((function(each){
return smalltalk.withContext(function($ctx4) {
return _st(_st(_st(each)._fields())._path())._replace_with_("\x5c\x5c","");
}, function($ctx4) {$ctx4.fillBlock({each:each},$ctx3,3)})}));
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}),(function(){
return smalltalk.withContext(function($ctx3) {
return "no results";
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,4)})})));
}, function($ctx2) {$ctx2.fillBlock({data:data},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"search:callback:",{aString:aString,aBlock:aBlock},smalltalk.SearchModel)})},
args: ["aString", "aBlock"],
source: "search: aString callback: aBlock\x0a\x09jQuery \x0a\x09\x09getJSON: 'search/*/*/' , aString \x0a\x09\x09success: [ :data | \x0a\x09\x09\x09aBlock value: (data ifNotEmpty: [ data collect: [ :each | each fields path replace: '\x5c\x5c' with: '' ]] ifEmpty: [ 'no results' ]) ]\x0a\x09",
messageSends: ["getJSON:success:", ",", "value:", "ifNotEmpty:ifEmpty:", "collect:", "replace:with:", "path", "fields"],
referencedClasses: []
}),
smalltalk.SearchModel);



smalltalk.addClass('SearchWidget', smalltalk.Widget, ['model'], 'CitIndex');
smalltalk.addMethod(
smalltalk.method({
selector: "model",
category: 'accessing',
fn: function (){
var self=this;
function $SearchModel(){return smalltalk.SearchModel||(typeof SearchModel=="undefined"?nil:SearchModel)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
$2=self["@model"];
if(($receiver = $2) == nil || $receiver == null){
self["@model"]=_st($SearchModel())._new();
$1=self["@model"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"model",{},smalltalk.SearchWidget)})},
args: [],
source: "model\x0a\x09^ model ifNil: [ model := SearchModel new ]",
messageSends: ["ifNil:", "new"],
referencedClasses: ["SearchModel"]
}),
smalltalk.SearchWidget);

smalltalk.addMethod(
smalltalk.method({
selector: "renderOn:",
category: 'rendering',
fn: function (html){
var self=this;
var input;
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$2,$4,$5;
input=_st(html)._input();
_st(input)._onChange_((function(evt){
return smalltalk.withContext(function($ctx2) {
$1=self._model();
$3=_st(input)._asJQuery();
$ctx2.sendIdx["asJQuery"]=1;
$2=_st($3)._val();
return _st($1)._search_callback_($2,(function(results){
return smalltalk.withContext(function($ctx3) {
return _st(results)._do_((function(each){
return smalltalk.withContext(function($ctx4) {
$4=_st(html)._a();
_st($4)._href_(each);
$5=_st($4)._with_(each);
return _st("body"._asJQuery())._append_($5);
}, function($ctx4) {$ctx4.fillBlock({each:each},$ctx3,3)})}));
}, function($ctx3) {$ctx3.fillBlock({results:results},$ctx2,2)})}));
}, function($ctx2) {$ctx2.fillBlock({evt:evt},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"renderOn:",{html:html,input:input},smalltalk.SearchWidget)})},
args: ["html"],
source: "renderOn: html\x0a\x09| input |\x0a\x09input := html input.\x0a\x09input onChange: [ :evt | \x0a\x09\x09self model \x0a\x09\x09\x09search: \x0a\x09\x09\x09\x09input asJQuery val \x0a\x09\x09\x09callback: [ :results | \x0a\x09\x09\x09\x09results do: [ :each | \x0a\x09\x09\x09\x09\x09'body' asJQuery append: (html a href: each; with: each) ]]]",
messageSends: ["input", "onChange:", "search:callback:", "model", "val", "asJQuery", "do:", "append:", "href:", "a", "with:"],
referencedClasses: []
}),
smalltalk.SearchWidget);


});
