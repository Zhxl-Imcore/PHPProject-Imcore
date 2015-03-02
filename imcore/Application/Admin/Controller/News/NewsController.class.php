<?php

namespace Admin\Controller\News;

use Admin\Controller\Base\BaseController;
use Think\Upload;
use Think\Image;

/**
 * 果核动态管理
 * @author zhxl
 *
 */
class NewsController extends BaseController {
	
	/**
	 * 返回所有新闻
	 */
	public function queryAction(){
		$newsModel = D('News');
		
		$result['datas'] = $newsModel->relation(TRUE)->order(array('id'=>'desc'))->page($this->pageIndex,$this->pageSize)->select();
		$result['total'] = $newsModel->count();
		$result['success'] = true;
		
		$this->ajaxReturn($result,'JSON');
	}
	
	/**
	 * 创建新闻
	 */
	public function createAction(){
		$results['success'] = FALSE;
		
		$data['title'] = I('POST.title');
		$data['content'] = I('POST.content');
		$data['status'] = I('POST.status');
		$data['is_stick'] = I('POST.is_stick');
		$data['publisher'] = session('uid');
		$data['publish_time'] = I('POST.publish_time');
		$data['image_ids'] = I('POST.image_ids');
		
		$newsId = D('News')->data($data)->add();
		if ($newsId){
			$image_ids = explode(',', $data['image_ids']);
			$where['id'] = array('in',$image_ids);
			if(D('Image')->where($where)->data(array('fid'=>$newsId))->save()){
				$results['success'] = TRUE;
			}
		}
		
		$this->ajaxReturn($results,'JSON');
	}
	
	/**
	 * 上传动态图片
	 */
	public function uploadPhotoAction(){
		$results['success'] = FALSE;
		
		//实例化上传工具类
		$uploadUtil = new Upload();
		//上传文件的最大值容量(字节)
		$uploadUtil->maxSize = 3145728;
		//上传文件的后缀名
		$uploadUtil->exts = array('jpg','jpeg','gif','png');
		//上传文件的保存路径(默认入口文件同级的Uploads文件夹)
		$uploadUtil->savePath = '';
		//上传文件名(默认随机名)
		//$uploadUtil->saveName = '';
		//上传文件的子目录名配置
		$upload->autoSub = true;
		//多级子路径在upload方法中自动生成
		$uploadUtil->subName = 'get_upload_subName';
		//保存根路径(文件操作的当前路径就是入口文件同级)
		$uploadUtil->rootPath = './Public/Uploads/News/';
		
		//若上传成功，返回相关文件信息.失败的返回false(file为表单字段名)
		$uploadedFileInfo = $uploadUtil->uploadOne($_FILES['file']);
		if($uploadedFileInfo){
			$imageModel = D('Image');
			
			$data['name'] = $uploadedFileInfo['savename'];
			$data['path'] = $uploadUtil->rootPath . $uploadedFileInfo['savepath'];
			$data['category'] = 'NEWS';
			$data['type'] = 'ORIGIN';
			$origin_image_id = $imageModel->data($data)->add();
			
			//默认使用GD库
			$image = new Image();
			//连接要处理的文件,连接文件后，则可以获得一些信息
			$image->open($uploadUtil->rootPath . $uploadedFileInfo['savepath'] . $uploadedFileInfo['savename']);
			
			
			//生成图片
			$photo_path = $uploadUtil->rootPath . substr($uploadedFileInfo['savepath'], 0,strpos($uploadedFileInfo['savepath'], '/')) . '/Photo/';
			//检验目录是否存在
			if (!file_exists($photo_path)){
				mkdir($photo_path);
			}
			//等比例缩放(先选小的值坐标缩放)
			$image->thumb(846, 1000,Image::IMAGE_THUMB_SCALE)->save($photo_path . '/' . $uploadedFileInfo['savename']);
			
			$data['name'] = $uploadedFileInfo['savename'];
			$data['path'] = $photo_path;
			$data['category'] = 'NEWS';
			$data['type'] = 'PHOTO';
			$photo_image_id = $imageModel->data($data)->add();
			
			//生成封面
			$cover_path = $uploadUtil->rootPath . substr($uploadedFileInfo['savepath'], 0,strpos($uploadedFileInfo['savepath'], '/')) . '/Cover/';
			if (!file_exists($cover_path)){
				mkdir($cover_path);
			}
			//等比例缩放
			$image->thumb(260, 1000,Image::IMAGE_THUMB_SCALE)->save($cover_path . '/' . $uploadedFileInfo['savename']);
			
			$data['name'] = $uploadedFileInfo['savename'];
			$data['path'] = $cover_path;
			$data['category'] = 'NEWS';
			$data['type'] = 'COVER';
			$cover_image_id = $imageModel->data($data)->add();
			
			if ($origin_image_id && $photo_image_id && $cover_image_id){
				$map['id'] = array('in',array($origin_image_id,$photo_image_id,$cover_image_id));
				$records = $imageModel->where($map)->select();
				if ($records){
					$results['success'] = true;
					$results['datas'] = $records;
				}
			}
		}
		
		$this->ajaxReturn($results);
	}
	
	/**
	 * 删除动态
	 */
	public function deleteAction(){
		$result['success'] = FALSE;
		
		if (!IS_POST){
			$result['msg'] = '错误的提交方式！';
		}
		
		$deletedNewsIds = explode(',', I('POST.deletedNewsIds'));
		foreach ($deletedNewsIds as $key => $value){
			//删除与动态绑定的图片
			$deletedImageIds = M('News')->getFieldById($value,'image_ids');
			
			if ($deletedImageIds){
				M('Image')->where(array('id'=>array('in',$deletedImageIds)))->delete();
			}
			
			//删除新闻
			M('News')->where(array('id'=>$value))->delete();
			
			$result['msg'] = '动态删除成功!';
			$result['success'] = TRUE;
		}

		$this->ajaxReturn($result,'JSON');
	}
	
	/**
	 * 查询一个图片的封面形式
	 */
	public function queryImageCoverAction(){
		$result['success'] = FALSE;
		
		if (!IS_POST){
			$result['msg'] = '错误的提交方式！';
		}
		
		$imageIds = explode(',', I('POST.image_ids'));
		foreach ($imageIds as $key => $value){
			$where['id'] = array('eq',$value);
			$where['type'] = array('eq','COVER');
			$where['_logic'] = 'and';
			$record = D('Image')->where($where)->find();
			if($record){
				$result['datas'] = $record;
				$result['success'] = TRUE;
				break;
			}
		}
		
		$this->ajaxReturn($result);
	}
	
	/**
	 * 更新动态
	 */
	public function updateAction(){
		$result['success'] = FALSE;
		
		if(IS_POST){
			$newsId = I('POST.id');
			$imageIds = I('POST.image_ids');
			$oldImageIds = I('old_image_ids');
			if($oldImageIds){
				$where['id'] = array('in',explode(',', $oldImageIds));
				D('Image')->where($where)->delete();
				
				unset($where);
			}
			
			//更新已经上传图片的fid
			$data['fid'] = $newsId;
			$where['id'] = array('in',explode(',', $imageIds));
			D('Image')->where($where)->data($data)->save();
			
			unset($data);
			unset($where);
			
			$data['title'] = I('POST.title');
			$data['content'] = I('POST.content');
			$data['status'] = I('POST.status');
			$data['is_stick'] = I('POST.is_stick');
			$data['publisher'] = session('uid');
			$data['publish_time'] = I('POST.publish_time');
			$data['image_ids'] = $imageIds;
			
			D('News')->where(array('id'=>$newsId))->data($data)->save();
			
			$result['success'] = TRUE;
		}else {
			$result['msg'] = '错误的提交方式！';
		}
		
		$this->ajaxReturn($result,'JSON');
	}
}