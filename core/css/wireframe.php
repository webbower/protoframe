<?php

	function get($name='') {
		return isset($_GET[$name]) && !empty($_GET[$name]) ? $_GET[$name] : false;
	}

	$layoutUnit = get('layoutUnit');
	$fontUnit = get('fontUnit');
	if($layoutUnit === 'pe') $layoutUnit = '%';
	if($fontUnit === 'pe') $fontUnit = '%';
	
	if(!$colSize = get('colSize')) $colSize = 40;
	if(!$colCount = get('colCount')) $colCount = 24;
	if(($gutter = get('gutter')) !== false) $gutter = 10;
	if(!$vertSpacing = get('vertSpacing')) $vertSpacing = $colSize / 2;
	
	$columnBase = array();
	$columns = array();
	$prepend = array();
	$append = array();
	$before = array();
	$after = array();
	
	header('Content-Type: text/css');


	for($i = 1; $i <= $colCount; $i++) {
		$columnBase[] = ".col-{$i}";
		$columns[] = sprintf(".col-%s { width: %s%s; }", $i, ($i*$colSize)-$gutter, $layoutUnit);
	}
	
	for($j = 1; $j <= 10 ; $j++) {
		$prepend[] = sprintf('.prepend-%s { padding-left: %s%s; }', $j, $j*$colSize, $layoutUnit);
		$append[] = sprintf('.append-%s { padding-right: %s%s; }', $j, $j*$colSize, $layoutUnit);
		$before[] = sprintf('.before-%s { padding-top: %s%s; }', $j, $j*($vertSpacing), $layoutUnit);
		$after[] = sprintf('.after-%s { padding-bottom: %s%s; }', $j, $j*($vertSpacing), $layoutUnit);
	}
?>
.grid {
	margin: 0 auto;
	width: <?php echo ($colSize * $colCount) - $gutter ?>px;
}

<?php echo implode(', ', $columnBase); ?> {
	float: left;
	display: inline;
	margin-right: <?php echo $gutter . $layoutUnit ?>;
}

<?php echo implode("\n", $columns); ?>

<?php if ($gutter > 0): ?>
.last, .col-<?php echo $colCount; ?> { margin-right: 0; }
<?php endif ?>

<?php // echo implode("\n", $prepend); ?>


<?php // echo implode("\n", $append); ?>


<?php echo implode("\n", $before); ?>


<?php echo implode("\n", $after); ?>

.row {
	clear: both;
}

.spacer {}

.spacer:after {
	content: '.';
	visibility: hidden;
}

/* ################ WIREFRAME ################ */

.wf {
	outline: 1px solid #DDD;
	/*-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;*/
}

.wf + .wf {
	margin-top: 1px;
}

.mod {
	padding-bottom: 20px;
	margin-bottom: 20px;
	border-bottom: 1px solid #999;
}

.last-mod {
	padding-bottom: 0;
	margin-bottom: 0;
	border-bottom: 0;
}

/* ################ NAVIGATION ################ */
.nav {
	font-size: 14px;
}

.inline-nav > * {
	display: inline;
	margin-left: 10px;
	padding-left: 10px;
	border-left: 1px solid #999;
}

.inline-nav > *:first-child {
	margin-left: 0;
	padding-left: 0;
	border-left: 0;
}

/* ################ IMAGES WITH CAPTIONS ################ */
.figure {
	margin: 0 20px 20px;
}

.figure.left {
	margin-left: 0;
}

.figure.right {
	margin-right: 0;
}

.figure img {
	max-width: 100%;
	background-color: #999;
}

.figure .caption {
	font-family: Georgia, serif;
	font-style: italic;
}

.sidebar .figure {
	margin-left: 0;
	margin-right: 0;
}

/* ################ INLINE STUFF ################ */
.inline-list {
	margin-left: 0;
}

.inline-list > * {
	float: left;
	margin: 0 10px 10px 0;
	display: block;
}

/* ################ BUTTONS ################ */
.button {
	display: inline-block;
	text-decoration: none;
	color: #000;
	font-weight: bold;
	border: 1px solid #666;
	line-height: 1.0;
	padding: 10px 20px;
	-webkit-box-shadow: 3px 3px 0 #000;
	-moz-box-shadow: 3px 3px 0 #000;
	box-shadow: 3px 3px 0 #000;
	margin-bottom: 1em;
}

.button:hover {
	color: #000;
}

.full-button {
	display: block;
	text-align: center;
}

.big-button {
	font-size: 1.5em;
	padding: 15px 30px;
}

/* ################ VIDEO/IMAGE ################ */
.video, .img {
	background: #DDD;
	color: #FFF;
	text-align: center;
	display: table-cell;
	vertical-align: middle;
	font: bold 24px/1.5 Arial, Helvetica, sans-serif;
	outline: 1px solid #999;
}

.img:before {
	content: 'Image: ';
}

.video:before {
	content: 'Video: ';
}

/* ################ MISC ################ */
.left {
	float: left;
}

.right {
	float: right;
}

.center {
	margin-left: auto;
	margin-right: auto;
}

.ie6 .left, .ie6 .right { display: inline; }

.left-text {
	text-align: left;
}

.right-text {
	text-align: right;
}

.center-text {
	text-align: center;
}

.clear {
	clear: both;
}