var region = ["https://staging.threal3d.com/api/v3",
              "https://www.threal3d.com/api/v3",
              "https://www.threal3d.net/api/v3",
              "https://beam-API.threal3d.com/api/v3"];
var BASE_URL = region[0];
var onBtnQueryPopular = function (e)//出現popular內容
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
          var jump_url_with_tag = "search_tag.html?keyword=" + data[z]["tag"];
          str += '<div class="panel panel-info">';
          str += '<div class="panel-heading">';
          str +=  "<i class='fas fa-tag'>  </i>"; 
          str += "<a href=\"" + jump_url_with_tag + " \">";
          str += "  "+data[z]["tag"];
          str += '</a>'
          str += '</div>';
          str += '<div class="panel-body">';
          for (var i = 0; i < data[z]["stories"].length; i++) 
          { var jump_url_with_id = "story_info.html?story_id=" + data[z]["stories"][i]["id"];
            str += "&nbsp";
            str += "<a href=\"" + jump_url_with_id + " \">";
          // check storytype to show depthpic
            str += "<img src=\""+ data[z]["stories"][i]["color"]["fit_160"] +"\" width = 150 style='vertical-align:top;'>"
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
var query_search = function (keyword)//search
{
  console.log("searchfunction:"+keyword);
  $("#spinner").show();
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
            str +=  "<i class='fas fa-tag'>  </i>"; 
            str += data["story_tag"][t]["tag"];
            str += '</div>';
            str += '<div class="panel-body">';
            for (var i = 0; i < data["story_tag"][t]["stories"].length; i++) 
            {
              var jump_url_with_id = "story_info.html?story_id=" + data["story_tag"][t]["stories"][i]["id"];          
              str += "<a href=\"" + jump_url_with_id + " \">";
              str += "<img src=\""+ data["story_tag"][t]["stories"][i]["color"]["fit_160"] +"\" width = 150>"
              str += "</a>";
              str += "&nbsp";
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
            str += "<img src=\""+ data["story_description"][i]["color"]["fit_160"] +"\" width = 150 >"
            str += "</a>";
            str += "&nbsp";
          }
          str += '</div>';
          str += '</div>';
        }
        $("#panel_query_result").append(str);
        $("#spinner").hide(300);
      },
      error: function(jqXHR, textStatus, errorThrown) 
      { 
        console.log(errorThrown) ;//alert('Failed!'); 
        alert("null");
      }
    }
  );
}

var btn_query_search = function () //search
{    
  var keyword = $("#mysearch").val();
  console.log(keyword);
  query_search(keyword);//search
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
      query_search();//search
      onBtnQueryPopular();//popular
      
    }  
  }
  
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
    if (strUrl.indexOf("?") != -1) //用indexOf比對?=keyword...的字串
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
      query_search(keyword);//search
    }
    else{
    onBtnQueryPopular();      
    }
    $("#search_button").on("click", btn_query_search);//click search button do function:btn_query_search
  }
);