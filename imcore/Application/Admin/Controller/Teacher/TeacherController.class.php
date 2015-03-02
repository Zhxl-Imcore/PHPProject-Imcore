<?php
namespace Admin\Controller\Teacher;

use Admin\Controller\Base\BaseController;
use Think\Upload;

/**
 * 讲师团队
 * @author zhxl
 */
class TeacherController extends BaseController {
	
	/**
	 *	讲师团队 
	 **/
	public function indexAction(){
		$result['success'] = FALSE;
		
		$result['datas'] = D('Teacher')->relation(TRUE)->order(array('id'=>'asc'))->page($this->pageIndex,$this->pageSize)->select();
		
		$result['total'] = D('Teacher')->count();
		$result['success'] = TRUE;
		
		$this->ajaxReturn($result,'JSON');
	}
	
	/**
	 * 创建讲师
	 */
	public function createAction(){
		$result['success'] = FALSE;
		
		if (IS_POST){
			$teacherModel = D('Teacher');
			if($teacherModel->create()){
				$teacherModel->author_id = session('uid');
				if($teacherModel->add()){
					$result['success'] = TRUE;
				}
			}
		}
		
		$this->ajaxReturn($result,'JSON');
	} 
	
	/**
	 * 更新讲师
	 */
	public function updateAction(){
		$result['success'] = FALSE;
		
		if (IS_POST){
			$teacherModel = D('Teacher');
			if($teacherModel->create()){
				if($teacherModel->save()){
					$result['success'] = TRUE;
				}
			}
		}
		
		$this->ajaxReturn($result,'JSON');
	}
	
	/**
	 * 删除讲师
	 */
	public function deleteAction(){
		$result['success'] = FALSE;
		
		if(IS_POST){
			$deletedTeacherIds = I('POST.deletedTeacherIds');
			
			$where['id'] = array('in',explode(',', $deletedTeacherIds));
			if(M('Teacher')->where($where)->delete()){
				$result['success'] = TRUE;
			}
		}
		
		$this->ajaxReturn($result,'JSON');
	}
	
	/**
	 * 上传讲师图片
	 */
	public function uploadPhotoAction(){
		$results['success'] = FALSE;
	
		//实例化上传工具类
		$uploadUtil = new Upload();
		//上传文件的最大值容量(字节)
		$uploadUtil->maxSize = 0;
		//上传文件的后缀名
		$uploadUtil->exts = array('jpg','jpeg','gif','png');
		//上传文件的保存路径(默认入口文件同级的Uploads文件夹)
		$uploadUtil->rootPath = './Public/Uploads/Teacher/';
		//上传文件名(默认随机名)
		//$uploadUtil->saveName = '';
		//上传文件的子目录名配置
		$upload->autoSub = true;
		//多级子路径在upload方法中自动生成
		$uploadUtil->subName = array('date','Ymd');
	
		//若上传成功，返回相关文件信息.失败的返回false(file为表单字段名)
		$uploadedFileInfo = $uploadUtil->uploadOne($_FILES['file']);
		if($uploadedFileInfo){
			//上传后的文件路径
			$photoPath = mb_substr($uploadUtil->rootPath . $uploadedFileInfo['savepath'] . $uploadedFileInfo['savename'], 1);
			
			$results['datas'] = $photoPath;
			$results['success'] = TRUE;	
		}
	
		$this->ajaxReturn($results);
	}
}