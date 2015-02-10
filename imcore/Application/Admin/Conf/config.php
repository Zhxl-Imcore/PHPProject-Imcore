<?php
return array(
	
    /**
     * URL伪静态后缀设置(自动生成时为空)
     */
    'URL_HTML_SUFFIX' => '',
		
	/**
	 * 默认参数过滤方法，用于I函数
	 */
	'DEFAULT_FILTER' => 'htmlspecialchars',
		
	/**
	 * Session的数据库配置
	 */
	'SESSION_OPTIONS' => array(
		'type' => 'Db',
		'expire' => 1440,//session过期时间
	),
	'SESSION_TABLE' => 't_session',
		
    
);