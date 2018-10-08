//http://tarruda.github.io/bootstrap-datetimepicker/

var onBtnQueryHome = function (e)
{      
  $.ajax
  (
    {
      type: "GET",  //拿取下面網頁資料
      url: "https://staging.threal3d.com/api/v3/guest/stories/feed?page=1&per_page=25&story_type=image",
      //contentType: 'application/json; charset=UTF-8', 

      success: function(data, status, jqXHR) 
      {
        var str = "";
        for (var i = 0; i < data.length; i++) 
        {
          if(i % 5 == 0)  //秀五張然後換行
            str += "<tr>";

          str += "<td> <img src=\""+ data[i]["depth"]["original"] +"\" width=160></td>";
          
          if(i % 5 == 4 || i == data.length -1)
            str += "</tr>"; 
        }

        $("#table_query_result").append(str);
        console.log(data);
        //alert(data);
      },
      error: function(jqXHR, textStatus, errorThrown)
      { 
          console.log(errorThrown) ;//alert('Failed!'); 
      }
    }
  );
}

$(document).ready
(
  function()
    { 
      $("#btn_query_story").on("click", onBtnQueryHome);
    }
);