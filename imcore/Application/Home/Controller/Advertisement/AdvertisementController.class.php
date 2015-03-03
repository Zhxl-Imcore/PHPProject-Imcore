<?php
namespace Home\Controller\Advertisement;

use Think\Controller;

/**
 * 广告页展示
 */
class AdvertisementController extends Controller {
	
	public function indexAction(){
		$advSlideShowModel = D('AdvSlideShow');
    	
    	$where['status'] = array('eq',1);
    	
    	$records = $advSlideShowModel->where($where)->order(array('order'=>'asc','update_time'=>'desc'))->select();
   
    	$this->assign('records',$records);
		$this->display('Advertisement:index');
	}
}