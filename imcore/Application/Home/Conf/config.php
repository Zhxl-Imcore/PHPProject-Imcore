<?php
return array(
	/**
	 * 前台关闭session
	 */
	'SESSION_AUTO_START' => FALSE,
	
	/**
	 * 页面调试
	 */
	'SHOW_PAGE_TRACE' => TRUE,

	/**
		路由规则配置
	**/
	'URL_ROUTER_ON' => TRUE,
	/**
		静态路由配置
	**/
	'URL_MAP_RULES' => array(
		'index' => 'Index/Index/index',
		'advertisement' => 'Advertisement/Advertisement/index',
		'teacher' => 'Teacher/Teacher/index'
	),

	/*************
	 *  默认控制器
	 **************/
	'DEFAULT_CONTROLLER' => 'Index/Index',
	/*************
	 *  默认操作
	 **************/
	'DEFAULT_ACTION' => 'index',

);