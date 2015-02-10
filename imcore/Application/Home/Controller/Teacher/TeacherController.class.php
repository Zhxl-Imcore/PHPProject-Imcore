<?php

namespace Home\Controller\Teacher;

use Think\Controller;

/**
 * 讲师团队
 * @author zhxl
 *
 */
class TeacherController extends Controller {
	
    /**
     * 讲师团队列表
     */
    public function indexAction(){
    	$this->display('Teacher:index');
    }
    
}