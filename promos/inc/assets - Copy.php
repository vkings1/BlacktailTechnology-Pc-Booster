<?php
 $cookie_id = $_GET['click_id']; // Client ID Value
 $publisher_id = $_GET['pub_id']; // Publisher ID Value
 $download_link = "http://download.driverupdateplus.com/init2/DriverUpdate.exe?client_id="; // Download Link Value
 
 /* Do not delete/remove this code */
 if (isset($_GET['click_id'], $_GET['pub_id'])) {
  $click_id;
  $publisher_id;    
 } 
 
 $download = $download_link."{$cookie_id}&pub_id={$publisher_id}";
?>
<img src="http://performancexyz.com/instcount.aspx?inst=n&client_id=<?php echo $cookie_id;?>&ComId=<?php echo $serverip;?>&swid=3&dwnld=y" border="0" alt="." style="float: left;display:none;"/>