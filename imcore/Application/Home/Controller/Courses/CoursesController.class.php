<?php

namespace Home\Controller\Courses;

use Home\Controller\Base\BaseController;

class CoursesController extends BaseController {
	
	/**
	 * 安卓培训
	 */
	public function androidCourseAction() {
		$this->display ( 'Courses:androidCourse' );
	}
	
	/**
	 * iOS培训
	 */
	public function iOSCourseAction() {
		$this->display ( 'Courses:iOSCourse' );
	}
	
	/**
	 * PHP培训
	 */
	public function phpCourseAction() {
		$this->display ( 'Courses:phpCourse' );
	}
	
	/**
	 * 赴美工程师
	 */
	public function usaEngineerCourseAction() {
		$this->display ( 'Courses:usaEngineerCourse' );
	}
	
	/**
	 * 项目介绍
	 */
	public function usaProjectIntroAction() {
		$this->display ( 'Courses:usaEngineerCourse' );
	}
	
	/**
	 * 项目流程
	 */
	public function usaProjectProcessAction() {
		$this->display ( 'Courses:usaProjectProcess' );
	}
	
	/**
	 * 常见问题
	 */
	public function usaProjectProblemAction() {
		$this->display ( 'Courses:usaProjectProblem' );
	}
}