var calendar = document.getElementById("calendar");
var next = document.getElementById("next");
var last = document.getElementById("last");
var date = new Date();
var nowDate = new Date();
var day = document.getElementsByClassName("date");
var lastRow = document.getElementsByName("lastrow");
var flagOfShow = 0;

show();

function show(){
	if(arguments.callee.caller == null)
		flagOfShow = 0;
	else if(arguments.callee.caller.name=="showNext")
		flagOfShow ++;
	else if(arguments.callee.caller.name=="showLast")
		flagOfShow --;
	for(i=0;i<lastRow.length;i++){
		lastRow[i].style.display = "table-cell"; //默认隐藏最后一行
	}
	document.getElementById("month").innerHTML = trans(date.getMonth()) + "<br />" + date.getFullYear();
	for(i=0;i<day.length;i++){
		day[i].innerText = "";
	}
	var tempDate = new Date(date);
	var n = 1;
	for(i=0;i<day.length;i++){
		day[i].style.backgroundColor = "lightgray";
	}
	for(i = tempDate.getDay(tempDate.setDate(1));i<day.length;i++){
		day[i].innerText = n;
		day[i].style.backgroundColor = "lightgray";
		if(n === nowDate.getDate() && flagOfShow==0){
			day[i].style.backgroundColor = "#00CC99";
			day[i].value="1";
		}
		if(n === daysInMonth(date.getFullYear(),date.getMonth()))
			break;
		n++;
	}
	if(lastRow[0].innerText==""){
		for(i=0;i<lastRow.length;i++){
			lastRow[i].style.display = "none";  //隐藏最后一行
		}
	}
}

//显示下个月
function showNext(){
	date.setDate(1);
	if(date.getMonth()<12){
		date.setMonth(date.getMonth()+1);
	}
	else{
		date.setFullYear(date.getFullYear+1);
		date.setMonth(0);
	}
	show();
}

//显示上个月
function showLast(){
	if(date.getMonth()>=0){
		date.setMonth(date.getMonth()-1);
	}
	else{
		date.setFullYear(date.getFullYear-1);
		date.setMonth(11);
	}
	show();
}

//返回每月天数
function daysInMonth(y,m){
	var month = [31,28,31,30,31,30,31,31,30,31,30,31];
	if((y%400==0) || (y%100!=0 && y%4==0)){
		month[1] = 29;
	}
	return month[m];
}

//月份名称转换
function trans(m){
	switch(m){
		case 0: return "January";
		case 1: return "February";
		case 2: return "March";
		case 3: return "April";
		case 4: return "May";
		case 5: return "June";
		case 6: return "July";
		case 7: return "August";
		case 8: return "September";
		case 9: return "October";
		case 10:return "November";
		case 11:return "December";
	}
}

//点击日期事件
function clickDate(e){
	var theEvent = window.event || e;
    var srcElement = theEvent.srcElement;
    if (!srcElement) {
       srcElement = theEvent.target;
    }
    var dateElem = document.getElementsByClassName("date");
    if(srcElement.className == "date" && srcElement.innerText != "" && (flagOfShow>0 || (flagOfShow==0 && srcElement.innerText >= nowDate.getDate()))){
    	for(i=0;i<dateElem.length;i++){
    		dateElem[i].value = "0";
    	}  
    	for(i=0;i<dateElem.length;i++){
    		dateElem[i].style.backgroundColor = "lightgray";
    	}   	
    	srcElement.style.backgroundColor = "#00CC99";
    	srcElement.value="1";
    }
}

//变为橘色
function changeColor(e){
	var theEvent = window.event || e;
    var srcElement = theEvent.srcElement;
    if (!srcElement) {
       srcElement = theEvent.target;
    }
    if(srcElement.className == "date" && srcElement.innerText != ""){
    	var dateElem = document.getElementsByClassName("date");
    	for(i=0;i<dateElem.length;i++){
    		if(dateElem[i].value != "1"){
    			dateElem[i].style.backgroundColor = "lightgray";
    		}
    	}   
    	if(srcElement.value != "1"){
    		srcElement.style.backgroundColor = "#fa9600";
    	}    	
    }
}

//恢复初始颜色
function recoveryColor(e){
	var theEvent = window.event || e;
    var srcElement = theEvent.srcElement;
    if (!srcElement) {
       srcElement = theEvent.target;
    }
    if(srcElement.value != "1" && srcElement.className == "date" && srcElement.innerText != ""){
    	srcElement.style.backgroundColor = "lightgray";
    }   
}

calendar.addEventListener("click",clickDate);
next.addEventListener("click",showNext);
last.addEventListener("click",showLast);
calendar.addEventListener("mouseover",changeColor);
calendar.addEventListener("mouseout",recoveryColor);