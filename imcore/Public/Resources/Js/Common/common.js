
$(function(){
	$(".mainNav>li").hover(function(){
		$(this).find("ul").show();
		$(".mainNav .subMainNav>li").find("ul").hide();
	}).mouseleave(function(){
		$(this).find("ul").hide();
		$(".mainNav .subMainNav>li").find("ul").hide();
	});
	
	$(".mainNav .subMainNav>li").hover(function(){
		$(this).find("ul").show();
	}).mouseleave(function(){
		$(this).find("ul").hide();
	});
	
});
$(document).ready(function () {
	var Tab = $("#projectsBoxTabs");
	var TabLi = $("#projectsBoxTabs").find("li");
	var Contentdiv = $("#projectsContent>div");
	for (i = 0; i < TabLi.length; i++) {
		TabLi[i].onclick = function () {
			$(this).addClass("current").siblings().removeClass("current");
			for (j = 0; j < TabLi.length; j++) {
				if (TabLi[j] == this) {
					$(Contentdiv[j]).siblings().hide();
					$(Contentdiv[j]).fadeIn("fast");
				}
			}
		}
	}
});
$(document).ready(function () {
	var Tab = $("#lessonsBoxTab");
	var TabLi = $("#lessonsBoxTab").find("li");
	var Contentdiv = $("#lessonsBox>div");
	for (i = 0; i < TabLi.length; i++) {
		TabLi[i].onclick = function () {
			$(this).addClass("current").siblings().removeClass("current");
			for (j = 0; j < TabLi.length; j++) {
				if (TabLi[j] == this) {
					$(Contentdiv[j]).siblings().hide();
					$(Contentdiv[j]).fadeIn("fast");
				}
			}
		}
	}
});
//回到顶部 js start
	var av_height = $(window).height();
	var av_width = $(window).width();
	var go_top= $("#returntop");
	var Gotop_w = go_top.width()+2;
	var Gotop_h = go_top.height()+2;
	var doc_width = 1000;
	var Gotop_x = (av_width>doc_width?0.5*av_width+0.5*doc_width:av_width-Gotop_w);
	var Gotop_y = av_height-Gotop_h;
	var ie6Hack = "<style>.goToTop{position:absolute; top:expression(documentElement.scrollTop+documentElement.clientHeight - this.offsetHeight-40);</style>}";
	if ($.browser.msie && ($.browser.version == "6.0")){
	$("body").append(ie6Hack);
	}
	function setGotop(){
	av_height = $(window).height();
	av_width = $(window).width();
	Gotop_y = av_height-Gotop_h-200;
	Gotop_x = (av_width>doc_width?0.5*av_width+0.5*doc_width:av_width-Gotop_w);
	if($(window).scrollTop()>600){
	go_top.fadeIn(200);
	}else{
	go_top.fadeOut(200);
	}
	if ($.browser.msie && ($.browser.version == "6.0")){
	go_top.animate({"left":Gotop_x},0);
	return false;
	}
	go_top.animate({"left":Gotop_x,"top":Gotop_y},0);
	}
	setGotop();
	$(window).resize(function(){
	setGotop();
	})
	$(window).scroll(function(){
	setGotop();
	})
	go_top.click(function(){
	$("html , body").animate({scrollTop:"0"},100);
	})
//回到顶部 js end
$(document).ready(function () {
		$("#closeBtn").click(function () {
		$("#weiXin").hide();
		})
	});
	
$(document).ready(function () {
		$("#200133live800177810").css({"z-index":9999,"left":"20px","position":"absolute"});
		$("#live800iconlink").parent().css({"z-index":9999,"left":"20px","position":"absolute"});
	});	
	

var scrollBox = {
	 box1:function(pId,id1,id2) {
			var speed_3 = 18;
			var direction="left";
			var tab_3 = document.getElementById(pId);
			var tab1_3 = document.getElementById(id1);
			var tab2_3 = document.getElementById(id2);
			tab2_3.innerHTML = tab1_3.innerHTML;
			function marquee_3() {
	 		switch(direction){
				case "left":
					if(tab2_3.offsetWidth - tab_3.scrollLeft <= 0){
					tab_3.scrollLeft -= tab1_3.offsetWidth;
					}
					else{
					tab_3.scrollLeft++;
					}
					break;
				case "right":
					if(tab_3.scrollLeft <= 0){
					tab_3.scrollLeft += tab2_3.offsetWidth;
					}
					else{
					tab_3.scrollLeft--;
					}
					break;
				}
	 	
	 		}
			var timer = setInterval(marquee_3,speed_3);
			tab_3.onmouseover = function(){
				clearInterval(timer);
			}
			tab_3.onmouseout = function(){
				timer = setInterval(marquee_3,speed_3);
			}
	 },
	 box2:function(pId,Id1,Id2) {
			var speed = 18;
			var direction="right";
			var tab = document.getElementById(pId);
			var tab1 = document.getElementById(Id1);
			var tab2 = document.getElementById(Id2);
			
			tab2.innerHTML = tab1.innerHTML;
			
			function marquee() {
	 			switch(direction){
					case "left":
						if(tab2.offsetWidth - tab.scrollLeft <= 0){
						tab.scrollLeft -= tab1.offsetWidth;
						}
						else{
						tab.scrollLeft++;
						}
						break;
					case "right":
						if(tab.scrollLeft <= 0){
						tab.scrollLeft += tab2.offsetWidth;
						}
						else{
						tab.scrollLeft--;
						}
						break;
				}
	 	
	 		}
			var timer = setInterval(marquee,speed);
			tab.onmouseover = function(){
				clearInterval(timer);
			}
			tab.onmouseout = function(){
				timer = setInterval(marquee,speed);
			}
			
	 }
	 
	
	}
