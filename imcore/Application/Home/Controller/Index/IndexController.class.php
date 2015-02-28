<?php

namespace Home\Controller\Index;

use Home\Controller\Base\BaseController;

class IndexController extends BaseController {
	
    /**
     * 首页
     */
    public function indexAction() {
    	$this->initNewsRecords();
    	
		$this->display('Index:index');
	}
	
	/**
	 * 果核动态
	 */
	private function initNewsRecords(){
		$where['status'] = array('eq',1);
		$where['is_stick'] = array('eq',1);
		
		$newsRecords = D('News')->where($where)->order(array('publish_time'=>'DESC'))->limit(5)->select();
		if ($newsRecords){
			$this->assign('newsRecords',$newsRecords);
		}
	}
}