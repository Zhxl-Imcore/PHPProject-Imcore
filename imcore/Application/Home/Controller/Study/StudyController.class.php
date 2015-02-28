<?php

namespace Home\Controller\Study;

use Home\Controller\Base\BaseController;

class StudyController extends BaseController {
	
	/**
	 * 学员天地
	 */
	public function indexAction(){
		$this->display('Study:index');
	}
	
	/**
	 * 学员信息
	 */
	public function studentInfoAction(){
		$this->display('Study:studentInfo');
	}
	
	/**
	 * 学习环境
	 */
	public function studyEnviromentAction(){
		$this->display('Study:studyEnviroment');
	}
	
	/**
	 * 学员心得
	 */
	public function studentFeelingAction(){
		$this->display('Study:index');
	}
	
	/**
	 * 学员作品
	 */
	public function studentProjectAction(){
		$this->display('Study:studentProject');
	}
	
	/**
	 * 就业咨询
	 */
	public function jobInfoAction(){
		$this->display('Study:jobInfo');
	}
	
}