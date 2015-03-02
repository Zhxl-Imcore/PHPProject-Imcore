<?php
namespace Admin\Controller\User;

use Admin\Controller\Base\BaseController;

/**
 * 用户管理
 * @author zhxl
 *
 */
class UserController extends BaseController {
	
	/**
	 * 显示用户列表
	 */
	public function queryAction(){
		$userModels = D('User');
		
		$result['datas'] = $userModels->page($this->pageIndex,$this->pageSize)->select();
		$result['total'] = $userModels->count();
		$result['success'] = true;
		
		$this->ajaxReturn($result,'JSON');
	}
	
	/**
	 * 创建用户
	 */
	public function createAction(){
		$result = array('success' => FALSE);
		
		if (IS_POST) {
			$userModel = D('User');
			//从表单读取数据
			if($userModel->create()){
				$userModel->password = strtoupper(md5($userModel->password));
				$userModel->createtime = date('Y-m-d H:i:s');
				//插入数据库
				if ($userModel->add()){
					$result['success'] = TRUE;
				}
			}
		}
		
		$this->ajaxReturn($result);
	}
	
	/**
	 * 更新用户信息
	 */
	public function updateAction(){
		$result = array('success' => FALSE);
		
		if (IS_POST) {
			$userModel = D('User');
			//从表单读取数据
			if($userModel->create()){
				$userModel->password = strtoupper(md5($userModel->password));
				//插入数据库
				if ($userModel->save()){
					$result['success'] = TRUE;
				}
			}
		}
		
		$this->ajaxReturn($result);
	}
	
	/**
	 * 禁用用户
	 */
	public function disableAction(){
		$result['success'] = FALSE;
		
		if (IS_POST) {
			$userIds = I('POST.ids','');
			if($userIds){
				$where['id'] = array('in',$userIds);
				$data['status'] = 0;
				D('User')->data($data)->where($where)->save();
				
				$result['success'] = TRUE;
			}
		}
		
		$this->ajaxReturn($result);
	}
}