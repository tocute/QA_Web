var BASE_URL = "https://staging.threal3d.com/api/v3";

var query_popular = function (keyword)
{
  console.log(keyword);
  $.ajax
  (
    {
      type: "GET",
      url: BASE_URL + "/search?number_of_tags=5&number_of_stories=20&keyword=" + keyword ,
      success: function(data, status, jqXHR) 
      {
        $("#panel_query_result").text("");
        var str = "";

        for (var t = 0 ; t < data["story_tag"].length ; t++) 
        {
          if(data["story_tag"][t]["stories"].length > 0)
          {
            str += '<div class="panel panel-info">';
            str += '<div class="panel-heading">';
            str += data["story_tag"][t]["tag"];
            str += '</div>';
            str += '<div class="panel-body">';
            for (var i = 0; i < data["story_tag"][t]["stories"].length; i++) 
            {
              var jump_url_with_id = "story_info.html?story_id=" + data["story_tag"][t]["stories"][i]["id"];          
              str += "<a href=\"" + jump_url_with_id + " \">";

              str += "<img src=\""+ data["story_tag"][t]["stories"][i]["color"]["fit_160"] +"\" width = 150 height = 150>"
              
              str += "</a>";
            }
            str += '</div>';
            str += '</div>';
          }
        }

        console.log(data["story_description"]);
        if(data["story_description"].length > 0)
        {
          str += '<div class="panel panel-info">';
          str += '<div class="panel-heading">';
          str += "Description";
          str += '</div>';
          str += '<div class="panel-body">';
          for (var i = 0; i < data["story_description"].length; i++) 
          {
            var jump_url_with_id = "story_info.html?story_id=" + data["story_description"][i]["id"];          
            str += "<a href=\"" + jump_url_with_id + " \">";
            str += "<img src=\""+ data["story_description"][i]["color"]["fit_160"] +"\" width = 150 height = 150>"
            str += "</a>";
          }
          str += '</div>';
          str += '</div>';
        }

        $("#panel_query_result").append(str);
      },

      error: function(jqXHR, textStatus, errorThrown) 
      { 
        console.log(errorThrown) ;//alert('Failed!'); 
        alert("null");
      }
    }
  );
}

var btn_query_popular = function ()
{    
  var keyword = $("#mysearch").val();
  console.log(keyword);
  query_popular(keyword);
}

$(document).ready
(
  function()
  { 
    BASE_URL = window.localStorage.getItem("base_url");

    var getPara, ParaVal;
    var aryPara = [];
    var strUrl = location.search;
    var keyword = "";

    if (strUrl.indexOf("?") != -1) 
    {
      var getSearch = strUrl.split("?");
      getPara = getSearch[1].split("&");

      for (i = 0 ; i < getPara.length ; i++) 
      {
        ParaVal = getPara[i].split("=");
        if(ParaVal[0] == "keyword")
        {
          keyword = ParaVal[1];
        }          
      }
      query_popular(keyword);
    }

    $("#search_button").on("click", btn_query_popular);
  }
);