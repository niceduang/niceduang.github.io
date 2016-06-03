$(document).ready(function() {
	var i = 0;
	var a, b = 1;
	var all_pic_li = $(".banner_pic_ul li").length - 1;
	$("#top_select_area_ul li").on("click", function() { //选择地区
		$(this).addClass("on").siblings().removeClass('on');
		$("#top_select_area span a").html($(this).html());
	});
	$("#close_top_ad").on("click", function() { //隐藏广告
		$("#top_ad_box").animate({
			opacity: "0"
		}, "slow", function() {
			$("#top_ad_box").hide();
		})
	});
	$("#search_strip").focus(function() { //搜索框获取焦点时,默认文字隐藏
		$(this).attr("value", "");
	});
	$("#search_strip").blur(function() {
		$(this).attr("value", "荣耀A3");
	});
	function banner_pic_change() {
		a = 0
		$(".banner_pic_ul li").eq(i).animate({
			opacity: "1"
		}).siblings().animate({
			opacity: "0"
		}, function() {
			a = 1;
		});
		$(".banner_but_ul li").eq(i).css("background", "#B1191A").siblings().css("background", "#3E3E3E")
	};
	banner_pic_change();

	function banner_pic_change_self() {
		i++;
		if (i > all_pic_li) {
			i = 0;
		}
		banner_pic_change()
	};
	banner_pic_change_time = setInterval(banner_pic_change_self, 2500);
	$(".main_banner_wrap").on("mouseover", function() { //鼠标进入轮播区域时，自动切换暂停
		clearInterval(banner_pic_change_time);
	});
	$(".main_banner_wrap").on("mouseout", function() { //鼠标离开轮播区域时，自动切换继续
		banner_pic_change_time = setInterval(banner_pic_change_self, 2500);
	});
	$(".main_banner_next").on("click", function() {
		if (a == 1) { //防止用户多次点击时轮播次数过多
			i += 1
			if (i > all_pic_li) {
				i = 0;
			}
			banner_pic_change()
		}
	});
	$(".main_banner_prev").on("click", function() {
		if (a == 1) {
			i -= 1
			if (i < 0) {
				i = all_pic_li;
			}
			banner_pic_change()
		}
	});
	$(".main_bottom_ad_prev").on("click", function() {
		var li_w = $("#main_bottom_ad>li").width();
		var left = (-li_w);
		$("#main_bottom_ad").animate({
			left: left + "px"
		}, function() {
			$("#main_bottom_ad>li").eq(0).appendTo("#main_bottom_ad"); //把第一个LI搬到尾部
			$("#main_bottom_ad").css("left", "0px"); //重置UL的位置
		});
	});
	$(".main_bottom_ad_next").on("click", function() {
		var li_w = $("#main_bottom_ad>li").width();
		var li_length = $("#main_bottom_ad>li").length - 1;
		$("#main_bottom_ad>li").eq(li_length).prependTo("#main_bottom_ad"); //移动前先把最后一个LI搬到UL前面，补齐UL向右移动后前面的缺口
		$("#main_bottom_ad").css("left", -li_w + "px") //搬完后重置LEFT，不然不能产生动画哦
		$("#main_bottom_ad").animate({
			left: "0px"
		});
		console.log(li_length)
	});

	function move_sild_cart() { //打开或关闭侧边栏
		if (b == 0) {
			$("#side_cart_wrap").animate({
				right: "0px"
			})
		} else {
			$("#side_cart_wrap").animate({
				right: "-280px"
			})
		}
	};
	$("#side_cart_open").on("click", function() {
		if (b == 1) {
			b = 0;
		} else {
			b = 1;
		}
		move_sild_cart();
	});
	$("#side_cart_close").on("click", function() {
		b = 1;
		move_sild_cart();
	});
	$(document).on("click", function(e) {
		if ($(e.target).closest("#side_cart_wrap").length == 0) {
			b = 1;
			move_sild_cart();
		}
	});
	/*通用轮播-开始-无缝滚动式*/
	var a_i = 0;
	$(".shuffling_next").on("click", function() {
		var parents = $(this).parents(".floor").attr("id"); //获取当前楼层
		var ul = $("#" + parents).find(".shuffling_ul"); //找到当前楼层里的轮播
		var li = $("#" + parents).find(".shuffling_ul>li"); //找到当前楼层里轮播的li
		var li_w = li.width(); //获取li的宽度
		var li_length = li.length - 1; //获取li的数量
		var left = (-li_w);
		ul.animate({
			left: left + "px"
		}, function() {
			li.eq(0).appendTo(".shuffling_ul"); //把第一个LI搬到尾部
			ul.css("left", "0px"); //重置UL的位置
		});
		a_i++;
		if (a_i >= li_length + 1) {
			a_i = 0;
		}
		$("#" + parents).find(".shuffling_i_li").eq(a_i).addClass("on_li").siblings().removeClass("on_li");
	});
	$(".shuffling_prev").on("click", function() {
		var parents = $(this).parents(".floor").attr("id"); //获取当前楼层
		var ul = $("#" + parents).find(".shuffling_ul"); //找到当前楼层里的轮播
		var li = $("#" + parents).find(".shuffling_ul>li"); //找到当前楼层里轮播的li
		var li_w = li.width(); //获取li的宽度
		var li_length = li.length - 1; //获取li的数量
		li.eq(li_length).prependTo(".shuffling_ul"); //移动前先把最后一个LI搬到UL前面，补齐UL向右移动后前面的缺口
		ul.css("left", -li_w + "px") //搬完后重置LEFT，不然不能产生动画哦
		ul.animate({
			left: "0px"
		});
		a_i--;
		if (a_i < 0) {
			a_i = li_length;
		}
		$("#" + parents).find(".shuffling_i_li").eq(a_i).addClass("on_li").siblings().removeClass("on_li");
	});

	function floor_shuffling_self() { //带动页面所有的共用轮播
		var all_shuffling = $(document).find(".shuffling").length;
		for (var floor = 1; floor < all_shuffling + 1; floor++) {
			var _floor = "#floor_" + floor;
			shuffling_self(_floor);
		}
	};
	shuffling_self_time = setInterval(floor_shuffling_self, 2000); //自动切换
	function shuffling_self(_floor) {
		var parents = $(_floor) //获取当前楼层
		var ul = parents.find(".shuffling_ul"); //找到当前楼层里的轮播
		var li = ul.find("li"); //找到当前楼层里轮播的li
		var li_w = li.width(); //获取li的宽度
		var li_length = li.length - 1; //获取li的数量
		var left = (-li_w);
		ul.animate({
			left: left + "px"
		}, function() {
			li.eq(0).appendTo(ul); //把第一个LI搬到尾部
			ul.css("left", "0px"); //重置UL的位置
		});
		a_i++;
		if (a_i >= li_length + 1) {
			a_i = 0;
		}
		parents.find(".shuffling_i_li").eq(a_i).addClass("on_li").siblings().removeClass("on_li");
	};
	$(".shuffling").on("mouseover", function() { //鼠标进入轮播区域时，自动切换暂停,懒得一个个找了，全部暂停吧。
		clearInterval(shuffling_self_time);
	});
	$(".shuffling").on("mouseout", function() { //鼠标离开轮播区域时，自动切换继续
		shuffling_self_time = setInterval(floor_shuffling_self, 2000);
	});
		/*通用轮播--结束*/
		/*楼层标签页切换-开始-*/
	$(".floor_list>li").on("mouseover", function() {
		var index = $(this).index();
		var parents = $(this).parents(".floor").attr("id"); //获取当前楼层
		var ul = $("#" + parents).find(".floor_main"); //找到当前楼层的标签页，执行显示或隐藏
		ul.eq(index).show().siblings().hide(); //
		$(this).addClass("on_floor_list").siblings().removeClass("on_floor_list");
	});
		/*楼层标签页切换-结束-*/
		/*晒单切换-开始-*/

	function hot_praise_change() {
		var ul = $(".today_hot_praise_ul");
		var li = $(".today_hot_praise_ul>li");
		var li_h = li.height(); //获取li的高度
		var li_length = li.length - 1; //获取li的数量
		li.eq(li_length).prependTo(".today_hot_praise_ul"); //移动前先把最后一个LI搬到UL前面，补齐UL向下移动后上面的缺口
		ul.css("top", (-li_h) + "px") //搬完后重置LEFT，不然不能产生动画哦
		ul.animate({
			top: "0px"
		});
	};
	hot_praise_time = setInterval(hot_praise_change, 2000); //自动切换
	$(".today_hot_praise_wrap").on("mouseover", function() { //鼠标进入轮播区域时，自动切换暂停,懒得一个个找了，全部暂停吧。
		clearInterval(hot_praise_time);
	});
	$(".today_hot_praise_wrap").on("mouseout", function() { //鼠标离开轮播区域时，自动切换继续
		hot_praise_time = setInterval(hot_praise_change, 2000);
	});
	/*晒单切换-结束-*/
	/*楼层按钮-开始-*/
	function floor_list_position() {
		var main_left = $("#main_menu").offset().left; //获取视觉页面与窗口右边的距离
		var window_h = $(window).height(); //获取窗口高度
		var floor_list = $("#floor_list_wrap").height(); //获取盒子高度
		var cart_but_wrap = $(".side_cart_but_wrap").height(); //获取盒子高度
		$("#floor_list_wrap").css({
			"left": (main_left - 35) + "px",
			"top": (window_h * 0.5 - floor_list * 0.5) + "px"
		}); //设置楼层按钮的位置
		$(".side_cart_but_wrap").css("top", (window_h * 0.5 - cart_but_wrap * 0.5) + "px");
	};
	floor_list_position();
	$(window).resize(function() { //窗口变化时调整悬浮盒子的位置
		floor_list_position();
	});
	$("#floor_list_wrap li").on("click", function() {
		var li_index = $(this).index();
		var floor_index = "#floor_" + (li_index + 1);
		$("html,body").animate({
			scrollTop: $(floor_index).offset().top
		}, 1000);
		$(this).find("a").addClass("on_floor");
		$(this).siblings().find("a").removeClass("on_floor");
	});
	$(window).scroll(function() { //侦听窗口滚动
		var window_s = $(window).scrollTop();
		var jd_special_margin_top = $("#jd_special_wrap").offset().top;
		if (jd_special_margin_top <= window_s) {
			$("#floor_list_wrap").css("display", "block");
		} else {
			$("#floor_list_wrap").css("display", "none");
		}
	});
	/*楼层按钮-结束-*/
});