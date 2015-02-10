<?php

namespace Home\Controller\Index;

use Think\Controller;

class IndexController extends Controller {
	
    /**
     * 首页
     */
    public function indexAction() {
		$this->display('Index:index');
	}
}