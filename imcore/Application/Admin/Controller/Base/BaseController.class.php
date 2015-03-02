<?php

namespace Admin\Controller\Base;

use Think\Controller;

class BaseController extends Controller {
	/** 分页数据:请求第几页的数据从1开始 **/
	protected $pageIndex;
	/** 分页数据:每页显示的条目数 **/
	protected $pageSize;
	
	public function _initialize(){
		if(!session('?name') || !session('?account') || !session('?uid')){
			header('Content-Type: text/html;Charset=UTF-8');
			$this->redirect('Authenticate/Authenticate/index',NULL,2,'你还未登录，或者登录超时！');
		}
		
		//分页数据
		$this->pageIndex = I('GET.page',0);
		$this->pageSize = I('GET.start',0) - I('GET.limit',0);
	
	}
}
