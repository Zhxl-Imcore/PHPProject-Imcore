<?php

namespace Home\Controller\Teacher;

use Home\Controller\Base\BaseController;

/**
 * 讲师团队
 * @author zhxl
 *
 */
class TeacherController extends BaseController {
	
    /**
     * 讲师团队列表
     */
    public function indexAction(){
    	$this->display('Teacher:index');
    }
    
}