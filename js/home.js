//http://tarruda.github.io/bootstrap-datetimepicker/
var region = ["https://staging.threal3d.com/api/v3",
              "https://www.threal3d.com/api/v3",
              "https://www.threal3d.net/api/v3",
              "https://beam-API.threal3d.com/api/v3"];
var BASE_URL = region[0];
var page = 1 ;
// 
 
  RadioStoryType = "image";
  console.log("default type:"+ RadioStoryType);

// 

var onBtnQueryHome = function (e)
{ 
  $("#spinner").show(500);     
  console.log("load page:" + page) ;
  console.log("type:" + RadioStoryType) ;
  $.ajax
  (
    {
      type: "GET",  //拿取下面網頁資料
      url: BASE_URL+"/guest/stories/feed?page=" + page + "&per_page=25&story_type="+RadioStoryType,
      //contentType: 'application/json; charset=UTF-8', 

      success: function(data, status, jqXHR) 
      {

        page = page + 1 ;  //成功的話，每按一次查訊就會再download下一頁資訊

        var str = "";
        var jump_url = "story_info.html?story_id=";
        

        for (var i = 0; i < data.length; i++) 
        {
          if(i % 5 == 0)  //秀五張然後換行
            str += "<tr>";

          var jump_url_with_id = "story_info.html?story_id=" + data[i]["id"];
          
          str += "<td>";         
          str += "<a href=\"" + jump_url_with_id + " \">";
          // check storytype to show depthpic
          if (RadioStoryType=="image") {
            str += "<img src=\" " + data[i]["color"]["fit_160"] + " \" onmouseover=\"src=' " + data[i]["depth"]["original"] + "'\" onmouseout=\"src='" + data[i]["color"]["fit_160"] + "'\" width=150; height=150;>";
          }
          
          else {
            str += "<img src=\" " + data[i]["color"]["fit_160"]  + "\" width=150; height=150;>";
          }          
          
          str += "</a>";
          str += "</td>";        

          if(i % 5 == 4 || i == data.length -1)
            str += "</tr>"; 
        }
        $("#spinner").hide(500); 
        $("#table_query_result").append(str);
        console.log(data);
        //alert(data);
      },
      error: function(jqXHR, textStatus, errorThrown)
      { 
          console.log(errorThrown) ; 
          alert('Failed! check allow control allow origin'); 
      }
    }
  );
}

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
      
      page = 1;
      $("#table_query_result").text("");
      onBtnQueryHome(RadioStoryType);
    }  
  }
}

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
        onBtnQueryHome();
      }  
      
      $("#btn_query_story").on("click", onBtnQueryHome);

      $("#chooseStoryType").click(function()
      {
        RadioStoryType = $("input[name='storyType']:checked").val();
        page = 1;

        $("#table_query_result").text("");
        onBtnQueryHome(RadioStoryType);
      });

    }
);


