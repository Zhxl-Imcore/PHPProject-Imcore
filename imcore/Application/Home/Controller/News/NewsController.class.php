<?php

namespace Home\Controller\News;

use Home\Controller\Base\BaseController;

/**
 * 果核动态
 * @author zhxl
 *
 */
class NewsController extends BaseController {
	
    /**
     * 动态列表
     */
    public function indexAction() {
    	$newsModel = D('News');
    	
    	$where['status'] = array('eq',1);
    	$records = $newsModel->where($where)->order(array('publish_time'=>'DESC'))->select();
    	
    	$this->assign('records',$records);
    	$this->display('News:index');
    }
    
    /**
     * 查看新闻详情($id自动从URL中绑定过来)
     */
    public function detailAction($id){
    	if (!isset($id)){
    		$this->error('访问不正确！');
    	}
    
    	$records = D('News')->where(array('id'=>$id))->find();
    	if (!$records){
    		$this->error('该动态不存在！');
    	}elseif ($records['status'] != 1){
    		$this->error('该动态已被禁用！');
    	}
    	
    	$where['id'] = array('in',$records['image_ids']);
    	$where['category'] = array('eq','NEWS');
    	$where['type'] = array('eq','PHOTO');
    	$newsPhotoInfo = M('Image')->where($where)->find();
    	if ($newsPhotoInfo){
    		$this->assign('newsPhotoPath',mb_substr($newsPhotoInfo['path'], 1).$newsPhotoInfo['name']);
    	}
    	
        $this->assign('records',$records);
    	$this->display('News:detail');
    } 
}