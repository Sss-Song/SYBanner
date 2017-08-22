
//  返回浏览器的宽度和高度(兼容版本)
function client() {
	if(window.innerHeight !== undefined) {
		return {
			"width": window.innerWidth,
			"height": window.innerHeight
		}
	} else if(document.compatMode === "CSS1Compat") {
		return {
			"width": document.documentElement.clientWidth,
			"height": document.documentElement.clientHeight
		}
	} else {
		return {
			"width": document.body.clientWidth,
			"height": document.body.clientHeight
		}
	}
}

//显示某个元素
function show(ele){
    ele.style.display = "block";
}

//隐藏某个元素
function hiden(ele){
	ele.style.display = "none";
}

//兼容方法获取元素的某个属性的值
function getStyle(ele, attr) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(ele, null)[attr];
	}
	return ele.currentStyle[attr];
}

// 缓动动画封装(可以传递多个属性,并且带有回调函数)
function animate(ele, json, fn) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		var bool = true;
		//遍历属性和值 每一个都处理
		for(var k in json) {
//			var leader = parseInt(getStyle(ele, k)) || 0;
            var leader;
            //判断如果属性为opacity的时候特殊获取值
            if(k === "opacity"){
                leader = getStyle(ele,k)*100 || 1;
            }else{
                leader = parseInt(getStyle(ele,k)) || 0;
            }
			var step = (json[k] - leader) / 10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            //复制的时候也要做特殊处理
            if(k === "opacity"){
                ele.style[k] = leader/100;
                ele.style.filter = "alpha(opacity="+leader+")"; //兼容IE678
            }else if(k === "zIndex"){  // 如果是层级 一下就赋值上去  不需要加动画
            	    ele.style.zIndex = json[k];
            }else{
                ele.style[k] = leader + "px";
            }
			if(json[k] !== leader) {
				bool = false;
			}
		}
		if(bool) {
			clearInterval(ele.timer);
			if(fn) {
				fn();
			}
		}
	}, 15);
	
}

