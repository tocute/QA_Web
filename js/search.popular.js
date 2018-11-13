//http://tarruda.github.io/bootstrap-datetimepicker/
var region = ["https://staging.threal3d.com/api/v3",
              "https://www.threal3d.com/api/v3",
              "https://www.threal3d.net/api/v3",
              "https://beam-API.threal3d.com/api/v3"];
var BASE_URL = region[0];

var onBtnQueryPopular = function (e)
{ $("#spinner").show(); 
  $.ajax
  (
    {
      type: "GET",
      url: BASE_URL + "/search/tags/popular?number_of_stories=6",
      //contentType: 'application/json; charset=UTF-8', 

      success: function(data, status, jqXHR) 
      {
        var str = "";
        console.log(data.length);

        for (var z = 0 ; z < data.length ; z++)
        {
          console.log(data[z]);
          var jump_url_with_id = "search_tag.html?keyword=" + data[z]["tag"];
          str += '<div class="panel panel-info">';
          str += '<div class="panel-heading">';
          str += "<a href=\"" + jump_url_with_id + " \">"; 
          str += data[z]["tag"];
          str += '</a>'
          str += '</div>';
          str += '<div class="panel-body">';
          for (var i = 0; i < data[z]["stories"].length; i++) 
          {
            str += "<a href=\"" + jump_url_with_id + " \">";
          // check storytype to show depthpic
            str += "<img src=\""+ data[z]["stories"][i]["color"]["fit_160"] +"\" width = 150 height = 150>"
            str += "</a>";
          }
          str += '</div>';
          str += '</div>';
        }
        

        $("#panel_query_result").append(str);
        $("#spinner").hide(300);
        //alert(data);
      },

      error: function(jqXHR, textStatus, errorThrown) 
      { 
          console.log(errorThrown) ;//alert('Failed!'); 
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
      $("#panel_query_result").text("");
      onBtnQueryPopular();
    }  
  }
}
// 在文档加载后激活函数：
$(document).ready 
(
  function()
  { 
    BASE_URL = window.localStorage.getItem("base_url");
    onBtnQueryPopular();
    //$("#btn_query_popular").on("click", BtnQueryPopular);
  }
);
