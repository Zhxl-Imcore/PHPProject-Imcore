<?php
return array(
	/**
	 * 页面调试
	 */
	'SHOW_PAGE_TRACE' => TRUE,
	
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
		
	/**
	 * Auth授权校验
	 */
	'AUTH_CONFIG' => array(
		'AUTH_ON' => true,  // 认证开关
		'AUTH_TYPE' => 2,   // 认证方式，1为实时认证；2为登录认证。
		'AUTH_GROUP' => 't_auth_group',  // 用户组数据表名
		'AUTH_GROUP_ACCESS' => 't_auth_group_access', // 用户-用户组关系表
		'AUTH_RULE' => 't_auth_rule',         // 权限规则表
		'AUTH_USER' => 't_user' //用户信息表
	),

);