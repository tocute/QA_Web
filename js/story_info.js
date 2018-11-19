var BASE_URL = "https://staging.threal3d.com/api/v3";


var deleteStory = function (story_id , account_index)
{
  console.log(story_id);
  console.log(account_index);
  // if(account_index == "")
  //   account_index = "89";
  // var token = "1234567"+account_index+"-theia"
    
  // $.ajax
  // (
  //   {
  //     type: "DELETE",  //拿取下面網頁資料
  //     url: BASE_URL + "/stories/" + story_id ,
  //     headers: {
  //       'X-User-Uid':token,
  //       'X-User-Token':token
  //     }, //contentType: 'application/json; charset=UTF-8', 
  //     success: function(data, status, jqXHR) 
  //     {
  //       console.log(data); 
  //     },
  //     error: function(jqXHR, textStatus, errorThrown)
  //     { 
  //       console.log(textStatus); 
  //     }
  //   }
  // );
}

var queryInfo = function (story_id)
{ 
  $("#spinner").show();     
  $.ajax
  (
    {
      type: "GET",  //拿取下面網頁資料
      url: BASE_URL + "/guest/stories/" + story_id ,
      //contentType: 'application/json; charset=UTF-8',

      success: function(data, status, jqXHR) 
      {
        var str = "";
        //str += "<div>";
        if(data["is_video"]==false){
          str += "<img src=\" "+ data["color"]["fit_1280"] + " \"   height=300;>";
          str += "  ";
          str += "<img src=\" "+ data["depth"]["original"] + " \"   height=300;>";
        }
        $("#query_result").append(str);

        str = "";
        str += "<img src=\" "+ data["user"]["image"] + " \"  class='img-circle' height=60;>";
        str +=  " "+ data["user"]["name"]+" <br> ";
         
        str +=  "<i class='fas fa-envelope'></i>"+" email: " + data["user"]["email"]+" <br> "; 
        str +=  "<i class='fas fa-file'></i>"+" description: "+ data["description"]+" <br> ";
        // Variety for tag
        str +=  "<i class='fas fa-tag'></i>"+" tags: ";
        // tag with hyperlink
        for (var i =0 ; i < data["tags"].length; i++) {
        var jump_url_with_id = "search_tag.html?keyword=" + data["tags"][i];   
          str += "<a href=\"" + jump_url_with_id + " \">";
          str +="<span class='badge badge-secondary'>"+data["tags"][i]+"</span>"; 
          str += '</a>'
          str += "  "
        }
        $("#spinner").hide(300);
        // 
        var email = data["user"]["email"]
        if(email.startsWith("service") && email.endsWith("@theia.tw"))//startsWith()比對W要大寫
        {
          //alert("email含有此字符串sevice & @theia.tw");
          var account_index = email.replace('service','');
          account_index = account_index.replace('@theia.tw','');
          
          str1 =  "<i class='fas fa-calendar-alt'></i>"+" updated_at: " + data["updated_at"]+" <br> ";
          str1 += "<br><button type='button' class='btn btn-danger' onclick='deleteStory(\""+story_id+"\",\""+account_index+"\")'>Delete</button>"

          $("#query_result_footer").append(str1);
        }
        // videoplayer

        console.log(data["user"]["is_video"]) 
        if( data["is_video"] == true ){
            $("#color_video").show();
            var video = document.getElementById('color_video');
            if(Hls.isSupported()) {
              var hls = new Hls();            
              hls.loadSource(data["separated_color_depth_video"]["color_video"]["hls"]);
              // hls.loadSource(data["separated_color_depth_video"]["depth_video"]["hls"]);
              hls.attachMedia(video);
              hls.on(Hls.Events.MANIFEST_PARSED,function() {
                });
            }
            //
            $("#depth_video").show(); 
            var video = document.getElementById('depth_video');
            if(Hls.isSupported()) 
            {
              var hls = new Hls();            
              hls.loadSource(data["separated_color_depth_video"]["depth_video"]["hls"]);
              hls.attachMedia(video);
              hls.on(Hls.Events.MANIFEST_PARSED,function() {
                });
            }
            // 
            $("#spinner").hide(500);          
        }
        $("#query_result_info").append(str);



        // console.log(data);
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
      BASE_URL = window.localStorage.getItem("base_url");

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
        console.log("story_id:"+story_id);
      }
      if(story_id==""){alert('story_id="null"')}
    }
);