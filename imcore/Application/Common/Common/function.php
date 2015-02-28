<?php

/**
 * 调试，打印数组
 */
function P($array){
	return '<pre>' . dump($array) . '</pre>';
}

/**
 * 字符串截取加省略号
 */
function subtext($text, $length){
	if(mb_strlen($text, 'utf8') > $length){
		return mb_substr($text, 0, $length, 'utf8').'...';
	}
	return $text;
}