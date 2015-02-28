<?php
namespace Admin\Model;

use Think\Model;

/**
 * 用户模型
 * @author zhxl
 *
 */
class UserModel extends Model {
	
	/**
	 * 字段信息
	 */
	protected $fields = array(
		'id',
		'account',
		'password',
		'name',
		'createtime',
		'status',
		'last_login_ip',
		'last_login_time',
		'_pk' => 'id'
	);
	
}