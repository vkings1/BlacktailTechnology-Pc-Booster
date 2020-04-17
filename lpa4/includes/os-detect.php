<?php

	// OS Detection	
	$user_agent = $_SERVER['HTTP_USER_AGENT'];
	
	function getOS() {
	
		global $user_agent;
		
		$os_platform = "";
		
		$os = array(
					'/windows nt 10/i'     =>  'Windows 10',
					'/windows nt 6.2/i'     =>  'Windows 8',
					'/windows nt 6.1/i'     =>  'Windows 7',
                    '/windows nt 6.0/i'     =>  'Windows Vista',
                    '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
                    '/windows nt 5.1/i'     =>  'Windows XP',
                    '/windows xp/i'         =>  'Windows XP',
                    '/windows nt 5.0/i'     =>  'Windows 2000',
                    '/windows me/i'         =>  'Windows ME',
                    '/win98/i'              =>  'Windows 98',
                    '/win95/i'              =>  'Windows 95',
                    '/win16/i'              =>  'Windows 3.11'			
				);
			
		foreach($os as $regex => $value) {		
			if(preg_match($regex, $user_agent)) {
				$os_platform = $value;
			}			
		}
		
		return $os_platform;
	}	
	

/* 	$user_os = getOS();	
	
	$device_details = "<span><strong>Operating System: </strong>" . $user_os ."</span>";
	
	print_r($device_details); = Output users Operating System */
	
	
	// Change Windows version when OS detects
	$win_ver = "";
	
	if(preg_match('/windows nt 10/i', $user_agent)) {
		$win_ver = "10";
		$win_logo = 'os_icon_win10';
		$win_class = 'win10';
		$download_link = 'http://download.driverupdateplus.com/camp/setup_Win10.exe';
	} else if(preg_match('/windows nt 6.2/i', $user_agent)) {
		$win_ver = "8";
		$win_logo = 'win-8.png';
		$win_class = 'win8';
		$download_link = 'http://download.driverupdateplus.com/camp/setup_Win8.exe';
	} else if(preg_match('/windows nt 6.1/i', $user_agent)) {
		$win_ver = "7";
		$win_logo = 'win-7.gif';
		$win_class = 'win7';
		$download_link = 'http://download.driverupdateplus.com/camp/setup_Win7.exe';
	} else if(preg_match('/windows nt 6.0/i', $user_agent)) {
		$win_ver = "Vista";
		$win_logo = 'win-vista.gif';
		$win_class = 'winvista';
		$download_link = 'http://download.driverupdateplus.com/camp/setup_WinXP.exe';
	} else if(preg_match('/windows nt 5.2/i', $user_agent)) {
		$win_ver = "Server 2003/XP";
		$win_logo = 'win-xp.gif';
		$win_class = 'winxp';
		$download_link = 'http://download.driverupdateplus.com/camp/setup_WinXP.exe';
	} else if(preg_match('/windows nt 5.1/i', $user_agent)) {
		$win_ver = "XP";
		$win_logo = 'win-xp.gif';
		$win_class = 'winxp';
		$download_link = 'http://download.driverupdateplus.com/camp/setup_WinXP.exe';
	} else if(preg_match('/windows xp/i', $user_agent)) {
		$win_ver = "XP";
		$win_logo = 'win-xp.gif';
		$win_class = 'winxp';
		$download_link = 'http://download.driverupdateplus.com/camp/setup_WinXP.exe';
	} else if(preg_match('/windows nt 5.0/i', $user_agent)) {
		$win_ver = "2000";
		$win_logo = 'win.gif';
	} else if(preg_match('/windows me/i', $user_agent)) {
		$win_ver = "ME";
	} else if(preg_match('/win98/i', $user_agent)) {
		$win_ver = "98";
		$win_logo = 'win.gif';
	} else if(preg_match('/win95/i', $user_agent)) {
		$win_ver = "95";
		$win_logo = 'win.gif';
	} else if(preg_match('/win16/i', $user_agent)) {
		$win_ver = "3.11";
		$win_logo = 'win.gif';
	} else {
		$win_ver = "Windows";
	}

?>