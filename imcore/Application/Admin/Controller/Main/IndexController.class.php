<?php

namespace Admin\Controller\Main;

use Admin\Controller\Base\BaseController;

/**
 * 后台管理首页
 *
 * @author zhxl
 *        
 */

class IndexController extends BaseController {
	
    public function indexAction() {
        $this->display('Main:index');
	}
}