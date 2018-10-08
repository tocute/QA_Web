//http://tarruda.github.io/bootstrap-datetimepicker/

var page = 1 ;

var onBtnQueryInfo = function (e)
{      
  console.log("load page:" + page) ;

  $.ajax
  (
    {
      type: "GET",  //拿取下面網頁資料
      url: "https://staging.threal3d.com/api/v3/guest/stories/feed?page=" + page + "&per_page=25&story_type=image",
      //contentType: 'application/json; charset=UTF-8', 

      success: function(data, status, jqXHR) 
      {

        page = page + 1 ;  //成功的話，每按一次查訊就會再download下一頁資訊

        var str = "";
        for (var i = 0; i < data.length; i++) 
        {
          if(i % 5 == 0)  //秀五張然後換行
          str += "<tr>";
// 圖片
          str += "<td><img src=\" " + data[i]["color"]["fit_160"] + " \"  width=150; height=150;></td>";
          str += "<td><img src=\" " + data[i]["depth"]["original"] + " \"  width=150; height=150;></td>";

// userdata
          str += "<td><img src=\" " + data[i]["user"]["image"] + " \"  width=50; height=50;></td>";
          str += "<td>" + "Name: " + data[i]["user"]["name"]+"</td>" + "<td>" + data[i]["updated_at"] + "</td>" ;
          str += "<td>" + "Description: " + data[i]["description"] + "</td>" + "<td>" + "Tags: " + data[i]["tags"] + "</tr>" ;
      
          
          if(i % 5 == 4 || i == data.length -1)
            str += "</tr>"; 
        }

        $("#table_query_result").append(str);
        console.log(data);
        //alert(data);
      },
      error: function(jqXHR, textStatus, errorThrown)
      { 
          console.log(errorThrown) ; alert('Failed!'); 
      }
    }
  );
}

$(document).ready
(
  function()
    { 
      $("#btn_query_story").on("click", onBtnQueryInfo);
    }
);