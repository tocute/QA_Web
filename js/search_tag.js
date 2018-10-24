
var btn_query_search = function (e)
{      
  var x = document.getElementById("mysearch").value;
  console.log(x);

  $.ajax
  (
    {
      type: "GET",
      url: "https://staging.threal3d.com/api/v3/search?keyword=" + x ,
      //contentType: 'application/json; charset=UTF-8', 

      success: function(data, status, jqXHR) 
      {
        var str = "";

        for (var i = 0 ; i < data["story_description"].length ; i++) 
        {
          if(i % 5 == 0)
            str += "<tr >";
          str += "<td >";
          str += "<img src=\""+ data["story_description"][i]["color"]["fit_160"] +"\" width = 150 height = 150>"
          //str += "<img src=\""+ data[i]["depth"]["original"] +"\">"
          str += "</td>";
          
          if(i % 5 == 4 || i == data.length -1)
            str += "</tr>";
        }

        $("#table_query_result").append(str);
        console.log(data[i]);
        //alert("null");
      },

      error: function(jqXHR, textStatus, errorThrown) 
      { 
        console.log(errorThrown) ;//alert('Failed!'); 
        alert("null");
      }
    }
  );
}
// 在文档加载后激活函数：
$(document).ready
(
  function()
  { 
    $("#search_button").on("click", btn_query_search);
  }
);