Smalltalk current createPackage: 'CitIndex'!
Widget subclass: #Application
	instanceVariableNames: 'searchWidget'
	package: 'CitIndex'!

!Application methodsFor: 'rendering'!

renderOn: html
	html with: self searchWidget.
	html button onClick: [ Browser open ]; with: 'Browser'.
! !

!Application methodsFor: 'widgets'!

searchWidget
	^ searchWidget ifNil: [ searchWidget := SearchWidget new ]
! !

!Application class methodsFor: 'startup'!

start
	self new appendToJQuery: 'body' asJQuery
! !

Object subclass: #SearchModel
	instanceVariableNames: ''
	package: 'CitIndex'!

!SearchModel methodsFor: 'operations'!

search: aString callback: aBlock
	jQuery 
		getJSON: 'search/*/*/' , aString 
		success: [ :data | 
			aBlock value: (data ifNotEmpty: [ data collect: [ :each | each fields path replace: '\\' with: '' ]] ifEmpty: [ 'no results' ]) ]
! !

Widget subclass: #SearchWidget
	instanceVariableNames: 'model'
	package: 'CitIndex'!

!SearchWidget methodsFor: 'accessing'!

model
	^ model ifNil: [ model := SearchModel new ]
! !

!SearchWidget methodsFor: 'rendering'!

renderOn: html
	| input |
	input := html input.
	input onChange: [ :evt | 
		self model 
			search: 
				input asJQuery val 
			callback: [ :results | 
				results do: [ :each | 
					'body' asJQuery append: (html a href: each; with: each) ]]]
! !

