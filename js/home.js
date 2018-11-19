//http://tarruda.github.io/bootstrap-datetimepicker/

var region = ["https://staging.threal3d.com/api/v3",//beta
              "https://www.threal3d.com/api/v3",//tw
              "https://www.threal3d.net/api/v3",//cn
              "https://beam-API.threal3d.com/api/v3"];//us
var BASE_URL = region[0];
var page = 1 ;
var RadioStoryType = "image";
var IsNoData = false;

var queryHomeStory = function (query_page , type)
{ 
  $("#spinner").show();
  RadioStoryType = type;
  console.log("load page:" + query_page) ;
  console.log("type:" + type) ;
  $.ajax
  (
    {
      type: "GET",  //拿取下面網頁資料
      url: BASE_URL+"/guest/stories/feed?page=" + query_page + "&per_page=25&story_type=" + type,
      //contentType: 'application/json; charset=UTF-8', 

      success: function(data, status, jqXHR) 
      {
        IsNoData = false;
        if(data.length == 0)
          IsNoData = true;

        page = query_page + 1 ;  //成功的話，每按一次查訊就會再download下一頁資訊
        var str = "";
        var jump_url = "story_info.html?story_id=";
        for (var i = 0; i < data.length; i++) 
        {
          if(i % 5 == 0)  //秀五張然後換行
            str += "<tr>";
          var jump_url_with_id = "story_info.html?story_id=" + data[i]["id"];
          str += "<td>";         
          str += "<a href=\"" + jump_url_with_id + " \" class='thumbnail'>" ;
          
          // check storytype to show depthpic
          var email = data[i]["user"]["email"]
          if (RadioStoryType=="image") {
            if(email.startsWith("service") && email.endsWith("@theia.tw"))//startsWith()比對W要大寫
            {
              str += "<img src=\" " + data[i]["color"]["fit_160"] + " \"   onmouseover=\"src=' " + data[i]["depth"]["original"] + "'\" onmouseout=\"src='" + data[i]["color"]["fit_160"] + "'\"  class='redsolid' width=200>";
            }
            else {
              str += "<img src=\" " + data[i]["color"]["fit_160"] + " \" onmouseover=\"src=' " + data[i]["depth"]["original"] + "'\" onmouseout=\"src='" + data[i]["color"]["fit_160"] + "'\" width=200>";  
            } 
          }
          else {
            if(email.startsWith("service") && email.endsWith("@theia.tw"))//startsWith()比對W要大寫
            {
              str += "<img src=\" " + data[i]["color"]["fit_160"] + " \" class='redsolid' width=200>";
            }
            else {            
              str += "<img src=\" " + data[i]["color"]["fit_160"]  + "\" class='img-rounded' width=200>";
            }
          }          
          str += "</a>";
          str += "</td>";       
          if(i % 5 == 4 || i == data.length -1)
            str += "</tr>"; 
        }
        $("#spinner").hide(300); 
        $("#table_query_result").append(str);
        console.log(data);

        if ($.isEmptyObject(data)==true) 
        {
          $("#nomore").show();
        }
      },
      error: function(jqXHR, textStatus, errorThrown)
      { 
        $("#warning").show();
        if(jqXHR.status == 0)
        {
          
          var msg = "Please Enable Cross Origin"
          $("#warning_text").text(msg);
          
        }
        else
        {
          $("#warning").show();
          var msg = jqXHR.responseJSON["message"]
          $("#warning_text").text(msg);
        }
        console.log(jqXHR)
        $("#spinner").hide(300); 
      }
    }
  );
}
// 
function switchStoryType() 
{
  if($("#story_type_checkbox")[0].checked) {
    RadioStoryType = "video"
  }
  else {
    RadioStoryType = "image"
  }
  page = 1 ;
  $("#table_query_result").text("");
  queryHomeStory(page, RadioStoryType );
}
// 
var chooseBaseUrl = function (index)
{
  for (var i = 0; i < region.length; i++) {
    var temp = "#dropdown"+i
    $(temp).removeClass("active");
    if(i == index)
    {
      $(temp).addClass("active");
      BASE_URL = region[index]
      window.localStorage.setItem("region_index", index)
      window.localStorage.setItem("base_url", BASE_URL)
      
      if($("#story_type_checkbox")[0].checked) {
        RadioStoryType = "video"
      }
      else {
        RadioStoryType = "image"
      }
      page = 1;
      $("#table_query_result").text("");
      queryHomeStory(page, RadioStoryType );
    }  
  }
}

// 
$(document).ready
(
  function()
  { 
    var temp = window.localStorage.getItem("region_index");
    if(temp != undefined)
    {
      chooseBaseUrl(temp);
    }
    else
    {
      queryHomeStory(page, RadioStoryType);
    }  

    // bottom load more
    $(window).scroll(function () {
        if ($(document).height() <= $(window).scrollTop() + $(window).height()) 
        {
          if(IsNoData == false)
            queryHomeStory(page, RadioStoryType);
        }
    });

  }
);


