<?php

namespace Home\Controller\About;

use Think\Controller;

/**
 * 关于果核
 * @author zhxl
 *
 */
class AboutController extends Controller {
	
    /**
     * 公司介绍
     */
    public function aboutUsAction(){
    	$this->display('About:aboutUs');
    }
    
    /**
     * 果核秘籍
     */
    public function aboutScretAction(){
    	$this->display('About:aboutScret');
    }
    
    /**
     * 联系方式
     */
    public function contactUsAction(){
    	$this->display('About:contactUs');
    }
}