
var btn_query_popular = function (e)
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
        var jump_url = "story_info.html?story_id=";
        for (var i = 0 ; i < data["story_tag"].length ; i++) 
        {
          if(i % 5 == 0)
            str += "<tr>";

          str += "<td>";

           for (var j = 0 ; j < data["story_tag"][i]["stories"].length ; j++)
          {
          //  str += "<img src=\""+ data["story_tag"][i]["stories"][j]["color"]["fit_160"] +"\" width = 150 height = 150>"
          }
          str += "</td>";
          
          if(i % 5 == 4 || i == data.length -1)
            str += "</tr>";
        }

/////////////////
        for (var i = 0 ; i < data["story_description"].length ; i++) 
        {
          if(i % 5 == 0)
            str += "<tr>";
           var jump_url_with_id = "story_info.html?story_id=" + data["story_description"][i]["id"];
          str += "<td>";
           str += "<a href=\"" + jump_url_with_id + " \">";     
          str += "<img src=\" " + data["story_description"][i]["color"]["fit_160"] + " \" onmouseover=\"src=' " + data["story_description"][i]["depth"]["original"] + "'\" onmouseout=\"src='" + data["story_description"][i]["color"]["fit_160"] + "'\" width=160 max-height=160>";
           str += "</a>";          
          // str += "<img src=\""+ data["story_description"][i]["color"]["fit_160"] +"\" width = 150 height = 150>"
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

$(document).ready
(
  function()
  { 
    $("#search_button").on("click", btn_query_popular);
  }
);