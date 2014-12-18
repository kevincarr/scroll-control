/*
organize-effect - 12/09/2014
By Kevin Carr 
http://www.kevincarr.com/
*/
var windowObj=$(window);
var stageTop = windowObj.scrollTop();
var stageHeight = windowObj.height();
var stageWidth  = windowObj.width();
// set moving objects
var oOrgObjA = $('#orgObjA');
var oOrgObjB = $('#orgObjB');
var oOrgObjC = $('#orgObjC');
var oOrgObjD = $('#orgObjD');
var oOrgObjE = $('#orgObjE');
var oOrgObjF = $('#orgObjF');
var oOrgObjG = $('#orgObjG');
var oOrgObjH = $('#orgObjH');
var oOrgObjI = $('#orgObjI');
var oOrgObjJ = $('#orgObjJ');
var i=0;
var sceneMin=0; // this is the closest low scene
var sceneMax=0; // this is the closest high scene
var orgList=[];
//		Break down of array
//			orgList[$(OBJECT)][ID_OF_DIV,DIV_X,DIV_Y,DIV_ROTATION,DIV_ALPHA];
var orgListMin=[];
var orgListMax=[];
// Scene 1
i=0;
orgListMin=[];
orgListMin.push([0]); // starting pixel
orgListMin.push(['#orgObjA',310,50,10,100]);
orgListMin.push(['#orgObjB',520,100,45,100]);
orgListMin.push(['#orgObjC',330,150,0,100]);
orgListMin.push(['#orgObjD',440,200,-20,100]);
orgListMin.push(['#orgObjE',250,250,30,100]);
orgListMin.push(['#orgObjF',560,300,-30,100]);
orgListMin.push(['#orgObjG',370,350,0,100]);
orgListMin.push(['#orgObjH',180,400,-45,100]);
orgListMin.push(['#orgObjI',490,450,20,100]);
orgListMin.push(['#orgObjJ',600,500,-10,100]);
orgList[i]=orgListMin;
// Scene 2
i++;
orgListMin=[];
orgListMin.push([400]); // starting pixel
orgListMin.push(['#orgObjA',401,600,0,50]);
orgListMin.push(['#orgObjB',402,600,0,50]);
orgListMin.push(['#orgObjC',403,600,0,50]);
orgListMin.push(['#orgObjD',404,600,0,50]);
orgListMin.push(['#orgObjE',405,600,0,50]);
orgListMin.push(['#orgObjF',406,600,0,50]);
orgListMin.push(['#orgObjG',407,600,0,50]);
orgListMin.push(['#orgObjH',408,600,0,50]);
orgListMin.push(['#orgObjI',409,600,0,50]);
orgListMin.push(['#orgObjJ',400,600,0,50]);
orgList[i]=orgListMin;
// Scene 3
i++;
orgListMin=[];
orgListMin.push([800]); // starting pixel
orgListMin.push(['#orgObjA',300,1050,0,100]);
orgListMin.push(['#orgObjB',550,1100,0,100]);
orgListMin.push(['#orgObjC',300,1150,0,100]);
orgListMin.push(['#orgObjD',400,1200,0,100]);
orgListMin.push(['#orgObjE',200,1250,0,100]);
orgListMin.push(['#orgObjF',540,1300,0,100]);
orgListMin.push(['#orgObjG',300,1350,0,100]);
orgListMin.push(['#orgObjH',100,1400,0,100]);
orgListMin.push(['#orgObjI',400,1450,0,100]);
orgListMin.push(['#orgObjJ',600,1500,0,100]);
orgList[i]=orgListMin;
// Scene 4
i++;
orgListMin=[];
orgListMin.push([1200]); // starting pixel
orgListMin.push(['#orgObjA',10,2000,45,100]);
orgListMin.push(['#orgObjB',10,2000,45,100]);
orgListMin.push(['#orgObjC',700,2000,-45,100]);
orgListMin.push(['#orgObjI',700,2000,-45,100]);
orgListMin.push(['#orgObjJ',600,2000,90,100]);
orgList[i]=orgListMin;
//
orgListMin=[];
function fnSceneNum(){
console.log('fnSceneNum()');
	var i=0;
	var j=1;
	var isTest=0;
	var tempArr=[];
	// get the sceen number
	sceneMin=0;
	for(i=0;i<orgList.length;i++){
		if(stageTop>Number(orgList[i][0])){
			sceneMin=i;
		} else {
			break;
		}
	}
	//
	sceneMax=sceneMin;
	if(sceneMax<orgList.length-1){
		sceneMax=sceneMax+1;
	}
	orgListMin=orgList[sceneMin];
	orgListMax=orgList[sceneMax];
	// make sure all of the items in listMax are in ListMin
	for(i=1;i<orgListMax.length;i++){
		isTest=0;
		for(var j=1;j<orgListMin.length;j++){
			if(orgListMin[j][0]==orgListMax[i][0]){
				isTest=1;
			}
		}
		if(isTest==0){
			orgListMin.push(orgListMax[i]);
		}
	}
	// make sure all of the items in listMin are in ListMax
	for(i=1;i<orgListMin.length;i++){
		isTest=0;
		for(var j=1;j<orgListMax.length;j++){
			if(orgListMin[i][0]==orgListMax[j][0]){
				isTest=1;
			}
		}
		if(isTest==0){
			orgListMax.push(orgListMin[i]);
		}
	}
	// remove starting position then sort array, then add starting position back
	isTest=orgListMin.shift();
	orgListMin.sort();
	orgListMin.unshift(isTest); 
	isTest=orgListMax.shift();
	orgListMax.sort();
	orgListMax.unshift(isTest); 
}
function setObjects(){
	stageTop = windowObj.scrollTop();
	if(Number(orgListMin[0])>stageTop){
		fnSceneNum();
	}
	if(stageTop>Number(orgListMax[0])){
		if(sceneMax<orgList.length-1){
			fnSceneNum();
		}
	}
	var topDiff = Number(orgListMax[0])-Number(orgListMin[0]);
	var topMove = stageTop-orgListMin[0];
	var topMove = stageTop-orgListMin[0];
	var percentDiff = topMove/topDiff;
	// if the top is higher than the end point, set the difference to 100%
	if(stageTop>orgListMax[0]){
		percentDiff = 1;
	}	
	for(var i=1;i<orgListMin.length;i++){
		myObj = $(orgListMin[i][0]);
		// move, left, top and opacity
		myObj.css({"left":(((orgListMax[i][1]-orgListMin[i][1])*percentDiff)+orgListMin[i][1])+'px',"top":(((orgListMax[i][2]-orgListMin[i][2])*percentDiff)+orgListMin[i][2])+'px', 'opacity': (Number((((orgListMax[i][4]-orgListMin[i][4])*percentDiff)+orgListMin[i][4])*.01)),'filter': 'alpha(opacity='+Number(((orgListMax[i][4]-orgListMin[i][4])*percentDiff)+orgListMin[i][4])+')'});
		// rotate
		myObj.css({webkitTransform : 'rotate('+(((orgListMax[i][3]-orgListMin[i][3])*percentDiff)+orgListMin[i][3])+'deg)'}); 
		myObj.css({mozTransform    : 'rotate('+(((orgListMax[i][3]-orgListMin[i][3])*percentDiff)+orgListMin[i][3])+'deg)'}); 
		myObj.css({msTransform     : 'rotate('+(((orgListMax[i][3]-orgListMin[i][3])*percentDiff)+orgListMin[i][3])+'deg)'}); 
		myObj.css({oTransform      : 'rotate('+(((orgListMax[i][3]-orgListMin[i][3])*percentDiff)+orgListMin[i][3])+'deg)'}); 
		myObj.css({transform       : 'rotate('+(((orgListMax[i][3]-orgListMin[i][3])*percentDiff)+orgListMin[i][3])+'deg)'}); 
	}
}

isTouch='ontouchstart' in window || 'onmsgesturechange' in window;
//isTouch = false; // *** FOR TESTING ***

if(isTouch){
	var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
	html.css('overflow', 'hidden');
//$(".title").html('Is Touch');
	touchScrollObj.bind('touchmove',function(e){
		e.preventDefault();
		isTouch = true;
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
//$(".title").html('Touching Me');
		if(!isDown){
			isDown=true;
			mouseY_a = touch.pageY;
			stageTop = windowObj.scrollTop();
			bd_Top_a = stageTop;
		}
		windowObj.scrollTop(-(touch.pageY-mouseY_a)+stageTop);
	});
	touchScrollObj.bind('touchend', function (e){
//$(".title").html('Stop Touching Me');
		e.preventDefault();
		isDown=false;
	});
}
$(document).ready(function(){
	fnSceneNum();
	setObjects();
	windowObj.scroll(function() {
		setObjects();
	});
});
