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
		'id','account','password','name','createtime','status',
		'_pk' => 'id'
	);
	
}