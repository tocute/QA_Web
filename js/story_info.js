﻿//http://tarruda.github.io/bootstrap-datetimepicker/

var page = 1 ;

/*var deleteStory = function (story_id)
{
  $.ajax
  (
    {
      type: "DELETE",  //拿取下面網頁資料
      url: "https://staging.threal3d.com/api/v3/stories/" + story_id ,
      headers: {
        'X-User-Uid':'123456789-theia',
        'X-User-Token':'123456789-theia'
      }, //contentType: 'application/json; charset=UTF-8', 
      success: function(data, status, jqXHR) 
      {
        console.log(data); 
        //alert(data);
  //        <div class="alert alert-success">
  //   <strong>Success!</strong> This alert box could indicate a successful or positive action.
  // </div>
      },
      error: function(jqXHR, textStatus, errorThrown)
      { 
          console.log(textStatus); 
          alert('Failed!'); 
      }
    }
  );
}*/

var queryInfo = function (story_id)
{      
  $.ajax
  (
    {
      type: "GET",  //拿取下面網頁資料
      url: "https://staging.threal3d.com/api/v3/guest/stories/" + story_id ,
      //contentType: 'application/json; charset=UTF-8', 

      success: function(data, status, jqXHR) 
      {
        var str = "";
        //str += "<div>";
        str += "<img src=\" "+ data["color"]["fit_1280"] + " \"   height=300;>";
        str += "  ";
        str += "<img src=\" "+ data["depth"]["original"] + " \"   height=300;>";
        $("#query_result").append(str);

        str = "";
        str += "<img src=\" "+ data["user"]["image"] + " \"   height=80;>";
        str = "";        
        str +=  data["user"]["name"];
        str += "  /  ";
        str +=  data["updated_at"]; 
        str += "  /  ";
        str +=  data["user"]["email"]; 
        str += "  /  ";
        str +=  "description:"+ data["description"];
        str += "  /  ";        
        str +=  "tags:"+ data["tags"];
        $("#query_result_info").text(str);

        console.log(data);
        // if(data["user"]["email"] == 'service@theia.tw')
        // {
        //   var btn_str = '<button type="button" class="btn btn-danger" onclick="deleteStory(\''+story_id+'\')">'
        //   btn_str += 'Danger</button>'
        //   $("#query_result").append(btn_str);
        // }
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
      var getPara, ParaVal;
      var aryPara = [];
      var strUrl = location.search;
      var story_id = "";

      if (strUrl.indexOf("?") != -1) 
      {
        var getSearch = strUrl.split("?");
        getPara = getSearch[1].split("&");

        for (i = 0 ; i < getPara.length ; i++) 
        {
          ParaVal = getPara[i].split("=");
          if(ParaVal[0] == "story_id")
          {
            story_id = ParaVal[1];
          }          
        }
        queryInfo(story_id);
      }
    }
);