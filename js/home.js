//http://tarruda.github.io/bootstrap-datetimepicker/

var page = 1 ;
// 
 
  RadioStoryType = "image";
  console.log("default type:"+RadioStoryType);

// 

var onBtnQueryHome = function (e)
{      
  console.log("load page:" + page) ;
  console.log("type:" + RadioStoryType) ;
  $.ajax
  (
    {
      type: "GET",  //拿取下面網頁資料
      url: "https://staging.threal3d.com/api/v3/guest/stories/feed?page=" + page + "&per_page=25&story_type="+RadioStoryType,
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
            str += "<img src=\" " + data[i]["color"]["fit_160"] + " \" onmouseover=\"src=' " + data[i]["depth"]["original"] + "'\" onmouseout=\"src='" + data[i]["color"]["fit_160"] + "'\" max-width=150; height=150;>";
          } 
          else {
            str += "<img src=\" " + data[i]["color"]["fit_160"]  + "\" max-width=150; height=150;>";
          }          
          
          str += "</a>";
          str += "</td>";        

          if(i % 5 == 4 || i == data.length -1)
            str += "</tr>"; 
        }

        $("#table_query_result").append(str);
        console.log(data);
        //alert(data);
      },
      error: function(jqXHR, textStatus, errorThrown)
      { 
          console.log(errorThrown) ; 
          alert('Failed!'); 
      }
    }
  );
}

$(document).ready
(
  function()
    { 
      onBtnQueryHome();
      $("#btn_query_story").on("click", onBtnQueryHome);
      $("#videobutton").click(function()
      {
        page = 1;
          RadioStoryType = "video";
          console.log(RadioStoryType);
          $("#table_query_result").text("");
          onBtnQueryHome(RadioStoryType);
      });
      $("#imagebutton").click(function()
      {
          page = 1;
          RadioStoryType = "image";
          console.log(RadioStoryType);
          $("#table_query_result").text("");
          onBtnQueryHome(RadioStoryType);
      });
    }
);


