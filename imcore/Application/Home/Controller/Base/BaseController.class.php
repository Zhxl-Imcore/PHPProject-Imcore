<?php
namespace Home\Controller\Base;

use Think\Controller;

class BaseController extends Controller {
	
	protected function _initialize(){
		$this->initTopNavLinks();
	}
	
	/**
	 * 初始化顶部菜单链接
	 */
	private function initTopNavLinks(){
		/*果核动态*/
		$where['status'] = array('eq',1);
		$where['is_stick'] = array('eq',1);
		
		$records = D('News')->where($where)->order(array('publish_time'=>'DESC'))->select();
		if($records){
			$newsTopNavLink = '<ul>';
			foreach ($records as $key => $value){
				$newsTopNavLink .= '<li>&nbsp;<a href="' . U('News/News/detail',array('id'=>$value['id'])) . '" target=\"_blank\">' . $value['title'] . '</a></li>';
			}
			$newsTopNavLink .= '</ul>';
			$this->assign('newsTopNavLink',$newsTopNavLink);
		}
	}
}