<?php
return array(
    
    /**
     * 打开页面调试工具
     */
    'SHOW_PAGE_TRACE' => FALSE,
    
    /**
     * 模板文件后缀
     */
    'TMPL_TEMPLATE_SUFFIX' => '.html',
    
    /**
     * 模板引擎表达式开始标签和结束标签
     */
    'TMPL_L_DELIM' => '<{',
    'TMPL_R_DELIM' => '}>',
    
    /************
     * 	两层次控制器
     *************/
    'CONTROLLER_LEVEL' => 2,
    
    /*************
     *  默认模块
    **************/
    //'DEFAULT_MODULE' => 'Home',
    /*************
     *  默认控制器
     **************/
    #'DEFAULT_CONTROLLER' => 'Home',
    /*************
     *  默认操作
     **************/
    #'DEFAULT_ACTION' => 'Home',

    /*************
     *  操作后缀
     **************/
    'ACTION_SUFFIX' => 'Action',
    
    
    /*************
     *  URL模式
    **************/
	'URL_MODEL' => '1',
    
	/*************
	 *  数据库配置
	**************/
    'DB_TYPE' => 'mysql',
    'DB_HOST' => 'localhost',
    'DB_PORT' => '3306',
    'DB_NAME' => 'db_imcore',
    'DB_USER' => 'root',
    'DB_PWD' => 'root',
    'DB_PREFIX' => 't_',
    'DB_CHARSET' => 'utf8',
);