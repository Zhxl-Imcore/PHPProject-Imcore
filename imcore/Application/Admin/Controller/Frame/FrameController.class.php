<?php

namespace Admin\Controller\Frame;

use Admin\Controller\Base\BaseController;

/**
 * 后台管理首页
 *
 * @author zhxl
 *        
 */

class FrameController extends BaseController {
	
    public function indexAction() {
        $this->display('Frame:index');
	}
}