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
    	$records = M('Teacher')->where(array('status'=>1))->select();
    	
    	$this->assign('records',$records);
    	$this->display('Teacher:index');
    }
    
}