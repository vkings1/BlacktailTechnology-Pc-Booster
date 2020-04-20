<!DOCTYPE html>
<html lang="en">
<head>
	<script type="text/javascript" src="libs/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="libs/js/cookie.js"></script>
	<meta name="robots" content="noindex,nofollow">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel="shortcut icon" id="dynamic-favicon" type="image/x-icon" href="favicon.ico"/>

    <title>DriverUpdatePlus</title>
    <link rel="stylesheet" href="libs/reset.css"/>
    <link rel="stylesheet" href="css/style.min.css"/>
    <script type="text/javascript">
        var lang_param = 'en';
    </script>                                                     
</head>
<body lang="en">
   

<section class="main ">
    <div class="header">
        <div class="wrapper">
            <i class="header__logo"></i>
            <ul class="header__list">
                <li class="header__list-item">Clean PC</li>
                <li class="header__list-item">Secure PC</li>
                <li class="header__list-item">Optimize PC</li>
            </ul>
        </div>
    </div>
    <div class="wrapper">
		<div class="full-block">
			<div id="ftc_doc_7620"></div>
			<script type="text/javascript" src="https://www.ftcguardian.com/show_doc/7620"></script>
		</div>
    </div>
</section>

<footer class="footer">

    <div class="footer__nav">
        <div class="wrapper">
            <a class="js-download footer__nav_link dl_link" href="https://dl.letpcwork.today/setup.exe">Download</a>
            <a class="footer__nav_link" href="privacy.php" target="_blank">Privacy Policy</a>
            <a class="footer__nav_link" href="about.php" target="_blank">Company</a>
            <a class="footer__nav_link" href="eula.php" target="_blank">EULA</a>
            <a class="footer__nav_link" href="uninstall.php" target="_blank">Uninstall</a>
        </div>
    </div>
	
    <div class="footer__copy">
        &copy; 2018 DriverUpdatePlus. All rights reserved.      
    </div>
</footer>

<script type="text/javascript" src="libs/localizedDate/scripts.min.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        $('.date').localizedDate({staticDate: true});
    });
</script>

<script src="./js/download-helper.js" type="text/javascript"></script>
<script type="text/javascript">
    var dlLink = $('.dl_link').attr('src','');
    dlLink.downloadHelper();
    dlLink.on('click', function (event) {
        setTimeout(function () { }, 1000);
        return true;
    });
</script>
</body>
</html>
