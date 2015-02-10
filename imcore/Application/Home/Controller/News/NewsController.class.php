<?php

namespace Home\Controller\News;

use Think\Controller;

/**
 * 果核动态
 * @author zhxl
 *
 */
class NewsController extends Controller {
	
    /**
     * 动态列表
     */
    public function indexAction() {
    	$this->display('News:index');
    }
    
    /**
     * 查看新闻详情($id自动从URL中绑定过来)
     */
    public function detailAction($id){
        $this->assign('id',$id);
    	$this->display('News:detail');
    } 
}