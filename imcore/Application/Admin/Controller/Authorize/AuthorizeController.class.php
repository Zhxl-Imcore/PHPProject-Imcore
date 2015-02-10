<?php
namespace Admin\Controller\Authorize;

use Think\Controller;
/**
 * 用户登录校验授权
 * @author zhxl
 *
 */
class AuthorizeController extends Controller {
	
	/**
	 * 用户登录界面
	 */
	public function indexAction(){
		$this->display('Authorize:index');
	}
	
	/**
	 * 用户登录
	 */
	public function loginAction(){
		//接收参数
        $account = I('POST.account','');
        $password = I('POST.password','','htmlspecialchars,md5,strtoupper');
        
        $userModel = D('User');
        
        $where['account'] = array('eq',$account);
        $where['password'] = array('eq',$password);
        $where['_logic'] = 'and';
         
        $record = $userModel->where($where)->find();
        if (!$record){
        	$this->error('用户名和密码不匹配!');
        }
        
        if (!$record['status']){
        	$this->error('该用户已被禁用.');
        }
        
        //校验通过,写入Session
       	session('name',$record['name']);
       	session('account',$record['account']);
       	
       	header('Content-Type: text/html;Charset=UTF-8');
       	redirect(U('Admin/Main/Index/index'),3,'登录成功，正在为您跳转...');
	}
	
	/**
	 * 用户登出
	 */
	public function logoutAction(){
		//清空session记录(空文件)
		session(null);
		//销毁session
		session('[destroy]');
		
		header('Content-Type: text/html;Charset=UTF-8');
		//重定向到当前Controller中的index
		redirect(U('index'),3,'您已安全退出!');
	}
	
}