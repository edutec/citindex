define("amber_core/Helios-Layout", ["amber_vm/smalltalk", "amber_vm/nil", "amber_vm/_st", "amber_core/Helios-Core", "amber_core/Canvas", "amber_core/Kernel-Objects"], function(smalltalk,nil,_st){
smalltalk.addPackage('Helios-Layout');
smalltalk.packages["Helios-Layout"].transport = {"type":"amd","amdNamespace":"amber_core"};

smalltalk.addClass('HLContainer', smalltalk.HLWidget, ['splitter'], 'Helios-Layout');
smalltalk.addMethod(
smalltalk.method({
selector: "renderOn:",
category: 'rendering',
fn: function (html){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$2;
$1=_st(html)._div();
_st($1)._class_("tool_container");
$2=_st($1)._with_(self._splitter());
return self}, function($ctx1) {$ctx1.fill(self,"renderOn:",{html:html},smalltalk.HLContainer)})},
args: ["html"],
source: "renderOn: html\x0a\x09html div \x0a    \x09class: 'tool_container'; \x0a        with: self splitter",
messageSends: ["class:", "div", "with:", "splitter"],
referencedClasses: []
}),
smalltalk.HLContainer);

smalltalk.addMethod(
smalltalk.method({
selector: "splitter",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self["@splitter"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"splitter",{},smalltalk.HLContainer)})},
args: [],
source: "splitter\x0a\x09^ splitter",
messageSends: [],
referencedClasses: []
}),
smalltalk.HLContainer);

smalltalk.addMethod(
smalltalk.method({
selector: "splitter:",
category: 'accessing',
fn: function (aSplitter){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self["@splitter"]=aSplitter;
return self}, function($ctx1) {$ctx1.fill(self,"splitter:",{aSplitter:aSplitter},smalltalk.HLContainer)})},
args: ["aSplitter"],
source: "splitter: aSplitter\x0a\x09splitter := aSplitter",
messageSends: [],
referencedClasses: []
}),
smalltalk.HLContainer);


smalltalk.addMethod(
smalltalk.method({
selector: "with:",
category: 'instance creation',
fn: function (aSplitter){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=self._new();
_st($2)._splitter_(aSplitter);
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"with:",{aSplitter:aSplitter},smalltalk.HLContainer.klass)})},
args: ["aSplitter"],
source: "with: aSplitter\x0a\x09^ self new \x0a    \x09splitter: aSplitter; \x0a        yourself",
messageSends: ["splitter:", "new", "yourself"],
referencedClasses: []
}),
smalltalk.HLContainer.klass);


smalltalk.addClass('HLSplitter', smalltalk.Widget, ['firstWidget', 'secondWidget', 'firstPane', 'secondPane', 'splitter'], 'Helios-Layout');
smalltalk.addMethod(
smalltalk.method({
selector: "cssClass",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return "splitter";
}, function($ctx1) {$ctx1.fill(self,"cssClass",{},smalltalk.HLSplitter)})},
args: [],
source: "cssClass\x0a\x09^ 'splitter'",
messageSends: [],
referencedClasses: []
}),
smalltalk.HLSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "firstWidget",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self["@firstWidget"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"firstWidget",{},smalltalk.HLSplitter)})},
args: [],
source: "firstWidget\x0a\x09^ firstWidget",
messageSends: [],
referencedClasses: []
}),
smalltalk.HLSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "firstWidget:",
category: 'accessing',
fn: function (aWidget){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self["@firstWidget"]=aWidget;
return self}, function($ctx1) {$ctx1.fill(self,"firstWidget:",{aWidget:aWidget},smalltalk.HLSplitter)})},
args: ["aWidget"],
source: "firstWidget: aWidget\x0a\x09firstWidget := aWidget",
messageSends: [],
referencedClasses: []
}),
smalltalk.HLSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "isHeliosSplitter",
category: 'testing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return true;
}, function($ctx1) {$ctx1.fill(self,"isHeliosSplitter",{},smalltalk.HLSplitter)})},
args: [],
source: "isHeliosSplitter\x0a\x09^ true",
messageSends: [],
referencedClasses: []
}),
smalltalk.HLSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "panesCssClass",
category: 'rendering',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return "panes";
}, function($ctx1) {$ctx1.fill(self,"panesCssClass",{},smalltalk.HLSplitter)})},
args: [],
source: "panesCssClass\x0a\x09^ 'panes'",
messageSends: [],
referencedClasses: []
}),
smalltalk.HLSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "renderOn:",
category: 'rendering',
fn: function (html){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$4,$5,$6,$7,$2;
$1=_st(html)._div();
$ctx1.sendIdx["div"]=1;
_st($1)._class_(self._panesCssClass());
$ctx1.sendIdx["class:"]=1;
$2=_st($1)._with_((function(){
return smalltalk.withContext(function($ctx2) {
$3=_st(html)._div();
$ctx2.sendIdx["div"]=2;
_st($3)._class_("pane");
$ctx2.sendIdx["class:"]=2;
$4=_st($3)._with_(self._firstWidget());
$ctx2.sendIdx["with:"]=2;
self["@firstPane"]=$4;
self["@firstPane"];
$5=_st(html)._div();
$ctx2.sendIdx["div"]=3;
self["@splitter"]=_st($5)._class_(self._cssClass());
$ctx2.sendIdx["class:"]=3;
self["@splitter"];
$6=_st(html)._div();
_st($6)._class_("pane");
$7=_st($6)._with_(self._secondWidget());
self["@secondPane"]=$7;
return self["@secondPane"];
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
$ctx1.sendIdx["with:"]=1;
self._setupSplitter();
return self}, function($ctx1) {$ctx1.fill(self,"renderOn:",{html:html},smalltalk.HLSplitter)})},
args: ["html"],
source: "renderOn: html\x0a\x09html div class: self panesCssClass; with: [\x0a\x09\x09firstPane := html div class: 'pane'; with: self firstWidget.\x0a    \x09splitter := html div class: self cssClass.\x0a    \x09secondPane := html div class: 'pane'; with: self secondWidget ].\x0a        \x0a\x09self setupSplitter",
messageSends: ["class:", "div", "panesCssClass", "with:", "firstWidget", "cssClass", "secondWidget", "setupSplitter"],
referencedClasses: []
}),
smalltalk.HLSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "resize",
category: 'rendering',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return self}, function($ctx1) {$ctx1.fill(self,"resize",{},smalltalk.HLSplitter)})},
args: [],
source: "resize",
messageSends: [],
referencedClasses: []
}),
smalltalk.HLSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "secondWidget",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self["@secondWidget"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"secondWidget",{},smalltalk.HLSplitter)})},
args: [],
source: "secondWidget\x0a\x09^ secondWidget",
messageSends: [],
referencedClasses: []
}),
smalltalk.HLSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "secondWidget:",
category: 'accessing',
fn: function (aWidget){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self["@secondWidget"]=aWidget;
return self}, function($ctx1) {$ctx1.fill(self,"secondWidget:",{aWidget:aWidget},smalltalk.HLSplitter)})},
args: ["aWidget"],
source: "secondWidget: aWidget\x0a\x09secondWidget := aWidget",
messageSends: [],
referencedClasses: []
}),
smalltalk.HLSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "setupSplitter",
category: 'rendering',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return self}, function($ctx1) {$ctx1.fill(self,"setupSplitter",{},smalltalk.HLSplitter)})},
args: [],
source: "setupSplitter",
messageSends: [],
referencedClasses: []
}),
smalltalk.HLSplitter);


smalltalk.addMethod(
smalltalk.method({
selector: "with:with:",
category: 'instance creation',
fn: function (aWidget,anotherWidget){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=self._new();
_st($2)._firstWidget_(aWidget);
_st($2)._secondWidget_(anotherWidget);
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"with:with:",{aWidget:aWidget,anotherWidget:anotherWidget},smalltalk.HLSplitter.klass)})},
args: ["aWidget", "anotherWidget"],
source: "with: aWidget with: anotherWidget\x0a\x09^ self new\x0a    \x09\x09firstWidget: aWidget;\x0a            secondWidget: anotherWidget;\x0a            yourself",
messageSends: ["firstWidget:", "new", "secondWidget:", "yourself"],
referencedClasses: []
}),
smalltalk.HLSplitter.klass);


smalltalk.addClass('HLHorizontalSplitter', smalltalk.HLSplitter, [], 'Helios-Layout');
smalltalk.addMethod(
smalltalk.method({
selector: "cssClass",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(smalltalk.HLHorizontalSplitter.superclass.fn.prototype._cssClass.apply(_st(self), [])).__comma(" horizontal");
return $1;
}, function($ctx1) {$ctx1.fill(self,"cssClass",{},smalltalk.HLHorizontalSplitter)})},
args: [],
source: "cssClass\x0a\x09^ super cssClass, ' horizontal'",
messageSends: [",", "cssClass"],
referencedClasses: []
}),
smalltalk.HLHorizontalSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "panesCssClass",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(smalltalk.HLHorizontalSplitter.superclass.fn.prototype._panesCssClass.apply(_st(self), [])).__comma(" horizontal");
return $1;
}, function($ctx1) {$ctx1.fill(self,"panesCssClass",{},smalltalk.HLHorizontalSplitter)})},
args: [],
source: "panesCssClass\x0a\x09^ super panesCssClass, ' horizontal'",
messageSends: [",", "panesCssClass"],
referencedClasses: []
}),
smalltalk.HLHorizontalSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "resize",
category: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._resize_(_st(_st(self["@splitter"])._asJQuery())._css_("top"));
return self}, function($ctx1) {$ctx1.fill(self,"resize",{},smalltalk.HLHorizontalSplitter)})},
args: [],
source: "resize\x0a\x09self resize: (splitter asJQuery css: 'top')",
messageSends: ["resize:", "css:", "asJQuery"],
referencedClasses: []
}),
smalltalk.HLHorizontalSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "resize:",
category: 'actions',
fn: function (anInteger){
var self=this;
var container,size,offset,percentage;
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$2,$6,$7,$5,$4,$8,$10,$9,$11,$14,$13,$12;
$1=_st(self["@firstPane"])._asJQuery();
$ctx1.sendIdx["asJQuery"]=1;
container=_st($1)._parent();
$3=_st(self["@firstPane"])._asJQuery();
$ctx1.sendIdx["asJQuery"]=2;
$2=_st($3)._offset();
offset=_st($2)._top();
size=_st(container)._height();
$6=size;
$7=_st(anInteger).__minus(offset);
$ctx1.sendIdx["-"]=2;
$5=_st($6).__minus($7);
$ctx1.sendIdx["-"]=1;
$4=_st($5).__slash(size);
percentage=_st($4).__star((100));
percentage=(80)._min_(_st(percentage)._max_((20)));
$8=_st(self["@firstPane"])._asJQuery();
$ctx1.sendIdx["asJQuery"]=3;
$10=_st(percentage)._asString();
$ctx1.sendIdx["asString"]=1;
$9=_st($10).__comma("%");
$ctx1.sendIdx[","]=1;
_st($8)._css_put_("bottom",$9);
$ctx1.sendIdx["css:put:"]=1;
$11=_st(self["@splitter"])._asJQuery();
$ctx1.sendIdx["asJQuery"]=4;
$14=(100).__minus(percentage);
$ctx1.sendIdx["-"]=3;
$13=_st($14)._asString();
$ctx1.sendIdx["asString"]=2;
$12=_st($13).__comma("%");
$ctx1.sendIdx[","]=2;
_st($11)._css_put_("top",$12);
$ctx1.sendIdx["css:put:"]=2;
_st(_st(self["@secondPane"])._asJQuery())._css_put_("top",_st(_st((100).__minus(percentage))._asString()).__comma("%"));
return self}, function($ctx1) {$ctx1.fill(self,"resize:",{anInteger:anInteger,container:container,size:size,offset:offset,percentage:percentage},smalltalk.HLHorizontalSplitter)})},
args: ["anInteger"],
source: "resize: anInteger\x0a\x09| container size offset percentage |\x0a    \x0a    container := firstPane asJQuery parent.\x0a\x09offset := firstPane asJQuery offset top.\x0a    size := container height.\x0a\x09\x0a\x09percentage := (size - (anInteger - offset)) / size * 100.\x0a\x09percentage := 80 min: (percentage max: 20).\x0a\x09\x0a    firstPane asJQuery css: 'bottom' put: percentage asString, '%'.\x0a\x09\x0a\x09splitter asJQuery css: 'top' put: (100 - percentage) asString, '%'.\x0a\x09secondPane asJQuery css: 'top' put: (100 - percentage) asString, '%'",
messageSends: ["parent", "asJQuery", "top", "offset", "height", "*", "/", "-", "min:", "max:", "css:put:", ",", "asString"],
referencedClasses: []
}),
smalltalk.HLHorizontalSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "setupSplitter",
category: 'rendering',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$4,$5,$6,$2;
$1=_st(self["@splitter"])._asJQuery();
$ctx1.sendIdx["asJQuery"]=1;
$3="axis".__minus_gt("y");
$ctx1.sendIdx["->"]=1;
$4="containment".__minus_gt(_st(_st(self["@splitter"])._asJQuery())._parent());
$ctx1.sendIdx["->"]=2;
$5="helper".__minus_gt("clone");
$ctx1.sendIdx["->"]=3;
$6="start".__minus_gt((function(e,ui){
return smalltalk.withContext(function($ctx2) {
return self._startResizing_(_st(ui)._helper());
}, function($ctx2) {$ctx2.fillBlock({e:e,ui:ui},$ctx1,1)})}));
$ctx1.sendIdx["->"]=4;
$2=smalltalk.HashedCollection._from_([$3,$4,$5,$6,"drag".__minus_gt((function(e,ui){
return smalltalk.withContext(function($ctx2) {
return self._resize_(_st(_st(ui)._offset())._top());
}, function($ctx2) {$ctx2.fillBlock({e:e,ui:ui},$ctx1,2)})}))]);
_st($1)._draggable_($2);
return self}, function($ctx1) {$ctx1.fill(self,"setupSplitter",{},smalltalk.HLHorizontalSplitter)})},
args: [],
source: "setupSplitter\x0a\x09splitter asJQuery draggable: #{ \x0a    \x09'axis' -> 'y'. \x0a        'containment' -> splitter asJQuery parent.\x0a        'helper' -> 'clone'.\x0a        'start' -> [ :e :ui | self startResizing: ui helper ].\x0a        'drag' -> [ :e :ui | self resize: ui offset top ] }",
messageSends: ["draggable:", "asJQuery", "->", "parent", "startResizing:", "helper", "resize:", "top", "offset"],
referencedClasses: []
}),
smalltalk.HLHorizontalSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "startResizing:",
category: 'actions',
fn: function (aSplitter){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(aSplitter)._width_(_st(_st(self["@splitter"])._asJQuery())._width());
return self}, function($ctx1) {$ctx1.fill(self,"startResizing:",{aSplitter:aSplitter},smalltalk.HLHorizontalSplitter)})},
args: ["aSplitter"],
source: "startResizing: aSplitter\x0a\x09aSplitter width: splitter asJQuery width",
messageSends: ["width:", "width", "asJQuery"],
referencedClasses: []
}),
smalltalk.HLHorizontalSplitter);



smalltalk.addClass('HLVerticalSplitter', smalltalk.HLSplitter, [], 'Helios-Layout');
smalltalk.addMethod(
smalltalk.method({
selector: "cssClass",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(smalltalk.HLVerticalSplitter.superclass.fn.prototype._cssClass.apply(_st(self), [])).__comma(" vertical");
return $1;
}, function($ctx1) {$ctx1.fill(self,"cssClass",{},smalltalk.HLVerticalSplitter)})},
args: [],
source: "cssClass\x0a\x09^ super cssClass, ' vertical'",
messageSends: [",", "cssClass"],
referencedClasses: []
}),
smalltalk.HLVerticalSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "panesCssClass",
category: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(smalltalk.HLVerticalSplitter.superclass.fn.prototype._panesCssClass.apply(_st(self), [])).__comma(" vertical");
return $1;
}, function($ctx1) {$ctx1.fill(self,"panesCssClass",{},smalltalk.HLVerticalSplitter)})},
args: [],
source: "panesCssClass\x0a\x09^ super panesCssClass, ' vertical'",
messageSends: [",", "panesCssClass"],
referencedClasses: []
}),
smalltalk.HLVerticalSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "resize",
category: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._resize_(_st(_st(self["@splitter"])._asJQuery())._css_("left"));
return self}, function($ctx1) {$ctx1.fill(self,"resize",{},smalltalk.HLVerticalSplitter)})},
args: [],
source: "resize\x0a\x09self resize: (splitter asJQuery css: 'left')",
messageSends: ["resize:", "css:", "asJQuery"],
referencedClasses: []
}),
smalltalk.HLVerticalSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "resize:",
category: 'actions',
fn: function (anInteger){
var self=this;
var container,size,offset,percentage;
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$2,$6,$7,$5,$4,$8,$10,$9,$11,$14,$13,$12;
$1=_st(self["@firstPane"])._asJQuery();
$ctx1.sendIdx["asJQuery"]=1;
container=_st($1)._parent();
$3=_st(self["@firstPane"])._asJQuery();
$ctx1.sendIdx["asJQuery"]=2;
$2=_st($3)._offset();
offset=_st($2)._left();
size=_st(container)._width();
$6=size;
$7=_st(anInteger).__minus(offset);
$ctx1.sendIdx["-"]=2;
$5=_st($6).__minus($7);
$ctx1.sendIdx["-"]=1;
$4=_st($5).__slash(size);
percentage=_st($4).__star((100));
percentage=(80)._min_(_st(percentage)._max_((20)));
$8=_st(self["@firstPane"])._asJQuery();
$ctx1.sendIdx["asJQuery"]=3;
$10=_st(percentage)._asString();
$ctx1.sendIdx["asString"]=1;
$9=_st($10).__comma("%");
$ctx1.sendIdx[","]=1;
_st($8)._css_put_("right",$9);
$ctx1.sendIdx["css:put:"]=1;
$11=_st(self["@splitter"])._asJQuery();
$ctx1.sendIdx["asJQuery"]=4;
$14=(100).__minus(percentage);
$ctx1.sendIdx["-"]=3;
$13=_st($14)._asString();
$ctx1.sendIdx["asString"]=2;
$12=_st($13).__comma("%");
$ctx1.sendIdx[","]=2;
_st($11)._css_put_("left",$12);
$ctx1.sendIdx["css:put:"]=2;
_st(_st(self["@secondPane"])._asJQuery())._css_put_("left",_st(_st((100).__minus(percentage))._asString()).__comma("%"));
return self}, function($ctx1) {$ctx1.fill(self,"resize:",{anInteger:anInteger,container:container,size:size,offset:offset,percentage:percentage},smalltalk.HLVerticalSplitter)})},
args: ["anInteger"],
source: "resize: anInteger\x0a\x09| container size offset percentage |\x0a    \x0a    container := firstPane asJQuery parent.\x0a\x09offset := firstPane asJQuery offset left.\x0a    size := container width.\x0a\x09\x0a\x09percentage := (size - (anInteger - offset)) / size * 100.\x0a\x09percentage := 80 min: (percentage max: 20).\x0a\x09\x0a    firstPane asJQuery css: 'right' put: percentage asString, '%'.\x0a\x09\x0a\x09splitter asJQuery css: 'left' put: (100 - percentage) asString, '%'.\x0a\x09secondPane asJQuery css: 'left' put: (100 - percentage) asString, '%'",
messageSends: ["parent", "asJQuery", "left", "offset", "width", "*", "/", "-", "min:", "max:", "css:put:", ",", "asString"],
referencedClasses: []
}),
smalltalk.HLVerticalSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "setupSplitter",
category: 'rendering',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$4,$5,$6,$2;
$1=_st(self["@splitter"])._asJQuery();
$ctx1.sendIdx["asJQuery"]=1;
$3="axis".__minus_gt("x");
$ctx1.sendIdx["->"]=1;
$4="containment".__minus_gt(_st(_st(self["@splitter"])._asJQuery())._parent());
$ctx1.sendIdx["->"]=2;
$5="helper".__minus_gt("clone");
$ctx1.sendIdx["->"]=3;
$6="start".__minus_gt((function(e,ui){
return smalltalk.withContext(function($ctx2) {
return self._startResizing_(_st(ui)._helper());
}, function($ctx2) {$ctx2.fillBlock({e:e,ui:ui},$ctx1,1)})}));
$ctx1.sendIdx["->"]=4;
$2=smalltalk.HashedCollection._from_([$3,$4,$5,$6,"drag".__minus_gt((function(e,ui){
return smalltalk.withContext(function($ctx2) {
return self._resize_(_st(_st(ui)._offset())._left());
}, function($ctx2) {$ctx2.fillBlock({e:e,ui:ui},$ctx1,2)})}))]);
_st($1)._draggable_($2);
return self}, function($ctx1) {$ctx1.fill(self,"setupSplitter",{},smalltalk.HLVerticalSplitter)})},
args: [],
source: "setupSplitter\x0a\x09splitter asJQuery draggable: #{ \x0a    \x09'axis' -> 'x'. \x0a        'containment' -> splitter asJQuery parent.\x0a        'helper' -> 'clone'.\x0a        'start' -> [ :e :ui | self startResizing: ui helper ].\x0a        'drag' -> [ :e :ui | self resize: (ui offset left) ] }",
messageSends: ["draggable:", "asJQuery", "->", "parent", "startResizing:", "helper", "resize:", "left", "offset"],
referencedClasses: []
}),
smalltalk.HLVerticalSplitter);

smalltalk.addMethod(
smalltalk.method({
selector: "startResizing:",
category: 'actions',
fn: function (aSplitter){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(aSplitter)._height_(_st(_st(self["@splitter"])._asJQuery())._height());
return self}, function($ctx1) {$ctx1.fill(self,"startResizing:",{aSplitter:aSplitter},smalltalk.HLVerticalSplitter)})},
args: ["aSplitter"],
source: "startResizing: aSplitter\x0a\x09aSplitter height: splitter asJQuery height",
messageSends: ["height:", "height", "asJQuery"],
referencedClasses: []
}),
smalltalk.HLVerticalSplitter);


smalltalk.addMethod(
smalltalk.method({
selector: "isHeliosSplitter",
category: '*Helios-Layout',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return false;
}, function($ctx1) {$ctx1.fill(self,"isHeliosSplitter",{},smalltalk.Object)})},
args: [],
source: "isHeliosSplitter\x0a\x09^ false",
messageSends: [],
referencedClasses: []
}),
smalltalk.Object);

});
